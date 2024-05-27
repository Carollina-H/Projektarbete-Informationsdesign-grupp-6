// Funktion för att generera en slumpmässig färg 
function generateRandomColor() {
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  return randomColor; // Returnera den slumpmässigt genererade färgen
}

// Funktion för att uppdatera färg med en ny färg
function updateGlow() {
  const form = document.querySelector("main"); // Hitta formuläret i DOM:en
  const newColor = generateRandomColor(); // Generera en ny slumpmässig färg
  form.style.boxShadow = `0 0 10px 5px ${newColor}`; // Uppdatera glödet runt formuläret med den nya färgen
}

// Köra funktionen updateGlow() med jämna mellanrum
setInterval(updateGlow, 1100); // Uppdatera glödet var 1100 millisekunder

