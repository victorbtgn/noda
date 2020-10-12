const Joi = require("joi");

const registrationSchema = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,50}$"))
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        if (err.code === "string.pattern.base") {
          err.message = `Invalid "password"`;
        }
      });
      return errors;
    }),

  subscription: Joi.string().allow(""),
});

const validationMiddleware = (schema) => async (req, res, next) => {
  const { error } = await schema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  next();
};

module.exports = {
  registrationValidatorMiddleware: validationMiddleware(registrationSchema),
};
