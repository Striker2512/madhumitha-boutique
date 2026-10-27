MADHUMITHA SABARI KUMAR BOUTIQUE — STARTER WEBSITE
=================================================

STATUS
------
This is a website starter package. It has NOT been uploaded to GitHub or published.
The shopping bag and WhatsApp order-message flow work in the browser after product
prices are added. Real online payments are NOT integrated. Product names, photos,
prices, stock, shipping and return policies are placeholders and must be updated.

WHAT IS INCLUDED
----------------
index.html          Website content and page sections
styles.css          Responsive boutique design
config.js           Boutique name, WhatsApp number and optional payment link
products.js         Starter product list (no real prices or inventory)
script.js           Product filtering, bag, estimated total and WhatsApp checkout

STEP 1 — CREATE YOUR FREE GITHUB ACCOUNT
----------------------------------------
1. Visit https://github.com/ and sign in or create an account.
2. Choose a username you are happy to use in your public website address.
3. Important: a GitHub Pages site and its repository are public on the free plan.
   Do not upload private customer details, passwords, payment secrets or identity documents.

STEP 2 — CREATE A REPOSITORY
----------------------------
1. On GitHub, click + then New repository.
2. Name it: madhumitha-boutique
3. Set visibility to Public.
4. Create the repository. You can skip adding extra files if preferred.

STEP 3 — UPLOAD THE WEBSITE FILES
---------------------------------
1. Open your new repository.
2. Choose Add file > Upload files.
3. Upload index.html, styles.css, config.js, products.js, script.js and this README.
4. Commit the upload to the main branch.

STEP 4 — ENABLE GITHUB PAGES
----------------------------
1. In the repository, open Settings.
2. Select Pages in the sidebar.
3. Under Build and deployment, choose Deploy from a branch.
4. Select Branch: main and folder: /(root), then Save.
5. Wait for the deployment to finish. In Settings > Pages, use Visit site.
6. A project-site URL normally looks like:
   https://YOUR-USERNAME.github.io/madhumitha-boutique/
   Replace YOUR-USERNAME with your actual GitHub username.
7. Publishing may take several minutes. Only share the URL after opening and testing it.

Official guide:
https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

STEP 5 — UPDATE YOUR PRODUCTS
-----------------------------
Open products.js in GitHub and click the pencil (Edit) icon. Replace the sample
values in each product object:
- name: actual product name
- category: Sarees, Kurtis, or Traditional jewellery
- description: accurate material, size, colour and product details
- price: actual price as a number, e.g. 1299 (no ₹ sign or commas)
- image: relative image path, e.g. "images/your-saree.jpg"
- available: true or false

Do not publish made-up prices or imply a placeholder product is in stock.
Commit changes to publish updates.

STEP 6 — ADD PHOTOS
-------------------
1. Create a folder named images in the repository using Add file > Create new file,
   then enter images/.gitkeep as the filename and commit it.
2. Open the images folder and upload real product photos.
3. In products.js, set the image field to the exact path, e.g. "images/red-saree.jpg".
4. Use photos you own or are allowed to use. Avoid huge files; compress photos first.

STEP 7 — WHATSAPP ORDERS
------------------------
The starter uses WhatsApp number 91 76959 57823 (India country code added).
Test the WhatsApp buttons on a phone with WhatsApp installed. Check that the number
is correct and that the pre-filled message is accurate before launch.

STEP 8 — ONLINE PAYMENTS (NOT YET CONNECTED)
-------------------------------------------
GitHub Pages hosts static files only; it cannot securely run the server-side payment
logic needed for a custom integrated checkout. Never put secret API keys in these files.

Simplest no-code option:
1. Apply for a merchant account with a payment provider that supports your business
   and UPI/cards in India.
2. Complete that provider's verification/onboarding.
3. Create a payment link through the provider's official dashboard.
4. Test it yourself, including the amount, order reference, refund/cancellation process
   and what confirmation the customer receives.
5. Only then paste the HTTPS payment link into config.js as paymentLink.
6. Understand that this starter's link is a general link; it does NOT automatically
   calculate the cart total. Confirm the amount with the customer before payment.
For automatic cart totals, order records and payment confirmation, use a supported
hosted checkout or ecommerce platform/backend. Fees and eligibility vary by provider.

Do not collect card numbers, CVV, UPI PINs or passwords on this website.
Never ask a customer to share their UPI PIN or OTP.

STEP 9 — BEFORE LAUNCH
----------------------
[ ] Replace all placeholder products and prices
[ ] Add and test your own product photos
[ ] Confirm stock and prices for every item
[ ] Add accurate shipping, delivery and return information
[ ] Test the WhatsApp number and pre-filled order message
[ ] Test the site on a mobile phone
[ ] Test the payment link only after provider onboarding
[ ] Make sure no private information or secret keys are in the public repository

FREE-HOSTING LIMITATION
-----------------------
GitHub Pages can host the storefront for free on a github.io subdomain. It is not
a full ecommerce platform: it does not provide built-in inventory management,
secure payment processing, customer accounts or an order database.
