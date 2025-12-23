import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to you (admin notification)
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: '🔔 New DeepQ Notify Me Signup',
      html: `
        <div style="font-family: 'Poppins', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #05060a; color: #ffffff;">
          <h2 style="color: #4da3ff; margin-bottom: 20px;">New Signup Alert!</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #a0aec0;">
            Someone just signed up to be notified about DeepQ launch:
          </p>
          <div style="background: rgba(77,163,255,0.1); border-left: 4px solid #4da3ff; padding: 15px; margin: 20px 0; border-radius: 8px;">
            <strong style="color: #4da3ff;">Email:</strong> ${email}
          </div>
          <p style="font-size: 14px; color: #718096; margin-top: 30px;">
            Received on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
          </p>
        </div>
      `,
    };

    // Confirmation email to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'You are on the DeepQ Launch List!',
      html: `
        <div style="font-family: 'Poppins', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background: linear-gradient(135deg, #05060a 0%, #0a0e1a 100%); color: #ffffff; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #4da3ff; font-size: 32px; margin: 0;">DeepQ</h1>
            <p style="color: #008cff; font-size: 14px; margin-top: 5px;">Redefining Service Flow</p>
          </div>
          
          <h2 style="color: #ffffff; font-size: 24px; margin-bottom: 15px;">Thanks for your interest! 🎉</h2>
          
          <p style="font-size: 16px; line-height: 1.6; color: #a0aec0; margin-bottom: 20px;">
            We are excited to have you on board. You will be among the first to know when DeepQ launches and transforms how service businesses manage customer flow.
          </p>
          
          <div style="background: rgba(77,163,255,0.1); border: 1px solid rgba(77,163,255,0.3); padding: 20px; border-radius: 10px; margin: 25px 0;">
            <p style="font-size: 15px; color: #ffffff; margin: 0; line-height: 1.5;">
              <strong style="color: #4da3ff;">What is Coming:</strong><br/>
              Real-time intelligence • Hyperlocal awareness • Speed and precision
            </p>
          </div>
          
          <p style="font-size: 14px; color: #718096; margin-top: 30px; text-align: center;">
            Stay tuned for updates!<br/>
            <span style="color: #4da3ff;">— The DeepQ Team</span>
          </p>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    return NextResponse.json(
      { message: 'Successfully subscribed!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again.' },
      { status: 500 }
    );
  }
}
