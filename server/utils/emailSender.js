import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  


export const sendConfirmationEmail = async (userEmail, booking, hotelDetails, userName) => {
  const checkInDate = new Date(booking.checkInDate);
  const checkOutDate = new Date(booking.checkOutDate);
  const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

  const mailOptions = {
    from: `"Glen Hotel Booking" <${process.env.SENDER_EMAIL}>`,
    to: userEmail,
    subject: '🎉 Glen Booking Confirmation - Your Stay is Confirmed!',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Glen Booking Confirmation</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold; letter-spacing: 1px;">GLEN</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Hotel Booking System</p>
          </div>
          
          <!-- Success Message -->
          <div style="padding: 30px 20px 20px 20px; text-align: center; border-bottom: 3px solid #10b981;">
            <div style="background-color: #d1fae5; color: #047857; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="margin: 0; font-size: 24px;">🎉 Booking Confirmed!</h2>
              <p style="margin: 10px 0 0 0; font-size: 16px;">Dear ${userName}, your reservation has been successfully confirmed.</p>
            </div>
          </div>
          
          <!-- Booking Details -->
          <div style="padding: 20px;">
            <h3 style="color: #374151; margin-bottom: 20px; font-size: 20px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Booking Details</h3>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 15px; border: 1px solid #e5e7eb; font-weight: bold; color: #374151; width: 40%;">Booking ID</td>
                <td style="padding: 15px; border: 1px solid #e5e7eb; color: #6b7280; font-family: monospace;">${booking._id}</td>
              </tr>
              <tr style="background-color: white;">
                <td style="padding: 15px; border: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Hotel</td>
                <td style="padding: 15px; border: 1px solid #e5e7eb; color: #6b7280; font-weight: 600;">${hotelDetails.title}</td>
              </tr>
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 15px; border: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Location</td>
                <td style="padding: 15px; border: 1px solid #e5e7eb; color: #6b7280;">${hotelDetails.location || 'N/A'}</td>
              </tr>
              <tr style="background-color: white;">
                <td style="padding: 15px; border: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Check-in Date</td>
                <td style="padding: 15px; border: 1px solid #e5e7eb; color: #6b7280;">${checkInDate.toDateString()}</td>
              </tr>
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 15px; border: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Check-out Date</td>
                <td style="padding: 15px; border: 1px solid #e5e7eb; color: #6b7280;">${checkOutDate.toDateString()}</td>
              </tr>
              <tr style="background-color: white;">
                <td style="padding: 15px; border: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Number of Nights</td>
                <td style="padding: 15px; border: 1px solid #e5e7eb; color: #6b7280;">${nights}</td>
              </tr>
              <tr style="background-color: #f3f4f6;">
                <td style="padding: 15px; border: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Number of Guests</td>
                <td style="padding: 15px; border: 1px solid #e5e7eb; color: #6b7280;">${booking.guests}</td>
              </tr>
              <tr style="background-color: #fef3c7; border: 2px solid #f59e0b;">
                <td style="padding: 15px; border: 1px solid #f59e0b; font-weight: bold; color: #92400e; font-size: 16px;">Total Amount</td>
                <td style="padding: 15px; border: 1px solid #f59e0b; color: #92400e; font-size: 20px; font-weight: bold;">$${booking.totalPrice}</td>
              </tr>
            </table>
          </div>
          
          <!-- Important Information -->
          <div style="padding: 20px; background-color: #eff6ff; margin: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <h4 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px;">📋 Important Information</h4>
            <ul style="color: #1e40af; margin: 0; padding-left: 20px; line-height: 1.6;">
              <li>Please save this email for your records</li>
              <li>Present your booking ID at check-in</li>
              <li>Check-in time: 3:00 PM | Check-out time: 11:00 AM</li>
              <li>For any changes or cancellations, contact us immediately</li>
            </ul>
          </div>
          
          <!-- Contact Information -->
          <div style="padding: 20px; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
            <h4 style="color: #374151; margin: 0 0 15px 0;">Need Help?</h4>
            <p style="color: #6b7280; margin: 0; line-height: 1.6;">
              📧 Email: support@glen-hotels.com<br>
              📞 Phone: +1 (555) 123-4567<br>
              🌐 Website: www.glen-hotels.com
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #374151; color: #d1d5db; padding: 20px; text-align: center;">
            <p style="margin: 0; font-size: 14px;">
              Thank you for choosing <strong>Glen Hotels</strong>!<br>
              We look forward to providing you with an exceptional stay.
            </p>
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #4b5563;">
              <p style="margin: 0; font-size: 12px; opacity: 0.8;">
                © 2025 Glen Hotel Booking System. All rights reserved.
              </p>
            </div>
          </div>
          
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Glen booking confirmation email sent successfully to:', userEmail);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending Glen confirmation email:', error);
    return { success: false, message: 'Email sending failed', error: error.message };
  }
};

// Send booking update/cancellation emails
export const sendBookingUpdateEmail = async (userEmail, booking, hotelDetails, updateType, userName) => {
  const subject = updateType === 'cancelled' ? 'Booking Cancelled - Glen Hotels' : 'Booking Updated - Glen Hotels';
  const statusColor = updateType === 'cancelled' ? '#dc2626' : '#f59e0b';
  const statusBg = updateType === 'cancelled' ? '#fef2f2' : '#fffbeb';

  const mailOptions = {
    from: `"Glen Hotel Booking" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: subject,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Glen Booking Update</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">GLEN</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Hotel Booking System</p>
          </div>
          
          <div style="padding: 30px 20px; text-align: center;">
            <div style="background-color: ${statusBg}; color: ${statusColor}; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="margin: 0; font-size: 24px;">Booking ${updateType.charAt(0).toUpperCase() + updateType.slice(1)}</h2>
              <p style="margin: 10px 0 0 0;">Dear ${userName}, your booking has been ${updateType}.</p>
            </div>
            
            <p style="color: #6b7280; margin: 20px 0;">Booking ID: <strong>${booking._id}</strong></p>
            <p style="color: #6b7280;">Hotel: <strong>${hotelDetails.title}</strong></p>
          </div>
          
          <div style="background-color: #374151; color: #d1d5db; padding: 20px; text-align: center;">
            <p style="margin: 0;">Thank you for choosing Glen Hotels!</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Glen booking ${updateType} email sent successfully`);
    return { success: true };
  } catch (error) {
    console.error(`Error sending Glen ${updateType} email:`, error);
    return { success: false, error: error.message };
  }
};
