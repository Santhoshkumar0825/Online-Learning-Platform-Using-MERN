import { Sendmail } from '../utils/nodemailer.js';
import User from '../models/User.js';
import crypto from 'crypto';

export const signup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const user = new User({ firstname, lastname, email, password });
    await user.save();

    // Sending email after successful signup
    const emailResponse = await Sendmail(email, 'Welcome to Our Platform', '<h1>Thank you for signing up!</h1>');
    console.log('Signup email response:', emailResponse);

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetURL = `http://localhost:3000/resetpassword/${resetToken}`;
    const emailResponse = await Sendmail(email, 'Password Reset', `<h1>You requested a password reset</h1><p>Click this <a href="${resetURL}">link</a> to reset your password.</p>`);
    console.log('Forget password email response:', emailResponse);

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending password reset email', error });
  }
};
