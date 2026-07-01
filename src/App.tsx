import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FormsPage } from './forms/FormsPage';
import { FormFillPage } from './forms/FormFillPage';
import { BuilderPage } from './forms/builder/BuilderPage';
import { CustomFormFillPage } from './forms/CustomFormFillPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormsPage />} />
        <Route path="/builder" element={<BuilderPage />} />
        <Route path="/builder/:formId" element={<BuilderPage />} />
        <Route path="/forms/custom_:formId" element={<CustomFormFillPage />} />
        <Route path="/forms/:formId" element={<FormFillPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
