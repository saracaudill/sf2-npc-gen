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

fetch('data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to load data');
    }
    return response.json();
  })
  .then(jsonData => {
    data = jsonData;
    generateButton.addEventListener('click', generateNPC);
  })
  .catch(error => console.error(error));

function weightedRandomPick(items) {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let randomNum = Math.random() * totalWeight;
  for (const item of items) {
    if (randomNum < item.weight) return item.value;
    randomNum -= item.weight;
  }
}

function pickAncestry() {
  const pick = weightedRandomPick(data.ancestryWeights);
  if (pick === "Other") {
    const idx = Math.floor(Math.random() * data.otherAncestries.length);
    return data.otherAncestries[idx];
  }
  return pick;
}

function weightedRandomPickFromObjects(arr) {
  const totalWeight = arr.reduce((sum, item) => sum + item.weight, 0);
  let randomNum = Math.random() * totalWeight;
  for (const item of arr) {
    if (randomNum < item.weight) return item.value;
    randomNum -= item.weight;
  }
}

function generateNPC() {
  // Ancestry
  const ancestry = pickAncestry();

  // Attitude
  const attitude = weightedRandomPickFromObjects(data.attitude);

  // Detail
  const detailIndex = Math.floor(Math.random() * data.detail.length);
  const detailItem = data.detail[detailIndex];

  // Prepare detail text with optional link
  let detailText = detailItem.text;
  if (detailItem.linkText && detailItem.url) {
    // Replace {{link}} placeholder with anchor tag
    detailText = detailText.replace(
      '{{link}}',
      `<a href="${detailItem.url}" target="_blank" rel="noopener noreferrer">${detailItem.linkText}</a>`
    );
  }

  ancestryDiv.innerHTML = `Ancestry: ${ancestry}`;
  attitudeDiv.textContent = `Attitude: ${attitude}`;
  detailDiv.innerHTML = `Detail: ${detailText}`;
}