const { celebrate, Joi, Segments } = require('celebrate');

const SIZE_REGEX = /[PP, P, M, G, GG]/;

module.exports = {
  store: celebrate({
    [Segments.BODY]: Joi.object().keys({

      moletom: Joi.object().keys({
        amount: Joi.number().required(),
        size: Joi.string().min(1).max(2).regex(SIZE_REGEX).required(),
      }),

      camisa1: Joi.object().keys({
        amount: Joi.number().required(),
        size: Joi.string().min(1).max(2).regex(SIZE_REGEX).required(),
      }),

      camisa2: Joi.object().keys({
        amount: Joi.number().required(),
        size: Joi.string().min(1).max(2).regex(SIZE_REGEX).required(),
      }),

      corta1: Joi.object().keys({
        amount: Joi.number().required(),
        size: Joi.string().min(1).max(2).regex(SIZE_REGEX).required(),
      }),

      corta2: Joi.object().keys({
        amount: Joi.number().required(),
        size: Joi.string().min(1).max(2).regex(SIZE_REGEX).required(),
      }),

      calca: Joi.object().keys({
        amount: Joi.number().required(),
        size: Joi.string().min(1).max(2).regex(SIZE_REGEX).required(),
      }),
    }).or('moletom', 'camisa1', 'camisa2', 'corta1', 'corta2', 'calca'),
  }),
};
