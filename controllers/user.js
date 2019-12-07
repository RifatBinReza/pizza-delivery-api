const {models} = require('../model');
const Joi = require('joi');

/**
 * function: addUser
 * task: Saving a new User/Customer to database with proper validation
 */
exports.addUser = (req, res)=>{
  const data = req.body;
  // Validate our database schema with Joi
  const schema = Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    address: Joi.string().required(),
    email: Joi.string().required(),
  })
  Joi.validate(data, schema, async (err, value)=>{
    if(err){
      // send a 422 error response if validation fails
      res.status(422).json({
        status: 'error',
        message: 'Invalid request data',
        data: data,
      });
    } else {
      let user = await models.User.findOne({
        where: {email: data.email}
      })
      if(user){
        res.status(422).json({
          status: 'error',
          message: 'Custsomer already exists',
          data: data
        })
      } else {
        try {
          let newUser = await models.User.create({
            first_name: data.first_name,
            last_name: data.last_name,
            address: data.address,
            email: data.email,
          })
          res.status(200).json({
            status: "success",
            message: "Successfully saved customer",
            data: newUser.get({ plain: true })
          });
        } catch (error) {
          res.status(500).json({
            status: "error",
            message: "Failed to save customer",
            data: data
          });
        }
      }
    }
  })
}