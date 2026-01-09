import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, User, LogOut, Trash2, Sword } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type Character = Database['public']['Tables']['characters']['Row'];

const Characters: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const { data, error } = await supabase
        .from('characters')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setCharacters(data || []);
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os personagens.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createCharacter = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('characters')
        .insert({ user_id: user.id })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Personagem criado!',
        description: 'Comece a editar sua nova ficha.',
      });

      navigate(`/character/${data.id}`);
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Não foi possível criar o personagem.',
        variant: 'destructive',
      });
    }
  };

  const deleteCharacter = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!confirm('Tem certeza que deseja excluir este personagem?')) return;

    try {
      const { error } = await supabase
        .from('characters')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setCharacters(characters.filter(c => c.id !== id));
      toast({
        title: 'Personagem excluído',
        description: 'O personagem foi removido com sucesso.',
      });
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir o personagem.',
        variant: 'destructive',
      });
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const classColors: Record<string, string> = {
    Guerreiro: 'text-red-400',
    Mago: 'text-blue-400',
    Ladino: 'text-green-400',
    Clerigo: 'text-yellow-400',
    Bardo: 'text-purple-400',
    Ranger: 'text-emerald-400',
    Paladino: 'text-amber-400',
    Monge: 'text-orange-400',
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 animate-fade-in">
        <div className="flex items-center gap-3">
          <Sword className="w-8 h-8 text-primary" />
          <h1 className="text-2xl md:text-3xl font-display text-primary">
            Meus Personagens
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="rpg-button-secondary flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden md:inline">Sair</span>
        </button>
      </header>

      {/* Character Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Create New Character Card */}
        <button
          onClick={createCharacter}
          className="character-card flex flex-col items-center justify-center min-h-[200px] border-dashed border-2 border-primary/30 hover:border-primary/60 animate-fade-in"
        >
          <Plus className="w-12 h-12 text-primary mb-2" />
          <span className="font-display text-lg text-primary">
            Novo Personagem
          </span>
        </button>

        {/* Character Cards */}
        {loading ? (
          <div className="col-span-full text-center text-muted-foreground py-12">
            Carregando personagens...
          </div>
        ) : (
          characters.map((character, index) => (
            <div
              key={character.id}
              onClick={() => navigate(`/character/${character.id}`)}
              className="character-card relative animate-fade-in"
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              <button
                onClick={(e) => deleteCharacter(character.id, e)}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                  <User className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl text-foreground truncate">
                    {character.name}
                  </h3>
                  <p className={`text-sm ${classColors[character.class] || 'text-muted-foreground'}`}>
                    {character.class}
                  </p>
                  {character.player_name && (
                    <p className="text-sm text-muted-foreground truncate">
                      Jogador: {character.player_name}
                    </p>
                  )}
                </div>
              </div>

              {/* Stats Preview */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                <div className="bg-secondary/50 rounded p-2 text-center">
                  <div className="text-health font-bold">
                    {character.vida_atual}/{character.vida_max}
                  </div>
                  <div className="text-muted-foreground">Vida</div>
                </div>
                <div className="bg-secondary/50 rounded p-2 text-center">
                  <div className="text-sanity font-bold">
                    {character.sanidade_atual}/{character.sanidade_max}
                  </div>
                  <div className="text-muted-foreground">Sanidade</div>
                </div>
                <div className="bg-secondary/50 rounded p-2 text-center">
                  <div className="text-reality font-bold">
                    {character.ponto_realidade_atual}/{character.ponto_realidade_max}
                  </div>
                  <div className="text-muted-foreground">Realidade</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Characters;
