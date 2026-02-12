const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

//===========================
// SEND OTP EMAIL
//===========================
exports.sendOTPEmail = async (toEmail, otp) => {
  await transporter.sendMail({
    from: `"QueueLess Hospital" <${process.env.EMAIL_FROM}>`,
    to: toEmail,
    subject: "🔐 Your Password Reset Code - QueueLess",
    html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f4f8; padding: 40px 0; line-height: 1.6;">
      <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 1px solid #e1e8ed;">
        
        <div style="background-color: #0f766e; padding: 30px; text-align: center;">
          <img src="https://res.cloudinary.com/dconuewme/image/upload/v1770923145/QueueLess-Logo-email_j0xq6x.png" alt="QueueLess Logo" style="width: 80px; height: auto; margin-bottom: 10px; border-radius: 8px;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">QueueLess Hospital</h1>
        </div>

        <div style="padding: 40px 30px; text-align: center;">
          <h2 style="color: #1e293b; margin-top: 0; font-size: 22px;">Verify Your Identity</h2>
          <p style="color: #64748b; font-size: 16px;">We received a request to reset your password. Use the verification code below to proceed.</p>
          
          <div style="margin: 30px 0; padding: 20px; background: #f1f5f9; border-radius: 12px; border: 2px dashed #0f766e;">
            <span style="display: block; font-size: 12px; text-transform: uppercase; color: #0f766e; font-weight: bold; margin-bottom: 10px; letter-spacing: 2px;">Verification Code</span>
            <span style="font-size: 36px; font-weight: 800; color: #0f766e; letter-spacing: 8px; font-family: monospace;">${otp}</span>
          </div>

          <p style="color: #94a3b8; font-size: 13px;">This code will <b>expire in 5 minutes</b> for security reasons.</p>
        </div>

        <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="margin: 0; color: #94a3b8; font-size: 12px;">If you didn't request this, you can safely ignore this email.</p>
          <p style="margin: 5px 0 0; color: #94a3b8; font-size: 12px;">&copy; 2026 QueueLess Hospital System</p>
        </div>
      </div>
    </div>
    `
  });
};

//===========================
// WELCOME EMAIL (PRIVATE)
//===========================
exports.sendWelcomeEmail = async (toEmail, name) => {
  await transporter.sendMail({
    from: `"QueueLess Hospital" <${process.env.EMAIL_FROM}>`,
    to: toEmail,
    subject: "🎉 Welcome to the Future of Healthcare - QueueLess",
    html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f4f8; padding: 40px 0; line-height: 1.6;">
      <div style="max-width: 550px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.08); border: 1px solid #e1e8ed;">
        
        <div style="background: linear-gradient(135deg, #0f766e 0%, #134e4a 100%); padding: 40px; text-align: center;">
          <img src="https://res.cloudinary.com/dconuewme/image/upload/v1770923145/QueueLess-Logo-email_j0xq6x.png" 
               alt="QueueLess Logo" 
               style="width: 120px; height: auto; margin-bottom: 15px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));">
          <h1 style="color: #ffffff; margin: 0; font-size: 26px; letter-spacing: 1px; font-weight: 700;">Welcome to QueueLess</h1>
        </div>

        <div style="padding: 40px 35px;">
          <h2 style="color: #1e293b; margin-top: 0; font-size: 22px;">Hello, ${name}!</h2>
          <p style="color: #475569; font-size: 16px;">Your journey to a <b>wait-free</b> hospital experience starts here. We’ve successfully set up your account.</p>
          
          <div style="background-color: #f8fafc; border-left: 4px solid #0f766e; padding: 20px; margin: 25px 0; border-radius: 0 12px 12px 0;">
            <p style="margin: 0 0 10px 0; font-weight: 600; color: #0f766e;">What's next for you?</p>
            <ul style="margin: 0; padding-left: 20px; color: #334155; font-size: 15px;">
              <li style="margin-bottom: 8px;">🚀 <b>Instant Tokens:</b> No more physical lines.</li>
              <li style="margin-bottom: 8px;">📅 <b>Smart Booking:</b> Schedule with top specialists.</li>
              <li style="margin-bottom: 8px;">📋 <b>Digital Health:</b> Access prescriptions anywhere.</li>
            </ul>
          </div>

          <div style="text-align: center; margin-top: 35px;">
            <a href="${process.env.FRONTEND_URL}/dashboard" 
               style="background-color: #0f766e; color: #ffffff; padding: 14px 30px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 12px rgba(15, 118, 110, 0.3);">
               Go to Dashboard
            </a>
          </div>
        </div>

        <div style="background-color: #f1f5f9; padding: 25px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="margin: 0; color: #64748b; font-size: 13px;">Experience healthcare without the wait.</p>
          <p style="margin: 10px 0 0; color: #94a3b8; font-size: 12px;">&copy; 2026 QueueLess Hospital Management System</p>
          <div style="margin-top: 15px;">
            <span style="height: 3px; width: 40px; background: #cbd5e1; display: inline-block; border-radius: 10px;"></span>
          </div>
        </div>
      </div>
    </div>
    `
  });
};

