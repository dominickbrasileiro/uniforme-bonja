const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
  store: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email({ minDomainSegments: 1 }).required(),
      type: Joi.string().valid('student', 'teacher').required(),
    }),
  }),
};
