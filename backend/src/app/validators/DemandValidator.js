const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
  store: celebrate({
    [Segments.BODY]: Joi.object().keys({

      moletom: Joi.object().keys({
        amount: Joi.number().required(),
        size: Joi.string()
          .required(),
      }),

      camisa1: Joi.object().keys({
        amount: Joi.number().required(),
        size: Joi.string()
          .required(),
      }),

      camisa2: Joi.object().keys({
        amount: Joi.number().required(),
        size: Joi.string()
          .required(),
      }),

      corta1: Joi.object().keys({
        amount: Joi.number().required(),
        size: Joi.string()
          .required(),
      }),

      corta2: Joi.object().keys({
        amount: Joi.number().required(),
        size: Joi.string()
          .required(),
      }),

      calca: Joi.object().keys({
        amount: Joi.number().required(),
        size: Joi.string()
          .required(),
      }),
    }).or('moletom', 'camisa1', 'camisa2', 'corta1', 'corta2', 'calca'),
  }),
};
