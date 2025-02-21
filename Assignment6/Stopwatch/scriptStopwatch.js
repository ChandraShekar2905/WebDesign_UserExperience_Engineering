$(document).ready(function () {
  
  // Date Picker instance using Flatpickr.
  const datePickerInstance = flatpickr("#datePicker", {
    dateFormat: "Y-m-d",
    allowInput: false,
  });

  // Set the default date to today.
  datePickerInstance.setDate(new Date());

  // Stopwatch variables.
  let running = false;
  let secondsElapsed = 0;
  let timerInterval = null;

  // Function to format seconds into HH:MM:SS.
  function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return (
      `${hours.toString().padStart(2, "0")}:` +
      `${minutes.toString().padStart(2, "0")}:` +
      `${seconds.toString().padStart(2, "0")}`
    );
  }

  // Async function to start the stopwatch.
  async function startStopwatch() {
    running = true;
    // Start the interval to update time every 1000ms (1 second).
    timerInterval = setInterval(() => {
      secondsElapsed++;
      $("#timeDisplay").text(formatTime(secondsElapsed));
    }, 1000);

    // Wait until 'running' becomes false using a Promise.
    await new Promise((resolve) => {
      const checkStop = setInterval(() => {
        if (!running) {
          clearInterval(checkStop);
          resolve();
        }
      }, 100);
    });
    clearInterval(timerInterval);
  }

  // Button click event handlers.
  $("#startBtn").click(() => {
    if (!running) {
      startStopwatch();
    }
  });

  $("#stopBtn").click(() => {
    running = false;
  });

  $("#resetBtn").click(() => {
    running = false;
    secondsElapsed = 0;
    $("#timeDisplay").text("00:00:00");
  });
});
