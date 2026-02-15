const toggleButton = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

// 1. Check for saved user preference
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// 2. Handle Click Event
toggleButton.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
    }
});