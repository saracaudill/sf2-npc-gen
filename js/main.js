//import npc-gen.js

import { generateNPC } from './npc-gen.js';

//load data.json and link to generate button

let data = {};

fetch('data.json')
  .then(response => {
    if (!response.ok) throw new Error('Failed to load data');
    return response.json();
  })
  .then(jsonData => {
    data = jsonData;
    document.getElementById('gen-button').addEventListener('click', () => {
      generateNPC(data);
    });
  })
  .catch(error => console.error(error));

  //set modal logic

const modal = document.getElementById("cup-modal");
const link = document.getElementById("cup-link");
const closeBtn = document.getElementById("close-cup-modal");

let lastFocusedElement = null;

if (modal && link && closeBtn) {
  const focusableSelectors = [
    'a[href]', 'button', 'input', 'textarea', 'select', '[tabindex]:not([tabindex="-1"])'
  ];

  const getFocusableElements = (element) => {
    return Array.from(element.querySelectorAll(focusableSelectors.join(',')))
      .filter(el => !el.disabled && el.getAttribute('aria-hidden') !== 'true');
  };

  const trapFocus = (e) => {
    const focusableEls = getFocusableElements(modal);
    if (focusableEls.length === 0) return;

    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }
  };

  const openModal = () => {
    lastFocusedElement = document.activeElement;
    modal.style.display = "block";
    modal.setAttribute('aria-hidden', 'false');
    closeBtn.focus();

    document.addEventListener('keydown', trapFocus);
  };

  const closeModal = () => {
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', trapFocus);
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  };

  link.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();
  });

  closeBtn.addEventListener("click", closeModal);

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeModal();
    }
  });
}

