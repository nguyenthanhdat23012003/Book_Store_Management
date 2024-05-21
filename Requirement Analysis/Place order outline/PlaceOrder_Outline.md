# Outline for all use cases to place an order

## "Place Order" Use Case

- Use case ID: UC001
- Name of use case: Place Order
- Actor: Customer
- Brief Description: This use case outlines the steps involved when a customer wishes to initiate a purchase through the AIMS software platform
- Pre-condition: The customer has items added to their shopping cart.
- Post-condition: None

### Basic flow:

1. Customer reviews cart

2. AIMS displays the contents of the shopping cart

3. AIMS verifies inventory availability for each item

4. Customer requests order

5. AIMS presents the delivery information form to the customer

6. Customer inputs and confirms the delivery details

7. AIMS calculates delivery fee, total product price including delivery fee.

8. Customer confirms the order

9. AIMS calls UC002 "Pay Order"

10. AIMS displays the order information

11. AIMS sends all order and transaction information to the customer's email

12. AIMS notifies successful order message

### Alternative flow:

4a. AIMS alerts the customer if any item in the cart is unavailable and prompts them to adjust the cart

4b. Customer updates cart

6a. Customer selects rush order delivery option

6b. AIMS checks the products for rush order delivery

6c. AIMS inserts UC003 "Rush Order" if any product supports rush order delivery

7a. AIMS requests customer to re-enter and update the transaction information

## "Pay Order" Use Case

- Use case ID: UC002
- Name of use case: Pay Order
- Actor: Customer
- Brief Description:This use case delineates the steps involved when a customer intends to make a payment through the AIMS software platform
- Pre-condition: AIMS has calculated the total price that customer needs to pay
- Post-condition: None

### Basic flow:

1. AIMS presents the payment interface

2. Customer selects a preferred payment method

3. Customer enters card details and confirms the transaction

4. AIMS validates the payment information

5. AIMS records the transaction information

### Alternative flow:

3a. Customer  cancels the payment process

5a. AIMS notifies the customer of any incorrect or insufficient payment information

5b. Customers updates the information

## "Rush Order" Use Case

- Use case ID: UC003
- Name of use case: Rush Order
- Actor: Customer
- Brief Description: This use case delineates the steps involved when a customer opts for expedited delivery services through the AIMS software platform.
- Pre-condition: Customer selects rush order option.
- Post-condition: None

### Basic flow:

1. AIMS displays the rush order delivery screen with a list of products that rush order delivery supports

2. Customer updates rush order information and chooses products

3. AIMS calculates shipping fees

### Alternative flow:

1a. Customer cancels the option at any time

3a. AIMS notifies the unsupported delivery message for invalid delivery address

3b. AIMS requests customer to update if there are any required fields left blank or invalid information.
