export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      books: {
        Row: {
          author: string
          condition: string | null
          created_at: string | null
          description: string | null
          edition: string | null
          genre: string[] | null
          id: string
          image_directory: string | null
          is_featured: boolean | null
          isbn: string | null
          language: string | null
          num_images: number | null
          original_release_date: string | null
          price: number
          product_id: string | null
          publication_date: string | null
          publisher: string | null
          stock: number
          title: string
        }
        Insert: {
          author: string
          condition?: string | null
          created_at?: string | null
          description?: string | null
          edition?: string | null
          genre?: string[] | null
          id?: string
          image_directory?: string | null
          is_featured?: boolean | null
          isbn?: string | null
          language?: string | null
          num_images?: number | null
          original_release_date?: string | null
          price: number
          product_id?: string | null
          publication_date?: string | null
          publisher?: string | null
          stock?: number
          title: string
        }
        Update: {
          author?: string
          condition?: string | null
          created_at?: string | null
          description?: string | null
          edition?: string | null
          genre?: string[] | null
          id?: string
          image_directory?: string | null
          is_featured?: boolean | null
          isbn?: string | null
          language?: string | null
          num_images?: number | null
          original_release_date?: string | null
          price?: number
          product_id?: string | null
          publication_date?: string | null
          publisher?: string | null
          stock?: number
          title?: string
        }
        Relationships: []
      }
      cart: {
        Row: {
          id: string
          user_id: string
        }
        Insert: {
          id?: string
          user_id: string
        }
        Update: {
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      cart_items: {
        Row: {
          book_id: string
          cart_id: string
          id: string
          product_id: string | null
          quantity: number
        }
        Insert: {
          book_id: string
          cart_id: string
          id?: string
          product_id?: string | null
          quantity: number
        }
        Update: {
          book_id?: string
          cart_id?: string
          id?: string
          product_id?: string | null
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "cart"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          billing_address: Json | null
          id: string
          shipping_address: Json | null
          stripe_customer_id: string | null
        }
        Insert: {
          billing_address?: Json | null
          id: string
          shipping_address?: Json | null
          stripe_customer_id?: string | null
        }
        Update: {
          billing_address?: Json | null
          id?: string
          shipping_address?: Json | null
          stripe_customer_id?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          book_author: string | null
          book_id: string
          book_title: string | null
          id: string
          image_directory: string | null
          order_id: string
          price: number
          product_id: string | null
          quantity: number
        }
        Insert: {
          book_author?: string | null
          book_id: string
          book_title?: string | null
          id?: string
          image_directory?: string | null
          order_id: string
          price: number
          product_id?: string | null
          quantity: number
        }
        Update: {
          book_author?: string | null
          book_id?: string
          book_title?: string | null
          id?: string
          image_directory?: string | null
          order_id?: string
          price?: number
          product_id?: string | null
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          address: Json | null
          id: string
          items_total: number | null
          ordered_at: string
          session_id: string | null
          shipping_cost: number | null
          status: Database["public"]["Enums"]["order_status"] | null
          tracking_number: string | null
          user_id: string
        }
        Insert: {
          address?: Json | null
          id?: string
          items_total?: number | null
          ordered_at?: string
          session_id?: string | null
          shipping_cost?: number | null
          status?: Database["public"]["Enums"]["order_status"] | null
          tracking_number?: string | null
          user_id: string
        }
        Update: {
          address?: Json | null
          id?: string
          items_total?: number | null
          ordered_at?: string
          session_id?: string | null
          shipping_cost?: number | null
          status?: Database["public"]["Enums"]["order_status"] | null
          tracking_number?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      prices: {
        Row: {
          active: boolean | null
          currency: string | null
          description: string | null
          id: string
          metadata: Json | null
          product_id: string | null
          type: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount: number | null
        }
        Insert: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id: string
          metadata?: Json | null
          product_id?: string | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Update: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          product_id?: string | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean | null
          book_id: string | null
          description: string | null
          id: string
          image: string | null
          metadata: Json | null
          name: string | null
        }
        Insert: {
          active?: boolean | null
          book_id?: string | null
          description?: string | null
          id: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Update: {
          active?: boolean | null
          book_id?: string | null
          description?: string | null
          id?: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          billing_address: Json | null
          created_at: string | null
          customer_id: string | null
          email: string
          full_name: string | null
          id: string
          is_admin: boolean | null
          payment_method: Json | null
          shipping_address: Json | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          billing_address?: Json | null
          created_at?: string | null
          customer_id?: string | null
          email: string
          full_name?: string | null
          id: string
          is_admin?: boolean | null
          payment_method?: Json | null
          shipping_address?: Json | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          billing_address?: Json | null
          created_at?: string | null
          customer_id?: string | null
          email?: string
          full_name?: string | null
          id?: string
          is_admin?: boolean | null
          payment_method?: Json | null
          shipping_address?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      order_status: "Delivered" | "Shipped" | "Ordered" | "Failed" | "pending"
      payment_status:
        | "initiated"
        | "succeeded"
        | "failed"
        | "pending"
        | "canceled"
        | "requires_action"
        | "requires_payment_method"
        | "processing"
        | "requires_capture"
        | "requires_confirmation"
      pricing_type: "one_time"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
