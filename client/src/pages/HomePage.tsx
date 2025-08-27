import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { execsApi, sponsorsApi } from '../utils/api';
import { Executive, Sponsor } from '../types';

export const HomePage: React.FC = () => {
  const [executives, setExecutives] = useState<Executive[]>([]);
  const [activeSponsor, setActiveSponsor] = useState<Sponsor | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [execsData, sponsorData] = await Promise.all([
          execsApi.getAll(),
          sponsorsApi.getActive(),
        ]);
        setExecutives(execsData.slice(0, 3)); // Show top 3 execs
        setActiveSponsor(sponsorData);
      } catch (error) {
        console.error('Error fetching home page data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Georgia Tech Beach Volleyball Club - Home</title>
        <meta name="description" content="Join the Georgia Tech Beach Volleyball Club! We welcome players of all skill levels. Practice, compete, and build lasting friendships." />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-16 pb-12 bg-gradient-to-br from-gt-gold/10 to-gt-accent/10">
        <div className="container-max section-padding">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <img
                src="/images/logo.png"
                alt="GT Beach Volleyball Club Logo"
                className="h-24 w-auto"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gt-navy mb-6">
              Georgia Tech Beach Volleyball Club
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Building a strong beach volleyball community at Georgia Tech. 
              Join us for competitive play, skill development, and lasting friendships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/interest" className="btn-primary">
                Join Our Team
              </Link>
              <Link to="/team" className="btn-outline">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About the Team */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gt-navy mb-6">
              About the Team
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              The Georgia Tech Beach Volleyball Club is a student-run organization dedicated to 
              promoting beach volleyball on campus. We welcome players of all skill levels, from 
              complete beginners to experienced competitors. Our club provides opportunities for 
              practice, skill development, tournament competition, and social events.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="card text-center">
                <div className="text-3xl font-bold text-gt-gold mb-2">50+</div>
                <div className="text-gray-600">Active Members</div>
              </div>
              <div className="card text-center">
                <div className="text-3xl font-bold text-gt-gold mb-2">3x</div>
                <div className="text-gray-600">Weekly Practices</div>
              </div>
              <div className="card text-center">
                <div className="text-3xl font-bold text-gt-gold mb-2">10+</div>
                <div className="text-gray-600">Tournaments/Year</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Photos */}
      <section className="section-padding bg-gt-gray">
        <div className="container-max">
          <h2 className="text-3xl md:text-4xl font-bold text-gt-navy text-center mb-12">
            Team Photos
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <img
                src="/images/team.jpg"
                alt="GT Beach Volleyball Team"
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
              <p className="text-center text-gray-600 font-medium">
                Our amazing team at the 2024 Spring Tournament
              </p>
            </div>
            <div className="space-y-4">
              <img
                src="/images/practice.jpg"
                alt="Team Practice Session"
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
              <p className="text-center text-gray-600 font-medium">
                Intense practice session preparing for competition
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsor Highlight */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gt-navy text-center mb-12">
              Our Sponsors
            </h2>
            {activeSponsor ? (
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
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={activeSponsor.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Visit Website
                  </a>
                  <Link to="/sponsors" className="btn-outline">
                    Learn About Sponsorship
                  </Link>
                </div>
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
                <Link to="/sponsors" className="btn-primary">
                  Become a Sponsor
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Meet the Execs Preview */}
      <section className="section-padding bg-gt-gray">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gt-navy mb-4">
              Meet the Execs
            </h2>
            <p className="text-lg text-gray-600">
              Our dedicated executive board works hard to make the club run smoothly
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card animate-pulse">
                  <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {executives.map((exec) => (
                <div key={exec.id} className="card text-center">
                  <img
                    src={exec.photoUrl}
                    alt={exec.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-gt-navy mb-1">{exec.name}</h3>
                  <p className="text-gt-gold font-medium mb-3">{exec.role}</p>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {exec.bio}
                  </p>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-8">
            <Link to="/execs" className="btn-outline">
              View Full Executive Board
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gt-navy text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join the Team?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're a seasoned player or just starting out, we'd love to have you 
            join our beach volleyball community!
          </p>
          <Link to="/interest" className="btn-secondary">
            Fill Out Interest Form
          </Link>
        </div>
      </section>
    </>
  );
};
