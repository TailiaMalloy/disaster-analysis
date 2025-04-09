import { useState, useEffect } from 'react';

export const useImagePreloader = (imageUrls: string[]) => {
  const [imagesPreloaded, setImagesPreloaded] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Create an array with the same length as the imageUrls
    const loadedImages = new Array(imageUrls.length);

    const loadImages = async () => {
      const promises = imageUrls.map((url, index) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.src = url;
          img.onload = () => {
            // Save the URL at the correct index to preserve order
            loadedImages[index] = url;
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
