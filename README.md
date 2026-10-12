# PDR Checklist – Book Breeze E-Commerce App

- Frontend – React JS, React Router, Bootstrap, 
- State Management – React Context API, 
- Notifications – React Toastify, 
- Backend – Node.js, Express.js, 
- Database – MongoDB (Mongoose), 
- Deployment – Vercel (Frontend + Backend)

## Features Checklist
### Home Page
- featured Categories (4 category)
- 3 cards – Horror, All Books, Romance
- Category click – filter product page

### Product Listing Page
- All books layout
- Product cards – image, title, author, rating, price
- Add to Cart btn
- Wishlist icon
- Empty message when no books found

### Filters
- Category (6 checkboxes – Sci-fi, Novel, Autobiography, Political Fiction, Horror, Romance)
- Price Slider (0 – 3000)
- Rating (1-4 Stars & above)
- Sort by Price (Low to High, High to Low)
- Clear Filter Btn
- Filters persist in sessionStorage

### Search
- Nav search bar
- Live filtering on product listing
- Auto-nav to /products on Home page search

### Product Details Page
- Book Image, title, author, rating, price
- Category, Description
- Quantity selector with stock limit (disabled at max stock)
- Available stock display
- Add to Cart + Buy Now Btn
- Wishlist toggle
- Back button (return to previous listing page with filter)
- Recommended Books (same Category)
- Shipping features banner
- Category Pages(category/ Horror /Romance)
- Category filter with checkboxes (multi-select)
- Current category pre-selected
- Price, Rating, Sort filters
- Clear btn (resets to current category)
- Empty message when no books found
- Filter persist in sessionStroage

### Wishlist Management
- Nav Link with count
- Add/Remove from wishlist
- Move to Cart
- Empty State UI

### Cart Management
- Nav link with count badge
- Cart items with Image, title, author, price
- Quantity Increase/Decrease 
- Remove from Cart
- Move to Wishlist
- Price details card (price, discount, delivery, total)
- Place order btn
- Empty cart message

### Address Management
- Add multiple addresses
- Edit address
- Delete address
- Select address for Delivery (radio)
- Phone: 10 digits, number only
- Pincode: 6 digits, number only
- Continue checkout

### Checkout
- Order Summary (items + prices)
- Selected address display
- Price breakdown
- Confirm Order btn
- Order Placed Successfully screen
- Order Saved to backend
- Cart cleared after order

### Order History
- Orders List (newest first)
- Order Id, date, items, total
- Delivery Address display
- Delete order option
- Empty state UI

### User Profile
- User info (name, email, phone) – static
- Add New Address quick action
- My Orders quick action

### Loading & Alerts
- Loading messages on all pages
- Error states on all pages
- Toast notifications for:
	- Add to Cart
	- Remove From cart
	- Quantity Change
	- Move cart -> wishlist
	- Add/remove wishlist
	- Order placed
	- Address add/Update/delete
  - Address selection error


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
