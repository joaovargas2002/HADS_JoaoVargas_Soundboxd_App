'use client'

import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import CreateReviewModal from "@/app/components/CreateReviewModal/CreateReviewModal";
import ReviewList from "@/app/components/ReviewList/ReviewList";
import { useEffect, useState } from "react";
import { api, isAuthenticated, getReviews } from "@/lib/api";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";

interface UserData {
  id: number;
  id_usuario?: number;  // Suporte para estrutura do backend
  name?: string;
  display_name?: string;
  email: string;
  avatar?: string;
  spotify_avatar?: string;
  images?: Array<{ url: string }>;
  spotify_id?: string;
  created_at?: string;
}

interface Review {
  id_atividade?: number;    
  id_usuario: number;
  spotify_id: string;
  tipo_item?: string;        
  nota?: number;             
  texto_review?: string;    
  data_criacao?: string;     
  data_atividade?: string; 
}

interface Props {
  params: { id: string };
}

export default function ProfileDetails({ params }: Props) {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

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
      ? '/spotify/me'
      : `/users/${userId}`;

    console.log('🔍 Buscando perfil:', endpoint);
    console.log('🔐 Autenticado:', isAuthenticated());

    api.get<UserData>(endpoint)
      .then(data => {
        console.log('✅ Dados recebidos:', data);
        setUserData(data);
        setLoading(false);
        
        // Carregar reviews do usuário
        loadUserReviews(data.id || data.id_usuario);
      })
      .catch(err => {
        console.error('❌ Erro ao buscar dados:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [params.id, router]);

  // Função para carregar reviews
  const loadUserReviews = async (userId?: number) => {
    if (!userId) return;
    
    setLoadingReviews(true);
    try {
      const data = await getReviews({ id_usuario: userId });
      
      // Suporta diferentes formatos de resposta
      const reviewsData = data.data || data.reviews || (Array.isArray(data) ? data : []);
      setReviews(reviewsData);
      console.log('✅ Reviews carregadas:', reviewsData);
    } catch (err) {
      console.warn('⚠️ Não foi possível carregar reviews:', err);
      // Não é crítico, então não mostra erro pro usuário
      setReviews([]);
    } finally {
      setLoadingReviews(false);
    }
  };

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
              
              {userData.spotify_id ? (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <h2 className="text-white text-2xl font-bold mb-2">
                    {userData.spotify_id}
                  </h2>
                </div>
              ) :
                <h2 className="text-white text-2xl font-bold mb-2">
                  {userData.display_name || userData.name || 'Usuário'}
                </h2>
              }

              <h2 className="text-gray-400 text-sm mb-4">{userData.email}</h2>

              {params.id === 'me' && (
                <div className="mt-4">
                  <p className="text-green-400 text-sm flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
                    Este é seu perfil
                  </p>
                </div>
              )}
            </div>

            <div className="atividade flex flex-col gap-6">
              {params.id === 'me' && (
                <div className="botoes border-[2px] border-white p-6">
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setIsReviewModalOpen(true)}
                      className="text-white border-[2px] border-white sf-pro-bold px-6 py-3 hover:bg-white hover:text-black transition-colors"
                    >
                      CRIAR REVIEW
                    </button>
                    <button className="text-white border-[2px] border-white sf-pro-bold px-6 py-3 hover:bg-white hover:text-black transition-colors">
                      EDITAR PERFIL
                    </button>
                  </div>
                </div>
              )}

              <div>
                <h2 className="text-white sf-pro-bold text-2xl mb-4">
                  {params.id === 'me' ? 'MINHAS REVIEWS' : 'REVIEWS'}
                </h2>
                <div className="border-[2px] border-white p-6 min-h-[300px]">
                  <ReviewList reviews={reviews} isLoading={loadingReviews} />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
      
      <CreateReviewModal 
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onReviewCreated={() => {
          // Recarregar reviews quando uma nova for criada
          if (userData) {
            loadUserReviews(userData.id || userData.id_usuario);
          }
        }}
      />
    </>
  );
}