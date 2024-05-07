### Karma e-commerce Full stack (MEVN Stack) [backend with Node.js](https://github.com/karimtarek0000/karma-e-commerce-backend)

#### Usage

- Nuxt Vue with typescript
- Pina for state management
- Tailwind CSS
- Formkit for validation

#### Features

- **Authentication**
  1. You can user signup with an email after that user will receive an email to verify his account when clicked on `click her to confirm you email` button in `email` will redirect to the site to click on `verify` button then you can now signin
  2. If user try signup with `email` already exist with showing alert `this email already exist`
  3. You can user sign in by `email` or with his `Google account`
  4. If user clicked on `forget password` will redirect to page `enter email` if this email exist will receive email to reset the password now user you can clicked on `reset password` after that redirect to the page to enter `new password`
     _Note_ this email valid till 1 hour only
  5. You can user rest of his `password` he will receive an `email` and after that, he can change his `password` safely
  6. The token for the session will refresh whether on both the Client and the Server side
  7. Middleware will handle guard for specific pages, after the user signin on to our site he will not be able to navigate to the auth page again

##

- **Cart shopping**
  1. You can user click on `add to cart` and after that product will be added to the `cart shopping` and the button will be disabled
  2. You can user delete specific a product and the amount will change immediately
  3. You can user click on checkout to open `checkout modal`
  4. You can user checkout from it without force him going to `cart page`
  5. You can user clicked on `view my cart` to going to `cart page`
  6. This option is available if user `logged in`

##

- **Cart page**
  1. You can user delete the product
  2. You can user update the quantity of the product
  3. You can user now click on checkout to proceed write of information
  4. You can user clicked on link in the card product and will going to the `product details page`

##

- **Checkout modal**
  1. _Input phone number:_
     - The user should write his phone number
  2. _Input address:_
     - The user should write the address to receive the order
  3. _Input coupon for discount:_
     - If the user has a valid coupon (Optional)
  4. Now the user can decide to pay with a credit card or cash on delivery
     - Credit card with (Stripe)
  5. If all the information is correct, user will showing page included all details about that order and he able scan `QRCode` included all informations about products

##

- **Product details page**
  1. You can user `enter quantity` for that product
  2. You can user `checkout` for that product only
