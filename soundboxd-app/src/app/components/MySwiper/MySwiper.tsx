"use client"

import React, { useRef, useState } from 'react';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';
import { title } from 'process';

export default function App() {
  const [swiperRef, setSwiperRef] = useState(null);
  const appendNumber = useRef(500);
  const prependNumber = useRef(1);

  const albums = [
    { id: 1, image: '/images/nao-sei.jpg', title: 'Rage Against The machine', year: 1992, genre: 'paulera' },
    { id: 2, title: 'dfawdwad', description: 'xereca' },
    { id: 3, title: 'adwdawd', description: 'cu' },
  ]

  // Create array with 500 slides
  const [slides, setSlides] = useState(
    Array.from({ length: albums.length }).map((_, index) => `Slide ${index + 1}`)
  );

  const prepend = () => {
    setSlides([
      `Slide ${prependNumber.current - 2}`,
      `Slide ${prependNumber.current - 1}`,
      ...slides,
    ]);
    prependNumber.current = prependNumber.current - 2;
    swiperRef.slideTo(swiperRef.activeIndex + 2, 0);
  };

  const append = () => {
    setSlides([...slides, 'Slide ' + ++appendNumber.current]);
  };

  const slideTo = (index) => {
    swiperRef.slideTo(index - 1, 0);
  };

  return (
    <>
      <Swiper
        modules={[Virtual, Navigation, Pagination]}
        onSwiper={setSwiperRef}
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        virtual
      >
        <SwiperSlide className='flex flex-col gap-6'>
          {albums.map((album) => (
            <div className='flex h-fit border border-white p-4' key={album.id}>
              <img className='w-24' src={album.image} />
              <div className='grid'>
                <h3>{album.title}</h3>
                <p>{album.year}</p>
                <h3>{album.genre}</h3>
              </div>
            </div>
          ))}
        </SwiperSlide>

      </Swiper>
    </>
  );
}
