//faqs
document.querySelectorAll(".faq-title").forEach((item) => {
  item.addEventListener("click", function () {
    let content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
});

const contactUsBtn = document.getElementById("contactUsBtn");
const popupForm = document.getElementById("popupForm");
const popupOverlay = document.getElementById("popupOverlay");
const closeBtn = document.getElementById("closeBtn");

contactUsBtn.addEventListener("click", function () {
  popupForm.style.display = "block";
  popupOverlay.style.display = "block";
});

closeBtn.addEventListener("click", function () {
  popupForm.style.display = "none";
  popupOverlay.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target === popupOverlay) {
    popupForm.style.display = "none";
    popupOverlay.style.display = "none";
  }
});

// reset the form
document.getElementById("resetFormBtn").addEventListener("click", function () {
  document.querySelectorAll("input, textarea").forEach((input) => (input.value = ""));
  document.querySelectorAll(".star").forEach((star) => star.classList.remove("selected"));
  document.getElementById("ratingMessage").textContent = "";
});

// stars in form
document.querySelectorAll(".star").forEach((star) => {
  star.addEventListener("click", function () {
    let rating = this.getAttribute("data-value");
    document.querySelectorAll(".star").forEach((s) => s.classList.remove("selected"));
    for (let i = 0; i < rating; i++) {
      document.querySelectorAll(".star")[i].classList.add("selected");
    }
    document.getElementById("ratingMessage").textContent = `You rated this ${rating} out of 5 stars.`;
  });
});

// theme switcher
document.getElementById('themeToggleBtn').addEventListener('click', function () {
  const isNightTheme = document.body.classList.toggle('night-theme');

  const currentUser = localStorage.getItem('currentUser');
  const user = currentUser ? JSON.parse(localStorage.getItem(currentUser)) : null;

  if (user) {
    user.theme = isNightTheme ? 'dark' : 'light'; 
    localStorage.setItem(currentUser, JSON.stringify(user)); 
  }

  this.textContent = isNightTheme ? 'Switch to Day Theme' : 'Switch to Night Theme';
});


// read more
document.getElementById("readMoreBtn").addEventListener("click", function () {
  let content = document.getElementById("additionalContent");
  if (content.style.display === "none") {
    content.style.display = "block";
    this.textContent = "Read Less";
  } else {
    content.style.display = "none";
    this.textContent = "Read More";
  }
});

// send rating form submit
popupForm.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const movieName = document.getElementById("popup-movie-name").value.trim();
  const selectedRating = document.querySelector(".star.selected");

  if (!movieName || !selectedRating) {
    alert("Please provide a movie name and select a rating.");
    return;
  }

  const rating = {
    movie: movieName,
    stars: selectedRating.getAttribute("data-value"),
  };

  console.log("New Rating:", rating);

  const currentUser = localStorage.getItem("currentUser");
  const user = currentUser ? JSON.parse(localStorage.getItem(currentUser)) : null;

  if (!user) {
    alert("No logged-in user found. Please log in.");
    return;
  }

  user.ratings = user.ratings || [];
  user.ratings.push(rating);

  localStorage.setItem(currentUser, JSON.stringify(user));

  console.log("Updated User Data with Ratings:", user);

  alert("Rating submitted successfully!");

  // Clear the form
  document.getElementById("popup-movie-name").value = "";
  document.querySelectorAll(".star").forEach((star) => star.classList.remove("selected"));
  document.getElementById("ratingMessage").textContent = "";

});

// keyboard navigation
document.addEventListener('DOMContentLoaded', function () {
  const faqTitles = document.querySelectorAll('.faq-title');
  const faqArray = Array.from(faqTitles);

  document.addEventListener('keydown', function (e) {
    const activeElement = document.activeElement;
    let currentIndex = faqArray.indexOf(activeElement);

    if (currentIndex !== -1) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % faqArray.length;
        faqArray[nextIndex].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + faqArray.length) % faqArray.length;
        faqArray[prevIndex].focus();
      }
    }
  });
});

// array of object (cards)
const cards = [
  {
    image: 'https://cdn-icons-png.flaticon.com/512/4032/4032678.png',
    title: 'Laugh, Cry, Think',
    description: 'TV Shows that make you laugh, cry, and think.',
  },
  {
    image: 'https://cdn-icons-png.flaticon.com/512/5344/5344715.png',
    title: 'Lasting Impression',
    description: 'Movies that leave a lasting impression.',
  },
  {
    image: 'https://png.pngtree.com/png-vector/20220617/ourmid/pngtree-finger-icon-link-modern-graphic-png-image_5112680.png',
    title: 'Entertainment at Fingertips',
    description: 'Streaming platforms that bring entertainment to your fingertips.',
  },
];

// display card in the screen
function displayCards() {
  const container = document.getElementById('cardsContainer');
  container.innerHTML = ''; 

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];

    const cardHTML = `
      <div class="col-lg-4">
        <div class="card">
          <img src="${card.image}" class="card-img-top" alt="${card.title}" />
          <div class="card-body">
            <h5 class="card-title">${card.title}</h5>
            <p class="card-text">${card.description}</p>
          </div>
        </div>
      </div>
    `;

    container.innerHTML += cardHTML; 
  }
}

document.addEventListener('DOMContentLoaded', function() {
  displayCards();
});

// play the sound and animate the button
function playSoundAndAnimate(event) {
  const audio = new Audio('click.mp3'); 
  audio.play();

  const button = event.target; 
  button.style.transform = 'scale(1.1)'; 
  button.style.transition = 'transform 0.2s ease';

  setTimeout(() => {
    button.style.transform = 'scale(1)';
  }, 200);
}

