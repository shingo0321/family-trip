function renderHero() {
  document.getElementById("hero-title").textContent = TRIP_DATA.title;
  document.getElementById("hero-subtitle").textContent = TRIP_DATA.subtitle;
  document.getElementById("hero-date").textContent = TRIP_DATA.dateRange;
}

function renderItinerary() {
  const container = document.getElementById("itinerary-panel");
  container.innerHTML = TRIP_DATA.itinerary
    .map(
      (day) => `
        <div class="day-block">
          <h2>${day.date}</h2>
          ${day.items
            .map(
              (item) => `
                <div class="timetable-item">
                  <div class="time">${item.time}</div>
                  <div>
                    <div class="title">${item.title}</div>
                    <div class="place">${item.place}</div>
                  </div>
                </div>
              `
            )
            .join("")}
        </div>
      `
    )
    .join("");
}

function renderMap() {
  const container = document.getElementById("map-panel");
  const places = [...new Set(
    TRIP_DATA.itinerary.flatMap((day) => day.items.map((item) => item.place)).filter(Boolean)
  )];

  container.innerHTML = places
    .map(
      (place) => `
        <a class="map-item" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}" target="_blank" rel="noopener">
          <span class="map-item-place">${place}</span>
          <span class="map-item-arrow">›</span>
        </a>
      `
    )
    .join("");
}

function renderPackingList() {
  const container = document.getElementById("packing-panel");
  const checkedKey = (category, item) => `packing:${category}:${item}`;

  container.innerHTML = TRIP_DATA.packingList
    .map(
      (group) => `
        <div class="packing-category">
          <h2>${group.category}</h2>
          ${group.items
            .map((item, i) => {
              const id = `packing-${group.category}-${i}`;
              return `
                <div class="packing-item">
                  <input type="checkbox" id="${id}" data-key="${checkedKey(group.category, item)}" />
                  <label for="${id}">${item}</label>
                </div>
              `;
            })
            .join("")}
        </div>
      `
    )
    .join("");

  container.querySelectorAll('input[type="checkbox"]').forEach((box) => {
    const key = box.dataset.key;
    box.checked = localStorage.getItem(key) === "1";
    box.addEventListener("change", () => {
      localStorage.setItem(key, box.checked ? "1" : "0");
    });
  });
}

function setupTabs() {
  const buttons = document.querySelectorAll("nav.tabs button");
  const panels = document.querySelectorAll("section.panel");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.target).classList.add("active");
    });
  });
}

function setupSwipe() {
  const buttons = document.querySelectorAll("nav.tabs button");
  let startX = 0;
  let startY = 0;

  document.addEventListener(
    "touchstart",
    (e) => {
      startX = e.changedTouches[0].screenX;
      startY = e.changedTouches[0].screenY;
    },
    { passive: true }
  );

  document.addEventListener(
    "touchend",
    (e) => {
      const deltaX = e.changedTouches[0].screenX - startX;
      const deltaY = e.changedTouches[0].screenY - startY;

      if (Math.abs(deltaX) < 50 || Math.abs(deltaX) < Math.abs(deltaY) * 1.5) return;

      const currentIndex = [...buttons].findIndex((b) => b.classList.contains("active"));
      const nextIndex = deltaX < 0 ? currentIndex + 1 : currentIndex - 1;

      if (nextIndex >= 0 && nextIndex < buttons.length) {
        buttons[nextIndex].click();
      }
    },
    { passive: true }
  );
}

renderHero();
renderItinerary();
renderMap();
renderPackingList();
setupTabs();
setupSwipe();
