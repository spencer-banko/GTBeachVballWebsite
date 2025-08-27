import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { execsApi } from '../utils/api';
import { Executive } from '../types';

export const ExecsPage: React.FC = () => {
  const [executives, setExecutives] = useState<Executive[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExecutives = async () => {
      try {
        const data = await execsApi.getAll();
        setExecutives(data);
      } catch (error) {
        console.error('Error fetching executives:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExecutives();
  }, []);

  return (
    <>
      <Helmet>
        <title>Executive Board - GT Beach Volleyball Club</title>
        <meta name="description" content="Meet the executive board of the GT Beach Volleyball Club. Learn about our leadership team and their roles in managing the club." />
      </Helmet>

      <div className="pt-16">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-gt-gold/10 to-gt-accent/10">
          <div className="container-max">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gt-navy mb-6">
                Executive Board
              </h1>
              <p className="text-xl text-gray-600">
                Meet the dedicated team that makes the GT Beach Volleyball Club run smoothly
              </p>
            </div>
          </div>
        </section>

        {/* Executives Grid */}
        <section className="section-padding bg-white">
          <div className="container-max">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="card animate-pulse">
                    <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {executives.map((exec) => (
                  <div key={exec.id} className="card text-center">
                    <img
                      src={exec.photoUrl}
                      alt={exec.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold text-gt-navy mb-2">{exec.name}</h3>
                    <p className="text-gt-gold font-medium mb-4">{exec.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {exec.bio}
                    </p>
                    <div className="flex justify-center space-x-4">
                      {exec.email && (
                        <a
                          href={`mailto:${exec.email}`}
                          className="text-gt-gold hover:text-gt-gold/80 transition-colors duration-200"
                          aria-label={`Email ${exec.name}`}
                        >
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </a>
                      )}
                      {exec.linkedinUrl && (
                        <a
                          href={exec.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gt-gold hover:text-gt-gold/80 transition-colors duration-200"
                          aria-label={`${exec.name}'s LinkedIn`}
                        >
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section className="section-padding bg-gt-gray">
          <div className="container-max">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gt-navy mb-6">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Have questions about the club or want to get involved? 
                Reach out to any of our executive board members or contact us directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:beachvolleyball@gatech.edu"
                  className="btn-primary"
                >
                  Email the Club
                </a>
                <a href="/interest" className="btn-outline">
                  Join Our Team
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
