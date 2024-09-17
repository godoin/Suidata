/**
 * Menu Toggle
 */

import { attachClickHandlerById } from "./eventHandlers.js";

function switchMenuIconSrc(menuSrc) {
  return menuSrc.includes("menu.svg")
    ? "static/assets/images/icons/x-close.svg"
    : "static/assets/images/icons/menu.svg";
}

function handleMenu() {
  const menuIcon = document.getElementById("menu-icon");
  const newIcon = switchMenuIconSrc(menuIcon.src);
  menuIcon.src = newIcon;

  const navItems = document.getElementById(`nav-items`);
  navItems.classList.toggle("active");
}

export function setupToggleListeners() {
  console.log("Common toggle event listeners are running...");
  attachClickHandlerById("menu-btn", handleMenu);
}
