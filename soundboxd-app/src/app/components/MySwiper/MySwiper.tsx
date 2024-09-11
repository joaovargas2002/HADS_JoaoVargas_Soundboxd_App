"use client"

import React, { useRef, useState } from 'react';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';

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

  const newList = [
    { id: 1, image: '/images/nao-sei.jpg', title: 'piru', year: 1992, genre: 'paulera' },
    { id: 2, image: '/images/nao-sei.jpg', title: 'Rage Against The machine', year: 1992, genre: 'paulera' },
    { id: 3, image: '/images/nao-sei.jpg', title: 'Rage Against The machine', year: 1992, genre: 'paulera' },
    { id: 4, image: '/images/nao-sei.jpg', title: 'Rage Against The machine', year: 1992, genre: 'paulera' },
    { id: 5, image: '/images/nao-sei.jpg', title: 'Rage Against The machine', year: 1992, genre: 'paulera' },
    { id: 6, image: '/images/nao-sei.jpg', title: 'Rage Against The machine', year: 1992, genre: 'paulera' },
    { id: 7, image: '/images/nao-sei.jpg', title: 'Rage Against The machine', year: 1992, genre: 'paulera' },
    { id: 8, image: '/images/nao-sei.jpg', title: 'bilola', year: 1992, genre: 'paulera' },
    { id: 9, image: '/images/nao-sei.jpg', title: 'cuzinho', year: 1992, genre: 'paulera' },
    { id: 10, image: '/images/nao-sei.jpg', title: 'tico', year: 1992, genre: 'paulera' },
    { id: 11, image: '/images/nao-sei.jpg', title: 'tico', year: 1992, genre: 'paulera' },
    { id: 12, image: '/images/nao-sei.jpg', title: 'tico', year: 1992, genre: 'paulera' },
    { id: 13, image: '/images/nao-sei.jpg', title: 'tico', year: 1992, genre: 'paulera' },
    { id: 14, image: '/images/nao-sei.jpg', title: 'tico', year: 1992, genre: 'paulera' },
  ]

  const sliceList = []
  let corte = 5

  for (let i = 0; i < newList.length; i = i + corte) {
    sliceList.push(newList.slice(i, i + corte))
  }

  console.log(sliceList)

  // Create array with 500 slides
  const [slides, setSlides] = useState(
    Array.from({ length: newList.length }).map((_, index) => `Slide ${index + 1}`)
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

        {sliceList.map((newList) => (
          <SwiperSlide className='flex overflow-scroll flex-col gap-6'>
            {newList.map((album) => (
              <div className='flex h-fit border border-white p-4' key={album.id}>
                <img className='w-24' src={album.image} />
                <div className='grid'>
                  <h3 className='montserrat'>{album.title}</h3>
                  <p className='montserrat'>{album.year}</p>
                  <p className='montserrat'>{album.genre}</p>
                </div>
              </div>
            ))
            }
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
