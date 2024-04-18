// Get references to HTML elements
const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const canvas = document.getElementById("myCanvas");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const fontPicker = document.getElementById("fontPicker");
const retrieveButton = document.getElementById("retrieveButton");

// Get canvas context
const ctx = canvas.getContext("2d");

// Set up event listeners

// Color picker event listener
colorPicker.addEventListener("change", (e) => {
  // Update stroke and fill styles with the selected color
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
});

// Mouse down event listener
canvas.addEventListener("mousedown", (e) => {
  // Start drawing when the mouse is pressed down
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});

// Mouse move event listener
canvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    // Draw lines when the mouse moves
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    lastX = e.offsetX;
    lastY = e.offsetY;
  }
});

// Mouse up event listener
canvas.addEventListener("mouseup", () => {
  // Stop drawing when the mouse is released
  isDrawing = false;
});

// Canvas color change event listener
canvasColor.addEventListener("change", (e) => {
  // Fill the canvas with the selected color
  ctx.fillStyle = e.target.value;
  ctx.fillRect(0, 0, 800, 500); // Assuming canvas size is fixed
});

// Line width picker event listener
fontPicker.addEventListener("change", (e) => {
  // Update line width with the selected value
  ctx.lineWidth = e.target.value;
});

// Clear button click event listener
clearButton.addEventListener("click", () => {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Save button click event listener
saveButton.addEventListener("click", () => {
  // Save the canvas content as a PNG image
  localStorage.setItem("canvasContents", canvas.toDataURL());
  let link = document.createElement("a");
  link.download = "my-canvas.png";
  link.href = canvas.toDataURL();
  link.click();
});

// Retrieve button click event listener
retrieveButton.addEventListener("click", () => {
  // Retrieve saved canvas content from local storage
  let savedCanvas = localStorage.getItem("canvasContents");
  if (savedCanvas) {
    // Draw the saved image onto the canvas
    let img = new Image();
    img.src = savedCanvas;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
  }
});
 // Touch start event listener
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault(); // Prevent default touch action
  isDrawing = true;
  lastX = e.touches[0].clientX - canvas.offsetLeft;
  lastY = e.touches[0].clientY - canvas.offsetTop;
});

// Touch move event listener
canvas.addEventListener("touchmove", (e) => {
  e.preventDefault(); // Prevent default touch action
  if (isDrawing) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.touches[0].clientX - canvas.offsetLeft, e.touches[0].clientY - canvas.offsetTop);
    ctx.stroke();
    lastX = e.touches[0].clientX - canvas.offsetLeft;
    lastY = e.touches[0].clientY - canvas.offsetTop;
  }
});

// Touch end event listener
canvas.addEventListener("touchend", () => {
  isDrawing = false;
});
