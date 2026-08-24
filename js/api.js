// api.js - Handles data, mock API requests, and browser storage state

// --- Application State Management ---
export const AppState = {
    getUser: () => JSON.parse(localStorage.getItem('user') || 'null'),
    setUser: (userData) => localStorage.setItem('user', JSON.stringify(userData)),
    setToken: (token) => localStorage.setItem('token', token),
    clearSession: () => localStorage.clear(),
    
    // Course Selection State
    getSelectedCourse: () => sessionStorage.getItem('selectedCourse'),
    setSelectedCourse: (courseId) => sessionStorage.setItem('selectedCourse', courseId)
};

// --- Reusable API Calls (Mocked for Frontend) ---
export const loginUser = async (email, password, role) => {
    return new Promise((resolve) => {
        setTimeout(() => { // Simulate network delay
            const mockUser = { username: email.split('@')[0], email, role };
            AppState.setUser(mockUser);
            AppState.setToken('mock-jwt-token-12345');
            resolve({ success: true, user: mockUser });
        }, 1500);
    });
};

export const registerUser = async (userData, role) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            AppState.setUser({ username: userData.firstName, email: userData.email, role });
            AppState.setToken('mock-jwt-token-67890');
            resolve({ success: true });
        }, 1500);
    });
};

export const logoutUser = () => {
    AppState.clearSession();
    window.location.href = '../index.html';
};