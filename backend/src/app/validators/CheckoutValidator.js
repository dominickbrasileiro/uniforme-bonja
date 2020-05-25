const { celebrate, Joi, Segments } = require('celebrate');

const PHONE_REGEX = /^\+(?:[0-9]?){6,14}[0-9]$/;

module.exports = {
  store: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      cpf: Joi.string().length(11).required(),
      email: Joi.string().email({ minDomainSegments: 1 }).required(),
      phone: Joi.string().min(13).max(14).regex(PHONE_REGEX),
      payment_method: Joi.string().valid('boleto', 'credit_card').required(),

      card_hash: Joi.when('payment_method', {
        is: 'credit_card',
        then: Joi.string().required(),
      }),

      installments: Joi.when('payment_method', {
        is: 'credit_card',
        then: Joi.number().min(1).max(3).required(),
      }),
    }),
  }),
};
