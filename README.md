### Karma e-commerce (Universal App) Full stack (MEVN Stack) [backend with Node.js](https://github.com/karimtarek0000/karma-e-commerce-backend)

- Nuxt Vue with TypeScript
- Pinia for state management
- Tailwind CSS
- Formkit for validation
- Hybrid renders for pages (CSR - SSR - SSG - ISR)
- Parts from UI render depend on device, Desktop or (mobile - tablet)
- Optimized image with Nuxt-image

#### Features

- **Authentication pages**
- (Sign in (SSG) / Sign up (SSG) / Forget-password / Reset-password)

1.  User can sign up with an email after that he will receive an email to verify his account when click on `click here to confirm your email` button in `email` will redirect to the site to click on `verify` button then you can now sign in
2.  If user tries to sign up with an `email` that already exists, a warning alert will show `this email already exists`
3.  User can sign in by `email` or with his `Google account`
4.  If user clicked on `forget password` will redirect to page `enter email` if this email exists, they will receive an email to reset the password. Now the user can click on `reset password` after that redirect to the page to enter `new password`
    _Note_ this link is valid for 1 hour only
5.  User can reset his `password` he will receive an `email` and after that, he can change his `password` safely
6.  The token for the session will refresh whether on both the `Client` and the `Server side`
7.  Middleware will handle guard for specific pages, after the user sign in on our site he will not be able to navigate to the `auth page` again

##

- **Home page (SSG)**

1. Section one -> Slider will show specific products (Best price)
2. Section two -> Eight top-rated products

##

- **All categories/:idCategory (SSR)**

1.  User can click on a specific category and it will show all products related to this category
2.  User can click on `sub-category` to show all products related to it or click on `brand` in `sub-category`
3.  All products are paginated, when user clicks on a specific page these products will `cache`

##

- **Cart shopping (available if user is `logged in`)**

1. User can click on `add to cart` and after that the product will be added to the `cart shopping` and the button will be disabled
2. User can delete a specific product and the amount will change immediately
3. User can click on checkout to open `checkout modal`
4. User can checkout from it without being forced to go to the `cart page`
5. User can click on `view my cart` to go to the `cart page`

##

- **Cart page (SSR) - (available if user is `logged in`)**

1. User can delete the product
2. User can update the quantity of the product
3. User can now click on checkout to proceed with entering information
4. User can click on the link in the card product and will go to the `product details page`

##

- **Checkout modal (available if user is `logged in`)**

1. _Input phone number:_
   - The user should write his phone number
2. _Input address:_
   - The user should write the address to receive the order
3. _Input coupon for discount:_
   - If the user has a valid coupon (Optional)
4. Now the user can decide to pay with a credit card or cash on delivery
   - Credit card with (Stripe)
5. If all the information is correct, the user will be shown a page including all details about that order and they will be able to scan a `QRCode` that includes all information about the products and will receive an email with an `invoice`

##

- **Product details page (ISR)**

1. User can `enter quantity` for that product
2. User can `checkout` for that product only
3. User can hover on the product image to make it zoom in
4. User can click on `add to cart` and after that the product will be added to the `cart shopping` and the button will be disabled

##

- **Top-rated page (SSG)**

1.  After the user clicks on `view more top-rated` from the home page, he will go to this page that shows all top-rated products

##

- **Search**

1.  User can `search` for a specific product by `name` or by `description`
2.  Search with infinite scroll to show more products while scrolling
3.  User can click on any product and will go to the product details page

##

- **Dropdown profile**

1. It will show `user name`
2. User can click on any of these and will go to the page -> _(Cart, Orders)_
3. User can click on `Logout`
