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
        let order = await models.Order.create({
          type: data.type,
          size: data.size,
          quantity: data.quantity,
          customer_id: data.ordered_by,
          delivery_status: data.delivery_status,
        })
        res.status(200).json({
          status: 'success',
          message: 'Successfully saved data',
          data: order.get({ plain:true })
        })
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