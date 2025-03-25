import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import './index.css';
import BinaryTask from './components/BinaryTask.tsx';
import UnaryTask from './components/UnaryTask.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Binary" element={<BinaryTask />} />
        <Route path="/Unary" element={<UnaryTask />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
