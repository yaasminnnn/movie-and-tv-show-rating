# TV Shows and Movies Web Application

## Description
This project is a responsive web application that provides users with a platform to browse popular TV shows and movies. The application allows users to interact with various features such as user authentication, theme customization (light/dark mode), and filtering results based on categories. The application is designed to provide an engaging and seamless experience, preserving user preferences across sessions.

## Key Features
- **User Authentication**: A secure login system that stores user session data in `localStorage`. Users are redirected to the main page upon successful login and can log out, which clears their session.
- **Theme Customization**: Users can toggle between light and dark modes. The current theme is saved in `localStorage`, so their preference is retained even when they return to the site later.
- **Filtering System**: Users can filter movies and TV shows based on different categories (e.g., "Movies" or "TV Shows"). The selected filter is saved in `localStorage` and reapplied when the user revisits the page, ensuring a personalized browsing experience.
- **Responsive Design**: The application is built to be mobile-friendly and responsive, ensuring a consistent user experience across devices.
- **Modern UI/UX**: Utilizes Bootstrap and custom CSS with CSS variables for a cohesive and modern look.

## How User Preferences Are Managed
### Theme Preference
The application saves the selected theme (light or dark mode) in `localStorage`:
- **Toggling the Theme**: When a user clicks the theme toggle button, the application updates the `night-theme` class on the `body` element and saves the preference (`'light'` or `'dark'`) in `localStorage`.
- **Reapplying the Theme**: On page load, the application checks `localStorage` for a saved theme preference and applies it automatically.

### Filter Preferences
- **Saving Filters**: When a user selects a filter from the dropdown, the choice is stored in `localStorage`.
- **Reapplying Filters**: On subsequent visits, the saved filter is retrieved from `localStorage` and reapplied, displaying the filtered results without needing user interaction.

## Technologies Used
- **HTML, CSS, JavaScript**: Core technologies for building the structure, styling, and interactive behavior.
- **Bootstrap**: For responsive design and consistent UI elements.
- **LocalStorage API**: To store and manage user preferences and session data.

## Author
Yasmin Tleukhan
