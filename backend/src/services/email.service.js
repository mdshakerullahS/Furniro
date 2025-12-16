import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import OTP from "../models/OTP.model.js";

export const genOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTPMail = async (email, otp) => {
  const maiTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await maiTransporter.sendMail({
    to: email,
    subject: "OTP for verification",
    html: `<p>Your OTP for verification is: <b>${otp}</b>.</p><p>It expires in 5 minutes.</p>`,
  });
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
