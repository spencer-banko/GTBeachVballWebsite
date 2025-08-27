import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const faqs = [
  {
    question: 'What skill level do I need to join?',
    answer: 'We welcome players of all skill levels! Whether you\'re a complete beginner or an experienced player, we have opportunities for everyone. We offer different practice sessions and training programs to help you improve.',
  },
  {
    question: 'When and where are practices held?',
    answer: 'Practices are typically held 3 times per week at the Georgia Tech Campus Recreation Center outdoor courts. Specific times vary by semester and are announced at the beginning of each term.',
  },
  {
    question: 'Are there tryouts?',
    answer: 'No, we don\'t hold tryouts! We believe in inclusivity and welcome all interested students. However, we do have different teams for various skill levels and tournament competitions.',
  },
  {
    question: 'What equipment do I need?',
    answer: 'For practices, we provide volleyballs and nets. You\'ll want to bring comfortable athletic clothing, sunscreen, and water. For tournaments, you may need to purchase a team uniform.',
  },
  {
    question: 'How much are dues?',
    answer: 'Club dues are $50 per semester, which covers equipment, tournament entry fees, and administrative costs. We also offer payment plans and scholarships for students in need.',
  },
  {
    question: 'Do you compete in tournaments?',
    answer: 'Yes! We participate in various tournaments throughout the year, including regional collegiate tournaments, local leagues, and our own GT-hosted events.',
  },
  {
    question: 'Can I join mid-semester?',
    answer: 'Absolutely! You can join at any time during the semester. We\'ll help you get up to speed and integrate you into the team.',
  },
  {
    question: 'What if I can\'t make all practices?',
    answer: 'We understand that students have busy schedules. While we encourage regular attendance, we\'re flexible and work with members to accommodate their academic commitments.',
  },
];

export const TeamPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>Team Information - GT Beach Volleyball Club</title>
        <meta name="description" content="Learn about the GT Beach Volleyball Club team, practice schedules, tournaments, and frequently asked questions." />
      </Helmet>

      <div className="pt-16">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-gt-gold/10 to-gt-accent/10">
          <div className="container-max">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gt-navy mb-6">
                Team Information
              </h1>
              <p className="text-xl text-gray-600">
                Everything you need to know about joining and participating in the 
                GT Beach Volleyball Club
              </p>
            </div>
          </div>
        </section>

        {/* Practice Schedule */}
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gt-navy text-center mb-12">
                Practice Schedule
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card">
                  <h3 className="text-xl font-semibold text-gt-navy mb-4">Spring 2024</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Monday</span>
                      <span className="text-gray-600">6:00 PM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Wednesday</span>
                      <span className="text-gray-600">6:00 PM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Friday</span>
                      <span className="text-gray-600">4:00 PM - 6:00 PM</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    * Times subject to change based on weather and court availability
                  </p>
                </div>
                <div className="card">
                  <h3 className="text-xl font-semibold text-gt-navy mb-4">Location</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gt-navy">Georgia Tech Campus Recreation Center</h4>
                      <p className="text-gray-600">750 Ferst Drive NW, Atlanta, GA 30332</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gt-navy">Outdoor Beach Volleyball Courts</h4>
                      <p className="text-gray-600">Located behind the CRC building</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gt-navy">Equipment</h4>
                      <p className="text-gray-600">Balls and nets provided by the club</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tournaments & Events */}
        <section className="section-padding bg-gt-gray">
          <div className="container-max">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gt-navy text-center mb-12">
                Tournaments & Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="card text-center">
                  <div className="text-4xl mb-4">🏆</div>
                  <h3 className="text-lg font-semibold text-gt-navy mb-2">Regional Tournaments</h3>
                  <p className="text-gray-600">
                    Compete against other colleges in the Southeast region
                  </p>
                </div>
                <div className="card text-center">
                  <div className="text-4xl mb-4">🏐</div>
                  <h3 className="text-lg font-semibold text-gt-navy mb-2">Local Leagues</h3>
                  <p className="text-gray-600">
                    Join local beach volleyball leagues and competitions
                  </p>
                </div>
                <div className="card text-center">
                  <div className="text-4xl mb-4">🎉</div>
                  <h3 className="text-lg font-semibold text-gt-navy mb-2">Social Events</h3>
                  <p className="text-gray-600">
                    Team bonding activities, BBQs, and social gatherings
                  </p>
                </div>
                <div className="card text-center">
                  <div className="text-4xl mb-4">🏖️</div>
                  <h3 className="text-lg font-semibold text-gt-navy mb-2">Beach Trips</h3>
                  <p className="text-gray-600">
                    Weekend trips to nearby beaches for training and fun
                  </p>
                </div>
                <div className="card text-center">
                  <div className="text-4xl mb-4">🎓</div>
                  <h3 className="text-lg font-semibold text-gt-navy mb-2">GT Hosted Events</h3>
                  <p className="text-gray-600">
                    Annual tournaments and events hosted on campus
                  </p>
                </div>
                <div className="card text-center">
                  <div className="text-4xl mb-4">🤝</div>
                  <h3 className="text-lg font-semibold text-gt-navy mb-2">Community Service</h3>
                  <p className="text-gray-600">
                    Volunteer opportunities and community outreach
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Membership Benefits */}
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gt-navy text-center mb-12">
                Membership Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-gt-gold text-xl">✓</div>
                    <div>
                      <h4 className="font-semibold text-gt-navy">Access to Equipment</h4>
                      <p className="text-gray-600">Use of volleyballs, nets, and training equipment</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-gt-gold text-xl">✓</div>
                    <div>
                      <h4 className="font-semibold text-gt-navy">Tournament Entry</h4>
                      <p className="text-gray-600">Entry fees covered for all club tournaments</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-gt-gold text-xl">✓</div>
                    <div>
                      <h4 className="font-semibold text-gt-navy">Professional Coaching</h4>
                      <p className="text-gray-600">Access to experienced coaches and trainers</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-gt-gold text-xl">✓</div>
                    <div>
                      <h4 className="font-semibold text-gt-navy">Team Uniform</h4>
                      <p className="text-gray-600">Official GT Beach Volleyball Club uniform</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-gt-gold text-xl">✓</div>
                    <div>
                      <h4 className="font-semibold text-gt-navy">Social Network</h4>
                      <p className="text-gray-600">Connect with fellow volleyball enthusiasts</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-gt-gold text-xl">✓</div>
                    <div>
                      <h4 className="font-semibold text-gt-navy">Leadership Opportunities</h4>
                      <p className="text-gray-600">Chance to serve on the executive board</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="section-padding bg-gt-gray">
          <div className="container-max">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gt-navy text-center mb-12">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="card">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex justify-between items-center text-left"
                    >
                      <h3 className="text-lg font-semibold text-gt-navy pr-4">
                        {faq.question}
                      </h3>
                      {openFaq === index ? (
                        <ChevronUpIcon className="h-5 w-5 text-gt-gold flex-shrink-0" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5 text-gt-gold flex-shrink-0" />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gt-navy text-white">
          <div className="container-max text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Join the Team?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Have more questions or ready to get started? Fill out our interest form 
              and we'll get back to you with all the details!
            </p>
            <a href="/interest" className="btn-secondary">
              Join Our Team
            </a>
          </div>
        </section>
      </div>
    </>
  );
};
