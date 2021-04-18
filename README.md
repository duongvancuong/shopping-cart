## About The Project

The application displays the list of products.
Allows users to view product details when clicking on each product.
User can add or remove items in the shopping cart and view order details.
The following promotions are applied:
• Get 10% off bulk drinks – any drinks are 10% off the listed price (including already reduced
items) when buying 10 or more
• £5.00 off your order when spending £50.00 or more on Baking/Cooking Ingredients
• £20.00 off your total order value when spending £100.00 or more and using the code
“20OFFPROMO”

- Users can view the products and their category, price, and availability information.
- Users can add a product to their shopping cart.
- Users can remove a product from their shopping cart.
- Users can view the total price for the products in their shopping cart.
- Users can apply a voucher to their shopping cart.
- Users can view the total price for the products in their shopping cart with discounts
- Users can be alerted when I apply an invalid voucher to their shopping cart.
- Users can unable to Out of Stock products to the shopping cart.

Inside that directory, it details about project:

```
shopping_cart
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    └─── components 
    │       ├─── AlertMessage.js
    │       ├─── Cart.js
    │       ├─── Header.js
    │       ├─── OrderSummary.js
    │       ├─── Product.js
    │       └─── Voucher.js
    ├─── hooks
    │      └─── product-context.js
    ├─── pages
    │       ├─── ProductDetail.js
    │       ├─── Products.js
    │       └─── ShoppingCart.js
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── serviceWorker.js
    └── setupTests.js
```

## The main of this application:

### `/components`: 
    - Contains components.
    ─ AlertMessage.js: This component displays the Alert Message message
    ─ Cart.js: This component displays on ShoppingCart Page, the Cart details about each item information and price.
    ─ Header.js: This component displays the Header of the Application
    ─ OrderSummary.js: This component displays order summary details about the price of all of the items.
    ─ Product.js: This component displays Product information on the List Product Page.
    ─ Voucher.js: This component displays the form input voucher code.

### `/hooks`: 
    - Contains logic about the function of the shopping cart.
    ─ product-context.js: this file handles logic about the function of the shopping cart.

### `/pages`: 
    - Contains components page.
    ─ ProductDetail.js: This component displays the product detail page.
    ─ Products.js: This component displays a list product page.
    ─ ShoppingCart.js: This component displays the shopping cart page.

# Prerequisites

You’ll need to have Node 10.16.0 or later version on your local development machine (but it’s not required on the server).
We recommend using the latest LTS version.
You can use nvm (macOS/Linux) or nvm-windows to switch Node versions between different projects.

## Install the Yarn global binary to its latest version:
### `npm install -g yarn`

# Installation:

1. In the project directory, you can run to Install packages:

### `yarn install`

2. In the project directory, you can run to start application:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
