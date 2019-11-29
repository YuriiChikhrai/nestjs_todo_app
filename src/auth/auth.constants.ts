import * as crs from 'crypto-random-string';

export const jwtConstants = {
  secret: process.env.SECRET || crs({ length: 25 }),
};
