export function enableDarkMode() {
  document.body.classList.add("dark-mode");
  localStorage.setItem("theme", "dark");
}

export function disableDarkMode() {
  document.body.classList.remove("dark-mode");
  localStorage.setItem("theme", "light");
}

export function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
}
