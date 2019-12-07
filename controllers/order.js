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
  if(orderId){
    let order = await models.Order.findOne({
      where: {id: orderId}
    })
    if(order){
      let userData = await order.getUser()
      // Only send required data for user
      let user = {
        first_name: userData.first_name,
        last_name: userData.last_name,
        address: userData.address,
      }
      res.status(200).json({
        status: "success",
        message: "Found the order",
        data: {order, user},
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