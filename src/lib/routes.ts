/**
 * Utilitário para gerar URLs de forma consistente
 */

/**
 * Gera uma URL amigável (slug) a partir de um texto
 * Remove acentos, caracteres especiais e substitui espaços por hífens
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // Remove acentos
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, '-') // Espaços por hífens
    .replace(/[^\w\-]+/g, '') // Remove caracteres especiais
    .replace(/\-\-+/g, '-') // Remove hífens duplicados
    .replace(/^-+/, '') // Remove hífen do início
    .replace(/-+$/, ''); // Remove hífen do final
}

/**
 * Gera URL para o perfil de um usuário
 *
 * @param userId - ID do usuário
 * @param userName - Nome do usuário (opcional, para URL amigável)
 * @returns URL do perfil
 *
 * @example
 * // Com slug
 * getProfileUrl(123, "João Silva") // "/profile/123/joao-silva"
 *
 * // Sem slug
 * getProfileUrl(123) // "/profile/123"
 *
 * // Perfil do usuário logado
 * getProfileUrl("me") // "/profile/me"
 */
export function getProfileUrl(userId: string | number, userName?: string): string {
  const baseUrl = `/profile/${userId}`;

  if (userName) {
    const slug = slugify(userName);
    return `${baseUrl}/${slug}`;
  }

  return baseUrl;
}

/**
 * Extrai o ID do usuário de uma URL de perfil
 * Útil para quando você tem uma URL com slug e precisa apenas do ID
 *
 * @example
 * extractUserIdFromUrl("/profile/123/joao-silva") // "123"
 * extractUserIdFromUrl("/profile/123") // "123"
 */
export function extractUserIdFromUrl(url: string): string {
  const match = url.match(/\/profile\/([^\/]+)/);
  return match ? match[1] : '';
}

/**
 * Rotas da aplicação
 */
export const routes = {
  home: '/',
  login: '/Login',
  register: '/Register',
  profile: getProfileUrl,
  myProfile: '/profile/me',
  spotifyCallback: '/Spotify/Callback',
};
