import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface Props {
  eventId: string;
  eventName: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function EventRegistrationModal({ eventId, eventName, onClose, onSuccess }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    college: '',
    year_of_study: '',
    department: '',
    dietary_preferences: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('event_registrations')
        .insert({
          event_id: eventId,
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          college: formData.college,
          year_of_study: formData.year_of_study,
          department: formData.department,
          dietary_preferences: formData.dietary_preferences,
        });

      if (error) {
        console.error('Registration error:', error);
        alert('Failed to register. Please try again.');
      } else {
        alert('Successfully registered for the event!');
        setFormData({
          full_name: '',
          email: '',
          phone: '',
          college: '',
          year_of_study: '',
          department: '',
          dietary_preferences: '',
        });
        onSuccess?.();
        onClose();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-[#0F131A] shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/10 flex flex-col max-h-[90vh]">
        
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#0A0D14] px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Register for Event</h2>
            <p className="text-[11px] text-white/50 mt-1 uppercase tracking-widest font-bold">📍 {eventName}</p>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="grid h-8 w-8 place-items-center rounded-full bg-white/5 text-white/60 hover:bg-white/20 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Personal Info */}
            <section className="space-y-4">
              <h3 className="text-sm font-bold text-sky-400 uppercase tracking-widest border-b border-white/5 pb-2">Personal Information</h3>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/80">Full Name *</label>
                  <input 
                    required 
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe" 
                    className="w-full rounded-xl border border-white/10 bg-[#161B22] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/50 hover:bg-[#1A2029] transition-colors" 
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/80">Email *</label>
                  <input 
                    required 
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com" 
                    className="w-full rounded-xl border border-white/10 bg-[#161B22] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/50 hover:bg-[#1A2029] transition-colors" 
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/80">Phone Number *</label>
                  <input 
                    required 
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210" 
                    className="w-full rounded-xl border border-white/10 bg-[#161B22] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/50 hover:bg-[#1A2029] transition-colors" 
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/80">College *</label>
                  <input 
                    required 
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    placeholder="e.g. MIT, IIT Delhi" 
                    className="w-full rounded-xl border border-white/10 bg-[#161B22] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/50 hover:bg-[#1A2029] transition-colors" 
                  />
                </div>
              </div>
            </section>

            {/* Academic Info */}
            <section className="space-y-4">
              <h3 className="text-sm font-bold text-fuchsia-400 uppercase tracking-widest border-b border-white/5 pb-2">Academic Details</h3>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/80">Year of Study *</label>
                  <select 
                    required 
                    name="year_of_study"
                    value={formData.year_of_study}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-[#161B22] px-4 py-3 text-sm text-white focus:border-fuchsia-400 focus:outline-none focus:ring-1 focus:ring-fuchsia-400/50 hover:bg-[#1A2029] transition-colors"
                  >
                    <option value="">Select Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="5th Year">5th Year</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/80">Department *</label>
                  <input 
                    required 
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="e.g. Computer Science" 
                    className="w-full rounded-xl border border-white/10 bg-[#161B22] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-fuchsia-400 focus:outline-none focus:ring-1 focus:ring-fuchsia-400/50 hover:bg-[#1A2029] transition-colors" 
                  />
                </div>
              </div>
            </section>

            {/* Additional Info */}
            <section className="space-y-4">
              <h3 className="text-sm font-bold text-orange-400 uppercase tracking-widest border-b border-white/5 pb-2">Additional Information</h3>
              <div>
                <label className="mb-2 block text-sm font-semibold text-white/80">Dietary Preferences</label>
                <textarea 
                  name="dietary_preferences"
                  value={formData.dietary_preferences}
                  onChange={handleChange}
                  placeholder="e.g. Vegetarian, Vegan, No nuts, etc." 
                  rows={3}
                  className="w-full rounded-xl border border-white/10 bg-[#161B22] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400/50 hover:bg-[#1A2029] transition-colors resize-none" 
                />
              </div>
            </section>

            {/* Actions */}
            <div className="border-t border-white/10 pt-6 flex justify-end gap-3">
              <button 
                type="button" 
                onClick={onClose} 
                className="rounded-xl px-5 py-2.5 text-sm font-bold text-white hover:bg-white/10 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 px-8 py-2.5 text-sm font-bold text-white shadow-[0_5px_20px_rgba(6,182,212,0.3)] hover:shadow-[0_5px_25px_rgba(6,182,212,0.5)] hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Registering...' : 'Complete Registration'}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
