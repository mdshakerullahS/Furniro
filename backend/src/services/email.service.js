import { Resend } from "resend";
import bcrypt from "bcryptjs";
import OTP from "../models/OTP.model.js";

export const genOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTPMail = async (email, otp) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: [email],
    subject: "OTP for verification",
    html: `<p>Your OTP for verification is: <b>${otp}</b>.</p><p>It expires in 5 minutes.</p>`,
  });

  if (error) console.log(error.message);
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
