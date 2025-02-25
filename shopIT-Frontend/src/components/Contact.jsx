import React from 'react';

function Contact(){
    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <p>We'd love to hear from you! Reach out to us through any of the following channels:</p>
            
            <div className="contact-details">
                <h2>Email</h2>
                <p>shopITCustomerSupport@shopit.com</p>
                
                <h2>Phone</h2>
                <p>+254 737171378</p>
                
                <h2>Address</h2>
                <p>Luthuli Street, Nairobi City, 45678</p>
            </div>
            
            <h2>Send Us a Message</h2>
            <form className="contact-form">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <textarea placeholder="Your Message" required></textarea>
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
};

export default Contact;

