# pizza-delivery-api
A RESTful API for Pizza Delivery

# Problem Description

Imagine a pizza ordering services with the following functionality:
1. Order a pizza:
   - Specify the desired pizza type (margarita, marinara, salami), the number of pizza items and their size (small, medium, large).
   - An order should contain information about the customer: name, address.
   - It should be possible to track the status of order delivery. (new, preparing, delivering, delivered)
2. Update an order:
   - There should be a possibility to update the order details (pizzas/number of pizzas/size).
   - There should be a possibility to change the status of order delivery.
Please, pay attention, that order in some delivery statuses (e.g. delivered) could not be updated;
3. Remove an order.
4. Retrieve an order.
5. List orders.
   - Provide filtering by status/customer.

# Installation and Usage
- Clone this repository
- `cd pizza-delivery-api`
- `npm install`
- `npm test //for running test cases`
- `npm start //for starting the appication`

Make sure you have a postgres database setup and credentials are given in a `.env` file.

## Docker
`docker-compose up --build`

### POST
Endpoint `/api/user/add`

Body
```json
{
	"first_name": "Rifat Bin",
	"last_name": "Reza",
	"address": "House 13, Road 8/A, Uttara, Dhaka 1230",
	"email": "rifatbinreza@gmail.com"
}
```

Response
```json
{
    "status": "success",
    "message": "Successfully saved customer",
    "data": {
      "id": 1,
      "first_name": "Rifat Bin",
      "last_name": "Reza",
      "address": "House 13, Road 8/A, Uttara, Dhaka 1230",
      "email": "rifatbinreza@gmail.com"
    }
}
```

### POST
Endpoint `/api/order/add`

Body
```json
{
	"type": "margarita",
	"size": "large",
	"quantity": 600,
	"customer_id": 1
}
```

Response
```json
{
    "status": "success",
    "message": "Successfully saved data",
    "data": {
        "id": 8,
        "type": "margarita",
        "size": "large",
        "quantity": 600,
        "customer_id": 1,
        "delivery_status": "new",
        "updatedAt": "2019-12-07T20:34:44.523Z",
        "createdAt": "2019-12-07T20:34:44.523Z"
    }
}
```

### POST
Endpoint `/api/order/1/update`

Body
``` json
{
	"quantity": 60
}
```

Response
```json
{
    "status": "success",
    "message": "Successfully updated the order",
    "data": null
}
```

### POST
Endpoint `/api/order/1/status`

Body
```json
{
	"delivery_status":"delivered"
}
```

Response
```json
{
    "status": "success",
    "message": "Successfully updated delivery status",
    "data": null
}
```

### GET
Endpoint `/api/order/1`

Response
```json
{
    "status": "success",
    "message": "Found the order",
    "data": {
        "order": {
            "id": 8,
            "type": "margarita",
            "size": "large",
            "quantity": 600,
            "customer_id": 1,
            "delivery_status": "new",
            "createdAt": "2019-12-07T20:34:44.523Z",
            "updatedAt": "2019-12-07T20:34:44.523Z"
        },
        "customer": {
            "first_name": "Rifat Bin",
            "last_name": "Reza",
            "address": "House 131, Road 8, Uttara, Dhaka 1230"
        }
    }
}
```

### GET
Endpoint `/api/orders/filter?delivery_status=delivered&userId=1`

Response
```json
{
    "status": "success",
    "message": "Found orders",
    "data": [
        {
            "id": 1,
            "type": "margarita",
            "size": "small",
            "quantity": 60,
            "customer_id": 1,
            "delivery_status": "delivered",
            "createdAt": "2019-12-07T13:31:33.961Z",
            "updatedAt": "2019-12-07T20:36:39.630Z",
            "customer": {
                "first_name": "Rifat Bin",
                "last_name": "Reza",
                "address": "House 131, Road 8, Uttara, Dhaka 1230"
            }
        }
    ]
}
```

### GET
Endpoint `/api/order/1/remove`

Response
```json
{
    "status": "success",
    "message": "Successfully removed the order",
    "data": null
}
```
