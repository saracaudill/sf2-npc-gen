const generateButton = document.getElementById('gen-button');
const ancestryDiv = document.getElementById('gen-ancestry');
const attitudeDiv = document.getElementById('gen-attitude');
const detailDiv = document.getElementById('gen-detail');

let data = {
  ancestryWeights: [],
  otherAncestries: [],
  attitude: [],
  detail: []
};

// Load data from JSON
fetch('data.json')
  .then(response => {
    if (!response.ok) throw new Error('Failed to load data');
    return response.json();
  })
  .then(jsonData => {
    data = jsonData;
    generateButton.addEventListener('click', generateNPC);
  })
  .catch(error => console.error(error));

// Utility: weighted random pick returning the full object
function weightedRandomPickObject(items) {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let randomNum = Math.random() * totalWeight;
  for (const item of items) {
    if (randomNum < item.weight) return item;
    randomNum -= item.weight;
  }
}

// Utility: pick from main or "otherAncestries"
function pickAncestry() {
  const pick = weightedRandomPickObject(data.ancestryWeights);
  if (pick.value === "Other") {
    const idx = Math.floor(Math.random() * data.otherAncestries.length);
    return data.otherAncestries[idx];
  }
  return pick;
}

// Utility: pick weighted attitude string
function weightedRandomPickValue(items) {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let randomNum = Math.random() * totalWeight;
  for (const item of items) {
    if (randomNum < item.weight) return item.value;
    randomNum -= item.weight;
  }
}

// Generate and render NPC data
function generateNPC() {
  const ancestry = pickAncestry();
  const attitude = weightedRandomPickValue(data.attitude);
  const detailItem = data.detail[Math.floor(Math.random() * data.detail.length)];

  // Prepare detail string (with link, if any)
  let detailText = detailItem.text;
  if (detailItem.linkText && detailItem.url) {
    detailText = detailText.replace(
      '{{link}}',
      `<a href="${detailItem.url}" target="_blank" rel="noopener noreferrer">${detailItem.linkText}</a>`
    );
  }

  // Render ancestry
  if (ancestry.url) {
    ancestryDiv.innerHTML = `<strong>Ancestry:</strong> <a href="${ancestry.url}" target="_blank" rel="noopener noreferrer">${ancestry.value}</a>`;
  } else {
    ancestryDiv.innerHTML = `<strong>Ancestry:</strong> ${ancestry.value}`;
  }

  // Render attitude and detail
  attitudeDiv.innerHTML = `<strong>Attitude:</strong> ${attitude}`;
  detailDiv.innerHTML = `<strong>Detail:</strong> ${detailText}`;
}

// === Community Use Policy Modal Logic ===

const modal = document.getElementById("cup-modal");
const link = document.getElementById("cup-link");
const closeBtn = document.getElementById("close-cup-modal");

if (modal && link && closeBtn) {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
    }
  });
}