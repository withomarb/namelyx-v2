
import React, { useEffect, useState } from 'react';

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  domainName: string;
}

const OfferModal: React.FC<OfferModalProps> = ({ isOpen, onClose, domainName }) => {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Reset state when modal opens or domain changes
  useEffect(() => {
    if (isOpen) {
      setSuccess(false);
      setResult("");
      setIsSubmitting(false);
    }
  }, [isOpen, domainName]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending....");
    
    // Capture form reference immediately to avoid event access issues after await
    const form = event.currentTarget;
    const formData = new FormData(form);
    
    // Official Web3Forms Access Key
    formData.append('access_key', '4584d2a3-d286-4bf3-977f-cdaffb74db3b');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Offer Sent Successfully!");
        setSuccess(true);
        form.reset();
      } else {
        console.error("Error", data);
        setResult(data.message || "Error submitting form");
        setSuccess(false);
      }
    } catch (error) {
      console.error(error);
      setResult("Something went wrong!");
      setSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-[#0F0F0F] border border-brand-accent/30 p-8 md:p-12 w-full max-w-lg shadow-[0_0_50px_rgba(0,255,157,0.1)] animate-fade-in">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-brand-accent transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-8">
          <span className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-2 block">Make an Offer</span>
          <h2 className="text-3xl font-bold text-white mb-2">{domainName}</h2>
          <p className="text-gray-400 text-sm">Submit your offer directly to our brokerage team.</p>
        </div>

        {success ? (
          <div className="text-center py-8 animate-fade-in">
             <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-accent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl text-brand-accent font-bold mb-4">{result}</h3>
            <p className="text-gray-400 mb-8">We have received your offer and will respond shortly.</p>
             <button 
              onClick={onClose}
              className="text-white text-sm font-bold uppercase tracking-widest hover:text-brand-accent transition-colors underline decoration-brand-accent/30 underline-offset-4"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Honeypot Spam Protection */}
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
            
            {/* Hidden Domain Field */}
            <input type="hidden" name="domain_name" value={domainName} />
            
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Your Name</label>
              <input 
                type="text" 
                name="name"
                required
                className="w-full bg-black border border-white/10 p-3 text-white focus:outline-none focus:border-brand-accent transition-colors rounded-sm"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
              <input 
                type="email" 
                name="email"
                required
                className="w-full bg-black border border-white/10 p-3 text-white focus:outline-none focus:border-brand-accent transition-colors rounded-sm"
                placeholder="name@company.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-accent uppercase tracking-wider mb-2">Offer Amount (USD)</label>
              <input 
                type="number" 
                name="offer"
                required
                className="w-full bg-black border border-brand-accent/30 p-3 text-brand-accent focus:outline-none focus:border-brand-accent focus:shadow-[0_0_10px_rgba(0,255,157,0.1)] transition-all font-mono rounded-sm"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Message (Optional)</label>
              <textarea 
                name="message"
                rows={3}
                className="w-full bg-black border border-white/10 p-3 text-white focus:outline-none focus:border-brand-accent transition-colors resize-none rounded-sm"
                placeholder="Additional details..."
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-brand-accent text-black font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300 mt-4 shadow-[0_0_15px_rgba(0,255,157,0.3)] hover:shadow-[0_0_25px_rgba(0,255,157,0.5)] disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
            >
              {isSubmitting ? 'Sending...' : 'Submit Offer'}
            </button>
            
            {/* Feedback Message */}
            {result && !success && (
                <p className="text-center text-brand-accent text-sm mt-4 font-bold tracking-wide animate-pulse">
                    {result}
                </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default OfferModal;
