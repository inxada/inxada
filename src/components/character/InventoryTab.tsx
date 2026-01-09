import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Dices, Package } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Character, CharacterInventory, ItemCategory, ItemRarity, DamageType } from '@/types/rpg';

interface InventoryTabProps {
  character: Character;
}

const CATEGORIES: ItemCategory[] = ['arma', 'armadura', 'consumivel', 'ferramenta', 'outros'];
const RARITIES: ItemRarity[] = ['comum', 'incomum', 'raro', 'epico', 'lendario'];
const DAMAGE_TYPES: DamageType[] = ['Balistico', 'Corte', 'Impacto', 'Perfuracao'];

const InventoryTab: React.FC<InventoryTabProps> = ({ character }) => {
  const { toast } = useToast();
  const [items, setItems] = useState<CharacterInventory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    category: 'outros' as ItemCategory,
    rarity: 'comum' as ItemRarity,
    peso: '',
    damage_dice: '',
    damage_type: null as DamageType | null,
  });

  useEffect(() => {
    fetchItems();
  }, [character.id]);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('character_inventory')
        .select('*')
        .eq('character_id', character.id);

      if (error) throw error;
      setItems(data || []);
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar o inventário.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addItem = async () => {
    if (!newItem.name.trim()) {
      toast({
        title: 'Erro',
        description: 'O item precisa ter um nome.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('character_inventory')
        .insert({
          character_id: character.id,
          name: newItem.name,
          description: newItem.description || null,
          category: newItem.category,
          rarity: newItem.rarity,
          peso: newItem.peso || null,
          damage_dice: newItem.category === 'arma' ? newItem.damage_dice : null,
          damage_type: newItem.category === 'arma' ? newItem.damage_type : null,
        })
        .select()
        .single();

      if (error) throw error;

      setItems([...items, data]);
      setNewItem({
        name: '',
        description: '',
        category: 'outros',
        rarity: 'comum',
        peso: '',
        damage_dice: '',
        damage_type: null,
      });
      setShowForm(false);
      toast({
        title: 'Item adicionado!',
        description: `${newItem.name} foi adicionado ao inventário.`,
      });
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Não foi possível adicionar o item.',
        variant: 'destructive',
      });
    }
  };

  const removeItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('character_inventory')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setItems(items.filter(i => i.id !== id));
      toast({
        title: 'Item removido',
        description: 'O item foi removido do inventário.',
      });
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Não foi possível remover o item.',
        variant: 'destructive',
      });
    }
  };

  const rollDamage = (item: CharacterInventory) => {
    if (!item.damage_dice) return;

    // Parse dice notation (e.g., "2d6", "1d8+2")
    const match = item.damage_dice.match(/(\d+)d(\d+)([+-]\d+)?/);
    if (!match) {
      toast({
        title: 'Formato inválido',
        description: 'Use o formato: XdY ou XdY+Z (ex: 2d6, 1d8+2)',
        variant: 'destructive',
      });
      return;
    }

    const numDice = parseInt(match[1]);
    const diceSize = parseInt(match[2]);
    const modifier = match[3] ? parseInt(match[3]) : 0;

    let total = modifier;
    const rolls: number[] = [];

    for (let i = 0; i < numDice; i++) {
      const roll = Math.floor(Math.random() * diceSize) + 1;
      rolls.push(roll);
      total += roll;
    }

    toast({
      title: `${item.name}: ${total} de dano`,
      description: `Dados: [${rolls.join(', ')}]${modifier !== 0 ? ` ${modifier >= 0 ? '+' : ''}${modifier}` : ''} - ${item.damage_type || 'Físico'}`,
    });
  };

  const getRarityClass = (rarity: ItemRarity): string => {
    return `rarity-${rarity}`;
  };

  return (
    <div className="animate-fade-in">
      <div className="rpg-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-display text-lg text-primary flex items-center gap-2">
            <Package className="w-5 h-5" />
            Inventário
          </h3>
          <button
            onClick={() => setShowForm(!showForm)}
            className="rpg-button-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Novo Item
          </button>
        </div>

        {/* New Item Form */}
        {showForm && (
          <div className="bg-secondary/30 rounded-lg p-4 mb-6 animate-slide-in">
            <h4 className="font-display text-foreground mb-4">Adicionar Item</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Nome*</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="rpg-input w-full"
                  placeholder="Nome do item"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Categoria</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value as ItemCategory })}
                  className="rpg-input w-full"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Raridade</label>
                <select
                  value={newItem.rarity}
                  onChange={(e) => setNewItem({ ...newItem, rarity: e.target.value as ItemRarity })}
                  className="rpg-input w-full"
                >
                  {RARITIES.map((rar) => (
                    <option key={rar} value={rar}>{rar.charAt(0).toUpperCase() + rar.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Peso</label>
                <input
                  type="text"
                  value={newItem.peso}
                  onChange={(e) => setNewItem({ ...newItem, peso: e.target.value })}
                  className="rpg-input w-full"
                  placeholder="Ex: 1.5 kg"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-muted-foreground mb-1">Descrição</label>
                <textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="rpg-input w-full"
                  rows={2}
                  placeholder="Descrição do item"
                />
              </div>

              {newItem.category === 'arma' && (
                <>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1">Dado de Dano</label>
                    <input
                      type="text"
                      value={newItem.damage_dice}
                      onChange={(e) => setNewItem({ ...newItem, damage_dice: e.target.value })}
                      className="rpg-input w-full"
                      placeholder="Ex: 2d6, 1d8+2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1">Tipo de Dano</label>
                    <select
                      value={newItem.damage_type || ''}
                      onChange={(e) => setNewItem({ ...newItem, damage_type: e.target.value as DamageType || null })}
                      className="rpg-input w-full"
                    >
                      <option value="">Selecione...</option>
                      {DAMAGE_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={addItem} className="rpg-button-primary">
                Adicionar
              </button>
              <button onClick={() => setShowForm(false)} className="rpg-button-secondary">
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Items List */}
        {loading ? (
          <p className="text-muted-foreground">Carregando...</p>
        ) : items.length === 0 ? (
          <p className="text-muted-foreground">Inventário vazio.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => (
              <div key={item.id} className="inventory-item">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className={`font-display ${getRarityClass(item.rarity)}`}>
                      {item.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                      {item.peso && ` • ${item.peso}`}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {item.category === 'arma' && item.damage_dice && (
                      <button
                        onClick={() => rollDamage(item)}
                        className="dice-roll w-8 h-8"
                        title="Rolar dano"
                      >
                        <Dices className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {item.description && (
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                )}
                {item.category === 'arma' && item.damage_dice && (
                  <p className="text-xs text-primary mt-2">
                    Dano: {item.damage_dice} {item.damage_type && `(${item.damage_type})`}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryTab;
