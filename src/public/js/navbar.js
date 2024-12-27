// Lấy các phần tử cần thiết
const toggler = document.querySelector(".navbar__toggler");
const navbarBody = document.querySelector(".navbar__body");
const navbarList = document.querySelector(".navbar__list");
const navbarClose = document.querySelector(".navbar__close");
const navbarSearchClose = document.querySelector(".navbar__search-close");
const navSearchIcon = document.querySelector(".navbar__search-button--mobile");
const navSearch = document.querySelector(".navbar__search");
const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
const dropdownMenus = document.querySelectorAll(".navbar__dropdown-menu");
const dropdowns = document.querySelectorAll(".navbar__item");

// Toggle Navbar
function toggleNavbar() {
  const expanded = toggler.getAttribute("aria-expanded") === "true";
  toggler.setAttribute("aria-expanded", !expanded);
  toggler.setAttribute("aria-label", expanded ? "Close navigation" : "Open navigation");
  navbarBody.classList.toggle("show");
  navbarList.classList.toggle("flex-direction-column");
}

// Toggle Search
function toggleSearch() {
  const expanded = navbarSearchClose.getAttribute("aria-expanded") === "true";
  navbarSearchClose.setAttribute("aria-expanded", !expanded);
  navbarSearchClose.setAttribute("aria-label", expanded ? "Close search" : "Open search");
  navSearch.classList.toggle("show");
}

// Close Navbar
function closeNavbar() {
  toggler.setAttribute("aria-expanded", "false");
  toggler.setAttribute("aria-label", "Close navigation");
  navbarBody.classList.remove("show");
  navbarList.classList.remove("flex-direction-column");
}

// Close Search
function closeSearch() {
  navbarSearchClose.setAttribute("aria-expanded", "false");
  navbarSearchClose.setAttribute("aria-label", "Close search");
  navSearch.classList.remove("show");
}

// Toggle Dropdown Menu
function toggleDropdown(e) {
  const allDropdownMenus = document.querySelectorAll(".navbar__dropdown-menu");
  const allDropdownLinks = document.querySelectorAll(".navbar__link");

  allDropdownMenus.forEach((menu) => menu.classList.remove("active"));
  allDropdownLinks.forEach((link) => link.setAttribute("aria-expanded", "false"));

  const dropdownMenu = e.target.nextElementSibling;
  dropdownMenu.classList.add("active");
  e.target.setAttribute("aria-expanded", "true");
}

// Event Listeners
toggler.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleNavbar();
});
navbarClose.addEventListener("click", closeNavbar);
navbarSearchClose.addEventListener("click", closeSearch);
navSearchIcon.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleSearch();
});
dropdownToggles.forEach((toggle) => {
  toggle.addEventListener("click", toggleDropdown);
});

// Close navbar and dropdowns when clicking outside
document.addEventListener("click", (e) => {
  if (!navbarBody.contains(e.target)) closeNavbar();
  if (!navSearch.contains(e.target)) closeSearch();
});

// Dropdown hover handling
dropdowns.forEach((dropdown) => {
  const link = dropdown.querySelector(".navbar__link");
  const dropdownMenu = dropdown.querySelector(".navbar__dropdown-menu");

  // Khi hover vào phần tử cha hoặc menu con
  dropdown.addEventListener("mouseenter", () => link.setAttribute("aria-expanded", "true"));
  dropdown.addEventListener("mouseleave", () => link.setAttribute("aria-expanded", "false"));
  dropdownMenu.addEventListener("mouseenter", () => link.setAttribute("aria-expanded", "true"));
  dropdownMenu.addEventListener("mouseleave", () => link.setAttribute("aria-expanded", "false"));
});

// Bấm nhanh quá thì nó đổi sai cái icon, check lại sau