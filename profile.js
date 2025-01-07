document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }

    // Display student ID
    document.getElementById('student-id').textContent = loggedInUser;

    // Define editable fields
    const editableFields = ['student-mobile', 'email', 'room'];

    // Make non-editable fields readonly
    document.querySelectorAll('.form-group input').forEach(input => {
        if (!editableFields.includes(input.id)) {
            input.setAttribute('readonly', true);
            input.classList.add('readonly');
        }
    });

    // Navigation functionality
    const navLinks = document.querySelectorAll('.profile-nav a');
    const sections = document.querySelectorAll('.main-content section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            // Update active states
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            sections.forEach(section => {
                section.classList.add('hidden');
                if (section.id === targetId) {
                    section.classList.remove('hidden');
                }
            });
        });
    });

    // Logout functionality
    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'index.html';
    });

    // Personal info form submission
    document.getElementById('personal-info-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get editable field values
        const updatedInfo = {
            studentMobile: document.getElementById('student-mobile').value,
            email: document.getElementById('email').value,
            room: document.getElementById('room').value
        };

        // Here you would typically send this data to a server
        // For now, we'll just show a success message
        alert('Personal information updated successfully!');
    });

    document.getElementById('password-form').addEventListener('submit', (e) => {
        e.preventDefault();
        // Add functionality to change password
        alert('Password updated successfully!');
    });

    // History tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // Add functionality to load different history content
        });
    });

    // Update history section
    function updateHistory() {
        const historyContent = document.querySelector('.history-content');
        if (!historyContent) return;

        const history = JSON.parse(localStorage.getItem('userHistory') || '[]');
        
        // Function to show content based on tab
        function showTabContent(tabType) {
            // Convert tab type to match history item type
            let type;
            switch(tabType) {
                case 'complaints':
                    type = 'Complaint';
                    break;
                case 'leave':
                    type = 'Leave';
                    break;
                case 'feedback':
                    type = 'Feedback';
                    break;
                default:
                    type = tabType;
            }

            const items = history.filter(item => item.type === type);
            
            if (items.length === 0) {
                historyContent.innerHTML = '<p class="no-history">No history available</p>';
                return;
            }

            historyContent.innerHTML = items.map(item => `
                <div class="history-item">
                    <div class="history-date">${item.date}</div>
                    <div class="history-description">${item.description}</div>
                </div>
            `).join('');
        }

        // Add tab click handlers
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                // Show content for selected tab
                showTabContent(btn.dataset.tab);
            });
        });

        // Show complaints by default
        const defaultTab = document.querySelector('.tab-btn[data-tab="complaints"]');
        if (defaultTab) {
            defaultTab.classList.add('active');
            showTabContent('complaints');
        }
    }

    // Call updateHistory when the history section is shown
    document.querySelector('a[href="#history"]')?.addEventListener('click', updateHistory);

    // Also update history immediately if we're on the history section
    if (window.location.hash === '#history') {
        updateHistory();
    }

    // Add some styling for the history items
    const style = document.createElement('style');
    style.textContent = `
        .history-item {
            background: white;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .history-date {
            color: #666;
            font-size: 0.9em;
            margin-bottom: 5px;
        }
        .history-description {
            color: #333;
        }
        .no-history {
            text-align: center;
            color: #666;
            padding: 20px;
        }
    `;
    document.head.appendChild(style);
});