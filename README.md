# Insider Software Developer Case 🦄

## User Story

**Goal:** Build a product carousel for the product pages on [LC Waikiki](https://www.lcwaikiki.com).  
**Description:** The carousel fetches a product list via a GET request and provides interactivity for navigating and marking favorite products. Below is the checklist of all requirements:

### Features

- [x] Retrieve the product list using a GET request from the given URL:
      `https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json`.
- [x] Append the carousel **after the element with `.product-detail` class** within the product page's structure.
- [x] Include a title for the carousel with the text: **"You Might Also Like"**.
- [x] Display **six and a half products** in the carousel.
- [x] Enable smooth sliding of products **one at a time** to the right or left using arrow buttons.
- [x] Open the respective product page in a **new tab** when a product is clicked.
- [x] Allow users to mark a product as a favorite by clicking the **heart icon**, which gets filled with a **blue color**.
- [x] Store favorite products in **local storage** to persist user preferences.
- [x] On page refresh, retrieve the product list and favorites from **local storage** instead of fetching again.
- [x] Ensure the carousel design is **responsive**, adapting to mobile, tablet, and desktop resolutions.
- [x] Adjust the number of viewable products dynamically based on the screen resolution.

---

## Rules

- [x] Developed using **JavaScript** and **jQuery**.
- [x] The project does **not use any third-party libraries** (e.g., Swiper, Bootstrap).
- [x] The project is delivered as a **single JavaScript file (.js)**.
- [x] HTML and CSS structures are created **dynamically within JavaScript**, ensuring the code runs directly in Chrome Developer Tools.
- [x] The code follows a **readable and structured format** for better maintainability.

---

## Final View

<img src="ENES_SARI_CASE.gif" />

## Installation and Usage

1. Copy the code into a file named `ENES_SARI.js` in your local environment.
2. Open the product page on [LC Waikiki](https://www.lcwaikiki.com).
3. Paste the code into Chrome Developer Tools (Console) and press `Enter`.
4. Interact with the carousel as described in the features section.

---

## Notes

- The design adapts dynamically based on the user's device resolution, ensuring a seamless user experience across all platforms.
- Local storage is leveraged to enhance performance and user convenience by reducing redundant API requests.

For any questions, feel free to reach out! 😊
