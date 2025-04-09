import React, { useRef, useState } from "react";
import {useImagePreloader} from '../components/useImagePreloader.tsx';
import AlertConfirmation, { alertConfirmationHandle } from "../components/alertConfirmation.tsx";
import ZoomableImage, {ZoomableImageHandle} from '../components/zoomableImage.tsx'
const url = import.meta.env.VITE_BLOB_URL
const token = import.meta.env.VITE_SAS_TOKEN

//https://disasteranalysis.blob.core.windows.net/disaster-analysis/Stimulus/Satellite/stim0%7D.png?sv=2024-11-04&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2025-11-08T22:18:28Z&st=2025-03-25T13:18:28Z&sip=0.0.0.0-255.255.255.255&spr=https&sig=8dre37EhqprjpZn4Qqv8rdL4uhaIYUoNy%2BLjGEOC1s8%3D

// https://disasteranalysis.blob.core.windows.net/disaster-analysis/Stimulus/Satellite/stim1.png?sv=2024-11-04&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2025-11-08T22:18:28Z&st=2025-03-25T13:18:28Z&sip=0.0.0.0-255.255.255.255&spr=https&sig=8dre37EhqprjpZn4Qqv8rdL4uhaIYUoNy%2BLjGEOC1s8%3D
let droneImageList: string[] = Array.from({length: 15}, (_, i) => 
  `${url}/disaster-analysis/Stimulus/Drone/stim${i+1}.png?${token}`
);

let satelliteImageList: string[] = Array.from({length: 15}, (_, i) => 
    `${url}/disaster-analysis/Stimulus/Satellite/stim${i+1}.png?${token}`
  );

let combinedImageList: string[] = Array.from({length: 15}, (_, i) => 
  `${url}/disaster-analysis/Stimulus/Combined/stim${i+1}.png?${token}`
);

