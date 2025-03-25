import React, { useState, useImperativeHandle, forwardRef, useRef } from "react";
import useImagePreloader from './hooks/useImagePreloader.tsx';

const url = import.meta.env.VITE_BLOB_URL
const token = import.meta.env.VITE_SAS_TOKEN
const path = '/disaster-analysis/stimuli/data_original/train/1002-Boca-Grande.2/'

const preloadSrcList: string[] = Array.from({ length: 10 }, (_, i) => 
  `${url}${path}stimuli_${i}.png?${token}`
);



interface ZoomableImageProps {
  image: string;
  altText?: string;
}

export interface ZoomableImageHandle {
  resetZoom: () => void;
}

const ZoomableImage = forwardRef<ZoomableImageHandle, ZoomableImageProps>(({ image, altText }, ref) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  useImperativeHandle(ref, () => ({
    resetZoom: () => {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setDragging(false);
      setStartPos({ x: 0, y: 0 });
    },
  }));

  const handleWheel = (event: React.WheelEvent<HTMLImageElement>) => {
    const zoomSpeed = 0.25;
    const { deltaY } = event;

    const newScale = deltaY > 0 ? scale - zoomSpeed : scale + zoomSpeed;

    if (newScale >= 1 && newScale <= 10) {
      setScale(newScale);
      //const newX = event.clientX - position.x;
      //const newY = event.clientY - position.y;
      //setPosition({ x: newX, y: newY });
    }
    if(newScale < 1) {
      setPosition({ x: 0, y: 0 });
      setScale(1);
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    setDragging(true);
    setStartPos({ x: event.clientX - position.x, y: event.clientY - position.y });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    if (dragging) {
      const newX = event.clientX - startPos.x;
      const newY = event.clientY - startPos.y;
      console.log(newX, newY, scale )
      if((newX / scale) > -250 && (newX / scale) < 250 && (newY / scale) > -250 && (newY / scale) < 250){
        setPosition({ x: newX, y: newY });
      }
    }
  };

  const handleMouseUp = () => setDragging(false);
  const handleMouseLeave = () => setDragging(false);

  return (
    <div style={{ overflow: "hidden", display: "inline-block", borderRadius: "8px", width: "512px", height: "512px", position: "relative" }}>
      <img
        src={image}
        alt={altText || "Zoomable Image"}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{
          width: "512px",
          height: "512px",
          transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
          transition: dragging ? "none" : "transform 0.1s",
          cursor: "grab" 
        }}
      />
    </div>
  );
});

const BinaryTask: React.FC = () => {
  const { imagesPreloaded } = useImagePreloader(preloadSrcList);

  const zoomableImageRef1 = useRef<ZoomableImageHandle>(null);
  const zoomableImageRef2 = useRef<ZoomableImageHandle>(null);

  const resetImage = (id: string) => {
    if (id === "Image1") zoomableImageRef1.current?.resetZoom();
    else if (id === "Image2") zoomableImageRef2.current?.resetZoom();
  };

  const handleImageSelection = async (imageNumber: number) => {
    try {
      const response = await fetch("https://YOUR_API_ENDPOINT/api/save-selection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selection: imageNumber }),
      });
      if (!response.ok) {
        console.error("Failed to save selection");
      }
    } catch (error) {
      console.error("Error saving selection:", error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <h1>Select the image with the most overall damage.</h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
        <button onClick={() => resetImage("Image1")} style={{ padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', width: '500px' }}>Reset Image 1</button>
        <button onClick={() => resetImage("Image2")} style={{ padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', width: '500px' }}>Reset Image 2</button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
        <ZoomableImage ref={zoomableImageRef1} image={imagesPreloaded[Math.floor(Math.random() * imagesPreloaded.length)]} altText="Image 1" />
        <ZoomableImage ref={zoomableImageRef2} image={imagesPreloaded[Math.floor(Math.random() * imagesPreloaded.length)]} altText="Image 2" />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
        <button onClick={() => handleImageSelection(1)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', width: '500px' }} type="button">Select Image 1</button>
        <button onClick={() => handleImageSelection(2)} className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', width: '500px' }} type="button">Select Image 1</button>
      </div>
    </div>
  );
};

export default BinaryTask;