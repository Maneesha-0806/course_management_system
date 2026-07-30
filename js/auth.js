// Wait for the HTML to fully load before doing anything
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // HELPER FUNCTIONS (Keeps code clean)
    // ==========================================
    
    // Helper: Validates if a password is strong AND updates the HTML text
    const checkStrongPassword = (inputElement) => {
        // Requires: 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Char, min 8 chars
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        
        // Find the specific error message div sitting next to this input
        const feedbackDiv = inputElement.parentElement.querySelector('.invalid-feedback');

        if (inputElement.value && !strongRegex.test(inputElement.value)) {
            inputElement.setCustomValidity('Invalid'); // Blocks form submission
            
            if (feedbackDiv) {
                // If it's too short, tell them it's too short
                if (inputElement.value.length < 8) {
                    feedbackDiv.innerText = 'Password must be at least 8 characters long.';
                } else {
                    // If it's long enough but missing a symbol/capital, tell them that!
                    feedbackDiv.innerText = 'Add an uppercase letter, number, and symbol (e.g., @$!%).';
                }
            }
        } else {
            inputElement.setCustomValidity(''); // It's valid!
        }
    };

    // Helper: Triggers loading spinner and prevents double-clicks
    const triggerLoadingState = (form) => {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true; // Lock the button
            const spinner = submitBtn.querySelector('.spinner-border');
            if (spinner) {
                spinner.classList.remove('d-none'); // Show the spinning circle
            }
        }
    };


    // ==========================================
    // 1. UNIVERSAL PASSWORD TOGGLE LOGIC
    // ==========================================
    document.querySelectorAll('button').forEach(button => {
        const icon = button.querySelector('.fa-eye, .fa-eye-slash');
        if (icon) {
            button.addEventListener('click', function(event) {
                event.preventDefault(); 
                const inputField = this.parentElement.querySelector('input');
                if (inputField) {
                    if (inputField.type === 'password') {
                        inputField.type = 'text';
                        icon.classList.remove('fa-eye');
                        icon.classList.add('fa-eye-slash');
                    } else {
                        inputField.type = 'password';
                        icon.classList.remove('fa-eye-slash');
                        icon.classList.add('fa-eye');
                    }
                }
            });
        }
    });

    // ==========================================
    // 2. ADMIN LOGIN FORM 
    // ==========================================
    const adminForm = document.getElementById('adminLoginForm');
    if (adminForm) {
        adminForm.addEventListener('submit', function(event) {
            if (!adminForm.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                triggerLoadingState(adminForm); // Form is valid, show spinner!
            }
            adminForm.classList.add('was-validated');
        });
    }

    // ==========================================
    // 3. STUDENT LOGIN FORM 
    // ==========================================
    const studentForm = document.getElementById('studentLoginForm');
    if (studentForm) {
        studentForm.addEventListener('submit', function(event) {
            if (!studentForm.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                triggerLoadingState(studentForm);
            }
            studentForm.classList.add('was-validated');
        });
    }

    // ==========================================
    // 4. STUDENT REGISTRATION FORM 
    // ==========================================
    const studentRegisterForm = document.getElementById('studentRegisterForm');
    if (studentRegisterForm) {
        const studentRegPass = document.getElementById('studentRegisterPassword'); // Assuming this ID exists
        
        if (studentRegPass) {
            studentRegPass.addEventListener('input', () => checkStrongPassword(studentRegPass));
        }

        studentRegisterForm.addEventListener('submit', function(event) {
            if (!studentRegisterForm.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                triggerLoadingState(studentRegisterForm);
            }
            studentRegisterForm.classList.add('was-validated');
        });
    }

    // ==========================================
    // 5. ADMIN REGISTRATION FORM 
    // ==========================================
    const adminRegisterForm = document.getElementById('adminRegisterForm');
    if (adminRegisterForm) {
        const adminEmail = document.getElementById('adminRegisterEmail'); // Ensure this matches your HTML
        const adminRegPass = document.getElementById('adminRegisterPassword');

        // Institutional Email Restriction
        if (adminEmail) {
            adminEmail.addEventListener('input', function() {
                if (adminEmail.value && !adminEmail.value.endsWith('@academiax.edu')) {
                    adminEmail.setCustomValidity('Administrators must use an @academiax.edu email.');
                } else {
                    adminEmail.setCustomValidity('');
                }
            });
        }

        // Strong Password Enforcement
        if (adminRegPass) {
            adminRegPass.addEventListener('input', () => checkStrongPassword(adminRegPass));
        }

        adminRegisterForm.addEventListener('submit', function(event) {
            if (!adminRegisterForm.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                triggerLoadingState(adminRegisterForm);
            }
            adminRegisterForm.classList.add('was-validated');
        });
    }

    // ==========================================
    // 6. RESET PASSWORD FORM 
    // ==========================================
    const resetform = document.getElementById('resetPasswordForm');
    if (resetform) { 
        const newPass = document.getElementById('newPassword');
        const confirmPass = document.getElementById('confirmPassword');

        // Strong Password Check on the first box
        newPass.addEventListener('input', () => checkStrongPassword(newPass));

        // Real-time Match Checker
        const checkPasswordsMatch = () => {
            if (confirmPass.value) {
                if (newPass.value === confirmPass.value) {
                    confirmPass.setCustomValidity('');
                } else {
                    confirmPass.setCustomValidity('Passwords do not match');
                }
            }
        };

        newPass.addEventListener('input', checkPasswordsMatch);
        confirmPass.addEventListener('input', checkPasswordsMatch);

        resetform.addEventListener('submit', function(event) {
            // Final check on submit just in case
            if (newPass.value !== confirmPass.value) {
                confirmPass.setCustomValidity('Mismatch');
                const feedbackEl = document.getElementById('confirmFeedback');
                if (feedbackEl) feedbackEl.innerText = "Passwords do not match!";
            }

            if (!resetform.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                triggerLoadingState(resetform);
            }
            resetform.classList.add('was-validated');
        });
    }

    // ==========================================
    // 7. FORGOT PASSWORD FORM 
    // ==========================================
    const forgotform = document.getElementById('forgotPasswordForm');
    if (forgotform) { 
        // Grab the "?role=..." parameter from the web address
        const urlParams = new URLSearchParams(window.location.search);
        const userRole = urlParams.get('role');
        
        const backLink = document.getElementById('backToLoginLink');

        if (backLink) {
            // If the URL says ?role=admin
            if (userRole === 'admin') {
                backLink.href = 'admin-login.html'; // Make sure this matches your actual file name!
                backLink.innerHTML = '<i class="fa-solid fa-arrow-left me-1"></i> Return to Admin Portal';
                backLink.className = 'text-dark text-decoration-none small fw-bold'; 
            } 
            // If the URL says ?role=student
            else if (userRole === 'student') {
                backLink.href = 'student-login.html';
                backLink.innerHTML = '<i class="fa-solid fa-arrow-left me-1"></i> Return to Student Portal';
                backLink.className = 'text-primary text-decoration-none small fw-bold'; 
            }
        }

        forgotform.addEventListener('submit', function(event) {
            if (!forgotform.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                triggerLoadingState(forgotform);
            }
            forgotform.classList.add('was-validated');
        });
    }
});