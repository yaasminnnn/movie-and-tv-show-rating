document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem("currentUser");
  const user = username ? JSON.parse(localStorage.getItem(username)) : null;

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // display user information
  document.getElementById("userName").textContent = user.name;
  document.getElementById("userEmail").textContent = user.email;

  // display user's ratings
  const ratingsContainer = document.getElementById("ratingsContainer");
  if (user.ratings && user.ratings.length > 0) {
    user.ratings.forEach((rating) => {
      const ratingElement = document.createElement("p");
      ratingElement.textContent = `Movie: ${rating.movie}, Rating: ${rating.stars} stars`;
      ratingsContainer.appendChild(ratingElement);
    });
  } else {
    ratingsContainer.textContent = "You haven't rated any movies yet.";
  }

  // logout functionality
  document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });

  // theme toggle functionality
  const themeToggleBtn = document.getElementById("themeToggleBtn");

  // apply saved theme preference
  if (user.theme === "dark") {
    document.body.classList.add("night-theme");
    themeToggleBtn.textContent = "Switch to Light Theme";
  } else {
    themeToggleBtn.textContent = "Switch to Dark Theme";
  }

  // save theme preference to user object
  themeToggleBtn.addEventListener("click", function () {
    document.body.classList.toggle("night-theme");
    const isDarkTheme = document.body.classList.contains("night-theme");
    user.theme = isDarkTheme ? "dark" : "light"; // Save to user object
    localStorage.setItem(username, JSON.stringify(user)); // Update localStorage
    themeToggleBtn.textContent = isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme";
  });

  // open rating form popup
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

  // handle star ratings
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

  // handle form submission
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

    user.ratings = user.ratings || [];
    user.ratings.push(rating);

    localStorage.setItem(username, JSON.stringify(user)); 

    console.log("Updated User Data with Ratings:", user);

    alert("Rating submitted successfully!");

    // clear the form
    document.getElementById("popup-movie-name").value = "";
    document.querySelectorAll(".star").forEach((star) => star.classList.remove("selected"));
    document.getElementById("ratingMessage").textContent = "";
  });

  // play sound and animate buttons
  function playSoundAndAnimate(event) {
    const audio = new Audio("click.mp3");
    audio.play();

    const button = event.target;
    button.style.transform = "scale(1.1)";
    button.style.transition = "transform 0.2s ease";

    setTimeout(() => {
      button.style.transform = "scale(1)";
    }, 200);
  }

  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", playSoundAndAnimate);
  });
});
