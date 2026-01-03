const STORAGE_KEY = "gymDays";

// Load saved days or start empty
let gymDays = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Get today's date as YYYY-MM-DD
function getToday() {
  return new Date().toISOString().split("T")[0];
}

// Save to localStorage
function saveDays() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(gymDays));
}

// Mark today
document.getElementById("markTodayBtn").addEventListener("click", () => {
  const today = getToday();

  if (!gymDays.includes(today)) {
    gymDays.push(today);
    saveDays();
    renderCalendar();
  }
});

// Render calendar for current month
function renderCalendar() {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Empty cells before first day
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

// Initial render
renderCalendar();

