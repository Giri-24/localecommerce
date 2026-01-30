document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('employee-form');
    const token = localStorage.getItem('access_token');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const employeeData = {
            first_name: document.getElementById('first-name').value,
            last_name: document.getElementById('last-name').value,
            email: document.getElementById('email').value,
            department: document.getElementById('department').value,
            salary: Number(document.getElementById('salary').value),
            hire_date: document.getElementById('hire-date').value
        };

        try {
            const res = await fetch('http://localhost:5000/api/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(employeeData)
            });

            if (res.ok) {
                alert('Employee Added');
                location.reload();
            } else {
                alert('Failed to add employee');
            }
        } catch (err) {
            console.error(err);
        }
    });
});
