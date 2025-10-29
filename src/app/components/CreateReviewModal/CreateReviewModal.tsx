'use client'

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import { X, Search, Music, Disc3 } from "lucide-react";

interface SpotifyAlbum {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  images: Array<{ url: string }>;
  release_date: string;
  album_type: string;
  type: 'album';
}

interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: Array<{ url: string }>;
  owner: { display_name: string };
  tracks: { total: number };
  type: 'playlist';
}

type SpotifyItem = SpotifyAlbum | SpotifyPlaylist;

interface CreateReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateReviewModal({ isOpen, onClose }: CreateReviewModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SpotifyItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SpotifyItem | null>(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchType, setSearchType] = useState<'album' | 'playlist' | 'both'>('both');

  // Debounce para a busca
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchType]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const response = await api.get<{ albums?: SpotifyAlbum[], playlists?: SpotifyPlaylist[] }>(
        `/api/spotify/search?q=${encodeURIComponent(searchQuery)}&type=${searchType}`
      );

      const results: SpotifyItem[] = [];
      
      if (searchType === 'both' || searchType === 'album') {
        results.push(...(response.albums || []));
      }
      
      if (searchType === 'both' || searchType === 'playlist') {
        results.push(...(response.playlists || []));
      }

      setSearchResults(results);
    } catch (error) {
      console.error('Erro ao buscar no Spotify:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectItem = (item: SpotifyItem) => {
    setSelectedItem(item);
    setSearchResults([]);
    setSearchQuery("");
  };

  const handleSubmitReview = async () => {
    if (!selectedItem || rating === 0) {
      alert('Por favor, selecione um item e dê uma nota');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post('/api/reviews', {
        spotify_id: selectedItem.id,
        item_type: selectedItem.type,
        rating,
        review_text: reviewText,
      });

      // Resetar e fechar
      setSelectedItem(null);
      setRating(0);
      setReviewText("");
      onClose();
      
      // Recarregar a página para mostrar a nova review
      window.location.reload();
    } catch (error) {
      console.error('Erro ao criar review:', error);
      alert('Erro ao criar review. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    setSelectedItem(null);
    setRating(0);
    setReviewText("");
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-white w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
        {/* Header */}
        <div className="sticky top-0 bg-black border-b-2 border-white p-6 flex justify-between items-center">
          <h2 className="text-white sf-pro-bold text-2xl">CRIAR REVIEW</h2>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!selectedItem ? (
            <>
              {/* Filtro de tipo */}
              <div className="mb-4 flex gap-2">
                <button
                  onClick={() => setSearchType('both')}
                  className={`px-4 py-2 text-sm sf-pro-bold transition-colors ${
                    searchType === 'both'
                      ? 'bg-white text-black'
                      : 'bg-transparent text-white border border-white hover:bg-white hover:text-black'
                  }`}
                >
                  TUDO
                </button>
                <button
                  onClick={() => setSearchType('album')}
                  className={`px-4 py-2 text-sm sf-pro-bold transition-colors ${
                    searchType === 'album'
                      ? 'bg-white text-black'
                      : 'bg-transparent text-white border border-white hover:bg-white hover:text-black'
                  }`}
                >
                  ÁLBUNS
                </button>
                <button
                  onClick={() => setSearchType('playlist')}
                  className={`px-4 py-2 text-sm sf-pro-bold transition-colors ${
                    searchType === 'playlist'
                      ? 'bg-white text-black'
                      : 'bg-transparent text-white border border-white hover:bg-white hover:text-black'
                  }`}
                >
                  PLAYLISTS
                </button>
              </div>

              {/* Barra de busca */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar álbuns e playlists no Spotify..."
                  className="w-full bg-black border-2 border-white text-white pl-12 pr-4 py-3 focus:outline-none focus:border-gray-400 transition-colors"
                  autoFocus
                />
              </div>

              {/* Loading */}
              {isSearching && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-2"></div>
                  <p className="text-gray-400">Buscando...</p>
                </div>
              )}

              {/* Resultados da busca */}
              {!isSearching && searchResults.length > 0 && (
                <div className="space-y-3">
                  {searchResults.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelectItem(item)}
                      className="w-full bg-black border border-white p-4 hover:bg-gray-900 transition-colors text-left flex gap-4"
                    >
                      <img
                        src={item.images[0]?.url || '/placeholder.png'}
                        alt={item.name}
                        className="w-20 h-20 object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {item.type === 'album' ? (
                            <Disc3 size={16} className="text-purple-400" />
                          ) : (
                            <Music size={16} className="text-green-400" />
                          )}
                          <span className="text-xs text-gray-400 uppercase">
                            {item.type === 'album' ? 'Álbum' : 'Playlist'}
                          </span>
                        </div>
                        <h3 className="text-white font-bold text-lg">{item.name}</h3>
                        <p className="text-gray-400 text-sm">
                          {item.type === 'album' 
                            ? item.artists.map(a => a.name).join(', ')
                            : `Por ${item.owner.display_name} • ${item.tracks.total} músicas`
                          }
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Mensagem quando não há resultados */}
              {!isSearching && searchQuery.length >= 2 && searchResults.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">Nenhum resultado encontrado</p>
                  <p className="text-gray-500 text-sm mt-2">Tente buscar por outro termo</p>
                </div>
              )}

              {/* Mensagem inicial */}
              {searchQuery.length < 2 && searchResults.length === 0 && (
                <div className="text-center py-12">
                  <Search size={48} className="text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">Digite para buscar no Spotify</p>
                  <p className="text-gray-500 text-sm mt-2">Mínimo de 2 caracteres</p>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Item selecionado */}
              <div className="mb-6 border-2 border-white p-4 bg-black">
                <div className="flex gap-4">
                  <img
                    src={selectedItem.images[0]?.url || '/placeholder.png'}
                    alt={selectedItem.name}
                    className="w-32 h-32 object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {selectedItem.type === 'album' ? (
                        <Disc3 size={20} className="text-purple-400" />
                      ) : (
                        <Music size={20} className="text-green-400" />
                      )}
                      <span className="text-sm text-gray-400 uppercase sf-pro-bold">
                        {selectedItem.type === 'album' ? 'Álbum' : 'Playlist'}
                      </span>
                    </div>
                    <h3 className="text-white sf-pro-bold text-2xl mb-2">{selectedItem.name}</h3>
                    <p className="text-gray-400">
                      {selectedItem.type === 'album' 
                        ? selectedItem.artists.map(a => a.name).join(', ')
                        : `Por ${selectedItem.owner.display_name} • ${selectedItem.tracks.total} músicas`
                      }
                    </p>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="mt-3 text-sm text-gray-400 hover:text-white transition-colors underline"
                    >
                      Escolher outro
                    </button>
                  </div>
                </div>
              </div>

              {/* Avaliação (Rating) */}
              <div className="mb-6">
                <label className="text-white sf-pro-bold text-lg mb-3 block">NOTA *</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`w-12 h-12 text-2xl transition-all ${
                        star <= rating
                          ? 'text-yellow-400 scale-110'
                          : 'text-gray-600 hover:text-gray-400'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="text-white ml-2 self-center sf-pro-bold">
                      {rating}.0
                    </span>
                  )}
                </div>
              </div>

              {/* Texto da review */}
              <div className="mb-6">
                <label className="text-white sf-pro-bold text-lg mb-3 block">
                  SUA REVIEW (opcional)
                </label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Compartilhe sua opinião sobre este álbum/playlist..."
                  className="w-full bg-black border-2 border-white text-white p-4 focus:outline-none focus:border-gray-400 transition-colors resize-none"
                  rows={6}
                />
                <p className="text-gray-500 text-sm mt-2">
                  {reviewText.length} caracteres
                </p>
              </div>

              {/* Botões de ação */}
              <div className="flex gap-4">
                <button
                  onClick={handleSubmitReview}
                  disabled={rating === 0 || isSubmitting}
                  className="flex-1 bg-white text-black sf-pro-bold py-3 hover:bg-gray-200 transition-colors disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'PUBLICANDO...' : 'PUBLICAR REVIEW'}
                </button>
                <button
                  onClick={handleClose}
                  className="border-2 border-white text-white sf-pro-bold px-6 py-3 hover:bg-white hover:text-black transition-colors"
                >
                  CANCELAR
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
