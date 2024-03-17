import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

export const prismaError = (err: any) => {
  if (err.code == 'P2025') {
    throw new NotFoundException(err.meta.cause);
  }

  if (err.code == 'P2002') {
    throw new ForbiddenException(
      `Same record already exist. Unique constraint required for ${err.meta.target}`,
    );
  }

  throw err;
};
