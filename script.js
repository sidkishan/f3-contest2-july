const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");
const activeTimersContainer = document.getElementById("timer-container");
const setTimerBtn = document.getElementById("set-timer-button");
var intervals = [];
var totalSeconds = 0;
//let deleteBtn = document.getElementsByClassName("delete");
//Changing hour, min, secs
function startTimer(currentDiv) {
  totalSeconds--;
  if (totalSeconds >= 0) {
    let hh = Math.floor(totalSeconds / 3600);
    let mm = Math.floor(totalSeconds / 60 - hh * 60);
    let ss = totalSeconds - (hh * 3600 + mm * 60);
    let bolds = currentDiv.getElementsByTagName("b");
    bolds[0].innerText = hh + " hr : ";
    bolds[1].innerText = mm + " mins : ";
    bolds[2].innerText = ss + " secs";
  } else {
    clearInterval(intervals[0]);
    currentDiv.innerHTML =
      "<b>TIMER IS UP !</b> <button class='delete'>STOP</button>";
    currentDiv.style.backgroundColor = "darkgoldenrod";
    window.speechSynthesis.speak(new SpeechSynthesisUtterance("Time is up"));
  }
}

//eventlistener
setTimerBtn.addEventListener("click", () => {
  let hr = Number(hour.value);
  let min = Number(minute.value);
  let sec = Number(second.value);
  if (hr < 0 || min < 0 || min > 59 || sec < 0 || sec > 59) {
    alert("please give a valid time");
  } else {
    totalSeconds = hr * 3600 + min * 60 + sec;
    if (activeTimersContainer.innerText === "You have no timers currently!") {
      activeTimersContainer.innerText = "";
    }
    activeTimersContainer.innerHTML += `<div class="active-timer">
      <span>Time Left :</span>
      <div class="timer-input">
      <b>${hr} hr : </b>
      <b>${min} min : </b>
      <b>${sec} sec</b>
      </div>
      <button class="delete">Delete</button>
  </div>`;
    // deleteBtn = document.getElementsByClassName("delete");
    // removeDiv();
    let activeTimerDivs = document.getElementsByClassName("active-timer");
    let currentTimerDiv = activeTimerDivs[activeTimerDivs.length - 1];

    intervals.push(
      setInterval(() => {
        startTimer(currentTimerDiv);
      }, 1000)
    );
  }
});

//alert(hr + min + sec);
//activeTimersContainer.innerText = "";
// function removeDiv() {
//   deleteBtn.map((btn) => {
//     btn.addEventListener("click", (event) => {
//       let btnRef = event.target;
//       let div = btnRef.parentNode;
//       div.remove();
//       console.log("hellll");
//     });
//   });
// }
