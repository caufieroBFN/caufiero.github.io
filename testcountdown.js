const bgRelax =
  "https://patisserie-valerie.co.uk/cdn/shop/articles/whats-the-difference-between-afternoon-tea-and-high-tea-706968.jpg?v=1739953917";

const bgParty =
  "https://www.ontariosciencecentre.ca/media/2098/fireworksheader3.jpg";

const dateOne = new Date("2026-08-10");

let elements = document.querySelectorAll(".countdown-block");
const popupOverlay = document.getElementById("popup-overlay");
const countdownSection = document.getElementById("countdown-section");

let dateList = [];
let timeList = [];

popupOverlay.style.display = "none";

function toggleWindow() {
  if (popupOverlay.style.display == "block") {
    popupOverlay.style.display = "none";
  } else {
    popupOverlay.style.display = "block";
  }
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

function updateCounters() {
  //Get current date for context
  let currentDate = new Date();
  let currentYear = currentDate.getYear();
  let currentMonth = currentDate.getMonth();
  let currentDay = currentDate.getDay();
  let currentHours = currentDate.getHours();
  let currentMins = currentDate.getMinutes();
  let currentSeconds = currentDate.getSeconds();

  elements = document.querySelectorAll(".count-text");
  elements.forEach((countdownText, index) => {
    //this ones date
    if (index < dateList.length) {
      let endDate = dateList[index];
      let endYear = endDate.getYear();
      let endMonth = endDate.getMonth();
      let endDay = endDate.getDay();
      let endHours = endDate.getHours();
      let endMins = endDate.getMinutes();
      let endSeconds = endDate.getSeconds();

      let totalDays = 0;
      let yearDiff = endYear - currentYear;
      if (yearDiff >= 0) {
        //something about adding like 365 days or something
      }

      for (let i = currentMonth + 1; i < endMonth; i++) {
        totalDays += getDaysInMonth(currentYear, i);
      }

      totalDays += getDaysInMonth(currentYear, currentMonth) - currentDay;
      totalDays += endDay;

      //final times

      let adjustedHours = 24 - (currentHours - endHours);
      let adjustedMins = 60 - (currentMins - endMins);
      let adjustedSeconds = 60 - (currentSeconds - endSeconds);

      //time values
      let days = 10;

      let fullString = `${totalDays} Days ${adjustedHours} Hours ${adjustedMins} Minutes ${adjustedSeconds} Seconds`;
      countdownText.textContent = fullString;
    }
  });
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

setInterval(updateCounters, 1000);