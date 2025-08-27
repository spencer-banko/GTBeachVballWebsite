import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { sponsorsApi } from '../utils/api';
import { Sponsor, CreateSponsorInquiryData, FormErrors } from '../types';

export const SponsorsPage: React.FC = () => {
  const [activeSponsor, setActiveSponsor] = useState<Sponsor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inquiryForm, setInquiryForm] = useState<CreateSponsorInquiryData>({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchSponsor = async () => {
      try {
        const data = await sponsorsApi.getActive();
        setActiveSponsor(data);
      } catch (error) {
        console.error('Error fetching sponsor:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSponsor();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!inquiryForm.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!inquiryForm.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiryForm.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!inquiryForm.message.trim()) {
      newErrors.message = 'Message is required';
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
      await sponsorsApi.submitInquiry(inquiryForm);
      setIsSubmitted(true);
      setInquiryForm({
        name: '',
        email: '',
        company: '',
        message: '',
      });
    } catch (error: any) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInquiryForm(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>Sponsor Inquiry Submitted - GT Beach Volleyball Club</title>
        </Helmet>
        
        <div className="pt-16 section-padding">
          <div className="container-max">
            <div className="max-w-2xl mx-auto text-center">
              <div className="text-6xl mb-6">🎉</div>
              <h1 className="text-3xl md:text-4xl font-bold text-gt-navy mb-6">
                Thank You!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Your sponsor inquiry has been submitted successfully. We'll be in touch soon 
                to discuss sponsorship opportunities with the GT Beach Volleyball Club!
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="btn-primary"
              >
                Submit Another Inquiry
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
        <title>Sponsors - GT Beach Volleyball Club</title>
        <meta name="description" content="Learn about sponsorship opportunities with the GT Beach Volleyball Club. Support student athletes and gain brand visibility." />
      </Helmet>

      <div className="pt-16">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-gt-gold/10 to-gt-accent/10">
          <div className="container-max">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gt-navy mb-6">
                Our Sponsors
              </h1>
              <p className="text-xl text-gray-600">
                Supporting student athletes and building lasting partnerships
              </p>
            </div>
          </div>
        </section>

        {/* Current Sponsor */}
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gt-navy text-center mb-12">
                Current Sponsor
              </h2>
              {isLoading ? (
                <div className="card animate-pulse">
                  <div className="h-16 bg-gray-300 rounded mx-auto mb-6 w-32"></div>
                  <div className="h-6 bg-gray-300 rounded mb-4 w-48 mx-auto"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              ) : activeSponsor ? (
                <div className="card text-center">
                  <div className="flex justify-center mb-6">
                    <img
                      src={activeSponsor.logoUrl}
                      alt={activeSponsor.name}
                      className="h-16 w-auto"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gt-navy mb-4">
                    {activeSponsor.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {activeSponsor.blurb}
                  </p>
                  <a
                    href={activeSponsor.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Visit Website
                  </a>
                </div>
              ) : (
                <div className="card text-center">
                  <div className="text-6xl mb-4">🏢</div>
                  <h3 className="text-xl font-semibold text-gt-navy mb-4">
                    Your Company Here
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Interested in sponsoring the Georgia Tech Beach Volleyball Club? 
                    Contact us to learn about sponsorship opportunities and benefits.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Why Sponsor Us */}
        <section className="section-padding bg-gt-gray">
          <div className="container-max">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gt-navy text-center mb-12">
                Why Sponsor Us?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="card text-center">
                  <div className="text-4xl mb-4">👥</div>
                  <h3 className="text-lg font-semibold text-gt-navy mb-2">Brand Visibility</h3>
                  <p className="text-gray-600">
                    Reach 50+ active members and the broader GT community
                  </p>
                </div>
                <div className="card text-center">
                  <div className="text-4xl mb-4">📱</div>
                  <h3 className="text-lg font-semibold text-gt-navy mb-2">Social Media</h3>
                  <p className="text-gray-600">
                    Featured mentions on our social media platforms
                  </p>
                </div>
                <div className="card text-center">
                  <div className="text-4xl mb-4">🏆</div>
                  <h3 className="text-lg font-semibold text-gt-navy mb-2">Event Presence</h3>
                  <p className="text-gray-600">
                    Logo placement at tournaments and events
                  </p>
                </div>
                <div className="card text-center">
                  <div className="text-4xl mb-4">🎓</div>
                  <h3 className="text-lg font-semibold text-gt-navy mb-2">Student Engagement</h3>
                  <p className="text-gray-600">
                    Connect with motivated, active students
                  </p>
                </div>
                <div className="card text-center">
                  <div className="text-4xl mb-4">🤝</div>
                  <h3 className="text-lg font-semibold text-gt-navy mb-2">Community Impact</h3>
                  <p className="text-gray-600">
                    Support student athletics and wellness
                  </p>
                </div>
                <div className="card text-center">
                  <div className="text-4xl mb-4">📈</div>
                  <h3 className="text-lg font-semibold text-gt-navy mb-2">Growth Potential</h3>
                  <p className="text-gray-600">
                    Partner with a growing, competitive club
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sponsorship Levels */}
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gt-navy text-center mb-12">
                Sponsorship Levels
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="card text-center">
                  <h3 className="text-xl font-semibold text-gt-navy mb-2">Bronze</h3>
                  <p className="text-2xl font-bold text-gt-gold mb-4">$500</p>
                  <ul className="text-sm text-gray-600 space-y-2 text-left">
                    <li>• Logo on team website</li>
                    <li>• Social media mention</li>
                    <li>• Event banner placement</li>
                  </ul>
                </div>
                <div className="card text-center border-2 border-gt-gold">
                  <h3 className="text-xl font-semibold text-gt-navy mb-2">Silver</h3>
                  <p className="text-2xl font-bold text-gt-gold mb-4">$1,000</p>
                  <ul className="text-sm text-gray-600 space-y-2 text-left">
                    <li>• All Bronze benefits</li>
                    <li>• Logo on team uniforms</li>
                    <li>• Tournament sponsorship</li>
                    <li>• Featured blog post</li>
                  </ul>
                </div>
                <div className="card text-center">
                  <h3 className="text-xl font-semibold text-gt-navy mb-2">Gold</h3>
                  <p className="text-2xl font-bold text-gt-gold mb-4">$2,500+</p>
                  <ul className="text-sm text-gray-600 space-y-2 text-left">
                    <li>• All Silver benefits</li>
                    <li>• Exclusive event sponsorship</li>
                    <li>• Team equipment branding</li>
                    <li>• Custom partnership package</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="section-padding bg-gt-gray">
          <div className="container-max">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gt-navy text-center mb-12">
                Interested in Sponsoring?
              </h2>
              <div className="card">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gt-navy mb-2">
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={inquiryForm.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gt-gold focus:border-transparent ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gt-navy mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={inquiryForm.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gt-gold focus:border-transparent ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gt-navy mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={inquiryForm.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gt-gold focus:border-transparent"
                      placeholder="Enter your company name"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gt-navy mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={inquiryForm.message}
                      onChange={handleChange}
                      rows={4}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gt-gold focus:border-transparent ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Tell us about your sponsorship interests..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>
                  {errors.submit && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600">{errors.submit}</p>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Sponsorship Inquiry'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
