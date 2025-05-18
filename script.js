async function fetchPrice(cryptoId) {
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=eur`);
    const data = await response.json();
    return data[cryptoId].eur;
  } catch (error) {
    console.error("Fout bij het ophalen van de prijs:", error);
    return null;
  }
}

async function predict(hours) {
  const cryptoSelect = document.getElementById("cryptoSelect");
  const cryptoId = cryptoSelect.value;
  const cryptoName = cryptoSelect.options[cryptoSelect.selectedIndex].text;
  const result = document.getElementById("result");
  const priceElement = document.getElementById("price");

  const outcomes = ["stijging 📈", "daling 📉", "stabiel 🤝"];
  const prediction = outcomes[Math.floor(Math.random() * outcomes.length)];

  const price = await fetchPrice(cryptoId);
  if (price !== null) {
    priceElement.textContent = `Huidige prijs van ${cryptoName}: €${price}`;
  } else {
    priceElement.textContent = `Prijsinformatie niet beschikbaar voor ${cryptoName}`;
  }

  result.textContent = `Voorspelling voor ${cryptoName} in de komende ${hours} uur: ${prediction}`;
}

// PWA: registreer service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(registration => {
        console.log('ServiceWorker geregistreerd:', registration);
      })
      .catch(error => {
        console.log('ServiceWorker registratie mislukt:', error);
      });
  });
}
