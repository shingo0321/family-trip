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

async function setupLiffShare() {
  const LIFF_ID = "YOUR_LIFF_ID";
  const shareBtn = document.getElementById("share-btn");

  try {
    await liff.init({ liffId: LIFF_ID });
    if (liff.isInClient() && liff.isApiAvailable("shareTargetPicker")) {
      shareBtn.style.display = "block";
      shareBtn.addEventListener("click", async () => {
        try {
          await liff.shareTargetPicker([
            {
              type: "text",
              text: `${TRIP_DATA.title} ${TRIP_DATA.dateRange}\n${location.href}`
            }
          ]);
        } catch (err) {
          console.error(err);
        }
      });
    }
  } catch (err) {
    // LINE外のブラウザではLIFF初期化に失敗することがあるが、
    // ポータルサイト自体は通常ページとして表示できるため無視する。
    console.log("LIFF init skipped:", err.message);
  }
}

renderHero();
renderItinerary();
renderPackingList();
setupTabs();
setupLiffShare();
