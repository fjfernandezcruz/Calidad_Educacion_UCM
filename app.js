const searchInput = document.querySelector("#resource-search");
const filterButtons = [...document.querySelectorAll(".filter-chip")];
const resourceCards = [...document.querySelectorAll(".resource-card")];
const resultsCount = document.querySelector("#results-count");
const emptyState = document.querySelector("#empty-state");

let activeFilter = "todos";

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es");
}

function updateResources() {
  const searchTerm = normalizeText(searchInput.value.trim());
  let visibleCount = 0;

  for (const card of resourceCards) {
    const matchesCategory = activeFilter === "todos" || card.dataset.category === activeFilter;
    const matchesSearch = normalizeText(card.textContent).includes(searchTerm);
    const isVisible = matchesCategory && matchesSearch;

    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  }

  resultsCount.textContent = `${visibleCount} ${visibleCount === 1 ? "sección" : "secciones"}`;
  emptyState.hidden = visibleCount > 0;
}

searchInput.addEventListener("input", updateResources);

for (const button of filterButtons) {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    for (const filterButton of filterButtons) {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    }

    updateResources();
  });
}

updateResources();
