// components/FullscreenCarousel/FullscreenCarousel

import { useEffect, useState } from "react";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";
import { FullScreenImage } from "../FullScreenImage/FullScreenImage";
import { FullscreenBtns } from "../FullscreenBtns/FullscreenBtns";
import "./FullscreenCarousel.css";

interface FullscreenCarouselProps {
  images: Array<{ id: number; userId: number; name: string }>;
  initialIndex: number;
  onClose: () => void;
}

export const FullscreenCarousel = ({
  images,
  initialIndex,
  onClose,
}: FullscreenCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const total = images.length;

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };
  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  // Закрытие по Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goPrev, goNext, onClose]);

  useEffect(() => {
    if (total === 0) {
      onClose();
      return;
    }
    if (currentIndex >= total) {
      setCurrentIndex(total - 1);
    }
  }, [total, currentIndex, onClose]);

  if (total === 0 || !images[currentIndex]) {
    return null;
  }

  return (
    <div className="fullscreen-carousel" onClick={onClose}>
      <div className="carousel-container" onClick={(e) => e.stopPropagation()}>
        <div className="fullscreen-carousel__close-btn">
          <FullscreenBtns id={images[currentIndex].id} userId={images[currentIndex].userId}></FullscreenBtns>
          <button onClick={onClose}>
            <IoClose />
          </button>
        </div>

        <button className="image-nav-btn prev" onClick={goPrev}>
          <IoChevronBack />
        </button>
        <div className="slide-wrapper">
          <FullScreenImage
            id={images[currentIndex].id}
            name={images[currentIndex].name}
          />
        </div>
        <button className="image-nav-btn next" onClick={goNext}>
          <IoChevronForward />
        </button>
        <div className="counter">
          {currentIndex + 1} / {total}
        </div>
      </div>
    </div>
  );
};
