document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('card');
    const likeButton = document.getElementById('likeButton');
    const dislikeButton = document.getElementById('dislikeButton');
    const swipeOverlay = document.getElementById('swipeOverlay');
    const profileModal = document.getElementById('profileModal');
    const closeModal = profileModal.querySelector('.close');
    const messageButton = document.getElementById('messageButton');
    const showMoreButton = document.getElementById('showMoreButton');
    const chatPanel = document.getElementById('chatPanel');
    const refreshButton = document.getElementById('refreshButton');
    const themeToggle = document.getElementById('themeToggle');
    const sendMessage = document.getElementById('sendMessage');
    const messageInput = document.getElementById('messageInput');
    const historyPanel = document.getElementById('historyPanel');
    const filters = document.getElementById('filters');
    const ageRange = document.getElementById('ageRange');
    const ageValue = document.getElementById('ageValue');
    const interests = document.getElementById('interests');
    let isSwiping = false;
    let likeCount = 0;
    let dislikeCount = 0;
    let history = [];

    const loadUser = () => {
        document.getElementById('userImage').src = 'https://get.wallhere.com/photo/face-women-model-portrait-window-long-hair-blue-eyes-brunette-photography-dress-Lily-C-hair-Person-skin-Raisa-girl-beauty-smile-eye-woman-lady-bride-photograph-blond-hairstyle-portrait-photography-photo-shoot-brown-hair-118927.jpg';
        document.getElementById('userName').textContent = 'Имя Пользователя';
        document.getElementById('userAge').textContent = 'Возраст: 25';
        document.getElementById('userBio').textContent = 'О себе: Интересный текст о пользователе...';
    };

    const updateHistoryPanel = () => {
        const historyDiv = document.getElementById('history');
        historyDiv.innerHTML = history.map(item => `<p>${item}</p>`).join('');
    };

    const swipe = (direction) => {
        if (isSwiping) return;
        isSwiping = true;
        card.style.transform = direction === 'like' ? 'translateX(100vw)' : 'translateX(-100vw)';
        swipeOverlay.innerHTML = direction === 'like' ? '<span class="heart-overlay">❤️</span>' : '<span class="broken-heart-overlay">💔</span>';
        swipeOverlay.querySelector(`.${direction === 'like' ? 'heart-overlay' : 'broken-heart-overlay'}`).style.opacity = 1;

        setTimeout(() => {
            loadUser();
            card.style.transform = 'translateX(0)';
            swipeOverlay.querySelector(`.${direction === 'like' ? 'heart-overlay' : 'broken-heart-overlay'}`).style.opacity = 0;
            isSwiping = false;

            if (direction === 'like') {
                likeCount++;
                history.push(`Лайк: ${document.getElementById('userName').textContent}`);
            } else {
                dislikeCount++;
                history.push(`Дизлайк: ${document.getElementById('userName').textContent}`);
            }

            updateHistoryPanel();
        }, 500);
    };

    likeButton.addEventListener('click', () => swipe('like'));
    dislikeButton.addEventListener('click', () => swipe('dislike'));

    refreshButton.addEventListener('click', () => {
        loadUser();
        card.style.transform = 'translateX(0)';
    });

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    document.getElementById('userName').addEventListener('click', () => {
        profileModal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
        profileModal.style.display = 'none';
    });

    messageButton.addEventListener('click', () => {
        chatPanel.style.display = chatPanel.style.display === 'none' ? 'flex' : 'none';
    });

    sendMessage.addEventListener('click', () => {
        if (messageInput.value.trim() !== '') {
            const messageDiv = document.createElement('div');
            messageDiv.textContent = messageInput.value;
            document.getElementById('messages').appendChild(messageDiv);
            messageInput.value = '';
        }
    });

    showMoreButton.addEventListener('click', () => {
        alert('Показать больше информации!');
    });

    filters.querySelector('#ageRange').addEventListener('input', (event) => {
        ageValue.textContent = event.target.value;
    });

    filters.querySelector('#interests').addEventListener('change', () => {
        alert('Фильтры изменены!');
    });

    document.getElementById('messageInput').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage.click();
        }
    });

    loadUser();
});
