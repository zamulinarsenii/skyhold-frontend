// components/ImagesPaginated.tsx
import { useInfiniteImages } from "../../../api/hooks/images/useInfiniteImages";
import { ImageThumbnail } from "../ImageThumbnail/ImageThumbnail";
import { useEffect, useRef, useState } from "react";
import { FullscreenCarousel } from "../FullscreenCarousel/FullscreenCarousel";
import { FaRegCircleCheck, FaCircleCheck } from "react-icons/fa6";
import { MdOpenInFull } from "react-icons/md";
import "./ImagesPaginated.css";
import { useSelector, useDispatch } from "react-redux";
import { pushId, removeId } from "../../../store/slices/selectorSlice";
import { RootState } from "../../../store";

interface Props {
  source?: "user" | "favorite" | "basket" | "album" | "shared-album";
  albumId?: number;
  select?: boolean;
  selectAll?: boolean;
  setCounter?: (count: number) => void;
}

export default function ImagesPaginated({
  source = "user",
  albumId,
  select = false,
  selectAll = false,
  setCounter,
}: Props) {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state.selector.selector);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteImages({ source, albumId });

  const allImages = data?.pages.flatMap((p) => p.content) || [];
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const toggleSelectImage = (id: number) => {
    if (selector.includes(id)) {
      dispatch(removeId(id));
    } else {
      dispatch(pushId(id));
    }
  };

  const handleImageClick = (clickedId: number) => {
    const index = allImages.findIndex((img) => img.id === clickedId);
    if (index !== -1) {
      setSelectedIndex(index);
      setCarouselOpen(true);
    }
  };

  const closeCarousel = () => setCarouselOpen(false);
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    const currentElement = loadMoreRef.current;
    if (currentElement) observer.observe(currentElement);

    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (setCounter) {
      setCounter(allImages.length);
    }
  }, [allImages.length, setCounter]);

  useEffect(() => {
    if (selectAll) {
      allImages.map((img) => {
        if (!selector.includes(img.id)) {
          dispatch(pushId(img.id));
        }
      });
    } else {
      allImages.map((img) => {
        if (selector.includes(img.id)) {
          dispatch(removeId(img.id));
        }
      });
    }
  }, [selectAll]);

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка: {error?.message}</div>;
  if (allImages.length === 0) return <div>Нет изображений</div>;

  return (
    <>
      <div className="scroll-container">
        <div className="scroll-container-grid">
          {allImages.map((img) => (
            <div className="image-container" key={img.id}>
              {select && (
                <>
                  <button
                    className={`select-image ${selector.includes(img.id) ? "selected" : ""}`}
                    onClick={() => toggleSelectImage(img.id)}
                  >
                    {selector.includes(img.id) ? (
                      <FaCircleCheck size={20} />
                    ) : (
                      <FaRegCircleCheck size={20} />
                    )}
                  </button>
                  <button
                    onClick={() => handleImageClick(img.id)}
                    className={`open-fullscreen-image  ${selector.includes(img.id) ? "selected" : ""}`}
                  >
                    <MdOpenInFull size={20}></MdOpenInFull>
                  </button>
                </>
              )}
              <ImageThumbnail
                id={img.id}
                name={img.originalName}
                onClick={() => handleImageClick(img.id)}
              />
            </div>
          ))}
        </div>
        <div ref={loadMoreRef} style={{ height: "20px", margin: "10px 0" }} />
        {isFetchingNextPage && (
          <div className="loading-spinner">Загрузка ещё...</div>
        )}
      </div>
      {carouselOpen && (
        <FullscreenCarousel
          images={allImages.map((img) => ({
            id: img.id,
            userId: img.userId,
            name: img.originalName,
          }))}
          initialIndex={selectedIndex}
          onClose={closeCarousel}
        />
      )}
    </>
  );
}
