const API_URL = 'http://localhost:3000/expenses';
let editingId = null;

// DOM elements
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const dateInput = document.getElementById('date');
const addExpenseButton = document.getElementById('addExpense');
const totalExpensesElement = document.getElementById('totalExpenses');
const expenseList = document.getElementById('expenseList');

// Fetch all expenses
async function fetchExpenses() {
  try {
    const response = await fetch(API_URL);
    const expenses = await response.json();
    renderExpenses(expenses);
    updateTotal(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
  }
}

// Render the list of expenses
function renderExpenses(expenses) {
  expenseList.innerHTML = '';
  expenses.forEach(expense => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${expense.description} - $${expense.amount} - ${new Date(expense.date).toLocaleDateString()}
      <button onclick="editExpense('${expense._id}')">Edit</button>
      <button onclick="deleteExpense('${expense._id}')">Delete</button>
    `;
    expenseList.appendChild(li);
  });
}

// Update total expenses
function updateTotal(expenses) {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalExpensesElement.textContent = total.toFixed(2);
}

// Add or update an expense
async function handleAddExpense() {
  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value);
  const date = dateInput.value;

  if (!description || isNaN(amount) || !date) {
    alert('Please fill out all fields!');
    return;
  }

  const expense = { description, amount, date };

  try {
    if (editingId) {
      // Update existing expense
      await fetch(`${API_URL}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
      });
      editingId = null;
    } else {
      // Add new expense
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
      });
    }

    // Clear inputs
    descriptionInput.value = '';
    amountInput.value = '';
    dateInput.value = '';

    fetchExpenses();
  } catch (error) {
    console.error('Error adding/updating expense:', error);
  }
}

// Delete an expense
async function deleteExpense(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchExpenses();
  } catch (error) {
    console.error('Error deleting expense:', error);
  }
}

// Edit an expense
async function editExpense(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const expense = await response.json();
    descriptionInput.value = expense.description;
    amountInput.value = expense.amount;
    dateInput.value = expense.date.split('T')[0];
    editingId = id;
  } catch (error) {
    console.error('Error fetching expense for edit:', error);
  }
}

// Event listeners
addExpenseButton.addEventListener('click', handleAddExpense);

// Initialize
fetchExpenses();
