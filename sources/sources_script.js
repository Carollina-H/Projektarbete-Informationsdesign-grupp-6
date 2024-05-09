// Background rgb
function generateRandomColor() {
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  console.log("Generated random color:", randomColor);
  return randomColor;
}

function updateGlow() {
  const form = document.querySelector("main");
  const newColor = generateRandomColor();
  form.style.boxShadow = `0 0 10px 5px ${newColor}`;
  console.log("Updated form glow with new color"); // Log glow update
}

setInterval(updateGlow, 1100);
console.log("Set interval for updating form glow");