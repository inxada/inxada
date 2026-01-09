import type { Database } from '@/integrations/supabase/types';

export type Character = Database['public']['Tables']['characters']['Row'];
export type CharacterUpdate = Database['public']['Tables']['characters']['Update'];
export type CharacterTalent = Database['public']['Tables']['character_talents']['Row'];
export type CharacterInventory = Database['public']['Tables']['character_inventory']['Row'];

export type CharacterClass = Database['public']['Enums']['character_class'];
export type InjuryLevel = Database['public']['Enums']['injury_level'];
export type ItemCategory = Database['public']['Enums']['item_category'];
export type ItemRarity = Database['public']['Enums']['item_rarity'];
export type DamageType = Database['public']['Enums']['damage_type'];

export interface Skill {
  name: string;
  attribute: 'perspicaz' | 'dialogo' | 'reacao' | 'resistencia' | 'impulso' | 'perseveranca';
  trainKey: keyof Character;
  bonusKey: keyof Character;
  bodyParts?: ('cabeca' | 'torso' | 'braco_esquerdo' | 'braco_direito' | 'perna_esquerda' | 'perna_direita')[];
}

export const SKILLS: Skill[] = [
  { name: 'Acrobacia', attribute: 'reacao', trainKey: 'treino_acrobacia', bonusKey: 'bonus_acrobacia', bodyParts: ['perna_esquerda', 'perna_direita'] },
  { name: 'Adestramento', attribute: 'dialogo', trainKey: 'treino_adestramento', bonusKey: 'bonus_adestramento' },
  { name: 'Artes', attribute: 'perspicaz', trainKey: 'treino_artes', bonusKey: 'bonus_artes', bodyParts: ['braco_esquerdo', 'braco_direito'] },
  { name: 'Atletismo', attribute: 'impulso', trainKey: 'treino_atletismo', bonusKey: 'bonus_atletismo', bodyParts: ['perna_esquerda', 'perna_direita', 'braco_esquerdo', 'braco_direito'] },
  { name: 'Atualidades', attribute: 'perspicaz', trainKey: 'treino_atualidades', bonusKey: 'bonus_atualidades' },
  { name: 'Ciências', attribute: 'perspicaz', trainKey: 'treino_ciencias', bonusKey: 'bonus_ciencias' },
  { name: 'Crime', attribute: 'reacao', trainKey: 'treino_crime', bonusKey: 'bonus_crime', bodyParts: ['braco_esquerdo', 'braco_direito'] },
  { name: 'Diplomacia', attribute: 'dialogo', trainKey: 'treino_diplomacia', bonusKey: 'bonus_diplomacia' },
  { name: 'Enganação', attribute: 'dialogo', trainKey: 'treino_enganacao', bonusKey: 'bonus_enganacao' },
  { name: 'Fortitude', attribute: 'resistencia', trainKey: 'treino_fortitude', bonusKey: 'bonus_fortitude', bodyParts: ['torso'] },
  { name: 'Furtividade', attribute: 'reacao', trainKey: 'treino_furtividade', bonusKey: 'bonus_furtividade', bodyParts: ['perna_esquerda', 'perna_direita'] },
  { name: 'Iniciativa', attribute: 'reacao', trainKey: 'treino_iniciativa', bonusKey: 'bonus_iniciativa' },
  { name: 'Intimidação', attribute: 'impulso', trainKey: 'treino_intimidacao', bonusKey: 'bonus_intimidacao' },
  { name: 'Intuição', attribute: 'perspicaz', trainKey: 'treino_intuicao', bonusKey: 'bonus_intuicao', bodyParts: ['cabeca'] },
  { name: 'Investigação', attribute: 'perspicaz', trainKey: 'treino_investigacao', bonusKey: 'bonus_investigacao', bodyParts: ['cabeca'] },
  { name: 'Luta', attribute: 'impulso', trainKey: 'treino_luta', bonusKey: 'bonus_luta', bodyParts: ['braco_esquerdo', 'braco_direito'] },
  { name: 'Medicina', attribute: 'perspicaz', trainKey: 'treino_medicina', bonusKey: 'bonus_medicina', bodyParts: ['braco_esquerdo', 'braco_direito'] },
  { name: 'Ocultismo', attribute: 'perspicaz', trainKey: 'treino_ocultismo', bonusKey: 'bonus_ocultismo', bodyParts: ['cabeca'] },
  { name: 'Percepção', attribute: 'perspicaz', trainKey: 'treino_percepcao', bonusKey: 'bonus_percepcao', bodyParts: ['cabeca'] },
  { name: 'Pilotagem', attribute: 'reacao', trainKey: 'treino_pilotagem', bonusKey: 'bonus_pilotagem', bodyParts: ['braco_esquerdo', 'braco_direito'] },
  { name: 'Pontaria', attribute: 'reacao', trainKey: 'treino_pontaria', bonusKey: 'bonus_pontaria', bodyParts: ['braco_esquerdo', 'braco_direito'] },
  { name: 'Profissão', attribute: 'perspicaz', trainKey: 'treino_profissao', bonusKey: 'bonus_profissao' },
  { name: 'Reflexos', attribute: 'reacao', trainKey: 'treino_reflexos', bonusKey: 'bonus_reflexos' },
  { name: 'Religião', attribute: 'perspicaz', trainKey: 'treino_religiao', bonusKey: 'bonus_religiao' },
  { name: 'Sobrevivência', attribute: 'perseveranca', trainKey: 'treino_sobrevivencia', bonusKey: 'bonus_sobrevivencia' },
  { name: 'Tática', attribute: 'perspicaz', trainKey: 'treino_tatica', bonusKey: 'bonus_tatica', bodyParts: ['cabeca'] },
  { name: 'Tecnologia', attribute: 'perspicaz', trainKey: 'treino_tecnologia', bonusKey: 'bonus_tecnologia', bodyParts: ['braco_esquerdo', 'braco_direito'] },
  { name: 'Vontade', attribute: 'perseveranca', trainKey: 'treino_vontade', bonusKey: 'bonus_vontade', bodyParts: ['cabeca'] },
];

