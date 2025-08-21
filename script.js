// establish variables to call
const generateButton = document.getElementById('gen-button');
    const ancestryDiv = document.getElementById('gen-ancestry');
    const attitudeDiv = document.getElementById('gen-attitude');
    const detailDiv = document.getElementById('gen-detail');

// create empty object to store data after it loads from json
let data = {
    ancestry: [],
    attitude: [],
    detail: []
}

//fetch npc data from json
fetch('data.json')
    .then(response => {
        if (!response.ok) {
        return {};
    }
        return response.json();
    })

    .then(jsonData => {
        console.log('Data loaded:', jsonData);
        data = jsonData;
        generateButton.addEventListener('click', generateNPC);
    })

//pick random value from each array
function generateNPC() {
    console.log('Generate NPC button clicked');
        const genIndexAncestry = Math.floor(Math.random() * data.ancestry.length);
        const genIndexAttitude = Math.floor(Math.random() * data.attitude.length);
        const genIndexDetail = Math.floor(Math.random() * data.detail.length);

        //display values
        ancestryDiv.textContent = `Ancestry: ${data.ancestry[genIndexAncestry]}`;
        attitudeDiv.textContent = `Attitude: ${data.attitude[genIndexAttitude]}`;
        detailDiv.textContent = `Detail: ${data.detail[genIndexDetail]}`;

}