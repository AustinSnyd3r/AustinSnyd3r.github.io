import React from 'react';
import Header from '../../AppHeader/Header';
import './Help.css';

function Help() {
    return (
        <div className="help-container">
            <div className="header-container">
                <Header />
            </div>
            <div className="help-content">
                <div className="contact-info">
                    <h2>Contact Information</h2>
                    <p>
                        If you need assistance or have any questions, feel free to contact us at:
                        <br />
                        Email: support@gmail.com
                        <br />
                        Phone: (999) 111-1111
                    </p>
                </div>

                <div className="faqs">
                    <h2>FAQs</h2>

                    <div className="faq-item">
                        <h3>Q: How do I connect my device to the app via Bluetooth?</h3>
                        <p>
                            A: Make sure your device has Bluetooth enabled before opening the app in order to connect it. Go to settings and select your device from the list of available devices.
                        </p>
                    </div>

                    <div className="faq-item">
                        <h3>Q: What should I do if my device is not showing up in the app?</h3>
                        <p>
                            A:Make sure your device is in pairing mode. If the problem persists, restart your device as well as the app.
                        </p>
                    </div>

                    <div className="faq-item">
                        <h3>Q: How can I disconnect?</h3>
                        <p>
                            A: Navigate to the app's settings or connection menu, locate the connected device, and select the disconnect option.
                        </p>
                    </div>


                </div>
            </div>
        </div>
    );
}
export default Help;
