import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'; // Importamos los estilos globales aquí para que apliquen a todo
import Blackjack from './Blackjack'; // Importamos tu componente principal

// Buscamos el div con id "root" en el index.html
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// Renderizamos la aplicación
root.render(
  <React.StrictMode>
    <Blackjack />
  </React.StrictMode>
);