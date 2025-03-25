import { useState, useEffect } from 'react';

const useImagePreloader = (imageUrls: string[]) => {
  const [imagesPreloaded, setImagesPreloaded] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let loadedImages: string[] = [];

    const loadImages = async () => {
      const promises = imageUrls.map((url) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.src = url;

          img.onload = () => {
            loadedImages.push(url);
            resolve();
          };

          img.onerror = (error) => reject(error);
        });
      });

      try {
        await Promise.all(promises);
        setImagesPreloaded(loadedImages);
      } catch (error) {
        console.error('Error preloading images:', error);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [imageUrls]);

  return { imagesPreloaded, loading };
};

export default useImagePreloader;
