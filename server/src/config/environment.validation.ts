import * as Joi from 'joi';

/** 
 * Valids the environment variables
 * if they are not valid or not defined, it will throw an error
 * */
export default Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test', 'staging').default('development').required(),
  DATABASE_URL: Joi.string().required(),
  DATABASE_SYNC: Joi.bool().required(),
  DATABASE_AUTOLOAD: Joi.bool().required(),
  PROFILE_API_KEY: Joi.string().required(),
});
