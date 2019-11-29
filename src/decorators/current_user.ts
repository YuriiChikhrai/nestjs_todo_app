import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator((err, { user }) => {
  return user.user;
});
