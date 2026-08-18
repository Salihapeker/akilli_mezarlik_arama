const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const resultsEl = document.getElementById("results");
const statusEl = document.getElementById("status");
const mapEl = document.getElementById("map");

let map;
let marker;

function ensureMap() {
  if (!map) {
    map = L.map("map").setView([38.722, 35.486], 15);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
  }
  mapEl.style.display = "block";
  setTimeout(() => map.invalidateSize(), 100);
}

function showLocation(record) {
  ensureMap();
  if (marker) marker.remove();
  marker = L.marker([record.lat, record.lng]).addTo(map);
  marker.bindPopup(
    `<b>${record.name} ${record.surname}</b><br>` +
    `${record.cemetery}<br>Ada: ${record.block} · Parsel: ${record.parcel}<br>Mezar: ${record.graveNo}`
  ).openPopup();
  map.setView([record.lat, record.lng], 18);
}

function renderResults(data) {
  resultsEl.innerHTML = "";
  if (!data.results.length) {
    resultsEl.innerHTML = "<div class='search-card'>Eşleşme bulunamadı. İsmi farklı bir yazımla deneyin.</div>";
    mapEl.style.display = "none";
    return;
  }

  data.results.forEach(r => {
    const card = document.createElement("article");
    card.className = "result";
    card.innerHTML = `
      <div>
        <h3>${r.name} ${r.surname}</h3>
        <div class="meta">
          Mezarlık: ${r.cemetery}<br>
          Bölge: ${r.region}<br>
          Ada: ${r.block} · Parsel: ${r.parcel} · Mezar No: ${r.graveNo}
        </div>
        <button class="locate">Haritada Göster</button>
      </div>
      <div class="score">%${r.matchScore}</div>
    `;
    card.querySelector(".locate").addEventListener("click", () => showLocation(r));
    resultsEl.appendChild(card);
  });
}

async function search() {
  const name = nameInput.value.trim();
  const surname = surnameInput.value.trim();
  if (!name) {
    statusEl.textContent = "Lütfen en azından ad alanını doldurun.";
    return;
  }

  statusEl.textContent = "Akıllı arama yapılıyor...";
  const params = new URLSearchParams({ q: name, surname });
  const response = await fetch(`/api/search?${params}`);
  const data = await response.json();
  statusEl.textContent = `${data.count} olası kayıt bulundu.`;
  renderResults(data);
}

document.getElementById("searchBtn").addEventListener("click", search);
[nameInput, surnameInput].forEach(el => el.addEventListener("keydown", e => {
  if (e.key === "Enter") search();
}));

document.querySelectorAll(".example").forEach(btn => {
  btn.addEventListener("click", () => {
    nameInput.value = btn.dataset.name;
    surnameInput.value = btn.dataset.surname;
    search();
  });
});
