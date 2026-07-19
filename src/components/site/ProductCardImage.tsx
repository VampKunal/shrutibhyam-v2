import { useState, useEffect } from "react";


interface ProductCardImageProps {
  product: { slug: string; image: string; name: string };
  imageClassName?: string;
}

export function ProductCardImage({ product, imageClassName = "" }: ProductCardImageProps) {
  const images = (product as any).galleryImages && (product as any).galleryImages.length > 0 ? (product as any).galleryImages : [product.image];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isHovered && images.length > 1) {
      timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 1500);
    } else {
      setCurrentIndex(0);
    }
    return () => clearInterval(timer);
  }, [isHovered, images.length]);

  return (
    <div
      className="absolute inset-0 w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {images.map((img: string, idx: number) => (
        <img
          key={img + idx}
          src={img}
          alt={product.name}
          width={400}
          height={500}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${imageClassName} ${
            idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}
    </div>
  );
}
