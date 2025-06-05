document.addEventListener('DOMContentLoaded', () => {
    const addEmployeeForm = document.getElementById('add-employee-form');
    const token = localStorage.getItem('access_token');

    addEmployeeForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const employeeData = {
            first_name: document.getElementById('first_name').value,
            last_name: document.getElementById('last_name').value,
            email: document.getElementById('email').value,
            department: document.getElementById('department').value,
            salary: parseFloat(document.getElementById('salary').value),
            hire_date: document.getElementById('hire_date').value
        };

        try {
            const response = await fetch('http://localhost:5000/api/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(employeeData)
            });

            if (response.ok) {
                window.location.href = 'dashboard.html';
            } else {
                const errorData = await response.json();
                alert(errorData.msg || 'Failed to add employee');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});