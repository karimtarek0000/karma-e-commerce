### Karma e-commerce Full stack (MEVN Stack) backend with Node.js <link>

#### Usage

- Nuxt Vue with typescript
- Pina for state management
- Tailwind CSS
- Formkit for validation

#### Features

- **Authentication**

1. You can user signup with an email after that user will receive an email to validate if this email exists or not after that he can log in directly without being directed to the login page to enter his email
2. You can user sign in by email or with his Google account
3. You can use the rest of his password he will receive an email and after that, he can change his password safely
4. The token for the session will refresh whether on both the Client and the Server
5. Middleware will handle guard for specific pages, after the user signin on to our site he will not be able to navigate to the auth page

- **Cart shopping**

1. You can user click on `add to cart` and after that product will be added to the `cart shopping` and the button will be disabled
2. You can user delete specific a product and the amount will change immediately
3. You can user click on checkout to open `checkout modal`
4. You can user checkout from it without force him going to `cart page`
5. You can user clicked on `view my cart` to going to `cart page`
6. This option is available if user `logged in`

- **Cart page**

1. You can user delete the product
2. You can user update the quantity of the product
3. You can user now click on checkout to proceed write of information
4. You can user clicked on link in the card product and will going to the `product details page`

- **Checkout modal**

1. Input phone number: The user should write his phone number
2. Input address: The user should write the address he wants to receive the order
3. Input coupon for discount: If the user has a valid coupon (Optional)
4. Now the user can decide to pay with a credit card or cash on delivery
