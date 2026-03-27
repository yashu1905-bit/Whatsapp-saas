import jwt from "jsonwebtoken";
import UserRepository from "../repositories/user.repository.js";
const userRepository = new UserRepository();


const activationAccountService = async (activationToken, activationCode) => {
    try {
        const decoded = jwt.verify(activationToken, process.env.ACTIVATION_TOKEN_SECRET);
        console.log("Decoded Activation Token:", decoded);
        // Further activation logic here

        if (decoded.activationCode !== activationCode) {
            throw new Error("Invalid activation code");
        }

        // Mark the user's email as verified in the database
        const exitUser = await userRepository.findByEmail(decoded.user.email);
        
        if (!exitUser) {

            throw new Error("User not found");
        }
        exitUser.isEmailVerified = true;
        await exitUser.save();
        return exitUser;
    } catch (error) {
        throw error
    }
}

export default activationAccountService;