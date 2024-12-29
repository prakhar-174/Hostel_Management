// Add this at the beginning of your script file
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const loader = document.querySelector('.loader-wrapper');
        loader.classList.add('fade-out');
        
        setTimeout(function() {
            loader.style.display = 'none';
        }, 500);
    }, 2000); // Reduced to 2 seconds for better UX
});

// ... rest of your existing JavaScript

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navitem");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".navitem a").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Add this after your existing hamburger menu code

let counter = 1;
setInterval(function(){
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if(counter > 3){
        counter = 1;
    }
}, 5000);

document.addEventListener('DOMContentLoaded', function() {
    const loginLink = document.querySelector('.navitem a[href="login.html"]');
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
        // Create profile icon and container
        const profileContainer = document.createElement('div');
        profileContainer.className = 'profile-container';
        
        const profileIcon = document.createElement('a');
        profileIcon.innerHTML = '<i class="fas fa-user-circle"></i>';
        profileIcon.className = 'profile-icon';
        
        const usernameTooltip = document.createElement('span');
        usernameTooltip.className = 'username-tooltip';
        
        // Create tooltip content container
        const tooltipContent = document.createElement('div');
        tooltipContent.className = 'tooltip-content';
        
        // Add username display
        const usernameDisplay = document.createElement('div');
        usernameDisplay.className = 'username-display';
        usernameDisplay.textContent = loggedInUser;
        
        // Add logout button
        const logoutBtn = document.createElement('button');
        logoutBtn.className = 'logout-btn';
        logoutBtn.textContent = 'Logout';
        
        // Add logout functionality
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('loggedInUser');
            window.location.href = 'login.html';
        });
        
        // Assemble the tooltip
        tooltipContent.appendChild(usernameDisplay);
        tooltipContent.appendChild(logoutBtn);
        usernameTooltip.appendChild(tooltipContent);
        
        profileContainer.appendChild(profileIcon);
        profileContainer.appendChild(usernameTooltip);
        
        // Replace login link with profile icon
        loginLink.parentNode.replaceChild(profileContainer, loginLink);
    }
});