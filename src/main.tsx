import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Capacitor } from '@capacitor/core';
import App from './App';
import './index.css';
import { initStorage } from './utils/storage';

async function bootstrap() {
  await initStorage();

  if (Capacitor.isNativePlatform()) {
    document.body.classList.add('native-app');
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

void bootstrap();
