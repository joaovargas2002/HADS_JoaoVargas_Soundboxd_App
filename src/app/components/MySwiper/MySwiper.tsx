"use client"

import React, { useEffect, useState } from 'react';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import Image from 'next/image';
import { getRecentActivity } from '@/lib/api';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

interface Review {
  id: number;
  id_usuario: number;
  usuario_nome: string;
  usuario_foto: string | null;
  spotify_id: string;
  tipo_item: 'album' | 'playlist';
  rating: number;
  review_text: string | null;
  item_name: string;
  item_image_url: string | null;
  album_artist?: string;
  created_at: string;
}

export default function App() {
  const [swiperRef, setSwiperRef] = useState<any>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        setLoading(true);
        const data = await getRecentActivity(15);
        setReviews(data.activities || []);
        setError(null);
      } catch (err) {
        console.error('Erro ao buscar atividades recentes:', err);
        setError('Não foi possível carregar as atividades');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentActivity();
  }, []);

  const sliceList: Review[][] = [];
  const itemsPerSlide = 5;

  for (let i = 0; i < reviews.length; i += itemsPerSlide) {
    sliceList.push(reviews.slice(i, i + itemsPerSlide));
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return 'Ontem';
    if (diffDays < 7) return `${diffDays} dias atrás`;
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={`text-lg ${star <= rating ? 'text-yellow-400' : 'text-gray-600'}`}>
            ★
          </span>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="w-full h-[540px] flex items-center justify-center bg-black">
        <div className="text-white text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
          <p>Carregando atividades...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[540px] flex items-center justify-center bg-black">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="w-full h-[540px] flex items-center justify-center bg-black">
        <p className="text-gray-400">Nenhuma atividade recente encontrada</p>
      </div>
    );
  }

  return (
    <>
      <Swiper
        modules={[Virtual, Navigation, Pagination]}
        onSwiper={setSwiperRef}
        slidesPerView={1}
        centeredSlides={true}
        spaceBetween={15}
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        virtual
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {sliceList.map((reviewGroup, slideIndex) => (
          <SwiperSlide key={slideIndex} className='flex flex-col gap-3 sm:gap-4 md:gap-6 px-2 pt-2'>
            {reviewGroup.map((review) => (
              <Link 
                key={review.id} 
                href={`/Profiles/${review.id_usuario}`}
                className='flex h-fit border border-white p-2 sm:p-3 md:p-4 gap-2 sm:gap-3 md:gap-4 hover:bg-white/10 hover:border-green-500 transition-all duration-300'
              >
                <div className="relative w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 flex-shrink-0">
                  {review.item_image_url ? (
                    <img
                      src={review.item_image_url}
                      alt={review.item_name}
                      className="object-cover"
                      sizes="96px"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                      <span className="text-white text-2xl">♪</span>
                    </div>
                  )}
                </div>

                <div className='grid content-start flex-1 overflow-hidden'>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="relative w-6 h-6 flex-shrink-0">
                      {review.usuario_foto ? (
                        <Image
                          src={review.usuario_foto}
                          alt={review.usuario_nome}
                          fill
                          className="object-cover rounded-full"
                          sizes="24px"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {review.usuario_nome.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="text-gray-400 text-xs sm:text-sm truncate">
                      {review.usuario_nome}
                    </span>
                    <span className="text-gray-500 text-xs ml-auto flex-shrink-0">
                      {formatDate(review.created_at)}
                    </span>
                  </div>

                  <h3 className='montserrat text-sm sm:text-base md:text-lg text-white font-bold truncate'>
                    {review.item_name}
                  </h3>

                  {review.album_artist && (
                    <p className='montserrat text-xs sm:text-sm text-gray-300 truncate'>
                      {review.album_artist}
                    </p>
                  )}

                  <div className="mt-1">
                    {renderStars(review.rating)}
                  </div>

                  {review.review_text && (
                    <p className='montserrat text-xs sm:text-sm text-gray-400 mt-1 line-clamp-2'>
                      {review.review_text}
                    </p>
                  )}

                  <span className="inline-block mt-2 px-2 py-1 text-xs bg-white/10 text-white rounded w-fit">
                    {review.tipo_item === 'album' ? '📀 Álbum' : '🎵 Playlist'}
                  </span>
                </div>
              </Link>
            ))}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
