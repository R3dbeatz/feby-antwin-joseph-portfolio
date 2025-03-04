
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Declare gtag for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

createRoot(document.getElementById("root")!).render(<App />);
