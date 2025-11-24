/**
 * API Client - Autenticação via Bearer Token
 * Backend configurado para aceitar apenas Bearer Tokens (Laravel Sanctum)
 */

const API_BASE_URL = 'http://127.0.0.1:8000/api';

/**
 * Função auxiliar para fazer requisições autenticadas
 */
async function apiRequest<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('api_token') : null;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  // ✅ Adicionar token Bearer se existir
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Merge com headers customizados
  if (options.headers) {
    Object.assign(headers, options.headers);
  }

  // Log detalhado para debug
  console.log(`[API] ${options.method || 'GET'} ${API_BASE_URL}${endpoint}`);
  console.log('[API] Token presente:', !!token);
  if (token) {
    console.log('[API] Token preview:', `${token.substring(0, 20)}...`);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    // ❌ NÃO usa credentials: 'include' (sem cookies, sem CSRF)
  });

  // Se 401, fazer logout automático
  if (response.status === 401) {
    console.warn('[API] 401 - Token inválido ou expirado. Redirecionando para login...');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('api_token');
      localStorage.removeItem('user');
      window.location.href = '/Login';
    }
    throw new Error('Não autenticado. Redirecionando para login...');
  }

  // Log da resposta
  console.log(`[API Response] Status: ${response.status}`);

  // Tratar erros
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || errorData.error || `Erro ${response.status}`;
    console.error('[API Error]', errorMessage);
    throw new Error(errorMessage);
  }

  return response.json();
}

// ==========================================
// AUTENTICAÇÃO
// ==========================================

export async function login(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Login falhou' }));
    throw new Error(error.message || 'Credenciais inválidas');
  }

  const data = await response.json();
  
  // Salvar token e usuário
  if (typeof window !== 'undefined') {
    localStorage.setItem('api_token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  
  console.log('✅ Login realizado:', data.user);
  return data;
}

export async function logout() {
  try {
    await apiRequest('/logout', { method: 'POST' });
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  } finally {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('api_token');
      localStorage.removeItem('user');
    }
  }
}

export function getUser() {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

// ==========================================
// REVIEWS
// ==========================================

export interface CreateReviewData {
  spotify_id: string;
  tipo_item: 'album' | 'playlist';
  rating: number;
  review_text?: string;
  
  item_name: string;
  item_description?: string | null;
  item_image_url?: string | null;
  spotify_url?: string | null;
  
  album_artist?: string;
  album_release_date?: string | null;
  album_type?: string | null;
  album_total_tracks?: number;
  
  playlist_owner?: string;
  playlist_total_tracks?: number;
  playlist_public?: boolean;
}

export async function createReview(data: CreateReviewData) {
  return apiRequest('/reviews', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getReviews(filters?: {
  id_usuario?: number;
  spotify_id?: string;
  tipo_item?: 'album' | 'playlist';
}) {
  const params = new URLSearchParams();
  if (filters?.id_usuario) params.append('id_usuario', filters.id_usuario.toString());
  if (filters?.spotify_id) params.append('spotify_id', filters.spotify_id);
  if (filters?.tipo_item) params.append('tipo_item', filters.tipo_item);
  
  const query = params.toString();
  return apiRequest(query ? `/reviews?${query}` : '/reviews');
}

export async function updateReview(id: number, data: {
  rating?: number;
  review_text?: string;
}) {
  return apiRequest(`/reviews/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteReview(id: number) {
  return apiRequest(`/reviews/${id}`, {
    method: 'DELETE',
  });
}

// ==========================================
// SPOTIFY
// ==========================================

export async function searchSpotify(query: string, type: 'album' | 'playlist' | 'both' = 'both') {
  const spotifyType = type === 'both' ? 'album,playlist' : type;
  const params = new URLSearchParams({
    q: query,
    type: spotifyType,
  });
  return apiRequest(`/spotify/search?${params}`);
}

// USUÁRIO
export async function getRecentUsers(limit: number = 6) {
  const params = new URLSearchParams({ 
    limit: limit.toString(),
    exclude_current: 'true'
  });
  return apiRequest(`/users/recent?${params}`);
}

// ==========================================
// LEGACY (para compatibilidade com código existente)
// ==========================================

export const api = {
  get: <T = any>(endpoint: string) => apiRequest<T>(endpoint, { method: 'GET' }),
  post: <T = any>(endpoint: string, body?: any) => apiRequest<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  }),
  put: <T = any>(endpoint: string, body?: any) => apiRequest<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body),
  }),
  delete: <T = any>(endpoint: string) => apiRequest<T>(endpoint, { method: 'DELETE' }),
};

/**
 * Verifica se o usuário está autenticado (tem token)
 */
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('api_token');
}

/**
 * Obtém o token atual
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('api_token');
}

/**
 * Salva o token de autenticação
 */
export function setAuthToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('api_token', token);
}

/**
 * Remove o token de autenticação (logout)
 */
export function clearAuthToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('api_token');
  localStorage.removeItem('user');
}

/**
 * Busca os dados do usuário logado
 */
export async function getCurrentUser() {
  if (!isAuthenticated()) {
    throw new Error('Usuário não autenticado');
  }
  return apiRequest('/me');
}
