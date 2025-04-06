import React, { useRef, useState } from "react";
import useImagePreloader from '../components/useImagePreloader.tsx';
import AlertConfirmation, { alertConfirmationHandle } from "../components/alertConfirmation.tsx";
import ZoomableImage, {ZoomableImageHandle} from '../components/zoomableImage.tsx'
const url = import.meta.env.VITE_BLOB_URL
const token = import.meta.env.VITE_SAS_TOKEN
const annotatedPath = '/disaster-analysis/stimuli/data_original/train/1002-Boca-Grande.2/'
const originalPath = '/disaster-analysis/stimuli/data_annotated/train/1002-Boca-Grande.2/'

const annotatedImagesList: string[] = Array.from({ length: 5 }, (_, i) => 
  `${url}${annotatedPath}stimuli_${i}.png?${token}`
);

const originalImagesList: string[] = Array.from({ length: 5 }, (_, i) => 
    `${url}${originalPath}stimuli_${i}.png?${token}`
  );


const TaskPage: React.FC = () => {
  const { imagesPreloaded: annotatedImages } = useImagePreloader(annotatedImagesList);
  const { imagesPreloaded: originalImages } = useImagePreloader(originalImagesList);

  const zoomableImageRef1 = useRef<ZoomableImageHandle>(null);
  const zoomableImageRef2 = useRef<ZoomableImageHandle>(null);
  const alertConfirmation = useRef<alertConfirmationHandle>(null);

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [annotationsShowing, setAnnotationsShowing] = useState(false)
  const [beforeImageShowing, setBeforeImageShowing] = useState(false)

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
  <div style={{ paddingLeft: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
    { isSubmitted ?
      (
        <div style={{paddingLeft:'200px', paddingRight:'200px'}}>
          <h1>Select which of the highlighted structures you would prioritize for additional damage assessment:</h1>
        </div>
      ) : (
        <div style={{paddingLeft:'200px', paddingRight:'200px'}}>
          <h1>Ignoring funding, political, and policy considerations, evaluate the level of damage of the highlighted structure with respect to the following damage types:</h1>
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
        {annotationsShowing ? (
          <div>
            <button 
            onClick={() => switchAnnotations()} 
            style={{ padding: '10px 20px', borderRadius: '8px',  cursor: 'pointer', width: '256px' }}
            >
            <a style={{color: 'white'}}> Show Image Annotations  </a>
            </button>
          </div>
        ) : (
          <div>
            <button 
            onClick={() => switchAnnotations()} 
            style={{ padding: '10px 20px', borderRadius: '8px',  cursor: 'pointer', width: '256px' }}
            >
            <a style={{color: 'white'}}> Hide Image Annotations  </a>
            </button>
          </div>
        )
        }
        {beforeImageShowing ? (
          <div>
            <button 
            onClick={() => switchBeforeImage()} 
            style={{ padding: '10px 20px', borderRadius: '8px',  cursor: 'pointer', width: '256px' }}
            >
            <a style={{color: 'white'}}> Show Pre-Disaster Image  </a>
            </button>
          </div>
        ) : (
          <div>
            <button 
            onClick={() => switchBeforeImage()} 
            style={{ padding: '10px 20px', borderRadius: '8px',  cursor: 'pointer', width: '256px' }}
            >
            <a style={{color: 'white'}}> Show Post-Disaster Image  </a>
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
            <h4><label>Water Damage</label></h4>
            <input disabled={isSubmitted} type="range" className="form-range" min="0" max="100" step="1" />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '-10px' }}>
                <span>Low</span>
                <span>High</span>
            </div>
            </div>
            
            {/* Range Bar 3 */}
            <div>
            <h4><label>Physical Damage to Structures</label></h4>
            <input disabled={isSubmitted} type="range" className="form-range" min="0" max="100" step="1" />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '-10px' }}>
                <span>Low</span>
                <span>High</span>
            </div>
            </div>
            
            {/* Range Bar 4 */}
            <div>
            <h4><label>Damage that Prevents Access</label></h4>
            <input disabled={isSubmitted} type="range" className="form-range" min="0" max="100" step="1" />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '-10px' }}>
                <span>Low</span>
                <span>High</span>
            </div>
            </div>

            <div>
            <h4><label>Overall Damage</label></h4>
            <input disabled={isSubmitted} type="range" className="form-range" min="0" max="100" step="1" />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '-10px' }}>
                <span>Low</span>
                <span>High</span>
            </div>
            </div>
            <div>
            </div>
        </div>
        {annotationsShowing ? (
          <div> 
            <ZoomableImage ref={zoomableImageRef1} image={annotatedImages[0]} altText="Image 1" />
            <ZoomableImage ref={zoomableImageRef2} image={annotatedImages[1]} altText="Image 2" />
          </div>
        ) : (
          <div> 
            <ZoomableImage ref={zoomableImageRef1} image={originalImages[0]} altText="Image 1" />
            <ZoomableImage ref={zoomableImageRef2} image={originalImages[1]} altText="Image 2" />
          </div>
        )}
        

        {/* Range Bars Container */}
        <div style={{ width: '256px', display: 'flex', flexDirection: 'column', gap: '15px', marginLeft: '20px' }}>
            {/* Range Bar 1 */}
            <div>
            <h4><label>Water Damage</label></h4>
            <input disabled={isSubmitted} type="range" className="form-range" min="0" max="100" step="1" />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '-10px' }}>
                <span>Low</span>
                <span>High</span>
            </div>
            </div>
            
            {/* Range Bar 3 */}
            <div>
            <h4><label>Physical Damage to Structures</label></h4>
            <input disabled={isSubmitted} type="range" className="form-range" min="0" max="100" step="1" />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '-10px' }}>
                <span>Low</span>
                <span>High</span>
            </div>
            </div>
            
            {/* Range Bar 4 */}
            <div>
            <h4><label>Damage that Prevents Access</label></h4>
            <input disabled={isSubmitted} type="range" className="form-range" min="0" max="100" step="1" />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '-10px' }}>
                <span>Low</span>
                <span>High</span>
            </div>
            </div>

            <div>
            <h4><label>Overall Damage</label></h4>
            <input disabled={isSubmitted} type="range" className="form-range" min="0" max="100" step="1" />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '-10px' }}>
                <span>Low</span>
                <span>High</span>
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
          style={{padding: '10px 20px', marginRight:'-20px', borderRadius: '8px', cursor: 'pointer', width: '350px' }}
          >
          Select Image 1
          </button>
          <button 
          onClick={() => select()} 
          className="btn btn-primary"
          style={{padding: '10px 20px', marginLeft:'40px', borderRadius: '8px', cursor: 'pointer', width: '350px' }}
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
