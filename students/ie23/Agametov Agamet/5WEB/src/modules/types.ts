export interface VKUser {
  id: number;
  first_name: string;
  last_name: string;
  photo_200?: string; 
  photo_400_orig?: string;
  photo_max_orig?: string; 
  city?: { title: string };
  online?: number;
  [key: string]: any;
}

export interface VKGroupMembersResponse {
  response: {
    count: number;
    items: VKUser[];
  };
}

export interface VKUserResponse {
  response: VKUser[];
}

export type SortType = 
  | 'id_asc' 
  | 'id_desc' 
  | 'time_asc' 
  | 'time_desc';