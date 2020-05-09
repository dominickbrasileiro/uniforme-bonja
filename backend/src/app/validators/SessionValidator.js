const { celebrate, Joi, Segments } = require('celebrate');

const ENROLLMENT_REGEX = /(^20[0, 1][0-9]+)|(^2020[0-9]+)/;

module.exports = {
  store: celebrate({
    [Segments.BODY]: Joi.object().keys({
      enrollment: Joi.string().required().length(8).regex(ENROLLMENT_REGEX),
      access_pin: Joi.string().required().length(6),
    }),
  }),
};
