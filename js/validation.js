// validation.js - Reusable validation rules and form handlers

export const checkStrongPassword = (inputElement) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const feedbackDiv = inputElement.parentElement.querySelector('.invalid-feedback');

    if (inputElement.value && !strongRegex.test(inputElement.value)) {
        inputElement.setCustomValidity('Invalid');
        if (feedbackDiv) {
            feedbackDiv.innerText = inputElement.value.length < 8 
                ? 'Password must be at least 8 characters long.' 
                : 'Add an uppercase letter, number, and symbol (e.g., @$!%).';
        }
    } else {
        inputElement.setCustomValidity('');
    }
};

export const checkInstitutionalEmail = (inputElement) => {
    const feedbackDiv = inputElement.parentElement.querySelector('.invalid-feedback');
    if (inputElement.value && !inputElement.value.endsWith('@academiax.edu')) {
        inputElement.setCustomValidity('Invalid');
        if (feedbackDiv) feedbackDiv.innerText = 'Administrators must use an @academiax.edu email.';
    } else {
        inputElement.setCustomValidity('');
    }
};

export const checkPasswordsMatch = (newPass, confirmPass, feedbackEl) => {
    if (confirmPass.value) {
        if (newPass.value === confirmPass.value) {
            confirmPass.setCustomValidity('');
        } else {
            confirmPass.setCustomValidity('Mismatch');
            if (feedbackEl) feedbackEl.innerText = "Passwords do not match!";
        }
    }
};

// Reusable form interception pipeline
export const initFormValidation = (formElement, onValidSubmit) => {
    if (!formElement) return;
    
    formElement.addEventListener('submit', (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        if (formElement.checkValidity()) {
            onValidSubmit(formElement); // Execute the passed callback if valid
        }
        formElement.classList.add('was-validated');
    });
};