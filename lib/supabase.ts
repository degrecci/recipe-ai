export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      recipes: {
        Row: {
          cook_time: string | null
          created_at: string | null
          description: string | null
          difficulty_level: string | null
          id: number
          ingredients: Json | null
          instructions: Json | null
          prep_time: string | null
          serves: number | null
          tips_and_variations: string | null
          title: string
          total_time: string | null
        }
        Insert: {
          cook_time?: string | null
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          id?: number
          ingredients?: Json | null
          instructions?: Json | null
          prep_time?: string | null
          serves?: number | null
          tips_and_variations?: string | null
          title: string
          total_time?: string | null
        }
        Update: {
          cook_time?: string | null
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          id?: number
          ingredients?: Json | null
          instructions?: Json | null
          prep_time?: string | null
          serves?: number | null
          tips_and_variations?: string | null
          title?: string
          total_time?: string | null
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
