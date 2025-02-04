import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/navigation';
import styles from './Carousel.module.css';

interface CarouselProps {
  items: React.ReactNode[];
  slidesPerView?: number;
  spaceBetween?: number;
  loop?: boolean;
  onSlideChange?: (swiper: SwiperType) => void;
}

export function Carousel({
  items,
  slidesPerView = 3,
  spaceBetween = 16,
  loop = true,
  onSlideChange,
}: CarouselProps) {
  return (
    <div className={styles['carousel-container']}>
      <Swiper
        modules={[Navigation]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        loop={loop}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          disabledClass: 'swiper-button-disabled',
        }}
        onSlideChange={onSlideChange || (() => {})}
        className={styles['swiper']}
      >
        {items.map((item, index) => (
          <SwiperSlide 
            key={index} 
            className={styles['swiper-slide']}
          >
            {item}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
