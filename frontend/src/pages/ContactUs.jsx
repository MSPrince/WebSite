import { useEffect, useState } from "react";
import { useAuth } from "./../store/auth";
import { toast } from "react-toastify";
import bgImage from "../assets/background/home background.avif";

const defaultContactFormData = {
  name: "",
  email: "",
  message: "",
  phone: "",
  subject: "",
  address: "",
};

const ContactUs = () => {
  const [contact, setContact] = useState(defaultContactFormData);
  const [userData, setUserData] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  if (userData && user) {
    setContact({
      name: user.username,
      email: user.email,
      phone: user.phone,
      address: user.completeAddress,
      subject: "",
      message: "",
    });
    setUserData(false);
  }

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      if (res.ok) {
        setContact(defaultContactFormData);
        const data = await res.json();
        console.log(data);
        toast.success("Message sent successfully");

        // Show the modal after a successful submission
        setShowModal(true);
      }
    } catch (error) {
      toast.warning("Something went wrong", error);
    }

    console.log("User Data:", contact);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Contact Us";
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className="mx-auto max-w-full px-2 sm:px-2 lg:px-8 text-justify"
    >
      <div className="min-h-screen flex flex-col justify-center">
        <div className="container mx-auto p-3 lg:p-8">
          <div className="flex flex-col lg:flex-row justify-between shadow-2xl rounded-3xl overflow-hidden">
            {/* Form Section */}
            <div className="w-full lg:w-1/2 p-8">
              <h2 className="text-xl text-center md:text-3xl font-extrabold mb-6 text-primary">
                Make an Appointment
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Name"
                    value={contact.name}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Email"
                    value={contact.email}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Phone"
                    value={contact.phone}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="sr-only">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Subject"
                    value={contact.subject}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Message"
                    value={contact.message}
                    onChange={handleInput}
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="address" className="sr-only">
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Address"
                    value={contact.address}
                    onChange={handleInput}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white Button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Request a Call Back
                  </button>
                </div>
              </form>
            </div>

            {/* Information Section */}
            <div className="w-full lg:w-1/2 p-8 bg-white/20 text-primary">
              <h2 className="text-xl text-center md:text-3xl font-extrabold mb-6">
                Our Location
              </h2>
              <p className="text-gray-500">
                You can reach us through any of the following ways. We're here
                to help you with any questions or inquiries you may have.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="text-gray-700">
                  <strong className="text-primary">Phone:</strong> 9598149103
                </li>
                <li className="text-gray-700">
                  <strong className="text-primary">Email:</strong>{" "}
                  info@adoctorsdiary.com
                </li>
                <li className="text-gray-700">
                  <strong className="text-primary">Address:</strong> A1/431,
                  near Metro Pillar No 166, Chilla Sarda Banger, Block A, Ashok
                  Nagar Extension, New Ashok Nagar, New Delhi, Delhi, 110096
                </li>
              </ul>
              <div className="mt-8 mx-auto text-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d226.43449557384122!2d82.6910651084295!3d25.78448337271675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399039939cb54c73%3A0x69e8594e76449bb2!2sMalti%20Devi%20Smriti%20Bhavan!5e0!3m2!1sen!2sin!4v1725470548783!5m2!1sen!2sin"
                  className="rounded-lg w-[200px] h-[200px] sm:w-[500px] sm:h-[250px]"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Thank You!</h2>
            <p className="text-gray-600">
              "Thank you for reaching out to us! Your request has been received,
              and our team will get in touch with you shortly to assist with
              your needs. We appreciate your patience and look forward to
              connecting with you soon."
            </p>
            <button
              className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark focus:outline-none"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
