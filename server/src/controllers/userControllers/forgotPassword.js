const { user } = require("../../db");
const jwt = require("jsonwebtoken");
const transporter = require("../../helpers/nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const forgotPassword = async (email) => {
    const foundUser = await user.findOne({ where: { email } });
    if (!foundUser) {
        throw new Error("User not found");
    };

    if(foundUser.sign_in_provider) throw new Error("This user is authenticated by third parties");

    const resetToken = jwt.sign(
        { id_user: foundUser.id_user },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    try {
        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
        const message = `
            <div style="border: 1px solid #ddd; padding: 20px; max-width: 600px; margin: 0 auto;">
            <img src="https://i.ibb.co/PFrSPtf/neoshoplogo.jpg" alt="Logo" style="width: 70%; max-width: 200px; display: block; margin: 0 auto 20px;">
            <h1>Password Reset</h1>
            <p>You requested a password reset</p>
            <p>Use the following token to reset your password:</p>
            <p><strong>${resetToken}</strong></p>
            <p>Copy the token, return to the site, and paste it in the corresponding place</p>
            <p>If you did not request this, ignore the email, thank you</p>
            <p></p>
            <p>NeoShop Team</p>
            </div>
        `;

        const response = await transporter.sendMail({
        to: email,
        subject: "Password Reset Request",
        html: message
        });
        
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = forgotPassword;
