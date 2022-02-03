import { sign, verify } from 'jsonwebtoken';

import { ENVS } from '../../../environments';

export class TokenJwtHelper {
  public static generateToken(
    userId: string,
    expiretime = ENVS.EXP_TIME_JWT_TOKEN,
  ) {
    return sign(
      {
        sub: userId,
        role: 'user',
      },
      ENVS.JWT_TOKEN_SECRET,
      {
        expiresIn: expiretime,
      },
    );
  }

  public static validate(token: string): string | undefined {
    try {
      const decoded: any = verify(token, ENVS.JWT_TOKEN_SECRET);
      return decoded.sub;
    } catch (err) {
      return undefined;
    }
  }
}
