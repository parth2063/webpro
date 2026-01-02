// DOM element selection
const name = document.getElementById("name");
const roll = document.getElementById("roll");
const address = document.getElementById("address");

const form = document.getElementById("entryform");
const transcript = document.querySelector("aside");
const show_data = document.querySelector(".show_data");
const btn_output = document.querySelector(".btn_output");

// Counter initialization
let i = parseInt(localStorage.getItem("counter")) || 0;


// Form submission handling
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const rollValue = Number(roll.value);

    //  Check for negative roll number
    if (rollValue < 0) {
        alert("Roll number cannot be negative. Please enter a valid roll number.");
        roll.value = "";  // optional: clear input
        return;           // stop function, nothing stored
    }

    // Create user object
    const user_object = {
        data_name: name.value,
        data_roll: rollValue,
        data_address: address.value
    };

    // Update transcript (overwrite)
    UpdateTranscript(user_object);

    // Store in localStorage
    localStorage.setItem(`user${i}`, JSON.stringify(user_object));
    i++;
    localStorage.setItem("counter", i);

    // Clear form
    form.reset();
});


// Update transcript
function UpdateTranscript(obj) {
    transcript.innerHTML = `
        <h2>Transcript</h2>
        ${description_list(obj)}
    `;
}


// Show all stored users as cards
btn_output.addEventListener("click", function () {
    show_data.innerHTML = ""; // clear old cards

    const total = parseInt(localStorage.getItem("counter")) || 0;

    for (let j = 0; j < total; j++) {
        const user_retrieve = JSON.parse(localStorage.getItem(`user${j}`));
        if (user_retrieve) {
            ShowOutput(user_retrieve, j + 1);
        }
    }
});


// Render single user card
function ShowOutput(obj, j) {
    show_data.innerHTML += `
        <div class="border">
            <h2>User ${j}</h2>
            ${description_list(obj)}
        </div>
    `;
}


// Description list template
function description_list(obj) {
    return `
        <dl class="details">
            <dt>Name:</dt>
            <dd>${obj.data_name}</dd>

            <dt>Roll:</dt>
            <dd>${obj.data_roll}</dd>

            <dt>Address:</dt>
            <dd>${obj.data_address}</dd>
        </dl>
    `;
}