import React from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';


const App: React.FC = () => {

  const navigate = useNavigate();
  const handleRedirect = (path: string) => {
    navigate('/' + path);
  };
  

  return (
    <div className="app-container">
      <h1>Select a Disaster Analysis Task</h1>
      
      <button onClick={() => handleRedirect("Binary")} className="dropdown-button">
        Binary Disaster Analysis Task
      </button>
      <button onClick={() => handleRedirect("Unary")} className="dropdown-button">
        Unary Disaster Analysis Task
      </button>
      <button onClick={() => handleRedirect("Rating")} className="dropdown-button">
        Rating Disaster Analysis Task
      </button>
      <button onClick={() => handleRedirect("MultiDimensional")} className="dropdown-button">
        Multi-Dimensional Rating Task 
      </button>

    </div>
  );
};

export default App;
