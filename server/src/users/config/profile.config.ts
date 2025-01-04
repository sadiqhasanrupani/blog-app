import { registerAs } from '@nestjs/config';

/**
 * @config specifically related to profile module
 * */
export default registerAs('profileConfig', () => ({
  apiKey: process.env.PROFILE_API_KEY,
}));
