import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
    <div class="loading-spinner"></div>
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

// Show spinner while the editor is loading
if (!editor) {
  loadSpinner();
} else {
  // Initialize the editor or perform any setup needed
  editor.init();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // Register Workbox service worker
  const workboxSW = new Workbox('/sw.js');
  workboxSW.register().then(() => {
    console.log('Service Worker registered successfully.');
  }).catch((error) => {
    console.error('Service Worker registration failed:', error);
  });
} else {
  console.error('Service workers are not supported in this browser.');
}