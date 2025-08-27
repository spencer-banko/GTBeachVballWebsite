import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { interestApi } from '../utils/api';
import { CreateInterestSubmissionData, FormErrors } from '../types';

export const InterestPage: React.FC = () => {
  const [formData, setFormData] = useState<CreateInterestSubmissionData>({
    name: '',
    email: '',
    phone: '',
    affiliation: 'GT Student',
    experienceLevel: 'Beginner',
    notes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.affiliation) {
      newErrors.affiliation = 'Please select your affiliation';
    }

    if (!formData.experienceLevel) {
      newErrors.experienceLevel = 'Please select your experience level';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await interestApi.submit(formData);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        affiliation: 'GT Student',
        experienceLevel: 'Beginner',
        notes: '',
      });
    } catch (error: any) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>Interest Form Submitted - GT Beach Volleyball Club</title>
        </Helmet>
        
        <div className="pt-16 section-padding">
          <div className="container-max">
            <div className="max-w-2xl mx-auto text-center">
              <div className="text-6xl mb-6">🎉</div>
              <h1 className="text-3xl md:text-4xl font-bold text-gt-navy mb-6">
                Thank You!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Your interest form has been submitted successfully. We'll be in touch soon 
                with more information about joining the GT Beach Volleyball Club!
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="btn-primary"
              >
                Submit Another Form
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Join Our Team - GT Beach Volleyball Club</title>
        <meta name="description" content="Interested in joining the GT Beach Volleyball Club? Fill out our interest form and we'll get back to you with details about practices, tournaments, and membership." />
      </Helmet>

      <div className="pt-16 section-padding">
        <div className="container-max">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gt-navy mb-4">
                Join Our Team
              </h1>
              <p className="text-lg text-gray-600">
                Ready to spike, serve, and score with the GT Beach Volleyball Club? 
                Fill out the form below and we'll get back to you!
              </p>
            </div>

            <div className="card">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gt-navy mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gt-gold focus:border-transparent ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gt-navy mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gt-gold focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gt-navy mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gt-gold focus:border-transparent ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                {/* Affiliation */}
                <div>
                  <label htmlFor="affiliation" className="block text-sm font-medium text-gt-navy mb-2">
                    GT Affiliation *
                  </label>
                  <select
                    id="affiliation"
                    name="affiliation"
                    value={formData.affiliation}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gt-gold focus:border-transparent ${
                      errors.affiliation ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="GT Student">GT Student</option>
                    <option value="Other">Other (Alumni, Faculty, Staff, etc.)</option>
                  </select>
                  {errors.affiliation && (
                    <p className="mt-1 text-sm text-red-600">{errors.affiliation}</p>
                  )}
                </div>

                {/* Experience Level */}
                <div>
                  <label htmlFor="experienceLevel" className="block text-sm font-medium text-gt-navy mb-2">
                    Experience Level *
                  </label>
                  <select
                    id="experienceLevel"
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gt-gold focus:border-transparent ${
                      errors.experienceLevel ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="Beginner">Beginner (New to volleyball)</option>
                    <option value="Intermediate">Intermediate (Some experience)</option>
                    <option value="Advanced">Advanced (Competitive experience)</option>
                  </select>
                  {errors.experienceLevel && (
                    <p className="mt-1 text-sm text-red-600">{errors.experienceLevel}</p>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gt-navy mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gt-gold focus:border-transparent"
                    placeholder="Tell us about your volleyball background, goals, or any questions you have..."
                  />
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{errors.submit}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Interest Form'}
                </button>
              </form>
            </div>

            {/* Additional Info */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Questions? Contact us at{' '}
                <a 
                  href="mailto:beachvolleyball@gatech.edu"
                  className="text-gt-gold hover:text-gt-gold/80 transition-colors duration-200"
                >
                  beachvolleyball@gatech.edu
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
