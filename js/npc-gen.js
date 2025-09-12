function weightedRandomPickObject(items) {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let randomNum = Math.random() * totalWeight;
  for (const item of items) {
    if (randomNum < item.weight) return item;
    randomNum -= item.weight;
  }
}

function weightedRandomPickValue(items) {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let randomNum = Math.random() * totalWeight;
  for (const item of items) {
    if (randomNum < item.weight) return item.value;
    randomNum -= item.weight;
  }
}

function pickAncestry(data) {
  const pick = weightedRandomPickObject(data.ancestryWeights);
  if (pick.value === 'Other') {
    const idx = Math.floor(Math.random() * data.otherAncestries.length);
    return data.otherAncestries[idx];
  }
  return pick;
}

/* @saracaudill: I would love to know your reasoning in exporting only this function and not the others in this file. */
export function generateNPC(data) {
  const ancestryDiv = document.getElementById('gen-ancestry');
  const attitudeDiv = document.getElementById('gen-attitude');
  const detailDiv = document.getElementById('gen-detail');

  const ancestry = pickAncestry(data);
  const attitude = weightedRandomPickValue(data.attitude);
  const detailItem =
    data.detail[Math.floor(Math.random() * data.detail.length)];

  let detailText = detailItem.text;
  if (detailItem.linkText && detailItem.url) {
    detailText = detailText.replace(
      '{{link}}',
      `<a href="${detailItem.url}" target="_blank" rel="noopener noreferrer">${detailItem.linkText}</a>`
    );
  }

  ancestryDiv.innerHTML = ancestry.url
    ? `<strong>Ancestry:</strong> <a href="${ancestry.url}" target="_blank" rel="noopener noreferrer">${ancestry.value}</a>`
    : `<strong>Ancestry:</strong> ${ancestry.value}`;

  attitudeDiv.innerHTML = `<strong>Attitude:</strong> ${attitude}`;
  detailDiv.innerHTML = `<strong>Detail:</strong> ${detailText}`;
}
