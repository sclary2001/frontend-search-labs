const input = document.getElementById("searchInput");
const resultsEl = document.getElementById("results");

input.addEventListener("input", () => {
  const query = input.value;
  const filtered = controlledSearch(query, jsObjectData);
  renderResults(filtered, query);
});

function controlledSearch(query, dataset) {
  const allowedKeys = ["name", "genre", "year", "category"];
  return dataset.filter(item =>
    allowedKeys.some(key =>
      String(item[key]).toLowerCase().includes(query.toLowerCase().trim())
    )
  );
}

function renderResults(data, query = "") {
  if (data.length === 0) {
    resultsEl.innerHTML = "<li>No results found</li>";
    return;
  }
  const regex = new RegExp(`(${query})`, "gi");
  resultsEl.innerHTML = data.map(item => {
    return `<li class="card">
      <strong>${item.name.replace(regex, '<span class="highlight">$1</span>')}</strong> —
      ${String(item.genre).replace(regex, '<span class="highlight">$1</span>')} —
      ${String(item.year).replace(regex, '<span class="highlight">$1</span>')} —
      ${String(item.category).replace(regex, '<span class="highlight">$1</span>')}
    </li>`;
  }).join("");
}

renderResults(jsObjectData);
