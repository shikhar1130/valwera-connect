
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Landing = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-brandPurple flex items-center justify-center">
              <span className="text-white font-bold text-xl">VS</span>
            </div>
            <span className="text-xl font-bold text-brandPurple">ValWera Sports</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-brandPurple hover:bg-brandPurple-dark">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <Link to="/feed">
                <Button className="bg-brandPurple hover:bg-brandPurple-dark">
                  Go to Feed
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Connect with the Sports World
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            ValWera Sports is the professional network for athletes, coaches, teams and sports enthusiasts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register">
              <Button size="lg" className="bg-brandPurple hover:bg-brandPurple-dark">
                Join Now
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            The Sports Network for Professionals
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brandPurple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#7C50A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect with Athletes</h3>
              <p className="text-gray-600">
                Build your network with like-minded sports professionals, athletes, and enthusiasts.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brandPurple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#7C50A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Share Experiences</h3>
              <p className="text-gray-600">
                Post updates, share achievements and connect over your favorite sports.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brandPurple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#7C50A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Discover Opportunities</h3>
              <p className="text-gray-600">
                Find events, tournaments, and career opportunities in the sports world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-brandPurple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join ValWera Sports?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Connect with the sports community and take your sports journey to the next level!
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary">
              Create Your Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-brandPurple flex items-center justify-center">
                  <span className="text-white font-bold text-sm">VS</span>
                </div>
                <span className="text-lg font-bold text-brandPurple">ValWera Sports</span>
              </div>
              <p className="text-gray-600 mt-2">The professional network for sports</p>
            </div>
            
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
              <div>
                <h3 className="text-sm font-semibold mb-2">Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-600 hover:text-brandPurple">Help Center</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-brandPurple">About Us</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-brandPurple">Blog</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-2">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-600 hover:text-brandPurple">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-brandPurple">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-brandPurple">Cookie Policy</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-2">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-600 hover:text-brandPurple">Careers</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-brandPurple">Contact</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-brandPurple">Partners</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-12 pt-6 text-center">
            <p className="text-gray-600 text-sm">
              &copy; 2025 ValWera Sports. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
