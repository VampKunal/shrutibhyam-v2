import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useState } from "react";

export const Route = createFileRoute("/book-yoga")({
  component: BookYoga,
});

function BookYoga() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    number: "",
    email: "",
    city: "",
    sessionType: "Group Class",
    interest: "Yoga",
    preferredTime: "8:30 am",
    privateTiming: "",
    experienceLevel: "",
    goals: "",
    injuries: "",
    source: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Booking Request for ${formData.interest} - ${formData.name}`;
    const body = `
Name: ${formData.name}
Age: ${formData.age}
Gender: ${formData.gender}
Phone Number: ${formData.number}
Email: ${formData.email}
City: ${formData.city}

Interest: ${formData.interest}
Session Type: ${formData.sessionType}
Preferred Time (Group): ${formData.preferredTime}
Preferred Timing (Private): ${formData.privateTiming}
Experience Level: ${formData.experienceLevel}

Goals: 
${formData.goals}

Injuries/Health Concerns: 
${formData.injuries}

How did you hear about us: ${formData.source}
    `.trim();

    window.location.href = `mailto:care@shrutibhyam.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <SiteLayout>
      <section className="relative py-8 md:py-10 bg-[#FFFAF3]/60 min-h-screen flex items-center justify-center">
        <div className="max-w-3xl mx-auto px-4 md:px-8 w-full">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-soft-beige">
            <div className="text-center mb-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-sage-green mb-4 block">Begin Your Journey</span>
              <h1 className="font-display text-4xl text-primary mb-4">Book Your Session</h1>
              <p className="text-sm text-on-surface-variant">Fill out the details below and we will open your mail client to send your booking request.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-primary mb-2">Name *</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-surface-container-low border border-soft-beige rounded px-4 py-3 focus:outline-none focus:border-sage-green text-sm" placeholder="Your full name" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-primary mb-2">Email *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-surface-container-low border border-soft-beige rounded px-4 py-3 focus:outline-none focus:border-sage-green text-sm" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-primary mb-2">Phone Number *</label>
                  <input required type="tel" name="number" value={formData.number} onChange={handleChange} className="w-full bg-surface-container-low border border-soft-beige rounded px-4 py-3 focus:outline-none focus:border-sage-green text-sm" placeholder="+91 xxxxx xxxxx" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-primary mb-2">Age *</label>
                    <input required type="number" name="age" value={formData.age} onChange={handleChange} className="w-full bg-surface-container-low border border-soft-beige rounded px-4 py-3 focus:outline-none focus:border-sage-green text-sm" placeholder="Age" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-primary mb-2">Gender *</label>
                    <select required name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-surface-container-low border border-soft-beige rounded px-4 py-3 focus:outline-none focus:border-sage-green text-sm appearance-none">
                      <option value="">Select</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-primary mb-2">City *</label>
                  <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full bg-surface-container-low border border-soft-beige rounded px-4 py-3 focus:outline-none focus:border-sage-green text-sm" placeholder="Your city" />
                </div>

                {/* As requested: somewhere in the middle ask for yoga or sound healing too */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-primary mb-2">Interest *</label>
                  <select required name="interest" value={formData.interest} onChange={handleChange} className="w-full bg-surface-container-low border border-soft-beige rounded px-4 py-3 focus:outline-none focus:border-sage-green text-sm appearance-none">
                    <option value="Yoga">Yoga</option>
                    <option value="Sound Healing">Sound Healing</option>
                    <option value="Both">Both</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-primary mb-2">Session Type *</label>
                  <select required name="sessionType" value={formData.sessionType} onChange={handleChange} className="w-full bg-surface-container-low border border-soft-beige rounded px-4 py-3 focus:outline-none focus:border-sage-green text-sm appearance-none">
                    <option value="Group Class">Group Class</option>
                    <option value="Private Session">Private Session</option>
                  </select>
                </div>

                {formData.sessionType === "Group Class" ? (
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-primary mb-2">Preferred Time *</label>
                    <select required name="preferredTime" value={formData.preferredTime} onChange={handleChange} className="w-full bg-surface-container-low border border-soft-beige rounded px-4 py-3 focus:outline-none focus:border-sage-green text-sm appearance-none">
                      <option value="8:30 am">8:30 am</option>
                      <option value="4:00 pm">4:00 pm</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-primary mb-2">Preferred Timing *</label>
                    <input required type="text" name="privateTiming" value={formData.privateTiming} onChange={handleChange} className="w-full bg-surface-container-low border border-soft-beige rounded px-4 py-3 focus:outline-none focus:border-sage-green text-sm" placeholder="e.g. 10:00 am or early evening" />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-primary mb-2">Experience Level</label>
                  <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} className="w-full bg-surface-container-low border border-soft-beige rounded px-4 py-3 focus:outline-none focus:border-sage-green text-sm appearance-none">
                    <option value="">Select level</option>
                    <option value="Beginner">Beginner (New to Yoga)</option>
                    <option value="Intermediate">Intermediate (Practice regularly)</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-primary mb-2">Goals</label>
                <textarea name="goals" value={formData.goals} onChange={handleChange} rows={3} className="w-full bg-surface-container-low border border-soft-beige rounded px-4 py-3 focus:outline-none focus:border-sage-green text-sm resize-none" placeholder="What are you hoping to achieve through this practice?"></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-primary mb-2">Injuries or Health Concerns</label>
                <textarea name="injuries" value={formData.injuries} onChange={handleChange} rows={3} className="w-full bg-surface-container-low border border-soft-beige rounded px-4 py-3 focus:outline-none focus:border-sage-green text-sm resize-none" placeholder="Please list any past or current injuries/concerns..."></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-primary mb-2">How did you hear about us?</label>
                <input type="text" name="source" value={formData.source} onChange={handleChange} className="w-full bg-surface-container-low border border-soft-beige rounded px-4 py-3 focus:outline-none focus:border-sage-green text-sm" placeholder="Instagram, friend, search..." />
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-[0.15em] px-8 py-4 hover:bg-surface-tint transition rounded">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
