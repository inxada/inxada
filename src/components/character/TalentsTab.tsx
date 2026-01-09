import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Character, CharacterTalent, CharacterClass } from '@/types/rpg';
import { CLASS_TALENTS } from '@/types/rpg';

interface TalentsTabProps {
  character: Character;
}

const TalentsTab: React.FC<TalentsTabProps> = ({ character }) => {
  const { toast } = useToast();
  const [talents, setTalents] = useState<CharacterTalent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTalents();
  }, [character.id]);

  const fetchTalents = async () => {
    try {
      const { data, error } = await supabase
        .from('character_talents')
        .select('*')
        .eq('character_id', character.id);

      if (error) throw error;
      setTalents(data || []);
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os talentos.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addTalent = async (name: string, description: string) => {
    try {
      const { data, error } = await supabase
        .from('character_talents')
        .insert({
          character_id: character.id,
          talent_name: name,
          talent_description: description,
        })
        .select()
        .single();

      if (error) throw error;

      setTalents([...talents, data]);
      toast({
        title: 'Talento adicionado!',
        description: `${name} foi adicionado ao personagem.`,
      });
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Não foi possível adicionar o talento.',
        variant: 'destructive',
      });
    }
  };

  const removeTalent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('character_talents')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTalents(talents.filter(t => t.id !== id));
      toast({
        title: 'Talento removido',
        description: 'O talento foi removido do personagem.',
      });
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Não foi possível remover o talento.',
        variant: 'destructive',
      });
    }
  };

  const classTalents = CLASS_TALENTS[character.class as CharacterClass] || [];
  const acquiredTalentNames = talents.map(t => t.talent_name);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Acquired Talents */}
      <div className="rpg-card p-6">
        <h3 className="font-display text-lg text-primary mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Talentos Adquiridos
        </h3>
        
        {loading ? (
          <p className="text-muted-foreground">Carregando...</p>
        ) : talents.length === 0 ? (
          <p className="text-muted-foreground">Nenhum talento adquirido ainda.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {talents.map((talent) => (
              <div key={talent.id} className="talent-card flex justify-between items-start">
                <div>
                  <h4 className="font-display text-foreground">{talent.talent_name}</h4>
                  <p className="text-sm text-muted-foreground">{talent.talent_description}</p>
                </div>
                <button
                  onClick={() => removeTalent(talent.id)}
                  className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Available Class Talents */}
      <div className="rpg-card p-6">
        <h3 className="font-display text-lg text-primary mb-4">
          Talentos de {character.class}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Selecione talentos da sua classe para adicionar ao personagem.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {classTalents.map((talent) => {
            const isAcquired = acquiredTalentNames.includes(talent.name);
            
            return (
              <div
                key={talent.name}
                className={`talent-card ${isAcquired ? 'opacity-50' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-display text-foreground">{talent.name}</h4>
                    <p className="text-sm text-muted-foreground">{talent.description}</p>
                  </div>
                  {!isAcquired && (
                    <button
                      onClick={() => addTalent(talent.name, talent.description)}
                      className="rpg-button-primary p-2"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {isAcquired && (
                  <span className="text-xs text-primary mt-2 inline-block">✓ Adquirido</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TalentsTab;
