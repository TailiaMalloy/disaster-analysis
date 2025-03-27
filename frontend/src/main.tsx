import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import './index.css';
import BinaryTask from './components/BinaryTask.tsx';
import UnaryTask from './components/UnaryTask.tsx'
import AllocationTask from './components/AllocationTask.tsx'
import MainTask from './components/MainTask.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Main" element={<MainTask />} />
        <Route path="/Binary" element={<BinaryTask />} />
        <Route path="/Unary" element={<UnaryTask />} />
        <Route path="/Allocation" element={<AllocationTask />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
