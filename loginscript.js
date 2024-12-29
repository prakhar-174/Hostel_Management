document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const roleSelect = document.getElementById('role');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const roleMessage = document.getElementById('role-message');

    // Regular expression for student ID validation
    // Matches: 202[2-4]B\d{7} (starts with 2022, 2023, or 2024, followed by 'B' and 7 digits)
    const studentIdPattern = /^202[2-4]B\d{7}$/;

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Reset any previous error messages
        roleMessage.style.color = '#ff0000';
        roleMessage.textContent = '';

        // Check if role is selected
        if (!roleSelect.value) {
            roleMessage.textContent = 'Please select a role';
            return;
        }

        // Only validate student login for now
        if (roleSelect.value === 'student') {
            // Validate student ID format
            if (!studentIdPattern.test(username.value)) {
                roleMessage.textContent = 'Invalid student ID format. Should be like 2023B0121164';
                return;
            }

            // Check for specific test credentials
            if (username.value === '2023B0121164' && password.value === 'Jul77122') {
                roleMessage.style.color = '#008000';
                roleMessage.textContent = 'Login successful!';
                
                // Store username in localStorage for later use
                localStorage.setItem('loggedInUser', username.value);
                
                // Redirect to index.html after a brief delay
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                roleMessage.textContent = 'Invalid username or password';
            }
        } else {
            roleMessage.textContent = 'Only student login is implemented for now';
        }
    });

    // Update role icon when selection changes
    roleSelect.addEventListener('change', function() {
        const selectedOption = roleSelect.options[roleSelect.selectedIndex];
        const icon = document.getElementById('role-icon');
        if (selectedOption.dataset.icon) {
            icon.className = selectedOption.dataset.icon;
        }
    });
});
