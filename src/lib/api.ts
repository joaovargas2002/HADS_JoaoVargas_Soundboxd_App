/**
 * Utilitário centralizado para requisições API
 * Garante que o token de autenticação seja enviado em todas as requisições
 */

const API_BASE_URL = 'http://127.0.0.1:8000';

/**
 * Opções de requisição personalizadas
 */
interface ApiRequestOptions extends RequestInit {
  requiresAuth?: boolean; // Se false, não envia o token (padrão: true)
}

/**
 * Função auxiliar para fazer requisições autenticadas
 */
export async function apiRequest<T = any>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { requiresAuth = true, headers = {}, ...restOptions } = options;

  // Obtém o token do localStorage
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

  // Prepara os headers
  const requestHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...headers,
  };

  // Adiciona o token se a requisição requer autenticação
  if (requiresAuth && token) {
    requestHeaders['Authorization'] = `Bearer ${token}`;
  }

  // Log para debug (remova em produção se necessário)
  if (process.env.NODE_ENV === 'development') {
    console.log(`[API Request] ${options.method || 'GET'} ${endpoint}`);
    console.log('[API Request] Token presente:', !!token);
  }

  // Faz a requisição
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...restOptions,
    headers: requestHeaders,
    credentials: 'include', // Importante para cookies de sessão do Sanctum
  });

  // Log da resposta
  if (process.env.NODE_ENV === 'development') {
    console.log(`[API Response] Status: ${response.status}`);
  }

  // Parse do JSON
  const data = await response.json();

  // Lança erro se a resposta não for ok
  if (!response.ok) {
    const error = new Error(
      data.message || `Erro ${response.status}: ${JSON.stringify(data)}`
    );
    console.error('[API Error]', error);
    throw error;
  }

  return data;
}

/**
 * Métodos HTTP simplificados
 */
export const api = {
  /**
   * GET request
   */
  get: <T = any>(endpoint: string, options?: ApiRequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: 'GET' }),

  /**
   * POST request
   */
  post: <T = any>(endpoint: string, body?: any, options?: ApiRequestOptions) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    }),

  /**
   * PUT request
   */
  put: <T = any>(endpoint: string, body?: any, options?: ApiRequestOptions) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  /**
   * PATCH request
   */
  patch: <T = any>(endpoint: string, body?: any, options?: ApiRequestOptions) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    }),

  /**
   * DELETE request
   */
  delete: <T = any>(endpoint: string, options?: ApiRequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: 'DELETE' }),
};

/**
 * Verifica se o usuário está autenticado (tem token)
 */
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('auth_token');
}

/**
 * Obtém o token atual
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

/**
 * Salva o token de autenticação
 */
export function setAuthToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('auth_token', token);
}

/**
 * Remove o token de autenticação (logout)
 */
export function clearAuthToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('auth_token');
}
