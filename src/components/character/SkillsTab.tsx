import React, { useState } from 'react';
import { Dices, GraduationCap } from 'lucide-react';
import type { Character, CharacterUpdate, InjuryLevel } from '@/types/rpg';
import { SKILLS, INJURY_PENALTY } from '@/types/rpg';
import { useToast } from '@/hooks/use-toast';

interface SkillsTabProps {
  character: Character;
  onChange: (updates: CharacterUpdate) => void;
}

type BodyPart = 'cabeca' | 'torso' | 'braco_esquerdo' | 'braco_direito' | 'perna_esquerda' | 'perna_direita';

const SkillsTab: React.FC<SkillsTabProps> = ({ character, onChange }) => {
  const { toast } = useToast();
  const [rollResults, setRollResults] = useState<Record<string, number | null>>({});
  const [rolling, setRolling] = useState<string | null>(null);

  const getInjuryPenalty = (bodyParts?: BodyPart[]): number => {
    if (!bodyParts || bodyParts.length === 0) return 0;
    
    let totalPenalty = 0;
    bodyParts.forEach(part => {
      const injury = (character as any)[`ferimento_${part}`] as InjuryLevel;
      totalPenalty += INJURY_PENALTY[injury];
    });
    return totalPenalty;
  };

  const rollDice = async (skillName: string, totalBonus: number) => {
    setRolling(skillName);
    
    // Animate the roll
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const roll = Math.floor(Math.random() * 20) + 1;
    const total = roll + totalBonus;
    
    setRollResults({ ...rollResults, [skillName]: total });
    setRolling(null);

    toast({
      title: `${skillName}: ${total}`,
      description: `Dado: ${roll} + Bônus: ${totalBonus >= 0 ? '+' : ''}${totalBonus}`,
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="rpg-card p-6">
        <h3 className="font-display text-lg text-primary mb-4 flex items-center gap-2">
          <GraduationCap className="w-5 h-5" />
          Perícias
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Clique no dado para rolar. Os bônus são calculados automaticamente baseados em atributos, treino e ferimentos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SKILLS.map((skill) => {
            const attributeValue = (character as any)[skill.attribute] as number;
            const trainValue = (character as any)[skill.trainKey] as number;
            const bonusValue = (character as any)[skill.bonusKey] as number;
            const injuryPenalty = getInjuryPenalty(skill.bodyParts);
            const totalBonus = attributeValue + trainValue + bonusValue + injuryPenalty;
            const lastRoll = rollResults[skill.name];

            return (
              <div key={skill.name} className="bg-secondary/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-display text-foreground">{skill.name}</h4>
                    <p className="text-xs text-muted-foreground capitalize">
                      {skill.attribute}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-display text-primary">
                      {totalBonus >= 0 ? '+' : ''}{totalBonus}
                    </span>
                    <button
                      onClick={() => rollDice(skill.name, totalBonus)}
                      className={`dice-roll ${rolling === skill.name ? 'animate-spin' : ''}`}
                    >
                      <Dices className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-muted/50 rounded p-2">
                    <label className="text-muted-foreground block mb-1">Treino</label>
                    <input
                      type="number"
                      value={trainValue}
                      onChange={(e) => onChange({ [skill.trainKey]: parseInt(e.target.value) || 0 })}
                      className="rpg-input w-full text-center py-1"
                    />
                  </div>
                  <div className="bg-muted/50 rounded p-2">
                    <label className="text-muted-foreground block mb-1">Bônus</label>
                    <input
                      type="number"
                      value={bonusValue}
                      onChange={(e) => onChange({ [skill.bonusKey]: parseInt(e.target.value) || 0 })}
                      className="rpg-input w-full text-center py-1"
                    />
                  </div>
                  <div className="bg-muted/50 rounded p-2">
                    <label className="text-muted-foreground block mb-1">Ferimento</label>
                    <div className={`text-center py-1 font-bold ${injuryPenalty < 0 ? 'text-destructive' : 'text-health'}`}>
                      {injuryPenalty}
                    </div>
                  </div>
                </div>

                {lastRoll !== null && lastRoll !== undefined && (
                  <div className="mt-2 text-center">
                    <span className="text-sm text-primary font-display">
                      Último resultado: {lastRoll}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SkillsTab;