//===========================
// SEND PASSWORD RESET CONFIRMATION EMAIL
//===========================
exports.sendPasswordResetConfirmation = async (toEmail, name) => {
  await transporter.sendMail({
    from: `"QueueLess Hospital Security" <${process.env.EMAIL_FROM}>`,
    to: toEmail,
    subject: "🛡️ Security Alert: Password Changed Successfully",
    html: `
    <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f7f9; padding: 40px 0; line-height: 1.6;">
      <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #e1e8ed;">
        
        <div style="background-color: #ffffff; padding: 30px 30px 10px 30px; text-align: center;">
          <img src="https://res.cloudinary.com/dconuewme/image/upload/v1770923145/QueueLess-Logo-email_j0xq6x.png" 
               alt="QueueLess Logo" 
               style="width: 70px; height: auto;">
        </div>

        <div style="padding: 0 40px 40px 40px; text-align: center;">
          <div style="margin: 20px 0;">
            <span style="font-size: 48px;">🔒</span>
          </div>
          <h2 style="color: #1e293b; margin-top: 0; font-size: 20px; font-weight: 700;">Password Updated</h2>
          <p style="color: #475569; font-size: 15px;">Hello <b>${name}</b>, this is a confirmation that the password for your QueueLess Hospital account has been successfully changed.</p>
          
          <div style="background-color: #fff1f2; border: 1px solid #fecdd3; padding: 15px; margin: 25px 0; border-radius: 10px;">
            <p style="margin: 0; color: #be123c; font-size: 14px; font-weight: 500;">
              <b>Didn't do this?</b> If you did not change your password, please secure your account immediately by contacting our support team.
            </p>
          </div>

          <a href="${process.env.FRONTEND_URL}/support" 
             style="color: #0f766e; text-decoration: none; font-weight: 600; font-size: 14px;">
             Contact Support Team →
          </a>
        </div>

        <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #f1f5f9;">
          <p style="margin: 0; color: #94a3b8; font-size: 12px; letter-spacing: 0.5px;">
            SECURE ACCESS BY QUEUELESS HOSPITAL
          </p>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 20px;">
        <p style="color: #94a3b8; font-size: 11px;">
          This is an automated security notification. <br/>
          Location: Detected via secure login.
        </p>
      </div>
    </div>
    `
  });
};

//===========================
// SEND TOKEN BOOKED CONFIRMATION EMAIL
//===========================

