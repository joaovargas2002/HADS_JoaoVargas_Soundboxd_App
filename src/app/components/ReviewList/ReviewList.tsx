'use client'

import { Music, Disc3, Calendar } from "lucide-react";

interface Review {
  id_atividade?: number;    
  id_usuario: number;
  spotify_id: string;
  tipo_item?: string;        
  nota?: number;             
  texto_review?: string;    
  data_criacao?: string;     
  data_atividade?: string; 
  
  // Dados extras que podem ser incluídos
  spotify_data?: {
    name: string;
    images: Array<{ url: string }>;
    artists?: Array<{ name: string }>;
    owner?: { display_name: string };
    tracks?: { total: number };
  };
}

interface ReviewListProps {
  reviews: Review[];
  isLoading?: boolean;
}

export default function ReviewList({ reviews, isLoading }: ReviewListProps) {
  if (isLoading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-2"></div>
        <p className="text-gray-400">Carregando reviews...</p>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        <p className="text-lg">Nenhuma review ainda</p>
        <p className="text-sm mt-2">
          Comece criando sua primeira review de álbum ou playlist!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => {
        // Normalizar campos (suporta ambas as estruturas)
        const itemType = review.tipo_item || 'album';
        const rating = review.nota || 0;
        const reviewText = review.texto_review || '';
        const date = review.data_criacao || review.data_atividade || '';
        const reviewId = review.id_atividade || 0;

        return (
          <div 
            key={reviewId}
            className="border-2 border-white bg-black p-4 hover:bg-gray-900 transition-colors"
          >
            <div className="flex gap-4">
              {/* Imagem do item (se disponível) */}
              {review.spotify_data?.images?.[0]?.url && (
                <div className="flex-shrink-0">
                  <img
                    src={review.spotify_data.images[0].url}
                    alt={review.spotify_data.name}
                    className="w-24 h-24 object-cover"
                  />
                </div>
              )}

              {/* Conteúdo da review */}
              <div className="flex-1">
                {/* Header com tipo e data */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {itemType === 'album' ? (
                      <Disc3 size={16} className="text-purple-400" />
                    ) : (
                      <Music size={16} className="text-green-400" />
                    )}
                    <span className="text-xs text-gray-400 uppercase sf-pro-bold">
                      {itemType === 'album' ? 'Álbum' : 'Playlist'}
                    </span>
                  </div>
                  
                  {date && (
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                      <Calendar size={14} />
                      <span>{new Date(date).toLocaleDateString('pt-BR')}</span>
                    </div>
                  )}
                </div>

                {/* Nome do item (se disponível) */}
                {review.spotify_data?.name && (
                  <h3 className="text-white sf-pro-bold text-lg mb-1">
                    {review.spotify_data.name}
                  </h3>
                )}

                {/* Artista ou criador */}
                {review.spotify_data?.artists && (
                  <p className="text-gray-400 text-sm mb-3">
                    {review.spotify_data.artists.map(a => a.name).join(', ')}
                  </p>
                )}
                {review.spotify_data?.owner && (
                  <p className="text-gray-400 text-sm mb-3">
                    Por {review.spotify_data.owner.display_name}
                  </p>
                )}

                {/* Rating (Estrelas) */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-lg ${
                          star <= rating ? 'text-yellow-400' : 'text-gray-700'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-white sf-pro-bold">{rating}.0</span>
                </div>

                {/* Texto da review */}
                {reviewText && (
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {reviewText}
                  </p>
                )}

                {/* Spotify ID (para debug) */}
                {process.env.NODE_ENV === 'development' && (
                  <p className="text-xs text-gray-600 mt-2">
                    Spotify ID: {review.spotify_id}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
