import React, { useState, useImperativeHandle, forwardRef } from "react";

export interface ZoomableImageProps {
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
        if((newX / scale) > -250 && (newX / scale) < 250 && (newY / scale) > -250 && (newY / scale) < 250){
          setPosition({ x: newX, y: newY });
        }
      }
    };
  
    const handleMouseUp = () => setDragging(false);
    const handleMouseLeave = () => setDragging(false);
  
    return (
      <div 
        style={{ overflow: "hidden", marginLeft: '5px', marginRight: '5px',  display: "inline-block", borderRadius: "8px", width: "400px", height: "400px", position: "relative" }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
          <div 
          style={{
            width: "400px",
            height: "400px",
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
            transition: dragging ? "none" : "transform 0.1s",
            position: "relative"
          }}
        >
          <img
            src={image}
            alt={altText || "Zoomable Image"}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    );
  });

export default ZoomableImage