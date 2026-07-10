import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { CONTACT_INFO } from "@/constant";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Session — Shrutibhyam Wellness" },
      { name: "description", content: "Book a yoga session or inquire about corporate wellness." },
    ],
  }),
  component: BookSession,
});

function BookSession() {
  return (
    <SiteLayout>
      <section className="relative py-20 bg-surface min-h-[80vh] flex items-center">
        <div className="max-w-[800px] w-full mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-green block mb-2">Join Us</span>
            <h2 className="font-display text-3xl md:text-4xl text-primary mb-3">Book a Session or Inquire</h2>
            <p className="text-on-surface-variant">Fill out the form below and we will get back to you with availability and details.</p>
          </div>

          <form 
            action={`https://formsubmit.co/${CONTACT_INFO.email}`} 
            method="POST" 
            className="bg-cream-bg border border-soft-beige rounded-xl shadow-sm p-8 space-y-6 max-w-2xl mx-auto"
          >
            {/* Honeypot / Anti-spam */}
            <input type="text" name="_honey" style={{ display: "none" }} />
            {/* Disable Captcha for smoother UX */}
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_subject" value="New Booking/Inquiry from Shrutibhyam Website!" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">Full Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  className="w-full bg-surface border border-soft-beige rounded px-4 py-3 text-sm focus:outline-none focus:border-sage-green focus:ring-1 focus:ring-sage-green transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">Email Address *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  className="w-full bg-surface border border-soft-beige rounded px-4 py-3 text-sm focus:outline-none focus:border-sage-green focus:ring-1 focus:ring-sage-green transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">Phone Number</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                className="w-full bg-surface border border-soft-beige rounded px-4 py-3 text-sm focus:outline-none focus:border-sage-green focus:ring-1 focus:ring-sage-green transition-colors"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="interest" className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">What are you interested in? *</label>
              <select 
                id="interest" 
                name="interest"
                required
                className="w-full bg-surface border border-soft-beige rounded px-4 py-3 text-sm focus:outline-none focus:border-sage-green focus:ring-1 focus:ring-sage-green transition-colors text-on-surface-variant"
                defaultValue=""
              >
                <option value="" disabled>Select an option</option>
                <option value="Hatha Yoga">Hatha Yoga (Mon-Wed-Fri)</option>
                <option value="Ashtanga Yoga">Ashtanga Vinyasa (Tue-Thu-Sat)</option>
                <option value="Sound Healing">Sound Healing / Meditation</option>
                <option value="Private Class">Private 1-on-1 Session</option>
                <option value="Corporate Wellness">Corporate Wellness Session</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">Message / Health Conditions</label>
              <textarea 
                id="message" 
                name="message" 
                rows={4}
                className="w-full bg-surface border border-soft-beige rounded px-4 py-3 text-sm focus:outline-none focus:border-sage-green focus:ring-1 focus:ring-sage-green transition-colors resize-none"
                placeholder="Any prior experience, health conditions, or questions?"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-[0.15em] px-8 py-4 rounded hover:bg-surface-tint transition-colors cursor-pointer"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
