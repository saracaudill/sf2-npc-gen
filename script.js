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

// Load JSON data and add event listener once loaded
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

// Weighted random pick returning the whole object
function weightedRandomPickObject(items) {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let randomNum = Math.random() * totalWeight;
  for (const item of items) {
    if (randomNum < item.weight) return item;
    randomNum -= item.weight;
  }
}

// Pick ancestry object: main list or "otherAncestries"
function pickAncestry() {
  const pick = weightedRandomPickObject(data.ancestryWeights);
  if (pick.value === "Other") {
    // Pick a random other ancestry object
    const idx = Math.floor(Math.random() * data.otherAncestries.length);
    return data.otherAncestries[idx];
  }
  return pick;
}

// Pick attitude string from weighted array
function weightedRandomPickValue(items) {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let randomNum = Math.random() * totalWeight;
  for (const item of items) {
    if (randomNum < item.weight) return item.value;
    randomNum -= item.weight;
  }
}

function generateNPC() {
  // Pick ancestry object (may have url)
  const ancestry = pickAncestry();

  // Pick attitude string
  const attitude = weightedRandomPickValue(data.attitude);

  // Pick random detail object
  const detailIndex = Math.floor(Math.random() * data.detail.length);
  const detailItem = data.detail[detailIndex];

  // Prepare detail text with optional link replacement
  let detailText = detailItem.text;
  if (detailItem.linkText && detailItem.url) {
    detailText = detailText.replace(
      '{{link}}',
      `<a href="${detailItem.url}" target="_blank" rel="noopener noreferrer">${detailItem.linkText}</a>`
    );
  }

  // Render ancestry (linked if URL exists)
  if (ancestry.url) {
    ancestryDiv.innerHTML = `Ancestry: <a href="${ancestry.url}" target="_blank" rel="noopener noreferrer">${ancestry.value}</a>`;
  } else {
    ancestryDiv.textContent = `Ancestry: ${ancestry.value}`;
  }

  // Render attitude and detail
  attitudeDiv.textContent = `Attitude: ${attitude}`;
  detailDiv.innerHTML = `Detail: ${detailText}`;
}