const TaskPage: React.FC = () => {
  droneImageList.sort()
  satelliteImageList.sort()
  combinedImageList.sort()

  const { imagesPreloaded: droneImages } = useImagePreloader(droneImageList);
  const { imagesPreloaded: satImages } = useImagePreloader(satelliteImageList);
  const { imagesPreloaded: combinedImages} = useImagePreloader(combinedImageList);
  
  console.log(droneImages)

  const zoomableImageRef1 = useRef<ZoomableImageHandle>(null);
  const zoomableImageRef2 = useRef<ZoomableImageHandle>(null);
  const alertConfirmation = useRef<alertConfirmationHandle>(null);

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [annotationsShowing, setAnnotationsShowing] = useState(true)
  const [beforeImageShowing, setBeforeImageShowing] = useState(true)

  const resetImages = () => {
    zoomableImageRef1.current?.resetZoom();
    zoomableImageRef2.current?.resetZoom();
  };
  const switchAnnotations = () => {
    if(annotationsShowing){
      setAnnotationsShowing(false)
    }else{
      setAnnotationsShowing(true)
    }
  };

  const switchBeforeImage = () => {
    if(beforeImageShowing){
      setBeforeImageShowing(false)
    }else{
      setBeforeImageShowing(true)
    }
  }

  const submit = () => {
    alertConfirmation.current?.showAlert(async () => {
      setIsSubmitted(true);
      try {
        const response = await fetch("https://YOUR_API_ENDPOINT/api/save-selection", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
        if (!response.ok) {
          console.error("Failed to save selection");
        }
      } catch (error) {
        console.error("Error saving selection:", error);
      }
    });
  };
  
  const select = () => {
    alertConfirmation.current?.showAlert(async () => {
      setIsSubmitted(true);
      window.location.reload();
    });
  }

return (
  <div style={{ paddingTop: '60px', paddingLeft: '0px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
    { isSubmitted ?
      (
        <div style={{paddingLeft:'325px', paddingRight:'325px'}}>
          <h2>Select which of the highlighted structures you would prioritize for additional damage assessment:</h2>
        </div>
      ) : (
        <div style={{paddingLeft:'325px', paddingRight:'325px'}}>
          <h2>Evaluate the level of damage to the property in the middle of the image with respect to the following damage types:</h2>
          </div>
      )
    }
    
    <h2>Zoom to scroll in the image, click and drag to pan in the image.</h2>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
        <button 
        onClick={() => resetImages()} 
        style={{ padding: '10px 20px', borderRadius: '8px',  cursor: 'pointer', width: '256px' }}
        >
        <a style={{color: 'white'}}> Reset Image Zooms  </a>
        </button>
        {beforeImageShowing ? (
          <div>
            <button 
            onClick={() => switchBeforeImage()} 
            style={{ padding: '10px 20px', borderRadius: '8px',  cursor: 'pointer', width: '256px' }}
            >
            <a style={{color: 'white'}}> Show Pre Disaster  </a>
            </button>
          </div>
        ) : (
          <div>
            <button 
            onClick={() => switchBeforeImage()} 
            style={{ padding: '10px 20px', borderRadius: '8px',  cursor: 'pointer', width: '256px' }}
            >
            <a style={{color: 'white'}}> Show Post Disaster  </a>
            </button>
          </div>
        )
        }

        
    </div>

    <AlertConfirmation ref={alertConfirmation} />

    <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {/* Range Bars Container */}
        <div style={{width: '256px', display: 'flex', flexDirection: 'column', gap: '15px', marginLeft: '20px', marginRight: '20px',
         }}>
            {/* Range Bar 1 */}
            <div>
            <h4><label>Non-Building Property Damage</label></h4>
            <input disabled={isSubmitted} type="range" className="form-range" min="0" max="4" step="1" />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '-10px' }}>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
            </div>
            </div>
            
            {/* Range Bar 3 */}
            <div>
            <h4><label>Damage from Debris</label></h4>
            <input disabled={isSubmitted} type="range" className="form-range" min="0" max="4" step="1" />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '-10px' }}>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
            </div>
            </div>
            
            {/* Range Bar 4 */}
            <div>
            <h4><label>Damage that Prevents Access</label></h4>
            <input disabled={isSubmitted} type="range" className="form-range" min="0" max="4" step="1" />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '-10px' }}>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
            </div>
            </div>

            <div>
            <h4><label>Damage to Structures</label></h4>
            <input disabled={isSubmitted} type="range" className="form-range" min="0" max="4" step="1" />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '-10px' }}>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
            </div>
            </div>
            <div>
            </div>
        </div>
        {beforeImageShowing ? (
          <div>
            <ZoomableImage ref={zoomableImageRef1} image={droneImages[12]} altText="Image 1" />
            <ZoomableImage ref={zoomableImageRef2} image={droneImages[4]} altText="Image 2" />
          </div>
        ) : (
          <div>
            <ZoomableImage ref={zoomableImageRef1} image={satImages[12]} altText="Image 1" />
            <ZoomableImage ref={zoomableImageRef2} image={satImages[4]} altText="Image 2" />
          </div>
        )}
        
        
        

        {/* Range Bars Container */}
        <div style={{ width: '256px', display: 'flex', flexDirection: 'column', gap: '15px', marginLeft: '20px' }}>
            {/* Range Bar 1 */}
            <div>
            <h4><label>Non-Building Property Damage</label></h4>
            <input disabled={isSubmitted} type="range" className="form-range" min="0" max="4" step="1" />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '-10px' }}>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
            </div>
            </div>
            
            {/* Range Bar 3 */}
            <div>
            <h4><label>Damage from Debris</label></h4>
            <input disabled={isSubmitted} type="range" className="form-range" min="0" max="4" step="1" />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '-10px' }}>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
            </div>
            </div>
            
            {/* Range Bar 4 */}
            <div>
            <h4><label>Damage that Prevents Access</label></h4>
            <input disabled={isSubmitted} type="range" className="form-range" min="0" max="4" step="1" />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '-10px' }}>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
            </div>
            </div>

            <div>
            <h4><label>Damage to Structures</label></h4>
            <input disabled={isSubmitted} type="range" className="form-range" min="0" max="4" step="1" />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '-10px'}}>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
            </div>
            </div>
            <div>
            </div>
        </div>
      </div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
      {isSubmitted ? (
        <div>
          <button 
          onClick={() => select()} 
          className="btn btn-primary"
          style={{padding: '10px 20px', marginRight:'-20px', borderRadius: '8px', cursor: 'pointer', width: '325px' }}
          >
          Select Image 1
          </button>
          <button 
          onClick={() => select()} 
          className="btn btn-primary"
          style={{padding: '10px 20px', marginLeft:'40px', borderRadius: '8px', cursor: 'pointer', width: '325px' }}
          >
          Select Image 2
          </button>
        </div>
      ) : (
        <div>
          <button 
          onClick={() => submit()} 
          className="btn btn-primary"
          style={{padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', width: '512px' }}
          >
          Submit Both Image Ratings 
          </button>
        </div>
      )}
      
    </div>
  </div>
  );
};

export default TaskPage;
