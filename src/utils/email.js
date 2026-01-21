import emailjs from "emailjs-com";

export function sendBookingEmail({ name, date, time, location, email }) {
  return emailjs.send(
    "service_xxxxx",      // 👈 your SERVICE ID
    "template_xxxxx",     // 👈 your TEMPLATE ID
    {
      name,
      date,
      time,
      location,
      email,
    },
    "public_xxxxx"        // 👈 your PUBLIC KEY
  );
}
