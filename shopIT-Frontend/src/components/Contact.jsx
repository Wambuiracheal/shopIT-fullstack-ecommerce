import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_2ot59sr", // Service ID
        "template_3wq59nh", // Template ID
        formRef.current,
        "fswRAz4SSDVNFb-4C" // Public Key
      )
      .then(
        () => {
          setFormSubmitted(true);
          setError(false);
          formRef.current.reset(); // Reset form after submission

          setTimeout(() => {
            setFormSubmitted(false);
          }, 3000);
        },
        (error) => {
          console.error("Email send failed:", error);
          setError(true);
        }
      );
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <h1>
          Contact <span>ShopIT</span>
        </h1>
        <p>We'd love to hear from you! Reach out to us through any of the following channels:</p>

        <div className="contact-details">
          <h2>Email</h2>
          <p>📧 shopITCustomerSupport@shopit.com</p>

          <h2>Phone</h2>
          <p>📞 +254 737171378</p>

          <h2>Address</h2>
          <p>📍 Luthuli Street, Nairobi City, 45678</p>
        </div>

        <h2>Send Us a Message</h2>

        {formSubmitted && <p className="success-message">✅ Message sent successfully!</p>}
        {error && <p className="error-message">❌ Failed to send message. Please try again.</p>}

        <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
          <input type="text" name="user_name" placeholder="Your Name" required />
          <input type="email" name="user_email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
