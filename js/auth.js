// auth.js - Main controller orchestrating imports

import { loginUser, registerUser } from './api.js';
import { checkStrongPassword, checkInstitutionalEmail, checkPasswordsMatch, initFormValidation } from './validation.js';
import { setupPasswordToggles, triggerLoadingState, setupDynamicBackLink } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize UI Elements globally
    setupPasswordToggles();
    setupDynamicBackLink('backToLoginLink');

    // 2. Setup Admin Login
    initFormValidation(document.getElementById('adminLoginForm'), async (form) => {
        triggerLoadingState(form);
        const email = document.getElementById('adminEmail').value;
        await loginUser(email, 'password_mock', 'admin');
        window.location.href = '../admin/admin-dashboard.html';
    });

    // 3. Setup Student Login
    initFormValidation(document.getElementById('studentLoginForm'), async (form) => {
        triggerLoadingState(form);
        const email = document.getElementById('studentEmail').value;
        await loginUser(email, 'password_mock', 'student');
        window.location.href = '../student/dashboard.html';
    });

    // 4. Setup Admin Registration
    const adminRegForm = document.getElementById('adminRegisterForm');
    if (adminRegForm) {
        const adminEmail = document.getElementById('adminRegisterEmail');
        const adminPass = document.getElementById('adminRegisterPassword');
        
        if (adminEmail) adminEmail.addEventListener('input', () => checkInstitutionalEmail(adminEmail));
        if (adminPass) adminPass.addEventListener('input', () => checkStrongPassword(adminPass));
        
        initFormValidation(adminRegForm, async (form) => {
            triggerLoadingState(form);
            await registerUser({ email: adminEmail.value, firstName: "New Admin" }, 'admin');
            window.location.href = '../admin/admin-dashboard.html';
        });
    }

    // 5. Setup Student Registration
    const studentRegForm = document.getElementById('studentRegisterForm');
    if (studentRegForm) {
        const studentPass = document.getElementById('studentRegisterPassword');
        if (studentPass) studentPass.addEventListener('input', () => checkStrongPassword(studentPass));

        initFormValidation(studentRegForm, async (form) => {
            triggerLoadingState(form);
            await registerUser({ email: "student@test.com", firstName: "New Student" }, 'student');
            window.location.href = '../student/dashboard.html';
        });
    }

    // 6. Setup Reset Password
    const resetForm = document.getElementById('resetPasswordForm');
    if (resetForm) {
        const newPass = document.getElementById('newPassword');
        const confirmPass = document.getElementById('confirmPassword');
        const feedbackEl = document.getElementById('confirmFeedback');

        newPass.addEventListener('input', () => {
            checkStrongPassword(newPass);
            checkPasswordsMatch(newPass, confirmPass, feedbackEl);
        });
        confirmPass.addEventListener('input', () => checkPasswordsMatch(newPass, confirmPass, feedbackEl));

        initFormValidation(resetForm, (form) => {
            triggerLoadingState(form);
            // In a real app, send API request here. For now, redirect to login.
            setTimeout(() => window.location.href = 'student-login.html', 1500);
        });
    }

    // 7. Setup Forgot Password
    initFormValidation(document.getElementById('forgotPasswordForm'), (form) => {
        triggerLoadingState(form);
        // Simulate API call for sending reset email
        setTimeout(() => alert('Reset instructions sent successfully!'), 1000);
    });
});