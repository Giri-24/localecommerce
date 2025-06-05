document.addEventListener('DOMContentLoaded', () => {
    const employeeTableBody = document.getElementById('employee-table-body');
    const token = localStorage.getItem('access_token');

    // Fetch and display employees
    async function fetchEmployees() {
        try {
            const response = await fetch('http://localhost:5000/api/employees', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch employees');
            }

            const employees = await response.json();
            displayEmployees(employees);
        } catch (error) {
            console.error('Error:', error);
            // Redirect to login if unauthorized
            window.location.href = 'index.html';
        }
    }

    function displayEmployees(employees) {
        employeeTableBody.innerHTML = '';
        employees.forEach(employee => {
            const row = `
                <tr>
                    <td>${employee.first_name} ${employee.last_name}</td>
                    <td>${employee.email}</td>
                    <td>${employee.department}</td>
                    <td>${employee.salary.toFixed(2)}</td>
                    <td>
                        <button onclick="editEmployee(${employee.id})">Edit</button>
                        <button onclick="deleteEmployee(${employee.id})">Delete</button>
                    </td>
                </tr>
            `;
            employeeTableBody.innerHTML += row;
        });
    }

    // Delete employee function
    window.deleteEmployee = async (employeeId) => {
        if (!confirm('Are you sure you want to delete this employee?')) return;

        try {
            const response = await fetch(`http://localhost:5000/api/employees/${employeeId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                fetchEmployees(); // Refresh the list
            }
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    // Edit employee function
    window.editEmployee = (employeeId) => {
        window.location.href = `edit-employee.html?id=${employeeId}`;
    };

    // Initial fetch
    fetchEmployees();
});