'use client'

import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import { useEffect, useState } from "react";
import { api, isAuthenticated } from "@/lib/api";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";

interface UserData {
  id: number;
  name?: string;
  display_name?: string;
  email: string;
  avatar?: string;
  spotify_avatar?: string;
  images?: Array<{ url: string }>;
  spotify_id?: string;
  created_at?: string;
}

interface Props {
  params: { id: string };
}

export default function ProfileDetails({ params }: Props) {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = params.id;

    // Se o ID for 'me', verifica se está autenticado
    if (userId === 'me' && !isAuthenticated()) {
      console.warn('❌ Usuário não autenticado. Redirecionando para login...');
      router.push(routes.login);
      return;
    }

    // Define o endpoint baseado no ID
    const endpoint = userId === 'me'
      ? '/api/spotify/me'
      : `/api/users/${userId}`;

    console.log('🔍 Buscando perfil:', endpoint);
    console.log('🔐 Autenticado:', isAuthenticated());

    api.get<UserData>(endpoint)
      .then(data => {
        console.log('✅ Dados recebidos:', data);
        setUserData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('❌ Erro ao buscar dados:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [params.id, router]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="bg-black min-h-screen w-full pt-2">
          <div className="text-white text-center p-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
            <p className="text-xl">Carregando perfil...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="bg-black min-h-screen w-full pt-2">
          <div className="text-red-500 text-center p-10">
            <p className="text-2xl font-bold mb-4">❌ Erro ao carregar perfil</p>
            <p className="text-lg mb-4">{error}</p>
            <div className="mt-6 text-sm text-gray-400">
              <p className="mb-2">Possíveis causas:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Usuário não encontrado (ID: {params.id})</li>
                <li>Backend não está respondendo</li>
                <li>Token de autenticação inválido</li>
              </ul>
            </div>
            <button
              onClick={() => router.push(routes.home)}
              className="mt-6 px-6 py-2 bg-white text-black font-bold hover:bg-gray-200 transition-colors"
            >
              Voltar para Home
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-black min-h-screen w-full pt-2">
        {userData && (
          <div className="grid grid-cols-1 lg:grid-cols-[25%_75%] gap-6 p-6">
            {/* PERFIL DO USUÁRIO */}
            <div className="profile border-[2px] border-white p-6 h-fit">
              <div className="foto-perfil mb-4">
                {userData.images?.[0]?.url || userData.avatar || userData.spotify_avatar ? (
                  <img 
                    src={userData.images?.[0]?.url || userData.avatar || userData.spotify_avatar} 
                    alt={userData.display_name || userData.name || 'Foto de perfil'}
                    className="w-full rounded-lg aspect-square object-cover"
                  />
                ) : (
                  <div className="w-full aspect-square bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-6xl text-white font-bold">
                      {(userData.display_name || userData.name || 'U')[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              
              <h2 className="text-white text-2xl font-bold mb-2">
                {userData.display_name || userData.name || 'Usuário'}
              </h2>
              
              <p className="text-gray-400 text-sm mb-4">{userData.email}</p>
              
              {userData.spotify_id && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="text-gray-500 text-xs mb-1">Spotify ID</p>
                  <p className="text-gray-400 text-sm font-mono truncate">
                    {userData.spotify_id}
                  </p>
                </div>
              )}

              {params.id === 'me' && (
                <div className="mt-4">
                  <p className="text-green-400 text-sm flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
                    Este é seu perfil
                  </p>
                </div>
              )}
            </div>

            {/* ATIVIDADES DO PERFIL */}
            <div className="atividade flex flex-col gap-6">
              {/* BOTÕES DE AÇÃO */}
              {params.id === 'me' && (
                <div className="botoes border-[2px] border-white p-6">
                  <div className="flex gap-4">
                    <button className="text-white border-[2px] border-white sf-pro-bold px-6 py-3 hover:bg-white hover:text-black transition-colors">
                      CRIAR LISTA
                    </button>
                    <button className="text-white border-[2px] border-white sf-pro-bold px-6 py-3 hover:bg-white hover:text-black transition-colors">
                      EDITAR PERFIL
                    </button>
                  </div>
                </div>
              )}

              {/* ATIVIDADE RECENTE */}
              <div>
                <h2 className="text-white sf-pro-bold text-2xl mb-4">
                  {params.id === 'me' ? 'MINHA ATIVIDADE' : 'ATIVIDADE'}
                </h2>
                <div className="border-[2px] border-white p-6 min-h-[300px]">
                  <div className="text-center text-gray-500 py-10">
                    <p className="text-lg">Nenhuma atividade ainda</p>
                    <p className="text-sm mt-2">
                      {params.id === 'me' 
                        ? 'Comece criando sua primeira lista de músicas!' 
                        : 'Este usuário ainda não tem atividades públicas.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}