import React, { useState, useImperativeHandle, forwardRef } from "react";
import { motion } from 'framer-motion';

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
        style={{ overflow: "hidden", display: "inline-block", borderRadius: "8px", width: "1024px", height: "512px", position: "relative" }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
          <div 
          style={{
            width: "1024px",
            height: "512px",
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
          <motion.button
              className="w-1/3 h-1/3 opacity-60 absolute border-white bottom-0/3 right-0 bg-blue-500 text-white py-2 px-4 rounded-2xl shadow-lg"
              style={{ zIndex: 10 }}
          >
              Area 1
          </motion.button>
          <motion.button
              className="w-1/3 h-1/3 opacity-60 absolute border-white bottom-1/3 right-0 bg-blue-500 text-white py-2 px-4 rounded-2xl shadow-lg"
              style={{ zIndex: 10 }}
          >
              Area 2
          </motion.button>
          <motion.button
              className="w-1/3 h-1/3 opacity-60 absolute border-white bottom-2/3 right-0 bg-blue-500 text-white py-2 px-4 rounded-2xl shadow-lg"
              style={{ zIndex: 10 }}
          >
              Area 3
          </motion.button>
          <motion.button
              className="w-1/3 h-1/3 opacity-60 absolute border-white bottom-0/3 right-1/3 bg-blue-500 text-white py-2 px-4 rounded-2xl shadow-lg"
              style={{ zIndex: 10 }}
          >
              Area 4
          </motion.button>
          <motion.button
              className="w-1/3 h-1/3 opacity-60 absolute border-white bottom-1/3 right-1/3 bg-blue-500 text-white py-2 px-4 rounded-2xl shadow-lg"
              style={{ zIndex: 10 }}
          >
              Area 5
          </motion.button>
          <motion.button
              className="w-1/3 h-1/3 opacity-60 absolute border-white bottom-2/3 right-1/3 bg-blue-500 text-white py-2 px-4 rounded-2xl shadow-lg"
              style={{ zIndex: 10 }}
          >
              Area 6
          </motion.button>
          <motion.button
              className="w-1/3 h-1/3 opacity-60 absolute border-white bottom-0/3 right-2/3 bg-blue-500 text-white py-2 px-4 rounded-2xl shadow-lg"
              style={{ zIndex: 10 }}
          >
              Area 7
          </motion.button>
          <motion.button
              className="w-1/3 h-1/3 opacity-60 absolute border-white bottom-1/3 right-2/3 bg-blue-500 text-white py-2 px-4 rounded-2xl shadow-lg"
              style={{ zIndex: 10 }}
          >
              Area 8
          </motion.button>
          <motion.button
              className="w-1/3 h-1/3 opacity-60 absolute border-white bottom-2/3 right-2/3 bg-blue-500 text-white py-2 px-4 rounded-2xl shadow-lg"
              style={{ zIndex: 10 }}
          >
              Area 9
          </motion.button>
          
        </div>
      </div>
    );
  });

export default ZoomableImage