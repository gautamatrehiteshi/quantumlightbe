// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable node/no-unsupported-features/es-syntax */
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import {
  validateLogin,
  // validateForgetPassword,
} from '../../validators/auth/index';
import asyncFunction from '../../middlewares/asyncMiddleware';
import { createTokens } from '../../utils/createTokens';
import { findOneByEmail } from '../../services/user.service';
/**
 *
 * Handle GET request to get examples
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */

export const userLogin = asyncFunction(
  async (req: Request, res: Response): Promise<Response> => {
    const { data, error } = validateLogin(req.body);
    if (error)
      return res
        .status(400)
        .send({ status: 400, msg: error.issues[0].message });

    if (!data)
      return res
        .status(400)
        .send({ status: 400, msg: 'body can not be empty' });

    const user = await findOneByEmail(data.email);

    if (!user) {
      return res
        .status(400)
        .send({ status: 400, msg: 'Invalid email or password' });
    }

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) {
      return res
        .status(400)
        .send({ status: 400, msg: 'Invalid email or password' });
    }
    //jwt sign
    const token = await createTokens(user.id.toString());
    return res.send({ status: 200, msg: 'success', token });
  }
);
// export const forgetPassword = asyncFunction(
//   async (req: Request, res: Response): Promise<Response> => {
//     const { data, error } = validateForgetPassword(req.body);
//     if (error)
//       return res
//         .status(400)
//         .send({ status: 400, msg: error.formErrors.fieldErrors });

//     if (!data)
//       return res
//         .status(400)
//         .send({ status: 400, msg: 'body can not be empty' });

//     const user = await findOneByEmail(data.email);

//     if (!user)
//       return res.status(400).send({ status: 400, msg: 'Invalid email' });
//     // const token = await createTokens(
//     //   user.id.toString(),
//     //   Math.floor(Date.now() / 1000) + 600
//     // );

//     // const link = `${process.env.FRONT_END_BASE_URL}/password-reset/${user.id}/${token}`;

//     // await sendEmail(user.email, 'Password reset', link);

//     return res.send('password reset link sent to your email account');
//   }
// );
