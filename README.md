# 🛍️ Product Catalog App

A responsive React application to browse and filter a list of products. It includes features like:

- Product listing from a remote API with pagination 
- Search products
- Filter by category
- Sort by price
- Mark products as favorites 
- View a responsive grid layout that adapts across screen sizes


## Features

- Responsive design using CSS Grid and Flexbox
- Product cards displayed in a square layout
- Smooth hover and favorite interactions
- Persisted favorites using localStorage
- Search + sort + category filter buttons

---

## Tech Stack

- **React**
- **TypeScript**
- **CSS Modules**
- **FakeStore API**

---

## 🛠️ Setup & Installation

### 1. Clone the repository

git clone https://github.com/your-username/product-catalog-app.git
cd product-catalog-app

### 2. Install dependencies

npm install
# or
yarn install

### 3. Run the app

npm run dev
# or
yarn dev

### 4. Project Structure

src/
├── assets/                         # Images 
├── components/
│   ├── ProductCatalogPage.css  # Reusable product card
│   └── ProductCard.css         # product card styles
├── constants/
│   ├── Constants.ts            
│   └── Types.ts                
├── pages/
│   └── ProductCatalogPage.tsx  # Main page of the catalog
│   └── ProductCatalogPage.css  # dashboard style

### 5. Screenshots

### Dashboard 

![Product Catalog dashboard](./src/asstes/images/screenshots/dashboardScreen.png)

### Responsive 

![Responsive Product Catalog dashboard](./src/assets/images/screenshots/responsiveScreen.png)

### Filter & Sort

![Filtered and Sorted Product Catalog dashboard](./src//assets/images/screenshots/filteredAndSortedScreen.png)

### Search 

![Search Product Catalog dashboard](./src/assets/images/screenshots/searchDashboardScreen.png)


### 6. Author

Noudhar Ouanes
LinkedIn : https://www.linkedin.com/in/noudhar-ouanes-464840194/