// @ts-nocheck
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css'; // Import your styles

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
