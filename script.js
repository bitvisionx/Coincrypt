function predict() {
  const crypto = document.getElementById("cryptoSelect").value;
  const result = document.getElementById("result");

  const outcomes = ["stijging 📈", "daling 📉", "stabiel 🤝"];
  const prediction = outcomes[Math.floor(Math.random() * outcomes.length)];

  result.textContent = `Voorspelling voor ${crypto} in de komende 6 uur: ${prediction}`;
}
