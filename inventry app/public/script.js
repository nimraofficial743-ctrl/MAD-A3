async function fetchInventory() {
  try {
    const response = await fetch('/inventory');
    if (!response.ok) {
      throw new Error('Failed to fetch inventory');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}

function getBadgeClass(quantity) {
  if (quantity > 50) return 'green';
  if (quantity >= 10) return 'yellow';
  return 'red';
}

function renderTable(items) {
  const tbody = document.getElementById('inventoryBody');
  tbody.innerHTML = '';

  items.forEach(item => {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = item.item_name;

    const qtyCell = document.createElement('td');
    qtyCell.textContent = item.quantity;

    const statusCell = document.createElement('td');
    const badge = document.createElement('span');
    badge.className = `badge ${getBadgeClass(item.quantity)}`;
    badge.textContent = item.quantity > 50 ? 'Stocky' : item.quantity >= 10 ? 'Stable' : 'Low';
    statusCell.appendChild(badge);

    row.append(nameCell, qtyCell, statusCell);
    tbody.appendChild(row);
  });
}

function setupSearch(inventory) {
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', () => {
    const term = searchInput.value.trim().toLowerCase();
    const filtered = inventory.filter(item =>
      item.item_name.toLowerCase().includes(term)
    );
    renderTable(filtered);
  });
}

(async function init() {
  const inventory = await fetchInventory();
  renderTable(inventory);
  setupSearch(inventory);
})();