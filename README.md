# Blackjack con React

Un simulador de Blackjack moderno, interactivo y totalmente animado construido con **React** y **Framer Motion**. Este proyecto cuenta con un sistema de economía persistente por sesión, animaciones de cartas realistas en 3D y una arquitectura limpia separando lógica e interfaz.

![Estado del Proyecto](https://img.shields.io/badge/Estado-Terminado-success)
![React](https://img.shields.io/badge/React-18-blue)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animation-purple)

## App Web

https://blackjack-remiro.vercel.app/

## ✨ Características Principales

* **🎮 Gameplay Completo:** Lógica real de Blackjack (pedir, plantarse, valor del As dinámico, turno del Dealer automático).
* **💰 Sistema de Economía:**
    * Empiezas con 1000 Pokéfichas.
    * La Casa (Dealer) tiene 2000 Pokéfichas.
    * Sistema de apuestas antes de cada mano.
    * **Condición de Victoria/Derrota:** ¡El juego termina cuando tú o el Dealer os quedáis en bancarrota!
* **🎬 Animaciones Avanzadas (Framer Motion):**
    * Reparto de cartas secuencial desde el mazo.
    * Efecto de "volteo" (flip) 3D para la carta oculta del Dealer.
    * Entradas suaves y transiciones de estado.
* **🏗 Arquitectura Sólida:**
    * Uso de **Clases** (`Deck.js`) para la lógica de la baraja.
    * Separación de reglas matemáticas en utilidades (`GameRules.js`).
    * Componentes reutilizables (`Card`, `BettingControls`).
* **🎨 Diseño Responsivo:** Tapete estilo casino, HUD de fichas y diseño adaptable.

## 🛠 Tecnologías Utilizadas

* **React (Hooks):** Gestión de estados complejos (`useState`, `useEffect`) y renderizado condicional.
* **Framer Motion:** Para todas las físicas de las cartas y animaciones de UI.
* **CSS3 Moderno:** Flexbox, Grid, Variables y transformaciones 3D.
* **JavaScript (ES6+):** Lógica orientada a objetos para la baraja.

## 📂 Estructura del Proyecto

El proyecto sigue una arquitectura modular para facilitar la escalabilidad:

```text
src/
├── components/
│   ├── Card.jsx           # Componente visual de la carta (con animaciones)
│   └── BettingControls.jsx # Interfaz para realizar apuestas
├── utils/
│   ├── Deck.js            # Clase lógica: Generación y barajado (Fisher-Yates)
│   └── GameRules.js       # Reglas puras: Conteo de puntos y condiciones de victoria
├── Blackjack.jsx          # Controlador principal (Game Loop y Estados)
├── App.css                # Estilos globales y del tablero
└── index.js               # Punto de entrada
