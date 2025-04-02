
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Star, Calendar, ArrowRight, Clock, User, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import { useNotifications } from "@/context/NotificationsContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const News: React.FC = () => {
  const { addNotification } = useNotifications();
  const [showAllArticles, setShowAllArticles] = useState(false);

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
      hasVideo: true,
      content: "XForge is proud to announce our partnership with Soundwave, one of the biggest music festivals in the country. This collaboration will bring our innovative vaping products to festival-goers across the nation. Look for our branded tents and exclusive festival editions of our most popular products. We'll be offering special discounts and limited-edition flavors only available at Soundwave events."
    },
    {
      id: 2,
      title: "New XForge Pro Model Coming Soon",
      date: "May 28, 2023",
      author: "Product Team",
      category: "Product Update",
      image: "https://placehold.co/600x400/292929/02ECCF?text=XForge+Pro",
      excerpt: "We're excited to announce our upcoming XForge Pro model, featuring longer battery life and enhanced flavor technology.",
      hasVideo: false,
      content: "We're excited to announce our upcoming XForge Pro model, featuring longer battery life and enhanced flavor technology. Our engineering team has been working tirelessly to bring you the most advanced vaping experience yet. The XForge Pro will offer up to 30% more battery life, improved flavor delivery systems, and a sleeker design that fits comfortably in your hand. Look for pre-orders starting next month!"
    },
    {
      id: 3,
      title: "XForge Community Spotlight: User Stories",
      date: "May 10, 2023",
      author: "Community Manager",
      category: "Community",
      image: "https://placehold.co/600x400/292929/02ECCF?text=XForge+Community",
      excerpt: "Hear from real XForge users about how our products have enhanced their vaping experience.",
      hasVideo: true,
      content: "Hear from real XForge users about how our products have enhanced their vaping experience. In this month's community spotlight, we feature stories from five long-time XForge enthusiasts who share their journey with our products. From first-time vapers to seasoned connoisseurs, discover the diverse ways our community uses XForge to elevate their lifestyle."
    }
  ];
  
  // Additional news items (only shown when View All is clicked)
  const additionalNewsItems = [
    {
      id: 4,
      title: "XForge Flavor Lab: Behind the Scenes",
      date: "April 25, 2023",
      author: "Flavor Development Team",
      category: "Product Development",
      image: "https://placehold.co/600x400/292929/02ECCF?text=XForge+Flavor+Lab",
      excerpt: "Take a peek inside our flavor development laboratory and learn how we create our signature tastes.",
      hasVideo: false,
      content: "Take a peek inside our flavor development laboratory and learn how we create our signature tastes. Our team of flavor scientists combines the art and science of taste to develop unique profiles that delight our customers. This article explores the rigorous testing, quality control, and creative processes that go into every XForge flavor."
    },
    {
      id: 5,
      title: "XForge Introduces Sustainable Packaging",
      date: "April 12, 2023",
      author: "Sustainability Team",
      category: "Environment",
      image: "https://placehold.co/600x400/292929/02ECCF?text=XForge+Sustainable",
      excerpt: "Our commitment to the environment continues with our new eco-friendly packaging initiative.",
      hasVideo: false,
      content: "Our commitment to the environment continues with our new eco-friendly packaging initiative. Starting next month, all XForge products will ship in 100% recyclable packaging made from sustainable materials. This change is part of our broader sustainability goals for reducing our carbon footprint and minimizing waste across our entire supply chain."
    },
    {
      id: 6,
      title: "Vaping Regulations: What You Need to Know",
      date: "March 30, 2023",
      author: "Legal Team",
      category: "Regulations",
      image: "https://placehold.co/600x400/292929/02ECCF?text=XForge+Regulations",
      excerpt: "Stay informed about the latest regulatory changes affecting the vaping industry and what they mean for you.",
      hasVideo: false,
      content: "Stay informed about the latest regulatory changes affecting the vaping industry and what they mean for you. This comprehensive guide breaks down recent legislation, upcoming regulatory changes, and how XForge is adapting to ensure full compliance while continuing to deliver the quality products you expect."
    }
  ];

  // Display all news items if showAllArticles is true
  const displayedNews = showAllArticles ? [...newsItems, ...additionalNewsItems] : newsItems;

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

  const [currentArticle, setCurrentArticle] = useState<typeof newsItems[0] | null>(null);

  const handleReadMore = (article: typeof newsItems[0]) => {
    setCurrentArticle(article);
    window.scrollTo(0, 0);
  };

  const handleCloseArticle = () => {
    setCurrentArticle(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-xforge-dark">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-32 pb-16">
        {currentArticle ? (
          // Article Detail View
          <div className="animate-fade-in">
            <button 
              onClick={handleCloseArticle}
              className="flex items-center text-xforge-teal mb-8 hover:brightness-110 transition-all"
            >
              <ChevronLeft className="mr-2 h-5 w-5" /> Back to News
            </button>
            
            <div className="bg-gradient-to-b from-xforge-darkgray to-xforge-dark rounded-xl overflow-hidden shadow-xl border border-xforge-teal/10">
              <img 
                src={currentArticle.image} 
                alt={currentArticle.title} 
                className="w-full h-[400px] object-cover" 
              />
              
              <div className="p-8">
                <div className="flex flex-wrap items-center gap-4 text-sm text-xforge-gray mb-4">
                  <span className="bg-xforge-teal text-xforge-dark text-xs font-bold px-3 py-1 rounded-full">
                    {currentArticle.category}
                  </span>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{currentArticle.date}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>{currentArticle.author}</span>
                  </div>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {currentArticle.title}
                </h1>
                
                <div className="text-white text-opacity-90 leading-relaxed space-y-4">
                  <p>{currentArticle.content}</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc eget ultricies sodales, nisl metus vulputate nisi, eget vehicula felis massa at nisi. Proin sagittis nisi vel dui faucibus, nec iaculis eros faucibus.</p>
                  <p>Sed ut erat non sem cursus tempus. Donec quis lorem vitae libero elementum posuere. Quisque at justo non dui interdum semper. Integer vel erat vel sapien semper ultrices at eu turpis.</p>
                </div>
                
                <div className="mt-8 flex justify-between items-center">
                  <div className="flex space-x-4">
                    <Button variant="outline" className="bg-transparent border-xforge-teal text-xforge-teal hover:bg-xforge-teal hover:text-xforge-dark">
                      Share
                    </Button>
                    <Button variant="outline" className="bg-transparent border-xforge-teal text-xforge-teal hover:bg-xforge-teal hover:text-xforge-dark">
                      Save
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="bg-transparent border-xforge-teal text-xforge-teal hover:bg-xforge-teal hover:text-xforge-dark"
                      onClick={() => {
                        const prevIndex = displayedNews.findIndex(item => item.id === currentArticle.id) - 1;
                        if (prevIndex >= 0) {
                          setCurrentArticle(displayedNews[prevIndex]);
                          window.scrollTo(0, 0);
                        }
                      }}
                      disabled={displayedNews.findIndex(item => item.id === currentArticle.id) === 0}
                    >
                      <ChevronLeft className="h-5 w-5" /> Previous
                    </Button>
                    <Button 
                      variant="outline"
                      className="bg-transparent border-xforge-teal text-xforge-teal hover:bg-xforge-teal hover:text-xforge-dark"
                      onClick={() => {
                        const nextIndex = displayedNews.findIndex(item => item.id === currentArticle.id) + 1;
                        if (nextIndex < displayedNews.length) {
                          setCurrentArticle(displayedNews[nextIndex]);
                          window.scrollTo(0, 0);
                        }
                      }}
                      disabled={displayedNews.findIndex(item => item.id === currentArticle.id) === displayedNews.length - 1}
                    >
                      Next <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // News List View
          <>
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
            <div className="mb-16 relative overflow-hidden rounded-2xl group hover:shadow-xl hover:shadow-xforge-teal/10 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-xforge-dark to-transparent z-10"></div>
              <img 
                src="https://placehold.co/1200x600/292929/02ECCF?text=XForge+Featured+News" 
                alt="Featured News" 
                className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <div className="inline-block bg-xforge-teal text-xforge-dark text-xs font-bold px-3 py-1 rounded-full mb-4">
                  FEATURED
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-xforge-teal transition-colors">
                  XForge Introduces Revolutionary New Flavor Technology
                </h2>
                <p className="text-white text-opacity-80 mb-6 max-w-2xl">
                  Our new proprietary flavor extraction process delivers the most authentic taste experience yet. 
                  Learn how our engineers are pushing the boundaries of vaping technology.
                </p>
                <div className="flex items-center text-xforge-gray space-x-6 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>July 2, 2023</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>XForge Research Team</span>
                  </div>
                </div>
                <Button 
                  onClick={() => handleReadMore({
                    id: 7,
                    title: "XForge Introduces Revolutionary New Flavor Technology",
                    date: "July 2, 2023",
                    author: "XForge Research Team",
                    category: "Technology",
                    image: "https://placehold.co/1200x600/292929/02ECCF?text=XForge+Featured+News",
                    excerpt: "Our new proprietary flavor extraction process delivers the most authentic taste experience yet.",
                    hasVideo: false,
                    content: "Our new proprietary flavor extraction process delivers the most authentic taste experience yet. Learn how our engineers are pushing the boundaries of vaping technology. This breakthrough comes after years of research and development, combining cutting-edge molecular gastronomy techniques with advanced vaping hardware. The result is a flavor profile that's indistinguishable from the real thing, whether you're enjoying fruits, desserts, or specialty blends."
                  })}
                  variant="outline"
                  className="border border-xforge-teal text-xforge-teal bg-xforge-dark bg-opacity-50 hover:bg-xforge-teal hover:text-xforge-dark transition-all"
                >
                  Read Article <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Latest News Section */}
            <section className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-10 inline-block border-b-2 border-xforge-teal pb-2">
                Latest <span className="text-xforge-teal">News</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {displayedNews.map(item => (
                  <Card
                    key={item.id}
                    className="group bg-gradient-to-b from-xforge-darkgray to-xforge-dark rounded-xl overflow-hidden shadow-xl hover:shadow-xforge-teal/20 transition-all duration-300 hover:translate-y-[-5px] border-xforge-teal/5"
                  >
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
                    <CardContent className="p-6">
                      <div className="flex items-center text-xs text-xforge-gray mb-3">
                        <Clock className="h-3 w-3 mr-1" />
                        <span className="mr-3">{item.date}</span>
                        <User className="h-3 w-3 mr-1" />
                        <span>{item.author}</span>
                      </div>
                      <h3 className="text-white font-bold text-xl mb-3 group-hover:text-xforge-teal transition-colors">{item.title}</h3>
                      <p className="text-xforge-gray mb-4">{item.excerpt}</p>
                      <Button 
                        onClick={() => handleReadMore(item)}
                        variant="ghost"
                        className="inline-flex items-center text-xforge-teal hover:text-white p-0 bg-transparent"
                      >
                        Read More <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center mt-10">
                <Button
                  onClick={() => setShowAllArticles(!showAllArticles)}
                  className="px-8 py-3 bg-gradient-to-r from-xforge-teal to-teal-500 text-xforge-dark font-bold rounded-lg hover:brightness-110 transition-all duration-300 transform hover:scale-105"
                >
                  {showAllArticles ? "Show Less" : "View All Articles"}
                </Button>
              </div>
            </section>
            
            {/* Events Section */}
            <section className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-10 inline-block border-b-2 border-xforge-teal pb-2">
                Upcoming <span className="text-xforge-teal">Events</span>
              </h2>
              
              <div className="space-y-6">
                {events.map(event => (
                  <div key={event.id} className="bg-gradient-to-r from-xforge-darkgray to-xforge-dark rounded-xl p-6 shadow-lg hover:shadow-xforge-teal/10 transition-all duration-300 border border-xforge-teal/5">
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
                        <Button className="px-6 py-2 bg-xforge-dark border border-xforge-teal text-xforge-teal hover:bg-xforge-teal hover:text-xforge-dark transition-all duration-300 rounded-lg font-medium">
                          RSVP
                        </Button>
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
                      <Button className="px-6 py-3 bg-gradient-to-r from-xforge-teal to-teal-500 text-xforge-dark font-bold rounded-lg hover:brightness-110 transition-all duration-300 whitespace-nowrap">
                        Subscribe
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default News;
