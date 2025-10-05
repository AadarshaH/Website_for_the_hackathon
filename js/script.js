// This automatically detects if the site is running locally or on a live server.
const isProduction = window.location.hostname !== '127.0.0.1' && window.location.hostname !== 'localhost';

// Set the API_URL based on the environment.
const API_URL = isProduction
  ? 'https://your-live-backend-url.onrender.com/api' // Replace with your actual live backend URL
  : 'http://localhost:3001/api';

function toggleForms() {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (loginForm.style.display === 'none') {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
  } else {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
  }
}

async function register(event) {
  event.preventDefault();
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Registration failed.');
    }
    alert(data.message);
    toggleForms(); // Switch to login form
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}

async function login(event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Login failed.');
    }

    // Hide forms and show welcome message
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('welcomeMessage').style.display = 'block';
    document.getElementById('greeting').textContent = `Hey, ${data.user.name}!`;

  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}