document.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', playSoundAndAnimate);
});

// logout
document.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem('isLoggedIn')) {
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.id = 'logoutBtn';
    logoutBtn.textContent = 'Logout';
    logoutBtn.classList.add('btn', 'btn-danger', 'ml-2');

    logoutBtn.addEventListener('click', function() {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      window.location.href = 'login.html';
    });
  } else {
    window.location.href = 'login.html';
  }
});

// store theme in local store
document.addEventListener('DOMContentLoaded', function () {
  const currentUser = localStorage.getItem('currentUser');
  const user = currentUser ? JSON.parse(localStorage.getItem(currentUser)) : null;

  if (user && user.theme === 'dark') {
    document.body.classList.add('night-theme');
    document.getElementById('themeToggleBtn').textContent = 'Switch to Day Theme';
  } else {
    document.getElementById('themeToggleBtn').textContent = 'Switch to Night Theme';
  }
});


// filtering
// array of objects to filter
const items = [
  { title: 'The Godfather', type: 'movies' },
  { title: 'The Dark Knight', type: 'movies' },
  { title: 'Breaking Bad', type: 'tvshows' },
  { title: 'Stranger Things', type: 'tvshows' },
  { title: 'Avengers: Infinity War', type: 'movies' },
  { title: 'The Sopranos', type: 'tvshows' },
  { title: 'The Matrix', type: 'movies' },
  { title: 'Game of Thrones', type: 'tvshows' },
  { title: 'Pulp Fiction', type: 'movies' },
  { title: 'Friends', type: 'tvshows' },
  { title: 'Schindler\'s List', type: 'movies' },
  { title: 'The Wire', type: 'tvshows' },
  { title: 'The Shawshank Redemption', type: 'movies' },
  { title: 'Westworld', type: 'tvshows' },
  { title: 'Fight Club', type: 'movies' },
  { title: 'The Mandalorian', type: 'tvshows' },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', type: 'movies' },
  { title: 'Better Call Saul', type: 'tvshows' },
  { title: 'The Social Network', type: 'movies' },
  { title: 'The Crown', type: 'tvshows' },
  { title: 'Forrest Gump', type: 'movies' },
  { title: 'Chernobyl', type: 'tvshows' },
  { title: 'Gladiator', type: 'movies' },
  { title: 'The Witcher', type: 'tvshows' },
  { title: 'Django Unchained', type: 'movies' },
  { title: 'The Simpsons', type: 'tvshows' },
  { title: 'The Silence of the Lambs', type: 'movies' },
  { title: 'The Queen\'s Gambit', type: 'tvshows' },
  { title: 'Jurassic Park', type: 'movies' },
  { title: 'The Office', type: 'tvshows' },
  { title: 'Se7en', type: 'movies' },
  { title: 'Black Mirror', type: 'tvshows' },
];

// function to display the items
function displayFilteredResults(filterCategory) {
  const resultsContainer = document.getElementById('filteredResults');
  resultsContainer.innerHTML = '';

  const filteredItems = filterCategory === 'all'
    ? items
    : items.filter(item => item.type === filterCategory);

  if (filteredItems.length === 0) {
    resultsContainer.textContent = 'No results found.';
  } else {
    filteredItems.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.textContent = `${item.title} (${item.type === 'movies' ? 'Movie' : 'TV Show'})`;
      resultsContainer.appendChild(itemElement);
    });
  }
}

// store the filter in local store
document.getElementById('filterSelect').addEventListener('change', function () {
  const selectedCategory = this.value;

  const currentUser = localStorage.getItem('currentUser');
  const user = currentUser ? JSON.parse(localStorage.getItem(currentUser)) : null;

  if (user) {
    user.selectedCategory = selectedCategory; // Save the selected category for the user
    localStorage.setItem(currentUser, JSON.stringify(user)); // Update user data in localStorage
  }

  displayFilteredResults(selectedCategory);
});

document.addEventListener('DOMContentLoaded', function () {
  const currentUser = localStorage.getItem('currentUser');
  const user = currentUser ? JSON.parse(localStorage.getItem(currentUser)) : null;

  const savedCategory = user && user.selectedCategory ? user.selectedCategory : 'all';

  document.getElementById('filterSelect').value = savedCategory;
  displayFilteredResults(savedCategory);
});

// api connection
document.getElementById("movieSearchBtn").addEventListener("click", function () {
  const movieTitle = document.getElementById("movieSearchInput").value.trim();

  if (!movieTitle) {
    alert("Please enter a movie title.");
    return;
  }

  const apiKey = "eba58eb8"; 
  const apiUrl = `https://www.omdbapi.com/?t=${encodeURIComponent(
    movieTitle
  )}&apikey=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "False") {
        document.getElementById("movieInfo").innerHTML =
          "<p>Movie not found. Please try again.</p>";
        return;
      }

      const movieHtml = `
        <div class="card">
          <img src="${data.Poster}" alt="${data.Title}" class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title">${data.Title} (${data.Year})</h5>
            <p class="card-text"><strong>Genre:</strong> ${data.Genre}</p>
            <p class="card-text"><strong>Plot:</strong> ${data.Plot}</p>
            <p class="card-text"><strong>Director:</strong> ${data.Director}</p>
            <p class="card-text"><strong>Actors:</strong> ${data.Actors}</p>
            <p class="card-text"><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
          </div>
        </div>
      `;
      document.getElementById("movieInfo").innerHTML = movieHtml;
    })
    .catch((error) => {
      console.error("Error fetching movie data:", error);
      document.getElementById("movieInfo").innerHTML =
        "<p>There was an error fetching movie data. Please try again later.</p>";
    });
});
