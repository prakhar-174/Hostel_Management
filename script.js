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
        const profileContainer = document.createElement('div');
        profileContainer.className = 'profile-container';
        
        const profileIcon = document.createElement('a');
        profileIcon.innerHTML = '<i class="fa-regular fa-user"></i>';
        profileIcon.className = 'profile-icon';
        profileIcon.href = 'profile.html';
        
        profileContainer.appendChild(profileIcon);
        loginLink.parentNode.replaceChild(profileContainer, loginLink);
    }
});