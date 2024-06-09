export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	graphql_public: {
		Tables: {
			[_ in never]: never;
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			graphql: {
				Args: {
					operationName?: string;
					query?: string;
					variables?: Json;
					extensions?: Json;
				};
				Returns: Json;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
	public: {
		Tables: {
			attendees: {
				Row: {
					event_id: string | null;
					id: string;
					user_id: string | null;
				};
				Insert: {
					event_id?: string | null;
					id?: string;
					user_id?: string | null;
				};
				Update: {
					event_id?: string | null;
					id?: string;
					user_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'attendees_event_id_fkey';
						columns: ['event_id'];
						isOneToOne: false;
						referencedRelation: 'events';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'attendees_user_id_fkey';
						columns: ['user_id'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			categories: {
				Row: {
					background_colour: string | null;
					foreground_colour: string | null;
					id: string;
					name: string | null;
				};
				Insert: {
					background_colour?: string | null;
					foreground_colour?: string | null;
					id?: string;
					name?: string | null;
				};
				Update: {
					background_colour?: string | null;
					foreground_colour?: string | null;
					id?: string;
					name?: string | null;
				};
				Relationships: [];
			};
			comments: {
				Row: {
					attendee_id: string | null;
					content: string;
					event_id: string | null;
					id: string;
					is_removed: boolean | null;
				};
				Insert: {
					attendee_id?: string | null;
					content: string;
					event_id?: string | null;
					id?: string;
					is_removed?: boolean | null;
				};
				Update: {
					attendee_id?: string | null;
					content?: string;
					event_id?: string | null;
					id?: string;
					is_removed?: boolean | null;
				};
				Relationships: [
					{
						foreignKeyName: 'comments_attendee_id_fkey';
						columns: ['attendee_id'];
						isOneToOne: false;
						referencedRelation: 'attendees';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'comments_event_id_fkey';
						columns: ['event_id'];
						isOneToOne: false;
						referencedRelation: 'events';
						referencedColumns: ['id'];
					}
				];
			};
			customers: {
				Row: {
					id: string;
					stripe_customer_id: string | null;
				};
				Insert: {
					id: string;
					stripe_customer_id?: string | null;
				};
				Update: {
					id?: string;
					stripe_customer_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'customers_id_fkey';
						columns: ['id'];
						isOneToOne: true;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			event_categories: {
				Row: {
					category_id: string | null;
					event_id: string | null;
					id: string;
				};
				Insert: {
					category_id?: string | null;
					event_id?: string | null;
					id?: string;
				};
				Update: {
					category_id?: string | null;
					event_id?: string | null;
					id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'event_categories_category_id_fkey';
						columns: ['category_id'];
						isOneToOne: false;
						referencedRelation: 'categories';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'event_categories_event_id_fkey';
						columns: ['event_id'];
						isOneToOne: false;
						referencedRelation: 'events';
						referencedColumns: ['id'];
					}
				];
			};
			events: {
				Row: {
					date_end: string;
					date_start: string;
					description: string | null;
					group_id: string | null;
					id: string;
					image: string | null;
					image_alt: string | null;
					title: string | null;
					venue_id: string | null;
				};
				Insert: {
					date_end: string;
					date_start?: string;
					description?: string | null;
					group_id?: string | null;
					id?: string;
					image?: string | null;
					image_alt?: string | null;
					title?: string | null;
					venue_id?: string | null;
				};
				Update: {
					date_end?: string;
					date_start?: string;
					description?: string | null;
					group_id?: string | null;
					id?: string;
					image?: string | null;
					image_alt?: string | null;
					title?: string | null;
					venue_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'events_group_id_fkey';
						columns: ['group_id'];
						isOneToOne: false;
						referencedRelation: 'groups';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'events_venue_id_fkey';
						columns: ['venue_id'];
						isOneToOne: false;
						referencedRelation: 'venues';
						referencedColumns: ['id'];
					}
				];
			};
			group_members: {
				Row: {
					active: boolean;
					group_id: string | null;
					id: string;
					join_date: string | null;
					role: Database['public']['Enums']['group_role'] | null;
					user_id: string | null;
				};
				Insert: {
					active?: boolean;
					group_id?: string | null;
					id?: string;
					join_date?: string | null;
					role?: Database['public']['Enums']['group_role'] | null;
					user_id?: string | null;
				};
				Update: {
					active?: boolean;
					group_id?: string | null;
					id?: string;
					join_date?: string | null;
					role?: Database['public']['Enums']['group_role'] | null;
					user_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'group_members_group_id_fkey';
						columns: ['group_id'];
						isOneToOne: false;
						referencedRelation: 'groups';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'group_members_user_id_fkey';
						columns: ['user_id'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			group_socials: {
				Row: {
					group_id: string | null;
					id: string;
					social_links_id: string | null;
					sort_order: number | null;
					url: string | null;
				};
				Insert: {
					group_id?: string | null;
					id?: string;
					social_links_id?: string | null;
					sort_order?: number | null;
					url?: string | null;
				};
				Update: {
					group_id?: string | null;
					id?: string;
					social_links_id?: string | null;
					sort_order?: number | null;
					url?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'group_socials_group_id_fkey';
						columns: ['group_id'];
						isOneToOne: false;
						referencedRelation: 'groups';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'group_socials_social_links_id_fkey';
						columns: ['social_links_id'];
						isOneToOne: false;
						referencedRelation: 'social_links';
						referencedColumns: ['id'];
					}
				];
			};
			groups: {
				Row: {
					created: string | null;
					description: string | null;
					id: string;
					image: string | null;
					name: string | null;
					slug: string;
				};
				Insert: {
					created?: string | null;
					description?: string | null;
					id?: string;
					image?: string | null;
					name?: string | null;
					slug: string;
				};
				Update: {
					created?: string | null;
					description?: string | null;
					id?: string;
					image?: string | null;
					name?: string | null;
					slug?: string;
				};
				Relationships: [];
			};
			prices: {
				Row: {
					active: boolean | null;
					currency: string | null;
					description: string | null;
					id: string;
					interval: Database['public']['Enums']['pricing_plan_interval'] | null;
					interval_count: number | null;
					metadata: Json | null;
					product_id: string | null;
					trial_period_days: number | null;
					type: Database['public']['Enums']['pricing_type'] | null;
					unit_amount: number | null;
				};
				Insert: {
					active?: boolean | null;
					currency?: string | null;
					description?: string | null;
					id: string;
					interval?: Database['public']['Enums']['pricing_plan_interval'] | null;
					interval_count?: number | null;
					metadata?: Json | null;
					product_id?: string | null;
					trial_period_days?: number | null;
					type?: Database['public']['Enums']['pricing_type'] | null;
					unit_amount?: number | null;
				};
				Update: {
					active?: boolean | null;
					currency?: string | null;
					description?: string | null;
					id?: string;
					interval?: Database['public']['Enums']['pricing_plan_interval'] | null;
					interval_count?: number | null;
					metadata?: Json | null;
					product_id?: string | null;
					trial_period_days?: number | null;
					type?: Database['public']['Enums']['pricing_type'] | null;
					unit_amount?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: 'prices_product_id_fkey';
						columns: ['product_id'];
						isOneToOne: false;
						referencedRelation: 'products';
						referencedColumns: ['id'];
					}
				];
			};
			products: {
				Row: {
					active: boolean | null;
					description: string | null;
					id: string;
					image: string | null;
					metadata: Json | null;
					name: string | null;
				};
				Insert: {
					active?: boolean | null;
					description?: string | null;
					id: string;
					image?: string | null;
					metadata?: Json | null;
					name?: string | null;
				};
				Update: {
					active?: boolean | null;
					description?: string | null;
					id?: string;
					image?: string | null;
					metadata?: Json | null;
					name?: string | null;
				};
				Relationships: [];
			};
			reactions: {
				Row: {
					attendee_id: string | null;
					comment_id: string | null;
					id: string;
				};
				Insert: {
					attendee_id?: string | null;
					comment_id?: string | null;
					id?: string;
				};
				Update: {
					attendee_id?: string | null;
					comment_id?: string | null;
					id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'reactions_attendee_id_fkey';
						columns: ['attendee_id'];
						isOneToOne: false;
						referencedRelation: 'attendees';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'reactions_comment_id_fkey';
						columns: ['comment_id'];
						isOneToOne: false;
						referencedRelation: 'comments';
						referencedColumns: ['id'];
					}
				];
			};
			social_links: {
				Row: {
					id: string;
					logo: string | null;
					name: string | null;
				};
				Insert: {
					id?: string;
					logo?: string | null;
					name?: string | null;
				};
				Update: {
					id?: string;
					logo?: string | null;
					name?: string | null;
				};
				Relationships: [];
			};
			subscriptions: {
				Row: {
					cancel_at: string | null;
					cancel_at_period_end: boolean | null;
					canceled_at: string | null;
					created: string;
					current_period_end: string;
					current_period_start: string;
					ended_at: string | null;
					id: string;
					metadata: Json | null;
					price_id: string | null;
					quantity: number | null;
					status: Database['public']['Enums']['subscription_status'] | null;
					trial_end: string | null;
					trial_start: string | null;
					user_id: string;
				};
				Insert: {
					cancel_at?: string | null;
					cancel_at_period_end?: boolean | null;
					canceled_at?: string | null;
					created?: string;
					current_period_end?: string;
					current_period_start?: string;
					ended_at?: string | null;
					id: string;
					metadata?: Json | null;
					price_id?: string | null;
					quantity?: number | null;
					status?: Database['public']['Enums']['subscription_status'] | null;
					trial_end?: string | null;
					trial_start?: string | null;
					user_id: string;
				};
				Update: {
					cancel_at?: string | null;
					cancel_at_period_end?: boolean | null;
					canceled_at?: string | null;
					created?: string;
					current_period_end?: string;
					current_period_start?: string;
					ended_at?: string | null;
					id?: string;
					metadata?: Json | null;
					price_id?: string | null;
					quantity?: number | null;
					status?: Database['public']['Enums']['subscription_status'] | null;
					trial_end?: string | null;
					trial_start?: string | null;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'subscriptions_price_id_fkey';
						columns: ['price_id'];
						isOneToOne: false;
						referencedRelation: 'prices';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'subscriptions_user_id_fkey';
						columns: ['user_id'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			users: {
				Row: {
					avatar_url: string | null;
					billing_address: Json | null;
					full_name: string | null;
					id: string;
					payment_method: Json | null;
				};
				Insert: {
					avatar_url?: string | null;
					billing_address?: Json | null;
					full_name?: string | null;
					id: string;
					payment_method?: Json | null;
				};
				Update: {
					avatar_url?: string | null;
					billing_address?: Json | null;
					full_name?: string | null;
					id?: string;
					payment_method?: Json | null;
				};
				Relationships: [
					{
						foreignKeyName: 'users_id_fkey';
						columns: ['id'];
						isOneToOne: true;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			venues: {
				Row: {
					address: Json | null;
					created: string | null;
					description: string | null;
					id: string;
					image: string | null;
					image_alt: string | null;
					name: string | null;
				};
				Insert: {
					address?: Json | null;
					created?: string | null;
					description?: string | null;
					id?: string;
					image?: string | null;
					image_alt?: string | null;
					name?: string | null;
				};
				Update: {
					address?: Json | null;
					created?: string | null;
					description?: string | null;
					id?: string;
					image?: string | null;
					image_alt?: string | null;
					name?: string | null;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			group_role: 'member' | 'admin';
			pricing_plan_interval: 'day' | 'week' | 'month' | 'year';
			pricing_type: 'one_time' | 'recurring';
			subscription_status:
				| 'trialing'
				| 'active'
				| 'canceled'
				| 'incomplete'
				| 'incomplete_expired'
				| 'past_due'
				| 'unpaid'
				| 'paused';
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
	storage: {
		Tables: {
			buckets: {
				Row: {
					allowed_mime_types: string[] | null;
					avif_autodetection: boolean | null;
					created_at: string | null;
					file_size_limit: number | null;
					id: string;
					name: string;
					owner: string | null;
					owner_id: string | null;
					public: boolean | null;
					updated_at: string | null;
				};
				Insert: {
					allowed_mime_types?: string[] | null;
					avif_autodetection?: boolean | null;
					created_at?: string | null;
					file_size_limit?: number | null;
					id: string;
					name: string;
					owner?: string | null;
					owner_id?: string | null;
					public?: boolean | null;
					updated_at?: string | null;
				};
				Update: {
					allowed_mime_types?: string[] | null;
					avif_autodetection?: boolean | null;
					created_at?: string | null;
					file_size_limit?: number | null;
					id?: string;
					name?: string;
					owner?: string | null;
					owner_id?: string | null;
					public?: boolean | null;
					updated_at?: string | null;
				};
				Relationships: [];
			};
			migrations: {
				Row: {
					executed_at: string | null;
					hash: string;
					id: number;
					name: string;
				};
				Insert: {
					executed_at?: string | null;
					hash: string;
					id: number;
					name: string;
				};
				Update: {
					executed_at?: string | null;
					hash?: string;
					id?: number;
					name?: string;
				};
				Relationships: [];
			};
			objects: {
				Row: {
					bucket_id: string | null;
					created_at: string | null;
					id: string;
					last_accessed_at: string | null;
					metadata: Json | null;
					name: string | null;
					owner: string | null;
					owner_id: string | null;
					path_tokens: string[] | null;
					updated_at: string | null;
					version: string | null;
				};
				Insert: {
					bucket_id?: string | null;
					created_at?: string | null;
					id?: string;
					last_accessed_at?: string | null;
					metadata?: Json | null;
					name?: string | null;
					owner?: string | null;
					owner_id?: string | null;
					path_tokens?: string[] | null;
					updated_at?: string | null;
					version?: string | null;
				};
				Update: {
					bucket_id?: string | null;
					created_at?: string | null;
					id?: string;
					last_accessed_at?: string | null;
					metadata?: Json | null;
					name?: string | null;
					owner?: string | null;
					owner_id?: string | null;
					path_tokens?: string[] | null;
					updated_at?: string | null;
					version?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'objects_bucketId_fkey';
						columns: ['bucket_id'];
						isOneToOne: false;
						referencedRelation: 'buckets';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			can_insert_object: {
				Args: {
					bucketid: string;
					name: string;
					owner: string;
					metadata: Json;
				};
				Returns: undefined;
			};
			extension: {
				Args: {
					name: string;
				};
				Returns: string;
			};
			filename: {
				Args: {
					name: string;
				};
				Returns: string;
			};
			foldername: {
				Args: {
					name: string;
				};
				Returns: unknown;
			};
			get_size_by_bucket: {
				Args: Record<PropertyKey, never>;
				Returns: {
					size: number;
					bucket_id: string;
				}[];
			};
			search: {
				Args: {
					prefix: string;
					bucketname: string;
					limits?: number;
					levels?: number;
					offsets?: number;
					search?: string;
					sortcolumn?: string;
					sortorder?: string;
				};
				Returns: {
					name: string;
					id: string;
					updated_at: string;
					created_at: string;
					last_accessed_at: string;
					metadata: Json;
				}[];
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (Database['public']['Tables'] & Database['public']['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
				Database['public']['Views'])
		? (Database['public']['Tables'] &
				Database['public']['Views'])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof Database['public']['Tables']
		? Database['public']['Tables'][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof Database['public']['Tables']
		? Database['public']['Tables'][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof Database['public']['Enums']
		? Database['public']['Enums'][PublicEnumNameOrOptions]
		: never;
