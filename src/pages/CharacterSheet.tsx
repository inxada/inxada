import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import CharacterHeader from '@/components/character/CharacterHeader';
import CharacterTabs, { TabType } from '@/components/character/CharacterTabs';
import AttributesTab from '@/components/character/AttributesTab';
import InjuriesTab from '@/components/character/InjuriesTab';
import TalentsTab from '@/components/character/TalentsTab';
import SkillsTab from '@/components/character/SkillsTab';
import InventoryTab from '@/components/character/InventoryTab';
import InfoTab from '@/components/character/InfoTab';
import type { Character, CharacterUpdate } from '@/types/rpg';

const CharacterSheet: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('attributes');
  const [pendingChanges, setPendingChanges] = useState<CharacterUpdate>({});

  useEffect(() => {
    if (!id) {
      navigate('/characters');
      return;
    }
    fetchCharacter();
  }, [id]);

  const fetchCharacter = async () => {
    try {
      const { data, error } = await supabase
        .from('characters')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) {
        navigate('/characters');
        return;
      }

      setCharacter(data);
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar o personagem.',
        variant: 'destructive',
      });
      navigate('/characters');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = useCallback((updates: CharacterUpdate) => {
    setCharacter(prev => prev ? { ...prev, ...updates } as Character : null);
    setPendingChanges(prev => ({ ...prev, ...updates }));
  }, []);

  const saveCharacter = async () => {
    if (!character || Object.keys(pendingChanges).length === 0) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('characters')
        .update(pendingChanges)
        .eq('id', character.id);

      if (error) throw error;

      setPendingChanges({});
      toast({
        title: 'Salvo!',
        description: 'As alterações foram salvas com sucesso.',
      });
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar as alterações.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground font-display">Carregando ficha...</p>
      </div>
    );
  }

  if (!character) {
    return null;
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <CharacterHeader
          name={character.name}
          onSave={saveCharacter}
          saving={saving}
        />

        <CharacterTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="pb-8">
          {activeTab === 'attributes' && (
            <AttributesTab character={character} onChange={handleChange} />
          )}
          {activeTab === 'injuries' && (
            <InjuriesTab character={character} onChange={handleChange} />
          )}
          {activeTab === 'talents' && (
            <TalentsTab character={character} />
          )}
          {activeTab === 'skills' && (
            <SkillsTab character={character} onChange={handleChange} />
          )}
          {activeTab === 'inventory' && (
            <InventoryTab character={character} />
          )}
          {activeTab === 'info' && (
            <InfoTab character={character} onChange={handleChange} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterSheet;
