// Mock data for recent activities
const activities = [
    {
        type: 'enrollment',
        title: 'New Student Enrolled',
        description: 'Emma Thompson joined Computer Science',
        time: '5 minutes ago',
        icon: '👤'
    },
    {
        type: 'grade',
        title: 'Grades Updated',
        description: 'Mathematics 101 grades posted',
        time: '1 hour ago',
        icon: '📊'
    },
    {
        type: 'attendance',
        title: 'Attendance Marked',
        description: 'Physics class attendance updated',
        time: '2 hours ago',
        icon: '✓'
    }
];

// Populate activity list
function populateActivities() {
    const activityList = document.getElementById('activityList');
    activityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon" style="background-color: ${getActivityColor(activity.type)}">
                ${activity.icon}
            </div>
            <div class="activity-content">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-description">${activity.description}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        </div>
    `).join('');
}

// Get color based on activity type
function getActivityColor(type) {
    const colors = {
        enrollment: '#4a90e2',
        grade: '#2ecc71',
        attendance: '#f1c40f'
    };
    return colors[type] || '#95a5a6';
}

// Modal functionality
const modal = document.getElementById('loginModal');
const loginBtn = document.getElementById('loginBtn');
const closeBtn = document.getElementsByClassName('close')[0];
const loginForm = document.getElementById('loginForm');

loginBtn.onclick = function() {
    modal.style.display = 'block';
}

closeBtn.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

loginForm.onsubmit = function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Here you would typically make an API call to authenticate
    console.log('Login attempt:', { username, password });
    
    // Mock successful login
    alert('Login successful!');
    modal.style.display = 'none';
}

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
    populateActivities();
});