
import React, { useEffect, useState } from 'react';
import { getPageContent } from '../utils/content';

const Contact: React.FC = () => {
  const [cmsData, setCmsData] = useState<{ title: string; subtitle: string } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Contact Us - Namelyx";
    window.scrollTo(0, 0);
    
    const loadContent = async () => {
        const content = await getPageContent('contact');
        if (content) {
            setCmsData(content.attributes);
        }
    };
    loadContent();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    data.append('access_key', '4584d2a3-d286-4bf3-977f-cdaffb74db3b');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      });
      
      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        console.error("Submission failed", result);
        // Optional: Add error state handling here if needed
      }
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen pt-32 pb-24 bg-brand-bg relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-2xl mx-auto px-6 relative z-10 animate-slide-up">
        <h1 className="text-4xl md:text-5xl font-sans font-bold text-white mb-4 tracking-tight text-center">
          {cmsData ? cmsData.title : 'Contact Namelyx'}
        </h1>
        <p className="text-gray-400 text-center mb-12 font-light">
          {cmsData ? cmsData.subtitle : 'Start a conversation about your digital future.'}
        </p>

        {submitted ? (
          <div className="bg-white/5 border border-brand-accent/30 p-12 text-center rounded-lg backdrop-blur-md animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-accent mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl text-white font-bold mb-4">Message Sent</h2>
            <p className="text-gray-300">Thank you for your inquiry. Our team will respond to you shortly at <span className="text-brand-accent">{formData.email}</span>.</p>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit}
            className="bg-white/[0.02] border border-white/10 p-8 md:p-12 space-y-6 rounded-lg backdrop-blur-sm"
          >
            {/* Honeypot Spam Protection */}
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

            <div>
              <label htmlFor="name" className="block text-xs font-bold text-brand-accent uppercase tracking-widest mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 p-4 text-white focus:outline-none focus:border-brand-accent focus:shadow-[0_0_15px_rgba(0,255,157,0.1)] transition-all rounded-sm placeholder-gray-600"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold text-brand-accent uppercase tracking-widest mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 p-4 text-white focus:outline-none focus:border-brand-accent focus:shadow-[0_0_15px_rgba(0,255,157,0.1)] transition-all rounded-sm placeholder-gray-600"
                placeholder="name@company.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs font-bold text-brand-accent uppercase tracking-widest mb-2">Subject</label>
              <div className="relative">
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 p-4 text-white focus:outline-none focus:border-brand-accent transition-all rounded-sm appearance-none cursor-pointer"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Domain Purchase">Domain Purchase</option>
                  <option value="Partnership">Partnership</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-bold text-brand-accent uppercase tracking-widest mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 p-4 text-white focus:outline-none focus:border-brand-accent focus:shadow-[0_0_15px_rgba(0,255,157,0.1)] transition-all rounded-sm placeholder-gray-600"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-brand-accent text-black font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 shadow-[0_4px_20px_rgba(0,255,157,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Inquiry'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Contact;
