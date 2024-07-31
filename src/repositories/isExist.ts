import { User } from '../models/userModel'

export const isExist = async (data: any) => {
    try {
        const user = await User.findOne(data)
        if (user) {
            return user
        } else {
            return null
        }

    } catch (error: any) {
        console.log("error while finding");

    }
} 