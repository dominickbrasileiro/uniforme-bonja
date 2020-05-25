const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
  store: celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email({ minDomainSegments: 1 }).required(),
      access_pin: Joi.string().required().length(6),
    }),
  }),
};
