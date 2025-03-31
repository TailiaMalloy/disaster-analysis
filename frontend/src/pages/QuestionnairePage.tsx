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


const QuestionnairePage: React.FC = () => {
  const { imagesPreloaded: annotatedImages } = useImagePreloader(annotatedImagesList);
  const { imagesPreloaded: originalImages } = useImagePreloader(originalImagesList);

  const zoomableImageRef1 = useRef<ZoomableImageHandle>(null);
  const zoomableImageRef2 = useRef<ZoomableImageHandle>(null);
  const [isSubmitted, setIsSubmitted] = useState(false)
  const alertConfirmation = useRef<alertConfirmationHandle>(null);

  const resetImage = (id: string) => {
    if (id === "Image1") zoomableImageRef1.current?.resetZoom();
    else if (id === "Image2") zoomableImageRef2.current?.resetZoom();
  };

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
        <div><h2>How important were the following features when making your decisions?</h2></div>
      ) : (
        <div><h2>How important were the following features when making your decisions?:</h2></div>
      )
    }

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
          Submit Relavence Ratings 
          </button>
        </div>
      )}
      
    </div>
  </div>
  );
};

export default QuestionnairePage;