exports.sendTokenBookedEmail = async (to, patientName, tokenDetails) => {
  await transporter.sendMail({
    from: `"QueueLess Hospital" <${process.env.EMAIL_USER}>`,
    to,
    subject: `🎫 Token Confirmed: #${tokenDetails.tokenNumber} - QueueLess`,
    html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f4f8; padding: 40px 0;">
      <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.1);">
        
        <div style="background: linear-gradient(135deg, #0f766e 0%, #134e4a 100%); padding: 30px; text-align: center;">
          <img src="https://res.cloudinary.com/dconuewme/image/upload/v1770923145/QueueLess-Logo-email_j0xq6x.png" alt="Logo" style="width: 80px; margin-bottom: 10px;">
          <h2 style="color: #ffffff; margin: 0; font-size: 20px;">Appointment Confirmed</h2>
        </div>

        <div style="padding: 30px; text-align: center;">
          <p style="color: #64748b; margin-bottom: 20px;">Hello ${patientName}, your visit is scheduled!</p>
          
          <div style="background: #f1f5f9; border-radius: 15px; padding: 25px; border: 1px dashed #0f766e; display: inline-block; width: 80%;">
             <span style="display: block; font-size: 12px; color: #0f766e; font-weight: bold; text-transform: uppercase;">Your Token Number</span>
             <span style="font-size: 48px; font-weight: 800; color: #1e293b;">#${tokenDetails.tokenNumber}</span>
          </div>

          <div style="text-align: left; margin-top: 30px; background: #fafafa; padding: 20px; border-radius: 12px;">
            <p style="margin: 5px 0; color: #475569;">🕒 <b>Slot Time:</b> ${tokenDetails.slotTime}</p>
            <p style="margin: 5px 0; color: #475569;">🏥 <b>Department:</b> ${tokenDetails.department}</p>
            <p style="margin: 5px 0; color: #475569;">👨‍⚕️ <b>Doctor:</b> ${tokenDetails.doctor}</p>
          </div>

          <p style="color: #ef4444; font-size: 13px; margin-top: 20px; font-weight: 600;">⚠️ Please arrive 10 minutes before your slot.</p>
        </div>

        <div style="background: #f8fafc; padding: 15px; text-align: center; font-size: 12px; color: #94a3b8;">
          Thank you for choosing QueueLess - Wait less, live more.
        </div>
      </div>
    </div>
    `
  });
};

//========================
// Token Cancelled Email
//========================

exports.sendTokenCancelledEmail = async (to, patientName, tokenNumber) => {
  await transporter.sendMail({
    from: `"QueueLess Hospital" <${process.env.EMAIL_USER}>`,
    to,
    subject: "🚫 Appointment Cancelled - QueueLess",
    html: `
    <div style="font-family: 'Segoe UI', sans-serif; background-color: #fcfcfc; padding: 40px 0;">
      <div style="max-width: 450px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #fee2e2; padding: 40px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
        <img src="https://res.cloudinary.com/dconuewme/image/upload/v1770923145/QueueLess-Logo-email_j0xq6x.png" alt="Logo" style="width: 60px; margin-bottom: 20px;">
        <h2 style="color: #b91c1c; margin-top: 0;">Appointment Cancelled</h2>
        <p style="color: #475569;">Hello ${patientName}, your appointment <b>(Token #${tokenNumber})</b> has been successfully removed from our system.</p>
        <div style="margin: 30px 0; padding: 20px; background: #fef2f2; border-radius: 8px; font-size: 14px; color: #991b1b;">
          If you did not request this cancellation, please contact the hospital helpdesk immediately.
        </div>
        <a href="${process.env.FRONTEND_URL}" style="color: #0f766e; font-weight: 600; text-decoration: none;">Book a New Appointment →</a>
      </div>
    </div>
    `
  });
};

//========================
// Prescription Email
//========================

exports.sendPrescriptionEmail = async (to, patientName, prescriptionId) => {
  const downloadLink = `${process.env.FRONTEND_URL}/api/prescriptions/${prescriptionId}/pdf`;

  await transporter.sendMail({
    from: `"QueueLess Digital Records" <${process.env.EMAIL_USER}>`,
    to,
    subject: "💊 Your Digital Prescription is Ready - QueueLess",
    html: `
    <div style="font-family: 'Segoe UI', sans-serif; background-color: #f0f4f8; padding: 40px 0;">
      <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
        <div style="background-color: #0f766e; padding: 20px; text-align: center;">
           <img src="https://res.cloudinary.com/dconuewme/image/upload/v1770923145/QueueLess-Logo-email_j0xq6x.png" style="width: 50px;">
        </div>
        <div style="padding: 40px; text-align: center;">
          <h2 style="color: #1e293b;">Prescription Generated</h2>
          <p style="color: #64748b;">Hello ${patientName}, your consultation is complete and your digital prescription is ready for download.</p>
          
          <a href="${downloadLink}" style="display: inline-block; background: #10b981; color: #ffffff; padding: 15px 35px; border-radius: 12px; text-decoration: none; font-weight: bold; margin: 25px 0; box-shadow: 0 4px 10px rgba(16, 185, 129, 0.2);">
            📥 Download PDF Prescription
          </a>

          <p style="color: #94a3b8; font-size: 13px;">You can also find this in your Patient Dashboard under "Visit History".</p>
          <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 30px 0;">
          <p style="color: #0f766e; font-style: italic; font-weight: 500;">"Wishing you a very speedy recovery!"</p>
        </div>
      </div>
    </div>
    `
  });
};