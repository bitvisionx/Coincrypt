async function predict() {
  const crypto = document.getElementById("cryptoSelect").value;
  const timeframe = parseInt(document.getElementById("timeframeSelect").value);
  const result = document.getElementById("result");
  const priceDisplay = document.getElementById("price");

  try {
    // Fetch current price in EUR using CoinGecko API
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${getCoinGeckoId(crypto)}&vs_currencies=eur`);
    const data = await response.json();
    const price = data[getCoinGeckoId(crypto)].eur;

    priceDisplay.textContent = `Huidige prijs: €${price.toFixed(2)}`;

    // Simulate prediction
    const outcomes = ["stijging 📈", "daling 📉", "stabiel 🤝"];
    const prediction = outcomes[Math.floor(Math.random() * outcomes.length)];

    // Estimate price change
    let change = 0;
    switch (prediction) {
      case "stijging 📈":
        change = price * (Math.random() * 0.05 + 0.01); // +1% to +6%
        break;
      case "daling 📉":
        change = -price * (Math.random() * 0.05 + 0.01); // -1% to -6%
        break;
      case "stabiel 🤝":
        change = 0;
        break;
    }

    const estimatedPrice = price + change;
    result.textContent = `Voorspelling voor ${crypto} over ${timeframe} uur: ${prediction} (geschatte prijs: €${estimatedPrice.toFixed(2)})`;
  } catch (error) {
    console.error("Fout bij het ophalen van de prijs:", error);
    result.textContent = "Er is een fout opgetreden bij het ophalen van de prijs.";
  }
}

function getCoinGeckoId(symbol) {
  const mapping = {
    BTC: "bitcoin",
    ETH: "ethereum",
    BNB: "binancecoin",
    ADA: "cardano",
    SOL: "solana",
    XRP: "ripple",
    DOT: "polkadot",
    LTC: "litecoin",
    DOGE: "dogecoin",
    LPT: "livepeer"
  };
  return mapping[symbol];
}
