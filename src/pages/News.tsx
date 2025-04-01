
import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Star, Calendar, ArrowRight, Clock, User, Tag } from "lucide-react";
import { useNotifications } from "@/context/NotificationsContext";

const News: React.FC = () => {
  const { addNotification } = useNotifications();

  useEffect(() => {
    // Add a notification when the news page is visited
    const hasVisitedNews = localStorage.getItem('visited-news');
    if (!hasVisitedNews) {
      setTimeout(() => {
        addNotification({
          title: "New Content Available",
          message: "Check out our latest news and upcoming events!",
          type: "system"
        });
        localStorage.setItem('visited-news', 'true');
      }, 2000);
    }
  }, [addNotification]);

  // News items
  const newsItems = [
    {
      id: 1,
      title: "XForge Partners with Leading Music Festival",
      date: "June 15, 2023",
      author: "XForge Team",
      category: "Events",
      image: "https://placehold.co/600x400/292929/02ECCF?text=XForge+Festival",
      excerpt: "XForge is proud to announce our partnership with Soundwave, one of the biggest music festivals in the country.",
      hasVideo: true
    },
    {
      id: 2,
      title: "New XForge Pro Model Coming Soon",
      date: "May 28, 2023",
      author: "Product Team",
      category: "Product Update",
      image: "https://placehold.co/600x400/292929/02ECCF?text=XForge+Pro",
      excerpt: "We're excited to announce our upcoming XForge Pro model, featuring longer battery life and enhanced flavor technology.",
      hasVideo: false
    },
    {
      id: 3,
      title: "XForge Community Spotlight: User Stories",
      date: "May 10, 2023",
      author: "Community Manager",
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
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-xforge-teal bg-opacity-20 rounded-full mb-4">
            <Star className="h-6 w-6 text-xforge-teal" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-white to-xforge-teal bg-clip-text text-transparent">
            XForge News & Events
          </h1>
          <p className="text-xforge-gray max-w-2xl mx-auto">
            Stay up to date with the latest news, product updates, and exclusive events.
            Join our community and elevate your experience.
          </p>
        </div>

        {/* Featured Article */}
        <div className="mb-16 relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-xforge-dark to-transparent z-10"></div>
          <img 
            src="https://placehold.co/1200x600/292929/02ECCF?text=XForge+Featured+News" 
            alt="Featured News" 
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
            <div className="inline-block bg-xforge-teal text-xforge-dark text-xs font-bold px-3 py-1 rounded-full mb-4">
              FEATURED
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              XForge Introduces Revolutionary New Flavor Technology
            </h2>
            <p className="text-white text-opacity-80 mb-6 max-w-2xl">
              Our new proprietary flavor extraction process delivers the most authentic taste experience yet. 
              Learn how our engineers are pushing the boundaries of vaping technology.
            </p>
            <div className="flex items-center text-xforge-gray space-x-6">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>July 2, 2023</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>XForge Research Team</span>
              </div>
            </div>
          </div>
        </div>

        {/* Latest News Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-10 inline-block border-b-2 border-xforge-teal pb-2">
            Latest <span className="text-xforge-teal">News</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsItems.map(item => (
              <div key={item.id} className="group bg-gradient-to-b from-xforge-darkgray to-xforge-dark rounded-xl overflow-hidden shadow-xl hover:shadow-xforge-teal/20 transition-all duration-300 hover:translate-y-[-5px]">
                <div className="relative">
                  <img src={item.image} alt={item.title} className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300" />
                  {item.hasVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-xforge-teal bg-opacity-80 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                        <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-white ml-1"></div>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-xforge-dark bg-opacity-80 text-xforge-teal text-xs font-bold px-3 py-1 rounded-full">
                    {item.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-xs text-xforge-gray mb-3">
                    <Clock className="h-3 w-3 mr-1" />
                    <span className="mr-3">{item.date}</span>
                    <User className="h-3 w-3 mr-1" />
                    <span>{item.author}</span>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3 group-hover:text-xforge-teal transition-colors">{item.title}</h3>
                  <p className="text-xforge-gray mb-4">{item.excerpt}</p>
                  <a 
                    href="#" 
                    className="inline-flex items-center text-xforge-teal group-hover:text-white transition-colors"
                  >
                    Read More <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <button className="px-8 py-3 bg-gradient-to-r from-xforge-teal to-teal-500 text-xforge-dark font-bold rounded-lg hover:brightness-110 transition-all duration-300 transform hover:scale-105">
              View All Articles
            </button>
          </div>
        </section>
        
        {/* Events Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-10 inline-block border-b-2 border-xforge-teal pb-2">
            Upcoming <span className="text-xforge-teal">Events</span>
          </h2>
          
          <div className="space-y-6">
            {events.map(event => (
              <div key={event.id} className="bg-gradient-to-r from-xforge-darkgray to-xforge-dark rounded-xl p-6 shadow-lg hover:shadow-xforge-teal/10 transition-all duration-300">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="bg-xforge-dark/50 rounded-xl p-6 text-center min-w-32 border border-xforge-teal/20">
                    <Calendar className="h-8 w-8 text-xforge-teal mx-auto mb-2" />
                    <p className="text-white font-bold">{event.date.split(',')[0]}</p>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-white font-bold text-xl mb-2">{event.title}</h3>
                    <div className="flex items-center mb-3">
                      <Tag className="h-4 w-4 text-xforge-teal mr-2" />
                      <p className="text-xforge-teal">{event.location}</p>
                    </div>
                    <p className="text-xforge-gray">{event.description}</p>
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    <button className="px-6 py-2 bg-xforge-dark border border-xforge-teal text-xforge-teal hover:bg-xforge-teal hover:text-xforge-dark transition-all duration-300 rounded-lg font-medium">
                      RSVP
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-xforge-darkgray via-xforge-dark to-xforge-darkgray mt-14 rounded-xl p-10 shadow-lg border border-xforge-teal/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-white font-bold text-2xl mb-3">Never Miss an Event</h3>
                <p className="text-xforge-gray max-w-md">
                  Subscribe to our newsletter to receive updates about upcoming events, product launches, and exclusive promotions.
                </p>
              </div>
              
              <div className="w-full md:w-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="bg-xforge-dark border border-xforge-lightgray text-white px-4 py-3 rounded-lg focus:border-xforge-teal focus:outline-none transition-colors"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-xforge-teal to-teal-500 text-xforge-dark font-bold rounded-lg hover:brightness-110 transition-all duration-300 whitespace-nowrap">
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

export default News;
