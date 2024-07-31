import { jwtMiddleware } from '../../utils/jwtMiddleware/jwtMiddleWare';
import { isExist, signup } from '../../repositories';
import { hashPassword } from '../../utils/bcrypt/bcrypt';
import { Request, Response } from 'express';
import { jwtToken } from '../../utils/jwt/jwtToken';


export const signupController = async (req: Request, res: Response) => {
    try {
        console.log('this is the data', req.body);
        const { password, email } = req.body;
        const hashed = await hashPassword(password)
        req.body.password = hashed;

        const isExists = await isExist({ email })
        if (isExists) {
            res.status(200).json({

                success: false,
                data: {},
                message: "Email already exist!",

            });
        } else {
            const user = await signup(req.body)

            if (user) {
                const token = jwtToken({_id:user._id,email:user.email})
                res.cookie('jwtToken', token, {
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                })
                res.status(200).json({

                    success: true,
                    data: user,
                    message: "User signup successfully!",

                });
            } else {
                res.status(200).json({

                    success: false,
                    data: {},
                    message: "Something error!",

                });
            }
        }


    } catch (error: any) {

    }
};
