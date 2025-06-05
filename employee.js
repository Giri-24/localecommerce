const API = 'http://localhost:3000/employees';

// Fetch and display employees
function loadEmployees() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector('#empTable tbody');
      tbody.innerHTML = '';
      data.forEach(emp => {
        tbody.innerHTML += `
          <tr>
            <td>${emp.name}</td>
            <td>${emp.email}</td>
            <td>${emp.department}</td>
            <td>
              <button onclick="deleteEmp('${emp.id}')">Delete</button>
            </td>
          </tr>
        `;
      });
    });
}

// Add employee
document.getElementById('empForm').onsubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const department = document.getElementById('department').value;
  fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, department })
  }).then(loadEmployees);
  this.reset();
};

// Delete employee
function deleteEmp(id) {
  fetch(`${API}/${id}`, { method: 'DELETE' }).then(loadEmployees);
}

// Initial load
loadEmployees();
