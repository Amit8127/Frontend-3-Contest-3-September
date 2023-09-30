const apiKey = 'k4nUrHuHzOXz5AKUJwUydK5q2dVU2wOVPZqTR1II';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const currentImageContainer = document.getElementById('current-image-container');
const searchHistory = document.getElementById('search-history');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedDate = searchInput.value;
    getImageOfTheDay(selectedDate);
    saveSearch(selectedDate);
});

searchHistory.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        const selectedDate = e.target.textContent;
        getImageOfTheDay(selectedDate);
    }
});

function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split('T')[0];
    getImageOfTheDay(currentDate);
}

function getImageOfTheDay(date) {
    const apiUrl = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            currentImageContainer.innerHTML = `
                <h1>Picture On ${data.date}</h1>
                <img src="${data.media_type == 'video' ? "https://amit8127.github.io/Frontend-3-Contest-3-September/pic.png" : data.url}" alt="${data.title}" width="100%">
                <h2>${data.title}</h2>
                <p>${data.explanation}</p>
            `;
            searchInput.value='';
        })
        .catch((error) => console.error('Error fetching data:', error));
}

function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.push(date);
    localStorage.setItem('searches', JSON.stringify(searches));
    addSearchToHistory(date);
}

function addSearchToHistory(date) {
    const listItem = document.createElement('li');
    listItem.textContent = date;
    searchHistory.appendChild(listItem);
}

getCurrentImageOfTheDay();