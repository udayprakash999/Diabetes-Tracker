document.getElementById("tracker-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const bloodSugar = document.getElementById("blood-sugar").value;
    const heartRate = document.getElementById("heart-rate").value;
    const weight = document.getElementById("weight").value;
    const notes = document.getElementById("notes").value;

    const entry = { title, date, bloodSugar, heartRate, weight, notes };
    saveEntry(entry);
    displayHistory();
    this.reset();
});

function saveEntry(entry) {
    let history = JSON.parse(localStorage.getItem("diabetesHistory")) || [];
    history.push(entry);
    localStorage.setItem("diabetesHistory", JSON.stringify(history));
}

function deleteEntry(index) {
    let history = JSON.parse(localStorage.getItem("diabetesHistory")) || [];
    history.splice(index, 1);
    localStorage.setItem("diabetesHistory", JSON.stringify(history));
    displayHistory();
}

function editEntry(index) {
    let history = JSON.parse(localStorage.getItem("diabetesHistory")) || [];
    const entry = history[index];


    document.getElementById("title").value = entry.title;
    document.getElementById("date").value = entry.date;
    document.getElementById("blood-sugar").value = entry.bloodSugar;
    document.getElementById("heart-rate").value = entry.heartRate;
    document.getElementById("weight").value = entry.weight;
    document.getElementById("notes").value = entry.notes;


    deleteEntry(index);
}

function displayHistory() {
    const history = JSON.parse(localStorage.getItem("diabetesHistory")) || [];
    const historyList = document.getElementById("history-list");
    historyList.innerHTML = "";

    history.forEach((entry, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>Title:</strong> ${entry.title} <br>
            <strong>Date:</strong> ${entry.date} <br>
            <strong>Blood Sugar:</strong> ${entry.bloodSugar} mg/dL <br>
            <strong>Heart Rate:</strong> ${entry.heartRate} BPM <br>
            <strong>Weight:</strong> ${entry.weight} kg <br>
            <strong>Notes:</strong> ${entry.notes} <br>
            <button class="edit-btn" onclick="editEntry(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteEntry(${index})">Delete</button>
        `;
        historyList.appendChild(listItem);
    });
}


document.addEventListener("DOMContentLoaded", displayHistory);
