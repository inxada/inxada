import React from 'react';
import { Plus, Trash2, BookOpen } from 'lucide-react';
import type { Character, CharacterUpdate } from '@/types/rpg';

interface InfoTabProps {
  character: Character;
  onChange: (updates: CharacterUpdate) => void;
}

const InfoTab: React.FC<InfoTabProps> = ({ character, onChange }) => {
  const contracts = character.contratos_ativos || [];

  const addContract = () => {
    const newContracts = [...contracts, ''];
    onChange({ contratos_ativos: newContracts });
  };

  const updateContract = (index: number, value: string) => {
    const newContracts = [...contracts];
    newContracts[index] = value;
    onChange({ contratos_ativos: newContracts });
  };

  const removeContract = (index: number) => {
    const newContracts = contracts.filter((_, i) => i !== index);
    onChange({ contratos_ativos: newContracts });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Personal Details */}
      <div className="rpg-card p-6">
        <h3 className="font-display text-lg text-primary mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Detalhes Pessoais
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Nome</label>
            <input
              type="text"
              value={character.name}
              onChange={(e) => onChange({ name: e.target.value })}
              className="rpg-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Altura</label>
            <input
              type="text"
              value={character.altura || ''}
              onChange={(e) => onChange({ altura: e.target.value })}
              className="rpg-input w-full"
              placeholder="Ex: 1.75m"
            />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Peso</label>
            <input
              type="text"
              value={character.peso || ''}
              onChange={(e) => onChange({ peso: e.target.value })}
              className="rpg-input w-full"
              placeholder="Ex: 70kg"
            />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Idade</label>
            <input
              type="text"
              value={character.idade || ''}
              onChange={(e) => onChange({ idade: e.target.value })}
              className="rpg-input w-full"
              placeholder="Ex: 25 anos"
            />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Religião</label>
            <input
              type="text"
              value={character.religiao || ''}
              onChange={(e) => onChange({ religiao: e.target.value })}
              className="rpg-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Status Social</label>
            <input
              type="text"
              value={character.status_social || ''}
              onChange={(e) => onChange({ status_social: e.target.value })}
              className="rpg-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Dinheiro</label>
            <input
              type="text"
              value={character.dinheiro || ''}
              onChange={(e) => onChange({ dinheiro: e.target.value })}
              className="rpg-input w-full"
              placeholder="Ex: 500 moedas de ouro"
            />
          </div>
        </div>
      </div>

      {/* Contracts */}
      <div className="rpg-card p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-display text-lg text-primary">Contratos Ativos</h3>
          <button
            onClick={addContract}
            className="rpg-button-secondary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Adicionar
          </button>
        </div>
        
        {contracts.length === 0 ? (
          <p className="text-muted-foreground">Nenhum contrato ativo.</p>
        ) : (
          <div className="space-y-3">
            {contracts.map((contract, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={contract}
                  onChange={(e) => updateContract(index, e.target.value)}
                  className="rpg-input flex-1"
                  placeholder={`Contrato ${index + 1}`}
                />
                <button
                  onClick={() => removeContract(index)}
                  className="rpg-button-secondary p-2 text-destructive hover:bg-destructive/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Personal Information */}
      <div className="rpg-card p-6">
        <h3 className="font-display text-lg text-primary mb-4">Informações Pessoais</h3>
        <textarea
          value={character.informacoes_pessoais || ''}
          onChange={(e) => onChange({ informacoes_pessoais: e.target.value })}
          className="rpg-input w-full"
          rows={4}
          placeholder="Personalidade, aparência, manias, medos, objetivos..."
        />
      </div>

      {/* History */}
      <div className="rpg-card p-6">
        <h3 className="font-display text-lg text-primary mb-4">Histórico</h3>
        <textarea
          value={character.historico || ''}
          onChange={(e) => onChange({ historico: e.target.value })}
          className="rpg-input w-full"
          rows={6}
          placeholder="A história de vida do personagem..."
        />
      </div>
    </div>
  );
};

export default InfoTab;
