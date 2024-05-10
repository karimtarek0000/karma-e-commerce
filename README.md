### Karma e-commerce (Universal App) Full stack (MEVN Stack) [backend with Node.js](https://github.com/karimtarek0000/karma-e-commerce-backend)

- Nuxt Vue with typescript
- Pina for state management
- Tailwind CSS
- Formkit for validation
- Hybrid renders for pages (CSR - SSR - SSG - ISR)
- Parts from UI render depend on device, Desktop or (mobile - tablet)
- Optimice image with Nuxt-image

#### Features

- **Authentication pages**
  - (Signin (SSG) / Signup (SSG) / Forget-password / reset-password)
    1.  User can signup with an email after that user will receive an email to verify his account when clicked on `click her to confirm you email` button in `email` will redirect to the site to click on `verify` button then you can now signin
    2.  If user try signup with `email` already exist with showing alert `this email already exist`
    3.  User can sign in by `email` or with his `Google account`
    4.  If user clicked on `forget password` will redirect to page `enter email` if this email exist will receive email to reset the password now user you can clicked on `reset password` after that redirect to the page to enter `new password`
        _Note_ this email valid till 1 hour only
    5.  User can rest of his `password` he will receive an `email` and after that, he can change his `password` safely
    6.  The token for the session will refresh whether on both the `Client` and the `Server side`
    7.  Middleware will handle guard for specific pages, after the user signin on to our site he will not be able to navigate to the auth page again

##

- **Home page (SSG)**

1. Section one -> Slider will show specific products (Best price)
2. Section two -> Eight top rated products

##

- **All caegories/:idCategory (SSR)**
  1.  User can click on specific category and it will show all products related to this category
  2.  User can click on `sub-category` to show all products related with it either click on `brand` in `sub-category`
  3.  All products paginated, when user click on specific page these products will `caching`

##

- **Cart shopping (available if user `logged in`)**
  1. User can click on `add to cart` and after that product will be added to the `cart shopping` and the button will be disabled
  2. User can delete specific a product and the amount will change immediately
  3. User can click on checkout to open `checkout modal`
  4. User can checkout from it without force him going to `cart page`
  5. User can click on `view my cart` to going to `cart page`

##

- **Cart page (SSR) - (available if user `logged in`)**
  1. User can delete the product
  2. User can update the quantity of the product
  3. User can now click on checkout to proceed write of information
  4. User can clicked on link in the card product and will going to the `product details page`

##

- **Checkout modal (available if user `logged in`)**
  1. _Input phone number:_
     - The user should write his phone number
  2. _Input address:_
     - The user should write the address to receive the order
  3. _Input coupon for discount:_
     - If the user has a valid coupon (Optional)
  4. Now the user can decide to pay with a credit card or cash on delivery
     - Credit card with (Stripe)
  5. If all the information is correct, user will showing a page included all details about that order and he will be able scan `QRCode` that included all informations about products and will receive email with `invoice`

##

- **Product details page (ISR)**

  1. User can `enter quantity` for that product
  2. User can `checkout` for that product only
  3. User can hover on image product to make it zoom in
  4. User can click on `add to cart` and after that product will be added to the `cart shopping` and the button will be disabled

##

- **Top rated page (SSG)**
  1.  After user click on `view more top rated` from home page will going to this page that show all top rated products

##

- **Search**
  1.  User can `search` for specific product by `name` or by `description`
  2.  Search with infinity scroll to show more products while scrolling
  3.  User can click on any product and will going to product details page

##

- **Dropdown profile**
  1. It will show `user name`
  2. User can click on any from these and will going to the page -> _(Cart, Orders)_
  3. User can click on `Logout`
