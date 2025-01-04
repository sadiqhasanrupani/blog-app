import { registerAs } from '@nestjs/config';

/** 
 * @configs for the application
 * */
export default registerAs('app', () => ({
  environments: process.env.NODE_ENV || 'production',
}));
