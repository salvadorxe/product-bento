let prevIndex = -1;
let currIndex = -1;
const defaultImageUrl = 'static/main.jpg';


document.querySelectorAll('.btn').forEach((button, index) => {
    button.dataset.index = index;
    button.addEventListener('click', function() {
        currIndex = parseInt(this.dataset.index);
        updateGridImage(this.dataset.target);

        // Remove active class from all buttons and reset icons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.classList.remove('active');
            const icon = btn.querySelector('i');
            if (icon.classList.contains('fa-users')) {
                icon.classList.remove('fa-users');
                icon.classList.add('fa-users-slash');
            } else if (icon.classList.contains('fa-handshake')) {
                icon.classList.remove('fa-handshake');
                icon.classList.add('fa-handshake-slash');
            } else if (icon.classList.contains('fa-bell')) {
                icon.classList.remove('fa-bell');
                icon.classList.add('fa-bell-slash');
            }
        });

        // Add active class to the clicked button
        this.classList.add('active');

        // Change the icon class of the active button
        const icon = this.querySelector('i');
        if (icon.classList.contains('fa-users-slash')) {
            icon.classList.remove('fa-users-slash');
            icon.classList.add('fa-users');
        } else if (icon.classList.contains('fa-handshake-slash')) {
            icon.classList.remove('fa-handshake-slash');
            icon.classList.add('fa-handshake');
        } else if (icon.classList.contains('fa-bell-slash')) {
            icon.classList.remove('fa-bell-slash');
            icon.classList.add('fa-bell');
        }
    });
});

function updateGridImage(target) {
    const image = document.getElementById('grid-image');
    let url = '';

    switch(target) {
        case 'users':
            url = 'static/sorting.png';
            break;
        case 'bell':
            url = 'static/bell.png';
            break;
        case 'hand':
            url = 'static/hand.png';
            break;
        default:
            url = 'static/main.jpg'; // Default image URL
            break;
    }

    let animationName = '';
    if (prevIndex === -1) {
        animationName = 'scrollDown'; // Default animation when no previous index (initial load)
    } else {
        animationName = currIndex > prevIndex ? 'scrollDown' : 'scrollUp';
    }

    image.style.animation = 'none';
    setTimeout(() => {
        image.style.animation = `${animationName} 0.6s ease-in-out`;
        image.src = url;
    }, 10);

    prevIndex = currIndex;
}

function resetToDefaultImage() {
    const image = document.getElementById('grid-image');
    image.style.animation = 'none';
    setTimeout(() => {
        image.style.animation = 'scrollDown 0.6s ease-in-out'; // Default animation
        image.src = defaultImageUrl;
    }, 10);
}

resetToDefaultImage();

const stepClasses = ['step-one', 'step-two', 'step-three', 'step-six', 'step-five', 'step-four'];

// Function to activate steps at specific intervals based on the defined order
function activateSteps() {
    stepClasses.forEach((stepClass, sequenceIndex) => {
        const step = document.querySelector(`.${stepClass}`);
        const icon = step.querySelector('i'); // Select icon within current step
        
        if (step && icon) {
            setTimeout(() => {
                // Add active class to step
                step.classList.add('active');
            }, sequenceIndex * 900); // Adjust delay to synchronize with line animation duration
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    activateSteps();
});
