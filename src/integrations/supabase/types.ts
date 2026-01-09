export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      character_inventory: {
        Row: {
          category: Database["public"]["Enums"]["item_category"]
          character_id: string
          created_at: string
          damage_dice: string | null
          damage_type: Database["public"]["Enums"]["damage_type"] | null
          description: string | null
          id: string
          name: string
          peso: string | null
          rarity: Database["public"]["Enums"]["item_rarity"]
        }
        Insert: {
          category?: Database["public"]["Enums"]["item_category"]
          character_id: string
          created_at?: string
          damage_dice?: string | null
          damage_type?: Database["public"]["Enums"]["damage_type"] | null
          description?: string | null
          id?: string
          name: string
          peso?: string | null
          rarity?: Database["public"]["Enums"]["item_rarity"]
        }
        Update: {
          category?: Database["public"]["Enums"]["item_category"]
          character_id?: string
          created_at?: string
          damage_dice?: string | null
          damage_type?: Database["public"]["Enums"]["damage_type"] | null
          description?: string | null
          id?: string
          name?: string
          peso?: string | null
          rarity?: Database["public"]["Enums"]["item_rarity"]
        }
        Relationships: [
          {
            foreignKeyName: "character_inventory_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
        ]
      }
      character_talents: {
        Row: {
          character_id: string
          created_at: string
          id: string
          talent_description: string | null
          talent_name: string
        }
        Insert: {
          character_id: string
          created_at?: string
          id?: string
          talent_description?: string | null
          talent_name: string
        }
        Update: {
          character_id?: string
          created_at?: string
          id?: string
          talent_description?: string | null
          talent_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "character_talents_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
        ]
      }
      characters: {
        Row: {
          altura: string | null
          bonus_acrobacia: number
          bonus_adestramento: number
          bonus_artes: number
          bonus_atletismo: number
          bonus_atualidades: number
          bonus_ciencias: number
          bonus_crime: number
          bonus_diplomacia: number
          bonus_enganacao: number
          bonus_fortitude: number
          bonus_furtividade: number
          bonus_iniciativa: number
          bonus_intimidacao: number
          bonus_intuicao: number
          bonus_investigacao: number
          bonus_luta: number
          bonus_medicina: number
          bonus_ocultismo: number
          bonus_percepcao: number
          bonus_pilotagem: number
          bonus_pontaria: number
          bonus_profissao: number
          bonus_reflexos: number
          bonus_religiao: number
          bonus_sobrevivencia: number
          bonus_tatica: number
          bonus_tecnologia: number
          bonus_vontade: number
          class: Database["public"]["Enums"]["character_class"]
          contratos_ativos: string[] | null
          created_at: string
          defesa: number
          dialogo: number
          dinheiro: string | null
          ferimento_braco_direito: Database["public"]["Enums"]["injury_level"]
          ferimento_braco_esquerdo: Database["public"]["Enums"]["injury_level"]
          ferimento_cabeca: Database["public"]["Enums"]["injury_level"]
          ferimento_perna_direita: Database["public"]["Enums"]["injury_level"]
          ferimento_perna_esquerda: Database["public"]["Enums"]["injury_level"]
          ferimento_torso: Database["public"]["Enums"]["injury_level"]
          historico: string | null
          id: string
          idade: string | null
          impulso: number
          informacoes_pessoais: string | null
          name: string
          origin: string | null
          perseveranca: number
          perspicaz: number
          peso: string | null
          player_name: string | null
          ponto_dificuldade_confronto: string | null
          ponto_realidade_atual: number
          ponto_realidade_max: number
          reacao: number
          religiao: string | null
          resistencia: number
          resistencias: string | null
          sanidade_atual: number
          sanidade_max: number
          status_social: string | null
          treino_acrobacia: number
          treino_adestramento: number
          treino_artes: number
          treino_atletismo: number
          treino_atualidades: number
          treino_ciencias: number
          treino_crime: number
          treino_diplomacia: number
          treino_enganacao: number
          treino_fortitude: number
          treino_furtividade: number
          treino_iniciativa: number
          treino_intimidacao: number
          treino_intuicao: number
          treino_investigacao: number
          treino_luta: number
          treino_medicina: number
          treino_ocultismo: number
          treino_percepcao: number
          treino_pilotagem: number
          treino_pontaria: number
          treino_profissao: number
          treino_reflexos: number
          treino_religiao: number
          treino_sobrevivencia: number
          treino_tatica: number
          treino_tecnologia: number
          treino_vontade: number
          updated_at: string
          user_id: string
          vida_atual: number
          vida_max: number
        }
        Insert: {
          altura?: string | null
          bonus_acrobacia?: number
          bonus_adestramento?: number
          bonus_artes?: number
          bonus_atletismo?: number
          bonus_atualidades?: number
          bonus_ciencias?: number
          bonus_crime?: number
          bonus_diplomacia?: number
          bonus_enganacao?: number
          bonus_fortitude?: number
          bonus_furtividade?: number
          bonus_iniciativa?: number
          bonus_intimidacao?: number
          bonus_intuicao?: number
          bonus_investigacao?: number
          bonus_luta?: number
          bonus_medicina?: number
          bonus_ocultismo?: number
          bonus_percepcao?: number
          bonus_pilotagem?: number
          bonus_pontaria?: number
          bonus_profissao?: number
          bonus_reflexos?: number
          bonus_religiao?: number
          bonus_sobrevivencia?: number
          bonus_tatica?: number
          bonus_tecnologia?: number
          bonus_vontade?: number
          class?: Database["public"]["Enums"]["character_class"]
          contratos_ativos?: string[] | null
          created_at?: string
          defesa?: number
          dialogo?: number
          dinheiro?: string | null
          ferimento_braco_direito?: Database["public"]["Enums"]["injury_level"]
          ferimento_braco_esquerdo?: Database["public"]["Enums"]["injury_level"]
          ferimento_cabeca?: Database["public"]["Enums"]["injury_level"]
          ferimento_perna_direita?: Database["public"]["Enums"]["injury_level"]
          ferimento_perna_esquerda?: Database["public"]["Enums"]["injury_level"]
          ferimento_torso?: Database["public"]["Enums"]["injury_level"]
          historico?: string | null
          id?: string
          idade?: string | null
          impulso?: number
          informacoes_pessoais?: string | null
          name?: string
          origin?: string | null
          perseveranca?: number
          perspicaz?: number
          peso?: string | null
          player_name?: string | null
          ponto_dificuldade_confronto?: string | null
          ponto_realidade_atual?: number
          ponto_realidade_max?: number
          reacao?: number
          religiao?: string | null
          resistencia?: number
          resistencias?: string | null
          sanidade_atual?: number
          sanidade_max?: number
          status_social?: string | null
          treino_acrobacia?: number
          treino_adestramento?: number
          treino_artes?: number
          treino_atletismo?: number
          treino_atualidades?: number
          treino_ciencias?: number
          treino_crime?: number
          treino_diplomacia?: number
          treino_enganacao?: number
          treino_fortitude?: number
          treino_furtividade?: number
          treino_iniciativa?: number
          treino_intimidacao?: number
          treino_intuicao?: number
          treino_investigacao?: number
          treino_luta?: number
          treino_medicina?: number
          treino_ocultismo?: number
          treino_percepcao?: number
          treino_pilotagem?: number
          treino_pontaria?: number
          treino_profissao?: number
          treino_reflexos?: number
          treino_religiao?: number
          treino_sobrevivencia?: number
          treino_tatica?: number
          treino_tecnologia?: number
          treino_vontade?: number
          updated_at?: string
          user_id: string
          vida_atual?: number
          vida_max?: number
        }
        Update: {
          altura?: string | null
          bonus_acrobacia?: number
          bonus_adestramento?: number
          bonus_artes?: number
          bonus_atletismo?: number
          bonus_atualidades?: number
          bonus_ciencias?: number
          bonus_crime?: number
          bonus_diplomacia?: number
          bonus_enganacao?: number
          bonus_fortitude?: number
          bonus_furtividade?: number
          bonus_iniciativa?: number
          bonus_intimidacao?: number
          bonus_intuicao?: number
          bonus_investigacao?: number
          bonus_luta?: number
          bonus_medicina?: number
          bonus_ocultismo?: number
          bonus_percepcao?: number
          bonus_pilotagem?: number
          bonus_pontaria?: number
          bonus_profissao?: number
          bonus_reflexos?: number
          bonus_religiao?: number
          bonus_sobrevivencia?: number
          bonus_tatica?: number
          bonus_tecnologia?: number
          bonus_vontade?: number
          class?: Database["public"]["Enums"]["character_class"]
          contratos_ativos?: string[] | null
          created_at?: string
          defesa?: number
          dialogo?: number
          dinheiro?: string | null
          ferimento_braco_direito?: Database["public"]["Enums"]["injury_level"]
          ferimento_braco_esquerdo?: Database["public"]["Enums"]["injury_level"]
          ferimento_cabeca?: Database["public"]["Enums"]["injury_level"]
          ferimento_perna_direita?: Database["public"]["Enums"]["injury_level"]
          ferimento_perna_esquerda?: Database["public"]["Enums"]["injury_level"]
          ferimento_torso?: Database["public"]["Enums"]["injury_level"]
          historico?: string | null
          id?: string
          idade?: string | null
          impulso?: number
          informacoes_pessoais?: string | null
          name?: string
          origin?: string | null
          perseveranca?: number
          perspicaz?: number
          peso?: string | null
          player_name?: string | null
          ponto_dificuldade_confronto?: string | null
          ponto_realidade_atual?: number
          ponto_realidade_max?: number
          reacao?: number
          religiao?: string | null
          resistencia?: number
          resistencias?: string | null
          sanidade_atual?: number
          sanidade_max?: number
          status_social?: string | null
          treino_acrobacia?: number
          treino_adestramento?: number
          treino_artes?: number
          treino_atletismo?: number
          treino_atualidades?: number
          treino_ciencias?: number
          treino_crime?: number
          treino_diplomacia?: number
          treino_enganacao?: number
          treino_fortitude?: number
          treino_furtividade?: number
          treino_iniciativa?: number
          treino_intimidacao?: number
          treino_intuicao?: number
          treino_investigacao?: number
          treino_luta?: number
          treino_medicina?: number
          treino_ocultismo?: number
          treino_percepcao?: number
          treino_pilotagem?: number
          treino_pontaria?: number
          treino_profissao?: number
          treino_reflexos?: number
          treino_religiao?: number
          treino_sobrevivencia?: number
          treino_tatica?: number
          treino_tecnologia?: number
          treino_vontade?: number
          updated_at?: string
          user_id?: string
          vida_atual?: number
          vida_max?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      character_class:
        | "Guerreiro"
        | "Mago"
        | "Ladino"
        | "Clerigo"
        | "Bardo"
        | "Ranger"
        | "Paladino"
        | "Monge"
      damage_type: "Balistico" | "Corte" | "Impacto" | "Perfuracao"
      injury_level: "nenhum" | "leve" | "moderado" | "critico" | "inutilizavel"
      item_category:
        | "arma"
        | "armadura"
        | "consumivel"
        | "ferramenta"
        | "outros"
      item_rarity: "comum" | "incomum" | "raro" | "epico" | "lendario"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      character_class: [
        "Guerreiro",
        "Mago",
        "Ladino",
        "Clerigo",
        "Bardo",
        "Ranger",
        "Paladino",
        "Monge",
      ],
      damage_type: ["Balistico", "Corte", "Impacto", "Perfuracao"],
      injury_level: ["nenhum", "leve", "moderado", "critico", "inutilizavel"],
      item_category: ["arma", "armadura", "consumivel", "ferramenta", "outros"],
      item_rarity: ["comum", "incomum", "raro", "epico", "lendario"],
    },
  },
} as const
