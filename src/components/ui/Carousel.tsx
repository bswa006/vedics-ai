import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './Carousel.module.css';

interface CarouselProps {
  items: React.ReactNode[];
  slidesPerView?: number;
  spaceBetween?: number;
  onSlideChange?: (swiper: SwiperType) => void;
}

export function Carousel({
  items,
  slidesPerView = 3,
  spaceBetween = 12,
  onSlideChange,
}: CarouselProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  return (
    <div className={styles['carousel-container']}>
      <Swiper
        modules={[Navigation, Mousewheel]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        speed={600}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          disabledClass: 'swiper-button-disabled',
          lockClass: 'swiper-button-lock'
        }}
        rewind={false}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 0.5,
          thresholdDelta: 50,
          releaseOnEdges: true,
        }}
        grabCursor={true}
        slidesOffsetBefore={0}
        slidesOffsetAfter={0}
        resistance={false}
        shortSwipes={false}
        longSwipesRatio={0.3}
        touchRatio={1.5}
        onSlideChange={(swiper) => {
          if (!isDragging && onSlideChange) {
            onSlideChange(swiper);
          }
        }}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => {
          setTimeout(() => setIsDragging(false), 100);
        }}
        onWheel={() => setIsDragging(true)}
        className={styles['swiper']}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className={styles['swiper-slide']}>
            {item}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
