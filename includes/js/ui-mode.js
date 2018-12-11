const root = document.documentElement;

const modes = ["night-mode", "day-mode"];
const prefDark = matchMedia("(prefers-color-scheme: dark)").matches;
const altClass = modes[+prefDark];

function updateUiMode(isDef = localStorage.getItem("uiMode") == altClass) {
  root.classList[isDef ? "add" : "remove"](altClass);
}
updateUiMode();

const uiModeToggle = document.getElementById("ui-mode-toggle");
uiModeToggle.addEventListener("click", function() {
  let isDef = localStorage.getItem("uiMode") == altClass;
  localStorage.setItem("uiMode", modes[+isDef]);
  isDef = !isDef;
  updateUiMode(isDef);
});

const controls = document.getElementById("controls");
controls.classList.add("ready");

addEventListener("pageshow", function() {
  updateUiMode();
});
