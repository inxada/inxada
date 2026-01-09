import React, { useState } from 'react';
import type { Character, CharacterUpdate, InjuryLevel } from '@/types/rpg';
import { INJURY_PENALTY } from '@/types/rpg';

interface InjuriesTabProps {
  character: Character;
  onChange: (updates: CharacterUpdate) => void;
}

type BodyPart = 'cabeca' | 'torso' | 'braco_esquerdo' | 'braco_direito' | 'perna_esquerda' | 'perna_direita';

const BODY_PARTS: { key: BodyPart; label: string }[] = [
  { key: 'cabeca', label: 'Cabeça' },
  { key: 'torso', label: 'Torso' },
  { key: 'braco_esquerdo', label: 'Braço Esquerdo' },
  { key: 'braco_direito', label: 'Braço Direito' },
  { key: 'perna_esquerda', label: 'Perna Esquerda' },
  { key: 'perna_direita', label: 'Perna Direita' },
];

const INJURY_LEVELS: { value: InjuryLevel; label: string; color: string }[] = [
  { value: 'nenhum', label: 'Nenhum', color: 'bg-injury-none' },
  { value: 'leve', label: 'Leve (-1)', color: 'bg-injury-light' },
  { value: 'moderado', label: 'Moderado (-2)', color: 'bg-injury-moderate' },
  { value: 'critico', label: 'Crítico (-3)', color: 'bg-injury-critical' },
  { value: 'inutilizavel', label: 'Inutilizável (-5)', color: 'bg-injury-disabled' },
];

const InjuriesTab: React.FC<InjuriesTabProps> = ({ character, onChange }) => {
  const [selectedPart, setSelectedPart] = useState<BodyPart | null>(null);

  const getInjury = (part: BodyPart): InjuryLevel => {
    return (character as any)[`ferimento_${part}`] as InjuryLevel;
  };

  const setInjury = (part: BodyPart, level: InjuryLevel) => {
    onChange({ [`ferimento_${part}`]: level });
    setSelectedPart(null);
  };

  const getBodyPartClass = (part: BodyPart): string => {
    const injury = getInjury(part);
    return `body-part body-part-${injury}`;
  };

  return (
    <div className="animate-fade-in">
      <div className="rpg-card p-6">
        <h3 className="font-display text-lg text-primary mb-4 text-center">Mapa de Ferimentos</h3>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Clique em uma parte do corpo para definir o nível do ferimento
        </p>

        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          {/* Body Silhouette */}
          <div className="relative">
            <svg
              viewBox="0 0 200 400"
              className="w-48 h-96"
            >
              {/* Head */}
              <ellipse
                cx="100"
                cy="35"
                rx="30"
                ry="35"
                className={getBodyPartClass('cabeca')}
                onClick={() => setSelectedPart('cabeca')}
              />
              
              {/* Torso */}
              <path
                d="M65 75 L135 75 L140 180 L60 180 Z"
                className={getBodyPartClass('torso')}
                onClick={() => setSelectedPart('torso')}
              />
              
              {/* Left Arm */}
              <path
                d="M60 80 L35 85 L20 160 L40 165 L50 100 L60 180"
                className={getBodyPartClass('braco_esquerdo')}
                onClick={() => setSelectedPart('braco_esquerdo')}
              />
              
              {/* Right Arm */}
              <path
                d="M140 80 L165 85 L180 160 L160 165 L150 100 L140 180"
                className={getBodyPartClass('braco_direito')}
                onClick={() => setSelectedPart('braco_direito')}
              />
              
              {/* Left Leg */}
              <path
                d="M65 185 L85 185 L80 320 L55 320 Z"
                className={getBodyPartClass('perna_esquerda')}
                onClick={() => setSelectedPart('perna_esquerda')}
              />
              
              {/* Right Leg */}
              <path
                d="M115 185 L135 185 L145 320 L120 320 Z"
                className={getBodyPartClass('perna_direita')}
                onClick={() => setSelectedPart('perna_direita')}
              />
            </svg>
          </div>

          {/* Injury Selection */}
          <div className="w-full lg:w-auto">
            {selectedPart ? (
              <div className="rpg-card p-4 animate-slide-in">
                <h4 className="font-display text-primary mb-4">
                  {BODY_PARTS.find(p => p.key === selectedPart)?.label}
                </h4>
                <div className="space-y-2">
                  {INJURY_LEVELS.map((level) => (
                    <button
                      key={level.value}
                      onClick={() => setInjury(selectedPart, level.value)}
                      className={`w-full flex items-center gap-3 p-3 rounded transition-colors ${
                        getInjury(selectedPart) === level.value
                          ? 'bg-secondary border border-primary'
                          : 'bg-muted hover:bg-secondary'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full ${level.color}`} />
                      <span>{level.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                Selecione uma parte do corpo
              </div>
            )}
          </div>
        </div>

        {/* Injury Summary */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
          {BODY_PARTS.map((part) => {
            const injury = getInjury(part.key);
            const penalty = INJURY_PENALTY[injury];
            const levelInfo = INJURY_LEVELS.find(l => l.value === injury);

            return (
              <div
                key={part.key}
                className="bg-secondary/50 rounded p-3 cursor-pointer hover:bg-secondary transition-colors"
                onClick={() => setSelectedPart(part.key)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-3 h-3 rounded-full ${levelInfo?.color}`} />
                  <span className="font-display text-sm">{part.label}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {levelInfo?.label} {penalty !== 0 && `(${penalty})`}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InjuriesTab;
