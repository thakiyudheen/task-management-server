import { jwtToken } from '../../utils/jwt/jwtToken';
import { isExist, login, signup } from '../../repositories';
import { comparePassword, hashPassword } from '../../utils/bcrypt/bcrypt';
import { Request, Response } from 'express';


export const loginController = async (req: Request, res: Response) => {
    try {
        console.log('this is the data', req.body);
        const { password, email } = req.body;
        const hashed = await hashPassword(password)
        req.body.password = hashed;

        const user = await login({ email })
        if (user) {
            const compare =await  comparePassword(password,user?.password)
            if(compare){
                const token = jwtToken({_id:user._id,email:user.email})
                res.cookie('jwtToken',token, {
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                })
                res.status(200).json({

                    success: true,
                    data: user,
                    message: "user login successfully!",

                });
            }else{
                res.status(200).json({
    
                    success: false,
                    data: user,
                    message: "email or passoword is incorrect!",
        
                });
            }
        }else{

            res.status(200).json({
    
                success: false,
                data: user,
                message: "user not exist!",
    
            });
        }

    } catch (error: any) {
        console.log('error in login controller');
        
    }
};
