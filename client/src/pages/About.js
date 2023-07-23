const About = () => {
  return (
    <>
      {/* How to Use the App */}
      <h2 className="about-modal-heading">How to Use the App</h2>
      <p>To book an appointment, follow these steps:</p>
      <ol>
        {/* Step-by-step instructions */}
        <li>
          <strong>Account Creation:</strong> Sign up for an account to access
          our booking system. Provide essential details for a smooth
          registration process.
        </li>
        <li>
          <strong>Service Selection:</strong> Choose your desired options,
          including services, pricing, and stylist preferences, from the
          provided list.
        </li>
        <li>
          <strong>Date and Time Selection:</strong> After selecting your
          preferences, pick a suitable date and time for your appointment from
          our available slots.
        </li>
        <li>
          <strong>Appointment Confirmation:</strong> Once you've chosen the date
          and time, confirm your appointment to secure your booking.
        </li>
        <li>
          <strong>View Appointment:</strong> You can easily review and manage
          your booked appointments by visiting the "My Appointments" page.
        </li>
      </ol>
      {/* Add other content for the How to Use the App section */}

      {/* Contact Information */}
      <h2 className="about-modal-heading">Contact Information</h2>
      <p>
        You can get directly in contact with one of our stylists by sending an
        email to{" "}
        <a
          className="about-modal-link"
          href="mailto:HeadMistress@snipsnapsalon.com"
        >
          HeadMistress@snipsnapsalon.com
        </a>{" "}
        or calling us during business hours at 1-800-SNIP-SNAP.
      </p>
    </>
  );
};

export default About;
