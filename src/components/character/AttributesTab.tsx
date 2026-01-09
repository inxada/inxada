import React from 'react';
import { Minus, Plus } from 'lucide-react';
import type { Character, CharacterUpdate, CharacterClass } from '@/types/rpg';

interface AttributesTabProps {
  character: Character;
  onChange: (updates: CharacterUpdate) => void;
}

const CLASSES: CharacterClass[] = ['Guerreiro', 'Mago', 'Ladino', 'Clerigo', 'Bardo', 'Ranger', 'Paladino', 'Monge'];

const AttributesTab: React.FC<AttributesTabProps> = ({ character, onChange }) => {
  const attributes = [
    { key: 'perspicaz', label: 'Perspicaz' },
    { key: 'dialogo', label: 'Diálogo' },
    { key: 'reacao', label: 'Reação' },
    { key: 'resistencia', label: 'Resistência' },
    { key: 'impulso', label: 'Impulso' },
    { key: 'perseveranca', label: 'Perseverança' },
  ] as const;

  const resources = [
    { key: 'vida', label: 'Vida', colorClass: 'stat-bar-health', currentKey: 'vida_atual', maxKey: 'vida_max' },
    { key: 'sanidade', label: 'Sanidade', colorClass: 'stat-bar-sanity', currentKey: 'sanidade_atual', maxKey: 'sanidade_max' },
    { key: 'realidade', label: 'Ponto de Realidade', colorClass: 'stat-bar-reality', currentKey: 'ponto_realidade_atual', maxKey: 'ponto_realidade_max' },
  ] as const;

  const adjustResource = (currentKey: string, delta: number) => {
    const maxKey = currentKey.replace('_atual', '_max');
    const currentValue = (character as any)[currentKey] as number;
    const maxValue = (character as any)[maxKey] as number;
    const newValue = Math.max(0, Math.min(maxValue, currentValue + delta));
    onChange({ [currentKey]: newValue });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Basic Info */}
      <div className="rpg-card p-6">
        <h3 className="font-display text-lg text-primary mb-4">Informações Básicas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Nome do Personagem</label>
            <input
              type="text"
              value={character.name}
              onChange={(e) => onChange({ name: e.target.value })}
              className="rpg-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Jogador</label>
            <input
              type="text"
              value={character.player_name || ''}
              onChange={(e) => onChange({ player_name: e.target.value })}
              className="rpg-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Origem</label>
            <input
              type="text"
              value={character.origin || ''}
              onChange={(e) => onChange({ origin: e.target.value })}
              className="rpg-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Classe</label>
            <select
              value={character.class}
              onChange={(e) => onChange({ class: e.target.value as CharacterClass })}
              className="rpg-input w-full"
            >
              {CLASSES.map((cls) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Attributes */}
      <div className="rpg-card p-6">
        <h3 className="font-display text-lg text-primary mb-4">Atributos</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {attributes.map((attr) => (
            <div key={attr.key} className="text-center">
              <label className="block text-sm text-muted-foreground mb-2">{attr.label}</label>
              <input
                type="number"
                value={(character as any)[attr.key]}
                onChange={(e) => onChange({ [attr.key]: parseInt(e.target.value) || 0 })}
                className="rpg-input w-full text-center text-2xl font-display"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="rpg-card p-6">
        <h3 className="font-display text-lg text-primary mb-4">Recursos</h3>
        <div className="space-y-6">
          {resources.map((resource) => {
            const current = (character as any)[resource.currentKey] as number;
            const max = (character as any)[resource.maxKey] as number;
            const percentage = max > 0 ? (current / max) * 100 : 0;

            return (
              <div key={resource.key}>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm text-muted-foreground">{resource.label}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={current}
                      onChange={(e) => onChange({ [resource.currentKey]: parseInt(e.target.value) || 0 })}
                      className="rpg-input w-16 text-center"
                    />
                    <span className="text-muted-foreground">/</span>
                    <input
                      type="number"
                      value={max}
                      onChange={(e) => onChange({ [resource.maxKey]: parseInt(e.target.value) || 1 })}
                      className="rpg-input w-16 text-center"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => adjustResource(resource.currentKey, -1)}
                    className="rpg-button-secondary p-2"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className={`stat-bar flex-1 ${resource.colorClass}`}>
                    <div
                      className="stat-bar-fill"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <button
                    onClick={() => adjustResource(resource.currentKey, 1)}
                    className="rpg-button-secondary p-2"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Combat */}
      <div className="rpg-card p-6">
        <h3 className="font-display text-lg text-primary mb-4">Combate</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Defesa</label>
            <input
              type="number"
              value={character.defesa}
              onChange={(e) => onChange({ defesa: parseInt(e.target.value) || 0 })}
              className="rpg-input w-full text-center text-xl font-display"
            />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Resistências</label>
            <input
              type="text"
              value={character.resistencias || ''}
              onChange={(e) => onChange({ resistencias: e.target.value })}
              className="rpg-input w-full"
              placeholder="Ex: Fogo, Gelo"
            />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Ponto de Dificuldade de Confronto</label>
            <input
              type="text"
              value={character.ponto_dificuldade_confronto || ''}
              onChange={(e) => onChange({ ponto_dificuldade_confronto: e.target.value })}
              className="rpg-input w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttributesTab;
