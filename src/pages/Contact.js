import { useState } from 'react';
import { sendContactMessage } from '../services/contactService';
import { FaSpinner, FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { GiSoccerField } from 'react-icons/gi';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      await sendContactMessage(formData);
      setSubmitStatus({ 
        success: true, 
        message: 'Your message has been sent successfully! We will get back to you soon.' 
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus({ 
        success: false, 
        message: 'Failed to send message. Please try again later or contact us directly.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Top spacer to ensure navbar visibility */}
      <div className="h-20 w-full bg-gradient-to-br from-gray-900 to-gray-800"></div>
      
      {/* SAS FC Brand Elements (adjusted for white background) */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-[#339c0c] via-[#f9fd06] to-[#339c0c] z-20"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#f9fd06]/10 blur-3xl"></div>
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#339c0c]/10 blur-3xl"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Hero Section with adjusted top padding */}
        <div className="text-center mb-16 pt-8">
          <span className="inline-block text-[#339c0c] font-bold mb-3 tracking-widest uppercase text-sm">
            Connect With Us
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Contact <span className="text-[#339c0c]">SAS FC</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#339c0c] to-[#f9fd06] mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions, feedback, or partnership inquiries? Our team is ready to assist you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 hover:shadow-[0_20px_50px_-10px_rgba(249,253,6,0.2)] transition-all duration-500">
            <div className="p-8 md:p-10">
              <div className="flex items-center mb-8">
                <div className="bg-[#339c0c] p-3 rounded-xl mr-4">
                  <FaPaperPlane className="text-white text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Send Us a Message</h2>
              </div>
              
              {submitStatus && (
                <div className={`mb-6 p-4 rounded-lg ${
                  submitStatus.success 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  <p className="font-medium">{submitStatus.message}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#339c0c] focus:border-[#339c0c] transition-all placeholder-gray-400"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#339c0c] focus:border-[#339c0c] transition-all placeholder-gray-400"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#339c0c] focus:border-[#339c0c] transition-all placeholder-gray-400"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#339c0c] focus:border-[#339c0c] transition-all placeholder-gray-400"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#339c0c] to-[#2a850a] hover:from-[#2a850a] hover:to-[#339c0c] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-70 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="animate-spin mr-3" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-3" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-8 md:p-10 text-white">
              <div className="flex items-center mb-8">
                <div className="bg-[#f9fd06] p-3 rounded-xl mr-4">
                  <GiSoccerField className="text-gray-900 text-xl" />
                </div>
                <h2 className="text-2xl font-bold">Club Information</h2>
              </div>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-[#339c0c]/20 p-3 rounded-lg mr-4">
                    <FaMapMarkerAlt className="text-[#f9fd06] text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Our Headquarters</h3>
                    <p className="text-white/80">Saris Addis Sefer</p>
                    <p className="text-white/80">Addis Ababa, Ethiopia</p>
                    <p className="text-white/80 mt-2">Open: Mon-Fri, 9AM-5PM</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#339c0c]/20 p-3 rounded-lg mr-4">
                    <FaEnvelope className="text-[#f9fd06] text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Email Addresses</h3>
                    <div className="space-y-1">
                      <a href="mailto:info@sasfc.com" className="block text-white/80 hover:text-[#f9fd06] transition-colors">info@sasfc.com</a>
                      <a href="mailto:support@sasfc.com" className="block text-white/80 hover:text-[#f9fd06] transition-colors">support@sasfc.com</a>
                      <a href="mailto:partnerships@sasfc.com" className="block text-white/80 hover:text-[#f9fd06] transition-colors">partnerships@sasfc.com</a>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#339c0c]/20 p-3 rounded-lg mr-4">
                    <FaPhone className="text-[#f9fd06] text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Phone Numbers</h3>
                    <div className="space-y-1">
                      <a href="tel:+251123456789" className="block text-white/80 hover:text-[#f9fd06] transition-colors">+251 123 456 789 (General)</a>
                      <a href="tel:+251987654321" className="block text-white/80 hover:text-[#f9fd06] transition-colors">+251 987 654 321 (Tickets)</a>
                      <a href="tel:+251112223334" className="block text-white/80 hover:text-[#f9fd06] transition-colors">+251 112 223 334 (Academy)</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Embed */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 h-64 md:h-80 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#339c0c]/10 to-[#f9fd06]/10 flex items-center justify-center">
                <div className="text-center p-6 bg-white/90 rounded-xl shadow-sm border border-gray-200">
                  <GiSoccerField className="mx-auto text-4xl text-[#339c0c] mb-3" />
                  <h3 className="font-bold text-gray-800 mb-1">SAS FC Stadium</h3>
                  <p className="text-gray-600 text-sm">Saris Addis Sefer, Addis Ababa</p>
                  <button className="mt-3 px-4 py-2 bg-[#339c0c] hover:bg-[#2a850a] text-white text-sm rounded-full transition-colors">
                    View on Map
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="max-w-4xl mx-auto mt-20 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Follow Us On Social Media</h3>
          <div className="flex justify-center space-x-6">
            {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map((platform) => (
              <a 
                key={platform} 
                href="#" 
                className="w-12 h-12 bg-gray-100 hover:bg-[#339c0c] rounded-full flex items-center justify-center text-gray-700 hover:text-white transition-all duration-300"
                aria-label={platform}
              >
                <span className="sr-only">{platform}</span>
                <span className="text-xl">{platform.charAt(0)}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};