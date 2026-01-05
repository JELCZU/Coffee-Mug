# NOTES.md

## 1. Assumptions & Simplifications

### a. Key assumptions made during implementation
- Each product has a unique `id` and is stored in a JSON database (lowdb) for simplicity.
- Orders are always tied to an existing customer.
- Discounts are mutually exclusive; only the highest applicable discount is applied per order.
- Date-based promotions (e.g., Black Friday, holidays) are hard-coded for demonstration.

### b. Elements intentionally omitted
- No dynamic location lookup; customer location is assumed static.
- Holidays are hard-coded for Poland 2026.

### c. Interpretation of ambiguous parts
- **Discount rules:** Only one discount is applied per order. If multiple discounts apply (volume, holiday, location), the **largest discount** is chosen.
- **Customer/location model:** Location is part of the `Customer` entity and affects pricing (EU +15%, Asia -5%, US standard).

---

## 2. Technical Decisions

### a. Justification
- **Database choice:** Lowdb (JSON file) for simplicity and easy testability.
- **Project structure:** Organized using **CQRS**:
  - `commands/` handle state changes (POST/PUT requests).
  - `queries/` handle data retrieval (GET requests).

### b. Command / Query separation
- **Commands:** `postCreateProductHandler`, `postOrderHandler`, `postRestockProductHandler`, `postSellProductHandler`.
- **Queries:** `getProductsHandler`.
- Separation ensures clear responsibilities and testability.

---

## 3. Business Logic

### a. Discount system
- **Volume discounts:**
  - ≥5 units → 10%
  - ≥10 units → 20%
  - ≥50 units → 30%
- **Promotional discounts:**
  - Black Friday (Nov 29) → 25% off.
  - Holiday sale (Dec 25) → 15% off selected categories (toys, electronics).
- **Location-based pricing:**
  - EU: +15%
  - Asia: -5%
  - US: standard
- **Priority:** Only the largest discount is applied.

### b. Stock consistency
- Stock is checked before orders are created.
- Orders fail if stock is insufficient.
- Stock updates are transactional (synchronously updated in JSON DB).

### c. Key edge cases
- Ordering more than available stock → returns 409.
- Invalid product IDs → returns 404.
- Invalid customer ID → returns 404.
- Orders on promotion days correctly apply discount rules.
- Order price are saved in order in case if product price change we need to preserve price of product on that moment.

---

## 4. Testing

### Covered by tests
- **Integration tests:** POST /products, POST /orders, GET /products.
- **Validation tests:** Ensure correct error codes on invalid input.
- **Business logic tests:** Discount calculation, stock reduction, edge cases.
- **Error handling tests:** 404 for missing resources, 400 for invalid requests, 409 for insufficient stock.


## 5. Trade-offs & Alternatives

### a. Design decision to change
- Using **lowdb** was for simplicity; in production, a relational database with transactions would be better.

### b. Alternative solution considered
- Improved order data for better preserving products data.

### c. Reason for chosen solution
- **Lowdb** allows quick prototyping and testing, but not so profesional in enterprise enviroment.

---

This document references:
- `src/modules/products/commands/` → command handlers
- `src/modules/products/queries/` → query handlers
- `src/modules/orders/commands/` → order creation
- `src/modules/orders/pricing/` → discount calculation

