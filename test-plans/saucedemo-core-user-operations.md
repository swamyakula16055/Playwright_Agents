# SauceDemo Core User Operations Test Plan

## Application Overview

Functional test plan for the five core end-user operations observed on SauceDemo: sign in, discover products, manage the cart, complete checkout, and log out. Each scenario starts from a fresh app state. Use the publicly displayed standard demo account (standard_user / secret_sauce); when a scenario needs an authenticated session, sign in as its first step. The product catalog contains six items and supports name and price sorting. Checkout requires first name, last name, and ZIP/postal code.

## Test Scenarios

### 1. 1. Sign in

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful sign-in with the standard demo account

**File:** `tests/login/successful-sign-in.spec.ts`

**Steps:**
  1. Starting from a fresh browser state, open https://www.saucedemo.com.
    - expect: The Swag Labs login form is displayed with Username, Password, and Login controls.
  2. Enter standard_user as Username and secret_sauce as Password, then select Login.
    - expect: Sign-in succeeds and the Products inventory page opens.
    - expect: The catalog displays six products and the cart starts empty.

#### 1.2. Reject invalid sign-in credentials

**File:** `tests/login/reject-invalid-credentials.spec.ts`

**Steps:**
  1. Starting from a fresh browser state, open the login page and enter invalid_user and wrong_password.
    - expect: Both values are present in their respective fields.
  2. Select Login.
    - expect: The user remains on the login page.
    - expect: An authentication error is displayed indicating that the username and password do not match a user.
    - expect: No authenticated inventory page is shown.

#### 1.3. Validate empty sign-in fields

**File:** `tests/login/empty-sign-in-validation.spec.ts`

**Steps:**
  1. Starting from a fresh browser state, open the login page and leave Username and Password blank.
    - expect: The login form is displayed with both fields empty.
  2. Select Login.
    - expect: Sign-in is rejected and a required-field validation message is displayed.
    - expect: The user remains on the login page.

### 2. 2. Discover products

**Seed:** `tests/seed.spec.ts`

#### 2.1. Browse product details and sort the catalog

**File:** `tests/products/browse-and-sort-catalog.spec.ts`

**Steps:**
  1. Starting from a fresh browser state, sign in as standard_user / secret_sauce.
    - expect: The Products page displays six products, names, descriptions, prices, and Add to cart controls.
    - expect: The initial sort selection is Name (A to Z).
  2. Open the Sauce Labs Fleece Jacket product details.
    - expect: The detail page shows the jacket image, name, description, price ($49.99), Add to cart control, and Back to products control.
  3. Return to products and choose Price (high to low) in Sort products.
    - expect: The selector shows Price (high to low).
    - expect: Products appear in descending price order; the $49.99 Fleece Jacket is first and the $7.99 Onesie is last.
  4. Choose Price (low to high), then Name (Z to A).
    - expect: Each selected sort is reflected in the selector and the displayed product order updates accordingly.
    - expect: Sorting does not add items to the cart.

### 3. 3. Manage the cart

**Seed:** `tests/seed.spec.ts`

#### 3.1. Add items, review cart, and remove an item

**File:** `tests/cart/add-review-remove-items.spec.ts`

**Steps:**
  1. Starting from a fresh browser state, sign in as standard_user / secret_sauce and open the Products page.
    - expect: The cart is empty and the product catalog is available.
  2. Add Sauce Labs Backpack from its product card, then add Sauce Labs Bike Light.
    - expect: Each selected product's control changes to Remove after adding.
    - expect: The cart badge reflects two items.
  3. Open the cart.
    - expect: The cart lists exactly the Backpack and Bike Light, each with quantity 1 and the matching price.
    - expect: Continue Shopping and Checkout controls are available.
  4. Remove the Bike Light from the cart.
    - expect: The Bike Light is removed, the Backpack remains, and the cart count updates to one.
  5. Select Continue Shopping.
    - expect: The Products page opens and the remaining Backpack is still represented in the cart.

### 4. 4. Checkout

**Seed:** `tests/seed.spec.ts`

#### 4.1. Require customer information before checkout can continue

**File:** `tests/checkout/required-customer-information.spec.ts`

**Steps:**
  1. Starting from a fresh browser state, sign in as standard_user / secret_sauce, add Sauce Labs Backpack, open the cart, and select Checkout.
    - expect: The Checkout: Your Information page displays First Name, Last Name, and Zip/Postal Code fields.
  2. Leave all fields blank and select Continue.
    - expect: Checkout does not advance.
    - expect: A visible validation error identifies First Name as required.
  3. Enter a first name only and select Continue.
    - expect: Checkout does not advance.
    - expect: A visible validation error identifies Last Name as required.
  4. Complete Last Name but leave Zip/Postal Code blank and select Continue.
    - expect: Checkout does not advance.
    - expect: A visible validation error identifies Zip/Postal Code as required.

#### 4.2. Complete checkout and verify order confirmation

**File:** `tests/checkout/complete-purchase.spec.ts`

**Steps:**
  1. Starting from a fresh browser state, sign in as standard_user / secret_sauce, add Sauce Labs Fleece Jacket, open the cart, and select Checkout.
    - expect: Checkout information is requested for the item in the cart.
  2. Enter Taylor as First Name, Morgan as Last Name, and 94105 as Zip/Postal Code, then select Continue.
    - expect: The Checkout: Overview page shows the Fleece Jacket at $49.99, quantity 1, payment information, and free shipping.
    - expect: The price summary shows item total $49.99, tax $4.00, and total $53.99.
  3. Select Finish.
    - expect: The Checkout: Complete! page displays Thank you for your order! and dispatch confirmation.
    - expect: The cart is empty and Back Home is available.

### 5. 5. Log out

**Seed:** `tests/seed.spec.ts`

#### 5.1. Log out of an authenticated session

**File:** `tests/logout/logout-from-shopping-session.spec.ts`

**Steps:**
  1. Starting from a fresh browser state, sign in as standard_user / secret_sauce.
    - expect: The Products page is visible in an authenticated session.
  2. Open the navigation menu and select Logout.
    - expect: The browser returns to the login page.
    - expect: Username and Password fields are available and the authenticated inventory page is no longer shown.
  3. Attempt to open the inventory page directly after logout.
    - expect: The unauthenticated user is redirected to or remains on the login page and cannot access the product catalog without signing in again.
