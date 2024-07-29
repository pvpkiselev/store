const env = import.meta.env;

export const BASE_URL = env.VITE_API_URL as string;
export const DEFAULT_AVATAR_URL = 'https://picsum.photos/800';
export const FETCH_DATA_ERROR = 'Fetch Data Error';