export const CLASS_TALENTS: Record<CharacterClass, { name: string; description: string }[]> = {
  Guerreiro: [
    { name: 'Golpe Devastador', description: 'Causa dano adicional em ataques corpo a corpo.' },
    { name: 'Resistência de Aço', description: 'Reduz dano recebido de ataques físicos.' },
    { name: 'Fúria de Batalha', description: 'Entra em fúria, ganhando bônus em ataques.' },
    { name: 'Mestre de Armas', description: 'Proficiência extra com todas as armas.' },
    { name: 'Defesa Impenetrável', description: 'Aumenta significativamente a defesa.' },
  ],
  Mago: [
    { name: 'Bola de Fogo', description: 'Conjura uma poderosa bola de fogo.' },
    { name: 'Escudo Arcano', description: 'Cria um escudo mágico protetor.' },
    { name: 'Metamagia', description: 'Permite modificar magias de forma única.' },
    { name: 'Canalização', description: 'Aumenta o poder das magias.' },
    { name: 'Teleporte', description: 'Permite teletransporte curto.' },
  ],
  Ladino: [
    { name: 'Ataque Furtivo', description: 'Causa dano extra ao atacar de surpresa.' },
    { name: 'Evasão', description: 'Esquiva de ataques de área.' },
    { name: 'Mãos Rápidas', description: 'Permite roubar objetos com facilidade.' },
    { name: 'Sombras', description: 'Torna-se invisível em áreas escuras.' },
    { name: 'Veneno', description: 'Aplica veneno em armas.' },
  ],
  Clerigo: [
    { name: 'Cura Divina', description: 'Restaura pontos de vida de aliados.' },
    { name: 'Proteção Sagrada', description: 'Concede proteção divina.' },
    { name: 'Expulsar Mortos-Vivos', description: 'Afasta criaturas não-mortas.' },
    { name: 'Benção', description: 'Abençoa aliados com bônus.' },
    { name: 'Ressurreição', description: 'Traz aliados de volta à vida.' },
  ],
  Bardo: [
    { name: 'Inspiração', description: 'Inspira aliados com música.' },
    { name: 'Canção de Cura', description: 'Cura aliados com melodias.' },
    { name: 'Fascinar', description: 'Encanta inimigos com música.' },
    { name: 'Conhecimento Bárdico', description: 'Conhecimento sobre diversos assuntos.' },
    { name: 'Contramúsica', description: 'Anula efeitos sonoros mágicos.' },
  ],
  Ranger: [
    { name: 'Inimigo Favorito', description: 'Bônus contra tipos específicos de inimigos.' },
    { name: 'Rastreamento', description: 'Segue rastros com facilidade.' },
    { name: 'Companheiro Animal', description: 'Possui um animal de estimação fiel.' },
    { name: 'Terreno Favorito', description: 'Bônus em terrenos específicos.' },
    { name: 'Chuva de Flechas', description: 'Dispara múltiplas flechas.' },
  ],
  Paladino: [
    { name: 'Imposição de Mãos', description: 'Cura através do toque divino.' },
    { name: 'Destruir o Mal', description: 'Causa dano extra contra o mal.' },
    { name: 'Aura de Coragem', description: 'Aliados próximos ficam imunes a medo.' },
    { name: 'Escudo da Fé', description: 'Aumenta a proteção divina.' },
    { name: 'Punição Divina', description: 'Ataque devastador contra inimigos.' },
  ],
  Monge: [
    { name: 'Golpe Desarmado', description: 'Ataques sem armas são mais poderosos.' },
    { name: 'Desviar Projéteis', description: 'Desvia flechas e projéteis.' },
    { name: 'Movimento Rápido', description: 'Move-se mais rápido que o normal.' },
    { name: 'Palma Tremulante', description: 'Ataque que causa dano interno.' },
    { name: 'Corpo Vazio', description: 'Torna-se etéreo temporariamente.' },
  ],
};

export const INJURY_PENALTY: Record<InjuryLevel, number> = {
  nenhum: 0,
  leve: -1,
  moderado: -2,
  critico: -3,
  inutilizavel: -5,
};
