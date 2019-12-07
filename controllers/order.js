const {models} = require('../model');
const Joi = require('joi');

/**
 * function: addOrder
 * task: Saving a new Order to database with proper validation
 */
exports.addOrder = (req, res)=>{
  const data = req.body;
  // Validate our database schema with Joi
  const schema = Joi.object().keys({
    type: Joi.string().valid('margarita', 'marinara', 'salami').required(),
    size: Joi.string().valid('small', 'medium', 'large').required(),
    quantity: Joi.number().positive().required(),
    customer_id: Joi.number().required(),
    delivery_status: Joi.string().valid('new', 'preparing', 'delivering', 'delivered').required(),
  })
  Joi.validate(data, schema, async (err, value)=>{
    if(err){
      // send a 422 error response if validation fails
      res.status(422).json({
        status: 'error',
        message: 'Invalid request data',
        data: data
      });
    } else {
      let user = await models.User.findOne({
        where: {id: data.customer_id}
      })
      if(user){
        // Save the order to database
        try {
          let order = await models.Order.create({
            type: data.type,
            size: data.size,
            quantity: data.quantity,
            customer_id: data.customer_id,
            delivery_status: data.delivery_status,
          })
          res.status(200).json({
            status: 'success',
            message: 'Successfully saved data',
            data: order.get({ plain:true })
          })
        } catch (error) {
          res.status(500).json({
            status: "error",
            message: "Failed to save order",
            data: data
          });
        }
      } else {
        res.status(404).json({
          status: "error",
          message: "Could not find the customer",
          data: data
        });
      }
    }
  })
}
/**
 * function: getOrderById
 * task: Get a specific order by id number from the database
 */
exports.getOrderById = async (req, res)=>{
  let orderId = req.params.id;
  let onlyStatus = req.query.onlyStatus
  if(orderId){
    let order = await models.Order.findOne({
      where: {id: orderId}
    })
    if(order){
      if(onlyStatus){
        return res.status(200).json({
          status: "success",
          message: "Found the order status",
          data: {
            delivery_status: order.delivery_status
          }
        })
      }
      let userData = await order.getUser()
      // Only send required data for user
      let customer = {
        first_name: userData.first_name,
        last_name: userData.last_name,
        address: userData.address,
      }
      res.status(200).json({
        status: "success",
        message: "Found the order",
        data: {order, customer},
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Couldn'\t find the order",
        data: null
      });
    }
  } else {
    res.status(422).json({
      status: "error",
      message: "Invalid request with no order id in parameter",
      data: null
    });
  }
}
/**
 * function: updateOrderById
 * task: Finds an order by given ID, updates the order by given values
 */
exports.updateOrderById = (req, res)=>{
  const data = req.body;
  const orderId = req.params.id
  // Validate our database schema with Joi
  const schema = Joi.object().keys({
    type: Joi.string().valid('margarita', 'marinara', 'salami'),
    size: Joi.string().valid('small', 'medium', 'large'),
    quantity: Joi.number().positive(),
  })
  Joi.validate(data, schema, async (err, value)=>{
    if(err){
      res.status(422).json({
        status: "error",
        message: "Invalid request data",
        data: data
      });
    } else{
      try {
        let updatedOrder = await models.Order.update(
          {
            type: data.type,
            size: data.size,
            quantity: data.quantity,
          },
          {
            where: {
              id: orderId
            },
          }
        )
        res.status(200).json({
          status: "success",
          message: "Successfully updated the order",
          data: null
        })
      } catch (error) {
        res.status(500).json({
          status: "error",
          message: "Failed to update the order",
          data: data
        });
      }
    }
  })
}

/**
 * function: updateDeliveryStatusById
 * task: Update delivery status of a given order. Reject if the order is already delivered
 */

exports.updateDeliveryStatusById = async (req, res)=>{
  const orderId = req.params.id;
  const data = req.body;
  if(orderId){
    try {
      let order = await models.Order.findOne({
        where: {
          id: orderId
        }
      })
      if(order.delivery_status!=='delivered'){
        await order.update({
          delivery_status: data.delivery_status},
          {
            where: {
              id: orderId
            }
          }
        )
        res.status(200).json({
          status: "success",
          message: "Successfully updated delivery status",
          data: null
        })
      } else {
        res.status(500).json({
          status: "error",
          message: "Failed to update the delivery status. The order is already delivered",
          data: data
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Failed to update the delivery status",
        data: data
      });
    }
  } else {
    res.status(422).json({
      status: "error",
      message: "Invalid request with no order id in parameter",
      data: null
    });
  }
}