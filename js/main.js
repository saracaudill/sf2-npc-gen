//import npc-gen.js

import { generateNPC } from './npc-gen.js';

//load data.json and link to generate button

let data = {};

/* @saracaudill: I suggest you create an `init()` function to wrap this logic in. Because opinions vary about where to put initializtion logic in an app, it helps to be able to quickly spot the logic that kicks it all off. */
fetch('data.json')
  .then((response) => {
    /* @saracaudillL: not sure if this is overkill since you have the `.catch()` block later... */
    if (!response.ok) throw new Error('Failed to load data');
    return response.json();
  })
  .then((jsonData) => {
    data = jsonData;

    /* @saracaudill: You have a lot of faith that the data being returned from the json is usable by `generateNPC()`. I suggest you valid to a level you think necessary that the data from the json conforms to what `generateNPC()` expects.  */
    document.getElementById('gen-button').addEventListener('click', () => {
      generateNPC(data);
    });
  })
  .catch(
    /* @saracaudill: A good habit is to have a discrete error handler function so you can modify it easily. */
    (error) => console.error(error)
  );

/* @saracaudill: Consider moving modal logic to a separate logic file similar to `npx-gen.js`. This aide someone like me in that my mental model of your overall app code wouldn't be cluttered with tertiary knowledge of the modal */
//set modal logic

/* @saracaudill: The following declarations can be easier to skim if you contained them in an object that holds all references to DOM elements. */
const modal = document.getElementById('cup-modal');
const link = document.getElementById('cup-link');
const closeBtn = document.getElementById('close-cup-modal');

let lastFocusedElement = null;

if (modal && link && closeBtn) {
  const focusableSelectors = [
    'a[href]',
    'button',
    'input',
    'textarea',
    'select',
    '[tabindex]:not([tabindex="-1"])',
  ];

  const getFocusableElements = (element) => {
    return Array.from(
      element.querySelectorAll(focusableSelectors.join(','))
    ).filter((el) => !el.disabled && el.getAttribute('aria-hidden') !== 'true');
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

  /* @saracaudill: Question: What type of function is this and why is it a good or bad choice? */
  const openModal = () => {
    lastFocusedElement = document.activeElement;
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    closeBtn.focus();

    document.addEventListener('keydown', trapFocus);
  };

  const closeModal = () => {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', trapFocus);
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  };

  link.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });

  closeBtn.addEventListener('click', closeModal);

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });
}
