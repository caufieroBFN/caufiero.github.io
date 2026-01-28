const dateOne = new Date("2026-02-01");
const dateCurrentRaw = Date.now();
const dateCurrent = new Date(dateCurrentRaw);

const popupOverlay = document.getElementById("popup-overlay");

let dateList = [];
let timeList = [];

function toggleWindow() {
    if (popupOverlay.style.display == "block") {
        popupOverlay.style.display = "none";
    } else {
        popupOverlay.style.display = "block";
    }
}

dateList[0] = dateOne;

function updateCounters() {
    //resetting current time
    const now = new Date();
    //millisecond difference

    for (let i = 0; i < dateList.length; i++) {
        const diffMs = dateList[i] - now;

        // turns milliseconds to seconds
        const totalSeconds = Math.floor(diffMs / 1000);

        const days = Math.floor(totalSeconds / 86400);

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        const adjustedHours = Math.floor(hours - days * 24);
        const adjustedMinutes = Math.floor(minutes - hours * 60);

        console.log(`${days}d ${adjustedHours}h ${adjustedMinutes}m ${seconds}s`);

        //NEW STUFF HERE
        const dateDisplay = `${days} days ${adjustedHours} hours ${adjustedMinutes} minutes ${seconds} seconds`;
        const blocks = document.querySelectorAll(".countdown-block");

        const titleText = blocks[i].querySelector(".massive-text");
        titleText.textContent = "THIS IS A TEST";
        titleText.style.color = "white";

        const countText = blocks[i].querySelector(".count-text");
        countText.style.color = "white";
        countText.textContent = dateDisplay;
    }

    //blocks[0].style.backgroundColor = eventColor;
}

function newCounter() {
    const popup = popupOverlay.querySelector(".popup");

    const eventName = popup.querySelector("#event-name").value;
    const eventDate = popup.querySelector("#event-date").value;
    const eventTime = popup.querySelector("#event-time").value;
    const eventColor = popup.querySelector("#event-color").value;
    const blocks = document.querySelectorAll(".countdown-block");


    for (let i = 0; i < blocks.length; i++) {
        //uses date list to determine which of the newest blocks should be used
        if (!dateList[i]) {
            const titleText = blocks[i].querySelector(".massive-text");
            titleText.textContent = eventName;
            titleText.style.color = "white";

            const countText = blocks[i].querySelector(".count-text");
            countText.style.color = "white";

            blocks[i].style.backgroundColor = eventColor;

            dateList[i] = new Date(`${eventDate}T${eventTime}`);
            break;
        }
    }

}

setInterval(updateCounters, 1000);