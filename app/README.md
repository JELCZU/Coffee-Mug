# Creating Order App

This is a simple Order Management application created as part of a recruitment process.

The application is built with **Node.js** and **Express.js**. Its main purpose is to manage products, stock levels, and customer orders while applying business rules such as discounts and location-based pricing.

---

# Purpose

The application allows:
- Managing products and their stock
- Creating orders for customers
- Automatically reducing stock when an order is placed
- Preventing orders when stock is insufficient
- Calculating final order price based on discount and pricing rules

---
# Scripts

The project defines the following npm scripts to support development, testing, and production usage:

## Development

- **`npm run dev`**  
  Runs the application in development mode. It starts TypeScript in watch mode and Nodemon to automatically restart the server on changes.

- **`npm run build:watch`**  
  Runs the TypeScript compiler (`tsc`) in watch mode to continuously compile source files into the `dist` directory.

## Build & Production

- **`npm run build`**  
  Compiles the TypeScript source code into JavaScript output in the `dist` directory.

- **`npm start`**  
  Starts the compiled application using Node.js from the `dist/server.js` entry point. Intended for production use.

## Testing

- **`npm test`**  
  Runs the full Jest test suite in single-threaded mode (`--runInBand`) with support for ES modules.

- **`npm run test:watch`**  
  Runs Jest in watch mode for faster feedback during development.

---
# Paths

## Products

The **Products** paths are responsible for creating and managing products.

| Method | Path                          | Description             |
|-------:|-------------------------------|-------------------------|
| POST   | `/api/products`               | Create a new product    |
| GET    | `/api/products`               | Get list of all products|
| POST   | `/api/products/:id/restock`   | Increase product stock  |

---

## Orders

The **Orders** paths are responsible for creating customer orders.

| Method | Path            | Description                         |
|-------:|-----------------|-------------------------------------|
| POST   | `/api/orders`   | Create a new order                  |

When an order is created:
- Product stock is reduced
- Discounts are calculated
- Final price is returned

---

# Tech Stack

- Node.js
- Express.js
- TypeScript
- LowDB (file-based JSON database)
- express-validator
- Jest + Supertest

---

# Notes

This project is intentionally kept simple and focuses on business logic.

It demonstrates:
- Clean separation of responsibilities (CQRS-inspired)
- Explicit domain logic
- Predictable error handling

---

