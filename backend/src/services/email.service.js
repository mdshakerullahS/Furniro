import bcrypt from "bcryptjs";
import OTP from "../models/OTP.model.js";
import nodemailer from "nodemailer";

export const genOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTPMail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Furniro Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #b88e2f;">Email Verification</h2>
          <p>Thank you for choosing Furniro. Use the following OTP to complete your verification:</p>
          <h1 style="background: #fdf7e8; padding: 10px; text-align: center; letter-spacing: 5px;">${otp}</h1>
          <p>This code <b>expires in 5 minutes</b>.</p>
          <p style="font-size: 0.8rem; color: #888;">This is a portfolio project. Please do not share this code.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    console.error("Nodemailer Error:", error);
    throw new Error("Failed to send verification email");
  }
};

export const saveOTP = async (email, otp) => {
  const hashedOTP = await bcrypt.hash(otp, 10);

  await OTP.findOneAndDelete({ email });

  await OTP.create({
    email,
    otp: hashedOTP,
    expiresAt: Date.now() + 5 * 60 * 1000,
  });
};
