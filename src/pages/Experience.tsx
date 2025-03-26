
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Star, Calendar, ArrowRight } from "lucide-react";

const Experience: React.FC = () => {
  // News items
  const newsItems = [
    {
      id: 1,
      title: "XForge Partners with Leading Music Festival",
      date: "June 15, 2023",
      category: "News",
      image: "https://placehold.co/600x400/292929/02ECCF?text=XForge+Festival",
      excerpt: "XForge is proud to announce our partnership with Soundwave, one of the biggest music festivals in the country.",
      hasVideo: true
    },
    {
      id: 2,
      title: "New XForge Pro Model Coming Soon",
      date: "May 28, 2023",
      category: "Product Update",
      image: "https://placehold.co/600x400/292929/02ECCF?text=XForge+Pro",
      excerpt: "We're excited to announce our upcoming XForge Pro model, featuring longer battery life and enhanced flavor technology.",
      hasVideo: false
    },
    {
      id: 3,
      title: "XForge Community Spotlight: User Stories",
      date: "May 10, 2023",
      category: "Community",
      image: "https://placehold.co/600x400/292929/02ECCF?text=XForge+Community",
      excerpt: "Hear from real XForge users about how our products have enhanced their vaping experience.",
      hasVideo: true
    }
  ];

  // Upcoming events
  const events = [
    {
      id: 1,
      title: "XForge Tasting Event",
      date: "July 12, 2023",
      location: "San Francisco, CA",
      description: "Join us for an exclusive tasting of our newest flavors before they hit the market."
    },
    {
      id: 2,
      title: "Vape Expo 2023",
      date: "August 5-7, 2023",
      location: "Las Vegas, NV",
      description: "Visit our booth at the biggest vape industry event of the year and try our products."
    },
    {
      id: 3,
      title: "XForge Pro Launch Party",
      date: "September 20, 2023",
      location: "Miami, FL",
      description: "Be the first to experience our new XForge Pro model with special promotions and giveaways."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-xforge-dark">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-32 pb-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-xforge-teal bg-opacity-20 rounded-full mb-2">
            <Star className="h-6 w-6 text-xforge-teal" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-xforge-teal">X</span>Forge Experience
          </h1>
          <p className="text-xforge-gray max-w-2xl mx-auto">
            Stay up to date with the latest news, product updates, and events from XForge.
            Join our community and elevate your vaping experience.
          </p>
        </div>

        {/* Latest News Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">
            Latest <span className="text-xforge-teal">News & Updates</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsItems.map(item => (
              <div key={item.id} className="bg-xforge-darkgray rounded-xl overflow-hidden shadow-lg">
                <div className="relative">
                  <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                  {item.hasVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-xforge-teal bg-opacity-80 rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-white ml-1"></div>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-xforge-dark bg-opacity-80 text-xforge-teal text-xs font-bold px-3 py-1 rounded-full">
                    {item.category}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xforge-gray text-sm mb-2">{item.date}</p>
                  <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-xforge-gray mb-4">{item.excerpt}</p>
                  <a 
                    href="#" 
                    className="inline-flex items-center text-xforge-teal hover:text-white transition-colors"
                  >
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button className="btn btn-outline">
              View All News
            </button>
          </div>
        </section>
        
        {/* Events Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-8">
            Upcoming <span className="text-xforge-teal">Events</span>
          </h2>
          
          <div className="space-y-6">
            {events.map(event => (
              <div key={event.id} className="bg-xforge-darkgray rounded-xl p-6 shadow-lg">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="bg-xforge-dark rounded-xl p-4 text-center min-w-24">
                    <Calendar className="h-8 w-8 text-xforge-teal mx-auto mb-2" />
                    <p className="text-white font-bold">{event.date.split(',')[0]}</p>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-white font-bold text-xl mb-1">{event.title}</h3>
                    <p className="text-xforge-teal mb-2">{event.location}</p>
                    <p className="text-xforge-gray">{event.description}</p>
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    <button className="btn btn-primary">
                      RSVP
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-xforge-darkgray to-xforge-dark mt-10 rounded-xl p-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-white font-bold text-xl mb-2">Get Notified About Events</h3>
                <p className="text-xforge-gray">
                  Subscribe to our newsletter to receive updates about upcoming events and promotions.
                </p>
              </div>
              
              <div className="w-full md:w-auto">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="bg-xforge-dark border border-xforge-lightgray text-white px-4 py-2 rounded-lg"
                  />
                  <button className="btn btn-primary whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Experience;
