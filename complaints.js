document.addEventListener('DOMContentLoaded', function() {
    // Check login status
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }

    // Initialize counts in localStorage if they don't exist
    if (!localStorage.getItem('complaintCount')) {
        localStorage.setItem('complaintCount', '0');
    }
    if (!localStorage.getItem('leaveCount')) {
        localStorage.setItem('leaveCount', '0');
    }
    if (!localStorage.getItem('feedbackCount')) {
        localStorage.setItem('feedbackCount', '0');
    }
    if (!localStorage.getItem('userHistory')) {
        localStorage.setItem('userHistory', JSON.stringify([]));
    }

    // Form submissions
    // Complaint Form Handler
    const complaintForm = document.getElementById('complaint-form');
    if (complaintForm) {
        complaintForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Increment complaint count
            const currentCount = parseInt(localStorage.getItem('complaintCount') || '0');
            localStorage.setItem('complaintCount', (currentCount + 1).toString());
            
            // Add to history
            const history = JSON.parse(localStorage.getItem('userHistory') || '[]');
            history.unshift({
                type: 'Complaint',
                description: `New complaint submitted: ${this.querySelector('input').value}`,
                date: new Date().toLocaleDateString()
            });
            localStorage.setItem('userHistory', JSON.stringify(history));
            
            // Update UI
            updateDashboardCounts();
            updateNotifications();
            
            alert('Complaint submitted successfully!');
            this.closest('.complaint-form').classList.add('hidden');
            this.reset();
        });
    }

    // Leave Form Handler
    const leaveForm = document.getElementById('leave-form');
    if (leaveForm) {
        leaveForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Increment leave count
            const currentCount = parseInt(localStorage.getItem('leaveCount') || '0');
            localStorage.setItem('leaveCount', (currentCount + 1).toString());
            
            // Add to history
            const history = JSON.parse(localStorage.getItem('userHistory') || '[]');
            const startDate = this.querySelector('input[type="date"]').value;
            history.unshift({
                type: 'Leave',
                description: `Leave request submitted for date: ${startDate}`,
                date: new Date().toLocaleDateString()
            });
            localStorage.setItem('userHistory', JSON.stringify(history));
            
            // Update UI
            updateDashboardCounts();
            updateNotifications();
            
            alert('Leave request submitted successfully!');
            this.closest('.leave-form').classList.add('hidden');
            this.reset();
        });
    }

    // Feedback Form Handler
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Increment feedback count
            const currentCount = parseInt(localStorage.getItem('feedbackCount') || '0');
            localStorage.setItem('feedbackCount', (currentCount + 1).toString());
            
            // Add to history
            const history = JSON.parse(localStorage.getItem('userHistory') || '[]');
            history.unshift({
                type: 'Feedback',
                description: `New feedback submitted: ${this.querySelector('input').value}`,
                date: new Date().toLocaleDateString()
            });
            localStorage.setItem('userHistory', JSON.stringify(history));
            
            // Update UI
            updateDashboardCounts();
            updateNotifications();
            
            alert('Feedback submitted successfully!');
            this.closest('.feedback-form').classList.add('hidden');
            this.reset();
        });
    }

    // Update dashboard counts function
    function updateDashboardCounts() {
        const complaintCount = localStorage.getItem('complaintCount') || '0';
        const leaveCount = localStorage.getItem('leaveCount') || '0';
        const feedbackCount = localStorage.getItem('feedbackCount') || '0';

        const statCards = document.querySelectorAll('.stat-card p');
        if (statCards[0]) statCards[0].textContent = complaintCount;
        if (statCards[1]) statCards[1].textContent = leaveCount;
        if (statCards[2]) statCards[2].textContent = feedbackCount;
    }

    // Update notifications function
    function updateNotifications() {
        const notificationList = document.querySelector('.notification-list');
        if (!notificationList) return;

        notificationList.innerHTML = ''; // Clear existing notifications
        
        const history = JSON.parse(localStorage.getItem('userHistory') || '[]');
        const recentHistory = history.slice(0, 5); // Show only 5 most recent items

        recentHistory.forEach(item => {
            const notificationElement = document.createElement('div');
            notificationElement.className = 'notification-item';
            notificationElement.innerHTML = `
                <div class="notification-content">
                    <span class="notification-type">${item.type}</span>
                    <p>${item.description}</p>
                    <small>${item.date}</small>
                </div>
            `;
            notificationList.appendChild(notificationElement);
        });
    }

    // Initial update of dashboard and notifications
    updateDashboardCounts();
    updateNotifications();

    // Navigation
    const navLinks = document.querySelectorAll('.dashboard-nav a');
    const sections = document.querySelectorAll('.main-content section');

    // Show dashboard by default
    document.getElementById('dashboard').classList.remove('hidden');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                
                // Update active states
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Hide all sections first
                sections.forEach(section => {
                    section.classList.add('hidden');
                });

                // Show the target section
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.classList.remove('hidden');
                    console.log('Showing section:', targetId); // Debug log
                }
            }
        });
    });

    // Add missing sections to complaints.html
    const mainContent = document.querySelector('.main-content');

    // Add Feedback Section if it doesn't exist
    if (!document.getElementById('feedback')) {
        const feedbackSection = `
            <section id="feedback" class="hidden">
                <h2>Feedback</h2>
                <button class="new-feedback-btn">Submit Feedback</button>
                
                <div class="feedback-form hidden">
                    <h3>Submit Feedback</h3>
                    <form id="feedback-form">
                        <div class="form-group">
                            <label>Title</label>
                            <input type="text" required>
                        </div>
                        <div class="form-group">
                            <label>Category</label>
                            <select required>
                                <option value="">Select Category</option>
                                <option value="hostel">Hostel</option>
                                <option value="mess">Mess</option>
                                <option value="facilities">Facilities</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Rating</label>
                            <select required>
                                <option value="5">Excellent</option>
                                <option value="4">Good</option>
                                <option value="3">Average</option>
                                <option value="2">Poor</option>
                                <option value="1">Very Poor</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <textarea required></textarea>
                        </div>
                        <button type="submit">Submit Feedback</button>
                    </form>
                </div>
                
                <div class="feedback-list">
                    <!-- Feedback items will be listed here -->
                </div>
            </section>`;
        mainContent.insertAdjacentHTML('beforeend', feedbackSection);
    }

    // Add Facilities Section if it doesn't exist
    if (!document.getElementById('facilities')) {
        const facilitiesSection = `
            <section id="facilities" class="hidden">
                <h2>Facilities</h2>
                <div class="facilities-grid">
                    <div class="facility-card">
                        <i class="fas fa-wifi"></i>
                        <h3>Wi-Fi</h3>
                        <p>24/7 High-speed internet access</p>
                        <button class="report-issue-btn">Report Issue</button>
                    </div>
                    <div class="facility-card">
                        <i class="fas fa-tshirt"></i>
                        <h3>Laundry</h3>
                        <p>Washing and drying facilities</p>
                        <button class="report-issue-btn">Report Issue</button>
                    </div>
                    <div class="facility-card">
                        <i class="fas fa-couch"></i>
                        <h3>Common Room</h3>
                        <p>Recreation and study space</p>
                        <button class="report-issue-btn">Report Issue</button>
                    </div>
                </div>
            </section>`;
        mainContent.insertAdjacentHTML('beforeend', facilitiesSection);
    }

    // Button handlers
    const newBtns = document.querySelectorAll('.new-complaint-btn, .new-leave-btn, .new-feedback-btn');
    newBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const formType = this.className.split('-')[1]; // complaint, leave, or feedback
            const form = document.querySelector(`.${formType}-form`);
            if (form) {
                form.classList.toggle('hidden');
            }
        });
    });

    // Report issue buttons
    const reportBtns = document.querySelectorAll('.report-issue-btn');
    reportBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Switch to complaints section and show form
            document.querySelector('a[href="#complaints"]').click();
            document.querySelector('.complaint-form').classList.remove('hidden');
        });
    });

    // Form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formType = this.id.split('-')[0];
            alert(`${formType} submitted successfully!`);
            this.closest(`.${formType}-form`).classList.add('hidden');
        });
    });

    // Sample notifications
    const notifications = [
        { type: 'complaint', message: 'Your complaint #123 has been resolved', date: '2024-02-20' },
        { type: 'leave', message: 'Leave request approved', date: '2024-02-19' },
        { type: 'feedback', message: 'New feedback response received', date: '2024-02-18' }
    ];

    // Populate notifications
    const notificationList = document.querySelector('.notification-list');
    if (notificationList) {
        notifications.forEach(notification => {
            const notificationElement = document.createElement('div');
            notificationElement.className = 'notification-item';
            notificationElement.innerHTML = `
                <div class="notification-content">
                    <span class="notification-type">${notification.type}</span>
                    <p>${notification.message}</p>
                    <small>${notification.date}</small>
                </div>
            `;
            notificationList.appendChild(notificationElement);
        });
    }
}); 