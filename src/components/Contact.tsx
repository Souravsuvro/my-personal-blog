import * as React from 'react';
import { useState, FormEvent } from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '../context/ThemeContext'; 

const Contact: React.FC = () => {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialLinks = [
    { icon: <FaLinkedin className="text-2xl" />, url: "https://www.linkedin.com/in/sourav007/", color: "hover:text-blue-600" },
    { icon: <FaGithub className="text-2xl" />, url: "https://github.com/Souravsuvro", color: "hover:text-gray-600" },
    { icon: <FaTwitter className="text-2xl" />, url: "https://twitter.com/S_Sarker_Suvro", color: "hover:text-blue-400" },
    { icon: <FaInstagram className="text-2xl" />, url: "https://www.instagram.com/souravsuvro/", color: "hover:text-pink-500" },
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Enhanced email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!emailRegex.test(email.trim())) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (!subject.trim()) {
      toast.error('Please enter a subject');
      return;
    }
    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, 
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: name.trim(),
          from_email: email.trim(),
          subject: subject.trim(),
          message: message.trim()
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast.success('Message sent successfully! I will get back to you soon.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error('Failed to send message. Please try again or contact me directly.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section id="contact-section" className={`py-16 ${theme === 'light' ? 'bg-[#E6F2FF]' : 'bg-[#111111]'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#0A2342] dark:text-[#FFB800] text-center mb-12">Your Next Idea, Just a Message Away</h2>
          
          <div className="max-w-4xl mx-auto bg-white dark:bg-[#1E1E1E] rounded-3xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#113768] dark:text-gray-300 mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#0A2342] dark:focus:ring-[#FFB800] focus:border-transparent"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#113768] dark:text-gray-300 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#0A2342] dark:focus:ring-[#FFB800] focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-[#113768] dark:text-gray-300 mb-1">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#0A2342] dark:focus:ring-[#FFB800] focus:border-transparent"
                      placeholder="Subject"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#113768] dark:text-gray-300 mb-1">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#0A2342] dark:focus:ring-[#FFB800] focus:border-transparent"
                      placeholder="Your Message"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0A2342] dark:bg-[#FFB800] text-white dark:text-black py-2 px-6 rounded-lg hover:bg-[#113768] dark:hover:bg-[#e5a600] transition-colors duration-300 font-medium"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>

              {/* Contact Info & Social Links */}
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-[#0A2342] dark:text-white mb-4">Connect With Me</h3>
                  <div className="flex gap-4 mb-8">
                    {socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-[#113768] dark:text-gray-300 transition-colors duration-300 ${link.color}`}
                      >
                        {link.icon}
                      </a>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-[#113768] dark:text-gray-300">
                    <MdEmail className="text-xl" />
                    <span>souravsuvra007@gmail.com</span>
                  </div>
                </div>
                <div className="mt-8 md:mt-0">
                  <img
                    src="/cartoon_with_laptop.png"
                    alt="Contact"
                    className="w-full max-w-[200px] mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Contact;
