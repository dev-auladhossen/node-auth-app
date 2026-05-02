const API = ""; // same origin

async function register() {
  const res = await fetch(`${API}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    }),
  });
  const data = await res.json();
  document.getElementById("msg").textContent = data.message;
  if (res.ok) window.location.href = "/index.html";
}

async function login() {
  const res = await fetch(`${API}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    }),
  });
  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("token", data.token);
    window.location.href = "/dashboard.html";
  } else {
    document.getElementById("msg").textContent = data.message;
  }
}

async function loadDashboard() {
  const token = localStorage.getItem("token");
  if (!token) return (window.location.href = "/index.html");
  const res = await fetch(`${API}/api/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (res.ok) document.getElementById("welcome").textContent = data.message;
  else window.location.href = "/index.html";
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "/index.html";
}

// Auto-load dashboard if on that page
if (document.getElementById("welcome")) loadDashboard();
