import UserRepository from "../repositories/user.repository.js";
const userRepository = new UserRepository();
import Jwt from "../utils/jwt.js";
import bcrypt from "bcrypt";
const jwt = new Jwt();
import activationMailTemplate from "../mails/activation-mail.js";

import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";



import createActivationToken from "../utils/activation.js";
import sendMail from "../services/email.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




class AuthService {
    async register(data) {
        try {

            const user = await userRepository.create(data);
            const { token, activationCode } = createActivationToken(user);


            // Only include safe fields for the email template
            const safeData = {
                name: user.firstName,
                email: user.email,
                activationCode
            };

            console.log("Safe Data for Email Template:", safeData);

            // const html = await ejs.renderFile(path.join(__dirname, "../mails/activation-mail.ejs"), safeData);


            //  const html = await ejs.renderFile(path.join(__dirname, "../mails/activation-mail.ejs"), data);

            const html= activationMailTemplate(safeData);

            await sendMail(user.email, "Account Activation", html, safeData);

            return { user, token };

        } catch (error) {
            throw error
        }
    }

    async login(data) {
        try {
            const user = await userRepository.findByEmail(data.email);
            if (!user) {
                throw new Error("User not found");
            }

            // isEmailVerified: { type: Boolean, default: false },
            if (!user.isEmailVerified) {
                throw new Error("User email not verified found");
            }

            // const isMatchPassword = await bcrypt.compare(data.password, user.password);
            const isMatchPassword = await user.comparePassword(data.password);

            if (!isMatchPassword) {
                throw new Error("Invalid password");
            }

            const token = await jwt.jwtEncrypt({ id: user.id, email: user.email });
            // const { password, ...userWithoutPassword } = user._doc;
            // return { user: userWithoutPassword, token }
            return { token }
        } catch (error) {
            throw error
        }
    }
}

export default AuthService;
