console.log("script loaded");

document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "gymDays";

  let gymDays = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  function getToday() {
    return new Date().toISOString().split("T")[0];
  }

  function saveDays() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gymDays));
  }

  const button = document.getElementById("markTodayBtn");

  if (!button) {
    console.error("Button not found");
    return;
  }

  button.addEventListener("click", () => {
    const today = getToday();

    if (!gymDays.includes(today)) {
      gymDays.push(today);
      saveDays();
      renderCalendar();
    }
  });

  function renderCalendar() {
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    for (let i = 0; i < firstDay.getDay(); i++) {
      calendar.appendChild(document.createElement("div"));
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const div = document.createElement("div");

      div.className = "day";
      div.textContent = day;

      if (gymDays.includes(dateStr)) {
        div.classList.add("marked");
      }

      calendar.appendChild(div);
    }
  }

  renderCalendar();
});
