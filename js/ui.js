// ui.js - Handles DOM updates and visual state

export const triggerLoadingState = (form) => {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        const spinner = submitBtn.querySelector('.spinner-border');
        if (spinner) spinner.classList.remove('d-none');
    }
};

export const setupPasswordToggles = () => {
    document.querySelectorAll('button').forEach(button => {
        const icon = button.querySelector('.fa-eye, .fa-eye-slash');
        if (icon) {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                const inputField = this.parentElement.querySelector('input');
                if (inputField) {
                    const isPassword = inputField.type === 'password';
                    inputField.type = isPassword ? 'text' : 'password';
                    icon.classList.toggle('fa-eye', !isPassword);
                    icon.classList.toggle('fa-eye-slash', isPassword);
                }
            });
        }
    });
};

export const setupDynamicBackLink = (linkId) => {
    const backLink = document.getElementById(linkId);
    if (!backLink) return;

    const urlParams = new URLSearchParams(window.location.search);
    const userRole = urlParams.get('role');

    if (userRole === 'admin') {
        backLink.href = 'admin_login.html';
        backLink.innerHTML = '<i class="fa-solid fa-arrow-left me-1"></i> Return to Admin Portal';
        backLink.className = 'text-dark text-decoration-none small fw-bold';
    } else if (userRole === 'student') {
        backLink.href = 'student-login.html';
        backLink.innerHTML = '<i class="fa-solid fa-arrow-left me-1"></i> Return to Student Portal';
        backLink.className = 'text-primary text-decoration-none small fw-bold';
    }
};