import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { Executive } from '../models/Executive';
import { Sponsor } from '../models/Sponsor';
import { InterestSubmission } from '../models/InterestSubmission';
import { SponsorInquiry } from '../models/SponsorInquiry';

// Load environment variables
dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Executive.deleteMany({}),
      Sponsor.deleteMany({}),
      InterestSubmission.deleteMany({}),
      SponsorInquiry.deleteMany({}),
    ]);
    console.log('🧹 Cleared existing data');

    // Seed executives
    const executives = [
      {
        name: 'Sarah Johnson',
        role: 'President',
        bio: 'Senior Computer Science major passionate about building a strong beach volleyball community at GT. Loves competitive play and organizing team events.',
        photoUrl: '/images/execs/president.jpg',
        email: 'sarah.johnson@gatech.edu',
        linkedinUrl: 'https://linkedin.com/in/sarah-johnson-gt',
        visible: true,
        order: 1,
      },
      {
        name: 'Michael Chen',
        role: 'Vice President',
        bio: 'Mechanical Engineering junior with 5+ years of volleyball experience. Focuses on player development and tournament coordination.',
        photoUrl: '/images/execs/vice-president.jpg',
        email: 'michael.chen@gatech.edu',
        linkedinUrl: 'https://linkedin.com/in/michael-chen-gt',
        visible: true,
        order: 2,
      },
      {
        name: 'Emily Rodriguez',
        role: 'Treasurer',
        bio: 'Business Administration major handling all financial aspects of the club. Ensures sustainable funding for equipment and tournaments.',
        photoUrl: '/images/execs/treasurer.jpg',
        email: 'emily.rodriguez@gatech.edu',
        visible: true,
        order: 3,
      },
      {
        name: 'David Kim',
        role: 'Events Coordinator',
        bio: 'Industrial Engineering senior organizing practice schedules, tournaments, and social events. Creates opportunities for players of all skill levels.',
        photoUrl: '/images/execs/events.jpg',
        email: 'david.kim@gatech.edu',
        linkedinUrl: 'https://linkedin.com/in/david-kim-gt',
        visible: true,
        order: 4,
      },
      {
        name: 'Jessica Williams',
        role: 'Communications Director',
        bio: 'Public Policy major managing social media, newsletters, and member communications. Keeps everyone informed about club activities.',
        photoUrl: '/images/execs/communications.jpg',
        email: 'jessica.williams@gatech.edu',
        visible: true,
        order: 5,
      },
      {
        name: 'Alex Thompson',
        role: 'Equipment Manager',
        bio: 'Civil Engineering junior responsible for maintaining nets, balls, and training equipment. Ensures safe and quality practice conditions.',
        photoUrl: '/images/execs/equipment.jpg',
        email: 'alex.thompson@gatech.edu',
        visible: true,
        order: 6,
      },
    ];

    await Executive.insertMany(executives);
    console.log('👥 Seeded executives');

    // Seed sponsors
    const sponsors = [
      {
        name: 'Your Company Here',
        logoUrl: '/images/sponsors/placeholder-logo.png',
        websiteUrl: 'https://example.com',
        blurb: 'Interested in sponsoring the Georgia Tech Beach Volleyball Club? Contact us to learn about sponsorship opportunities and benefits.',
        active: true,
      },
      {
        name: 'Tech Sports Gear',
        logoUrl: '/images/sponsors/tech-sports.png',
        websiteUrl: 'https://techsportsgear.com',
        blurb: 'Premium volleyball equipment and apparel for competitive players. Quality gear for every level of play.',
        active: false,
      },
      {
        name: 'Campus Fitness',
        logoUrl: '/images/sponsors/campus-fitness.png',
        websiteUrl: 'https://campusfitness.com',
        blurb: 'Supporting student athletes with fitness programs and wellness initiatives. Building stronger communities through sports.',
        active: false,
      },
    ];

    await Sponsor.insertMany(sponsors);
    console.log('🏢 Seeded sponsors');

    // Seed interest submissions
    const interestSubmissions = [
      {
        name: 'Rachel Green',
        email: 'rachel.green@gatech.edu',
        phone: '+1-404-555-0123',
        affiliation: 'GT Student',
        experienceLevel: 'Intermediate',
        notes: 'Played indoor volleyball in high school, excited to try beach volleyball! Looking for a fun way to stay active and meet new people.',
      },
      {
        name: 'Tom Anderson',
        email: 'tom.anderson@gatech.edu',
        affiliation: 'GT Student',
        experienceLevel: 'Beginner',
        notes: 'Complete beginner but very interested in learning beach volleyball. Hoping to join practices and improve my skills.',
      },
      {
        name: 'Lisa Park',
        email: 'lisa.park@gatech.edu',
        phone: '+1-404-555-0456',
        affiliation: 'GT Student',
        experienceLevel: 'Advanced',
        notes: 'Competitive beach volleyball player looking to join the club team. Interested in tournament opportunities and advanced training.',
      },
      {
        name: 'Mark Davis',
        email: 'mark.davis@gmail.com',
        phone: '+1-404-555-0789',
        affiliation: 'Other',
        experienceLevel: 'Intermediate',
        notes: 'GT alum interested in supporting the club. Can help with coaching and occasional practices.',
      },
    ];

    await InterestSubmission.insertMany(interestSubmissions);
    console.log('📝 Seeded interest submissions');

    // Seed sponsor inquiries
    const sponsorInquiries = [
      {
        name: 'Jennifer Smith',
        email: 'jennifer.smith@company.com',
        company: 'Local Sports Store',
        message: 'Interested in sponsoring your beach volleyball club. We can provide equipment and apparel in exchange for brand visibility at events.',
      },
      {
        name: 'Robert Wilson',
        email: 'robert.wilson@startup.com',
        company: 'Tech Startup',
        message: 'Looking to sponsor student organizations. Our company focuses on sports technology and would love to support your club.',
      },
    ];

    await SponsorInquiry.insertMany(sponsorInquiries);
    console.log('💼 Seeded sponsor inquiries');

    // Set up admin password (hashed)
    const adminPass = process.env.ADMIN_PASS || 'password123';
    const hashedPassword = await bcrypt.hash(adminPass, 10);
    
    console.log('🔐 Admin credentials:');
    console.log(`   Username: ${process.env.ADMIN_USER || 'admin'}`);
    console.log(`   Password: ${adminPass}`);
    console.log(`   Hashed password: ${hashedPassword}`);
    console.log('   (Update your .env file with the hashed password)');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - ${executives.length} executives created`);
    console.log(`   - ${sponsors.length} sponsors created`);
    console.log(`   - ${interestSubmissions.length} interest submissions created`);
    console.log(`   - ${sponsorInquiries.length} sponsor inquiries created`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

// Run the seed function
seedData();
