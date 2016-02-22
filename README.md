# sapient

TECHNOLOGIES:
=========

1: Html5/css3
2: jQuery
3: node.js
4: mongodb
5: mongoose

LOGIC:
=========

The application saves the items from Cart.json to mongodb database and loads from the database.

Once the user removes all the cart items. The application again fetched items from Cart.json and saves to mongodb.


RUNNING APP
=========

Start the node server by default it is running on port: 3000.

npm start
OR
node ./bin/www
OR
nodemon ./bin/www
OR
forever start ./bin/www

Thats all.


SOME SAMPLE COUPON CODES
===========

['DS1', 'JF5', 'JF10', 'PROMO20']

DS1: 1%
JF5: 5%
JF10: 10%
PROMO20: 20%

DISCOUNT LOGIC
===========

3 items in cart - 5% discount on subtotal amount
3-6 items in cart - 10% discount on subtotal amount
>6 – 25% discount on subtotal amount

JS DESIGN PATTERN
===========

Prototype
