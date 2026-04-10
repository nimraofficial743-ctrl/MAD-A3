const ticketsSection = document.getElementById('tickets-section');
const filterInput = document.getElementById('filterInput');
const emptyState = document.getElementById('empty-state');
let tickets = [];

function renderTickets(filterText = '') {
  const normalized = filterText.trim().toLowerCase();
  const filtered = tickets.filter((ticket) =>
    ticket.event.toLowerCase().includes(normalized)
  );

  ticketsSection.innerHTML = '';

  if (filtered.length === 0) {
    emptyState.textContent = 'No tickets found.';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';

  filtered.forEach((ticket) => {
    const card = document.createElement('article');
    card.className = 'ticket-card';
    card.innerHTML = `
      <h3>${ticket.event}</h3>
      <span>User: ${ticket.user_name}</span>
      <span class="seat">Seat: ${ticket.seat_no}</span>
    `;
    ticketsSection.appendChild(card);
  });
}

async function loadTickets() {
  try {
    const resp = await fetch('/tickets');
    if (!resp.ok) throw new Error('Network response not ok');
    tickets = await resp.json();
    if (!Array.isArray(tickets)) tickets = [];
    renderTickets(filterInput.value);
  } catch (error) {
    emptyState.textContent = 'Failed to load tickets. Refresh or check server.';
    emptyState.style.display = 'block';
    console.error('Fetch error:', error);
  }
}

filterInput.addEventListener('input', (e) => renderTickets(e.target.value));

window.addEventListener('DOMContentLoaded', loadTickets);
