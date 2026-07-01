import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FormsPage } from './forms/FormsPage';
import { FormFillPage } from './forms/FormFillPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormsPage />} />
        <Route path="/forms/:formId" element={<FormFillPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
