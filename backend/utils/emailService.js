import nodemailer from "nodemailer";

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendOrderConfirmationEmail = async (order) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("EMAIL_USER or EMAIL_PASS not defined. Skipping email sending.");
    return;
  }

  const transporter = createTransporter();

  const mailOptions = {
    from: `"Xtensionsvrse" <${process.env.EMAIL_USER}>`,
    to: order.customer_email,
    subject: `Payment Confirmed - Order #${order.order_id_alias || order.id}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #4CAF50; text-align: center;">Payment Confirmed! 🎉</h2>
        <p>Hi <strong>${order.customer_name || "Valued Customer"}</strong>,</p>
        <p>We've successfully verified your payment for Order <strong>#${order.order_id_alias || order.id}</strong>.</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 0;"><strong>Total Paid:</strong> ₦${Number(order.total_amount).toLocaleString()}</p>
          <p style="margin: 5px 0 0 0;"><strong>Shipping Destination:</strong> ${order.shipping_state}</p>
        </div>
        <p>Your premium hair extensions are currently being perfectly packed and prepared for shipping.</p>
        <p>We'll notify you the moment it gets dispatched!</p>
        <br/>
        <p>Stay gorgeous,</p>
        <p><strong>The Xtensionsvrse Team</strong></p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("[EMAIL] Confirmation sent to:", order.customer_email);
    return info;
  } catch (error) {
    console.error("[EMAIL] Error sending confirmation email:", error);
    throw error;
  }
};

export const sendOrderShippedEmail = async (order) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("EMAIL_USER or EMAIL_PASS not defined. Skipping email sending.");
    return;
  }

  const transporter = createTransporter();

  const mailOptions = {
    from: `"Xtensionsvrse" <${process.env.EMAIL_USER}>`,
    to: order.customer_email,
    subject: `Your Order #${order.order_id_alias || order.id} is on the way! 🚚`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #2196F3; text-align: center;">Your Order Has Shipped!</h2>
        <p>Hi <strong>${order.customer_name || "Valued Customer"}</strong>,</p>
        <p>Fantastic news! Your order <strong>#${order.order_id_alias || order.id}</strong> has been handed over to our delivery partners and is officially on its way to you.</p>
        <div style="background-color: #f4f6f8; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; text-transform: uppercase; color: #666;"><strong>Delivery Address:</strong></p>
          <p style="margin: 5px 0 0 0;">${order.shipping_address}<br/>${order.shipping_state}</p>
        </div>
        <p>Thank you for shopping with us! If you have any questions, feel free to reply directly to this email.</p>
        <br/>
        <p>Best Regards,</p>
        <p><strong>The Xtensionsvrse Team</strong></p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("[EMAIL] Shipped email sent to:", order.customer_email);
    return info;
  } catch (error) {
    console.error("[EMAIL] Error sending shipped email:", error);
    throw error;
  }
};
