-- Create enum for classes
CREATE TYPE public.character_class AS ENUM ('Guerreiro', 'Mago', 'Ladino', 'Clerigo', 'Bardo', 'Ranger', 'Paladino', 'Monge');

-- Create enum for injury levels
CREATE TYPE public.injury_level AS ENUM ('nenhum', 'leve', 'moderado', 'critico', 'inutilizavel');

-- Create enum for item categories
CREATE TYPE public.item_category AS ENUM ('arma', 'armadura', 'consumivel', 'ferramenta', 'outros');

-- Create enum for item rarity
CREATE TYPE public.item_rarity AS ENUM ('comum', 'incomum', 'raro', 'epico', 'lendario');

-- Create enum for damage types
CREATE TYPE public.damage_type AS ENUM ('Balistico', 'Corte', 'Impacto', 'Perfuracao');

-- Create characters table
CREATE TABLE public.characters (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    name TEXT NOT NULL DEFAULT 'Novo Personagem',
    player_name TEXT,
    origin TEXT,
    class character_class NOT NULL DEFAULT 'Guerreiro',
    
    -- Attributes
    perspicaz INTEGER NOT NULL DEFAULT 0,
    dialogo INTEGER NOT NULL DEFAULT 0,
    reacao INTEGER NOT NULL DEFAULT 0,
    resistencia INTEGER NOT NULL DEFAULT 0,
    impulso INTEGER NOT NULL DEFAULT 0,
    perseveranca INTEGER NOT NULL DEFAULT 0,
    
    -- Resources
    vida_atual INTEGER NOT NULL DEFAULT 10,
    vida_max INTEGER NOT NULL DEFAULT 10,
    sanidade_atual INTEGER NOT NULL DEFAULT 10,
    sanidade_max INTEGER NOT NULL DEFAULT 10,
    ponto_realidade_atual INTEGER NOT NULL DEFAULT 10,
    ponto_realidade_max INTEGER NOT NULL DEFAULT 10,
    
    -- Combat
    defesa INTEGER NOT NULL DEFAULT 0,
    resistencias TEXT,
    ponto_dificuldade_confronto TEXT,
    
    -- Injuries (body parts)
    ferimento_cabeca injury_level NOT NULL DEFAULT 'nenhum',
    ferimento_torso injury_level NOT NULL DEFAULT 'nenhum',
    ferimento_braco_esquerdo injury_level NOT NULL DEFAULT 'nenhum',
    ferimento_braco_direito injury_level NOT NULL DEFAULT 'nenhum',
    ferimento_perna_esquerda injury_level NOT NULL DEFAULT 'nenhum',
    ferimento_perna_direita injury_level NOT NULL DEFAULT 'nenhum',
    
    -- Personal info
    altura TEXT,
    peso TEXT,
    idade TEXT,
    religiao TEXT,
    status_social TEXT,
    contratos_ativos TEXT[] DEFAULT '{}',
    informacoes_pessoais TEXT,
    dinheiro TEXT,
    historico TEXT,
    
    -- Skill training
    treino_acrobacia INTEGER NOT NULL DEFAULT 0,
    treino_adestramento INTEGER NOT NULL DEFAULT 0,
    treino_artes INTEGER NOT NULL DEFAULT 0,
    treino_atletismo INTEGER NOT NULL DEFAULT 0,
    treino_atualidades INTEGER NOT NULL DEFAULT 0,
    treino_ciencias INTEGER NOT NULL DEFAULT 0,
    treino_crime INTEGER NOT NULL DEFAULT 0,
    treino_diplomacia INTEGER NOT NULL DEFAULT 0,
    treino_enganacao INTEGER NOT NULL DEFAULT 0,
    treino_fortitude INTEGER NOT NULL DEFAULT 0,
    treino_furtividade INTEGER NOT NULL DEFAULT 0,
    treino_iniciativa INTEGER NOT NULL DEFAULT 0,
    treino_intimidacao INTEGER NOT NULL DEFAULT 0,
    treino_intuicao INTEGER NOT NULL DEFAULT 0,
    treino_investigacao INTEGER NOT NULL DEFAULT 0,
    treino_luta INTEGER NOT NULL DEFAULT 0,
    treino_medicina INTEGER NOT NULL DEFAULT 0,
    treino_ocultismo INTEGER NOT NULL DEFAULT 0,
    treino_percepcao INTEGER NOT NULL DEFAULT 0,
    treino_pilotagem INTEGER NOT NULL DEFAULT 0,
    treino_pontaria INTEGER NOT NULL DEFAULT 0,
    treino_profissao INTEGER NOT NULL DEFAULT 0,
    treino_reflexos INTEGER NOT NULL DEFAULT 0,
    treino_religiao INTEGER NOT NULL DEFAULT 0,
    treino_sobrevivencia INTEGER NOT NULL DEFAULT 0,
    treino_tatica INTEGER NOT NULL DEFAULT 0,
    treino_tecnologia INTEGER NOT NULL DEFAULT 0,
    treino_vontade INTEGER NOT NULL DEFAULT 0,
    
    -- Bonus manual
    bonus_acrobacia INTEGER NOT NULL DEFAULT 0,
    bonus_adestramento INTEGER NOT NULL DEFAULT 0,
    bonus_artes INTEGER NOT NULL DEFAULT 0,
    bonus_atletismo INTEGER NOT NULL DEFAULT 0,
    bonus_atualidades INTEGER NOT NULL DEFAULT 0,
    bonus_ciencias INTEGER NOT NULL DEFAULT 0,
    bonus_crime INTEGER NOT NULL DEFAULT 0,
    bonus_diplomacia INTEGER NOT NULL DEFAULT 0,
    bonus_enganacao INTEGER NOT NULL DEFAULT 0,
    bonus_fortitude INTEGER NOT NULL DEFAULT 0,
    bonus_furtividade INTEGER NOT NULL DEFAULT 0,
    bonus_iniciativa INTEGER NOT NULL DEFAULT 0,
    bonus_intimidacao INTEGER NOT NULL DEFAULT 0,
    bonus_intuicao INTEGER NOT NULL DEFAULT 0,
    bonus_investigacao INTEGER NOT NULL DEFAULT 0,
    bonus_luta INTEGER NOT NULL DEFAULT 0,
    bonus_medicina INTEGER NOT NULL DEFAULT 0,
    bonus_ocultismo INTEGER NOT NULL DEFAULT 0,
    bonus_percepcao INTEGER NOT NULL DEFAULT 0,
    bonus_pilotagem INTEGER NOT NULL DEFAULT 0,
    bonus_pontaria INTEGER NOT NULL DEFAULT 0,
    bonus_profissao INTEGER NOT NULL DEFAULT 0,
    bonus_reflexos INTEGER NOT NULL DEFAULT 0,
    bonus_religiao INTEGER NOT NULL DEFAULT 0,
    bonus_sobrevivencia INTEGER NOT NULL DEFAULT 0,
    bonus_tatica INTEGER NOT NULL DEFAULT 0,
    bonus_tecnologia INTEGER NOT NULL DEFAULT 0,
    bonus_vontade INTEGER NOT NULL DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create character talents table
CREATE TABLE public.character_talents (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    character_id UUID NOT NULL REFERENCES public.characters(id) ON DELETE CASCADE,
    talent_name TEXT NOT NULL,
    talent_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create character inventory table
CREATE TABLE public.character_inventory (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    character_id UUID NOT NULL REFERENCES public.characters(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    category item_category NOT NULL DEFAULT 'outros',
    rarity item_rarity NOT NULL DEFAULT 'comum',
    peso TEXT,
    damage_dice TEXT,
    damage_type damage_type,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.character_talents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.character_inventory ENABLE ROW LEVEL SECURITY;

-- RLS Policies for characters
CREATE POLICY "Users can view their own characters" 
ON public.characters FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own characters" 
ON public.characters FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own characters" 
ON public.characters FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own characters" 
ON public.characters FOR DELETE 
USING (auth.uid() = user_id);

-- RLS Policies for character_talents
CREATE POLICY "Users can view their character talents" 
ON public.character_talents FOR SELECT 
USING (EXISTS (
    SELECT 1 FROM public.characters 
    WHERE characters.id = character_talents.character_id 
    AND characters.user_id = auth.uid()
));

CREATE POLICY "Users can create talents for their characters" 
ON public.character_talents FOR INSERT 
WITH CHECK (EXISTS (
    SELECT 1 FROM public.characters 
    WHERE characters.id = character_talents.character_id 
    AND characters.user_id = auth.uid()
));

CREATE POLICY "Users can delete their character talents" 
ON public.character_talents FOR DELETE 
USING (EXISTS (
    SELECT 1 FROM public.characters 
    WHERE characters.id = character_talents.character_id 
    AND characters.user_id = auth.uid()
));

-- RLS Policies for character_inventory
CREATE POLICY "Users can view their character inventory" 
ON public.character_inventory FOR SELECT 
USING (EXISTS (
    SELECT 1 FROM public.characters 
    WHERE characters.id = character_inventory.character_id 
    AND characters.user_id = auth.uid()
));

CREATE POLICY "Users can create items for their characters" 
ON public.character_inventory FOR INSERT 
WITH CHECK (EXISTS (
    SELECT 1 FROM public.characters 
    WHERE characters.id = character_inventory.character_id 
    AND characters.user_id = auth.uid()
));

CREATE POLICY "Users can update their character inventory" 
ON public.character_inventory FOR UPDATE 
USING (EXISTS (
    SELECT 1 FROM public.characters 
    WHERE characters.id = character_inventory.character_id 
    AND characters.user_id = auth.uid()
));

CREATE POLICY "Users can delete their character inventory items" 
ON public.character_inventory FOR DELETE 
USING (EXISTS (
    SELECT 1 FROM public.characters 
    WHERE characters.id = character_inventory.character_id 
    AND characters.user_id = auth.uid()
));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_characters_updated_at
BEFORE UPDATE ON public.characters
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();