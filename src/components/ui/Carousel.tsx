import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel, Scrollbar } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import styles from './Carousel.module.css';

interface CarouselProps {
  items: React.ReactNode[];
  slidesPerView?: number;
  spaceBetween?: number;
  onSlideChange?: (swiper: SwiperType) => void;
}

export function Carousel({
  items,
  slidesPerView = 3.5,
  spaceBetween = 8,
  onSlideChange,
}: CarouselProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  return (
    <div className={`${styles['carousel-container']} overflow-hidden`}>
      <Swiper
        modules={[Navigation, Mousewheel, Scrollbar]}
        spaceBetween={spaceBetween}
        slidesPerView={'auto'}
        speed={400}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          disabledClass: 'swiper-button-disabled',
          lockClass: 'swiper-button-lock',
        }}
        rewind={false}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
          thresholdDelta: 30,
          releaseOnEdges: true,
        }}
        scrollbar={{
          el: '.swiper-scrollbar',
          draggable: true,
          snapOnRelease: true,
          dragSize: 60,
          hide: true,
        }}
        grabCursor={true}
        centeredSlides={false}
        slidesOffsetBefore={16}
        slidesOffsetAfter={16}
        resistance={true}
        resistanceRatio={0.85}
        shortSwipes={true}
        longSwipesRatio={0.2}
        touchRatio={2}
        touchAngle={45}
        touchStartPreventDefault={false}
        touchStartForcePreventDefault={false}
        threshold={5}
        touchMoveStopPropagation={true}
        preventInteractionOnTransition={true}
        breakpoints={{
          320: { slidesPerView: 'auto', spaceBetween: 12 },
          480: { slidesPerView: 'auto', spaceBetween: 16 },
          768: { slidesPerView: 'auto', spaceBetween: 20 },
        }}
        centeredSlidesBounds={true}
        onSlideChange={swiper => {
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
