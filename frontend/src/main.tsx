import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import TaskPage from './pages/TaskPage.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskPage />} />
        <Route path="/Task" element={<TaskPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
