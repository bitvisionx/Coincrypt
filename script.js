const API_URL = "https://api.bitvavo.com/v2/markets";
let coins = [];

async function fetchCoins() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    coins = data
      .filter(m => m.market.endsWith("-EUR"))
      .map(m => m.market.replace("-EUR", "").toUpperCase())
      .sort();

    if (!coins.includes("LPT")) coins.push("LPT"); // Voeg Livepeer toe

    renderSelect();
  } catch (e) {
    console.error("Fout bij ophalen coins:", e);
    document.getElementById("livePrice").textContent = "Fout bij laden";
  }
}

function renderSelect() {
  const select = document.getElementById("cryptoSelect");
  select.innerHTML = coins.map(coin => `<option value="${coin}">${coin}</option>`).join("");

  select.addEventListener("change", () => updatePrediction(select.value));
  updatePrediction(select.value);
}

async function updatePrediction(coin) {
  const priceEl = document.getElementById("livePrice");
  const changeEl = document.getElementById("changeEstimate");

  try {
    const res = await fetch(`https://api.bitvavo.com/v2/ticker/price?market=${coin}-EUR`);
    const data = await res.json();
    const price = parseFloat(data.price);
    priceEl.textContent = `€${price.toFixed(2)}`;

    const estimates = {
      "1h": generatePrediction(price),
      "6h": generatePrediction(price),
      "24h": generatePrediction(price)
    };

    changeEl.textContent = `± €${(estimates["6h"].delta).toFixed(2)}`;
    document.getElementById("pred1h").textContent = estimates["1h"].text;
    document.getElementById("pred6h").textContent = estimates["6h"].text;
    document.getElementById("pred24h").textContent = estimates["24h"].text;

  } catch (e) {
    priceEl.textContent = "Fout";
    console.error("Live prijs ophalen mislukt", e);
  }
}

function generatePrediction(price) {
  const delta = (Math.random() - 0.5) * 0.05 * price; // +/- 5%
  const direction = delta > 0 ? "📈 stijging" : "📉 daling";
  return {
    delta,
    text: `${direction} van €${Math.abs(delta).toFixed(2)}`
  };
}

fetchCoins();
