body {
  background-color: black;
  color: yellow;
  font-family: Arial, sans-serif;
  text-align: center;
  font-size: 24px;
  padding: 20px;
  background-image: url('smiley.png');
  background-size: 200px;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-blend-mode: lighten;
}

.container {
  max-width: 400px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 20px;
  border-radius: 10px;
}

.logo {
  width: 100px;
  margin-bottom: 20px;
}

select, button {
  font-size: 18px;
  margin: 10px 0;
  padding: 10px;
  width: 100%;
}

button {
  background-color: yellow;
  color: black;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #ffea00;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
