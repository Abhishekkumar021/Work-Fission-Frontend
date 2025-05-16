# WorkFission Frontend

This is the frontend for the Mini E-Commerce Platform, built with **React.js** and **Tailwind CSS** using Vite. It allows users to submit products, view all products, and search/filter products.

---

## Directory Structure

```
workfission-frontend/
│
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── vite.config.js
├── public/
│   └── vite.svg
└── src/
    ├── App.css
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── utils.js
    ├── assets/
    │   └── react.svg
    └── components/
        ├── Loader.jsx
        ├── ProductDetail.jsx
        ├── ProductForm.jsx
        ├── ProductList.jsx
        └── SearchBar.jsx
```

---

## Environment Variables

Create a `.env` file in the root directory:

```
VITE_ORIGIN=http://localhost:3000
```
- Set this to your backend URL if different.

---

## Setup Instructions

1. **Install dependencies:**
   ```sh
   cd workfission-frontend
   npm install
   ```

2. **Start the development server:**
   ```sh
   npm run dev
   ```
   The app will run on [http://localhost:5173](http://localhost:5173) by default.

---

## Features

- **Product Submission Tab:**  
  - Enter product name, price, description, and optional image URLs (comma separated).
  - Submits data to the backend API.

- **My Products Tab:**  
  - Displays all submitted products in a responsive card layout.
  - Shows product name, price, description, and images (with carousel).
  - Newly added products appear instantly.

- **Search:**  
  - Search bar at the top of "My Products".
  - Filters products by name or keywords in description as you type.

- **Product Detail:**  
  - Click a product card to view its details and images in a dedicated view.

---

## What's Working

- [x] Product submission form with validation
- [x] Product list fetched from backend
- [x] Responsive UI with Tailwind CSS
- [x] Real-time search/filtering
- [x] Product detail page
- [x] Immediate update after submission

---

## Screenshots

Below are some screenshots demonstrating the app’s features.  
**Replace the image links after uploading your screenshots to GitHub.**

### Product Submission Tab
![Product Submission Tab](https://github.com/Abhishekkumar021/Work-Fission-Frontend/blob/8caea88a34aef45652ff3d9a756e921074836854/src/assets/screenshots/Product%20Submission%20Tab.png)

### My Products Tab
![My Products Tab](https://github.com/Abhishekkumar021/Work-Fission-Frontend/blob/8caea88a34aef45652ff3d9a756e921074836854/src/assets/screenshots/My%20Products%20Tab.png)

### My Products Tab With Search
![My Products Tab With Search](https://github.com/Abhishekkumar021/Work-Fission-Frontend/blob/80d196daebf6cd28cbfd274e45014ef33d08cc5d/src/assets/screenshots/My%20Products%20Tab%20With%20Search.png)

### Product Detail View
![Product Detail View](https://github.com/Abhishekkumar021/Work-Fission-Frontend/blob/8caea88a34aef45652ff3d9a756e921074836854/src/assets/screenshots/Product%20Detail%20View.png)

---

## Notes

- Ensure your backend is running and accessible at the URL specified in `VITE_ORIGIN`.
- You can extend the search to be contextual/semantic by updating the backend and frontend logic.

---

## License

MIT

---

## Author

Abhishek Kumar
