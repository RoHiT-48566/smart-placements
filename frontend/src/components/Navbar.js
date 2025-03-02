import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, Building2, Building as Buildings, MessageSquareText, Home, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-1">
            <BarChart3 className="h-6 w-6" />
            <span className="font-bold text-xl">SMART PLACEMENT ANALYSIS</span>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <NavLink 
                to="/" 
                className={({isActive}) => 
                  isActive 
                    ? "bg-white bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium flex items-center" 
                    : "px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:bg-opacity-10 flex items-center transition-all duration-200"
                }
              >
                <Home className="h-4 w-4 mr-1" />
                Home
              </NavLink>
              
              <NavLink 
                to="/analysis" 
                className={({isActive}) => 
                  isActive 
                    ? "bg-white bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium flex items-center" 
                    : "px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:bg-opacity-10 flex items-center transition-all duration-200"
                }
              >
                <BarChart3 className="h-4 w-4 mr-1" />
                Placement Analysis
              </NavLink>
              
              <NavLink 
                to="/recruitment" 
                className={({isActive}) => 
                  isActive 
                    ? "bg-white bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium flex items-center" 
                    : "px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:bg-opacity-10 flex items-center transition-all duration-200"
                }
              >
                <Building2 className="h-4 w-4 mr-1" />
                Recruitment Details
              </NavLink>
              
              <NavLink 
                to="/companies" 
                className={({isActive}) => 
                  isActive 
                    ? "bg-white bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium flex items-center" 
                    : "px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:bg-opacity-10 flex items-center transition-all duration-200"
                }
              >
                <Buildings className="h-4 w-4 mr-1" />
                Companies
              </NavLink>
              
              <NavLink 
                to="/chatbot" 
                className={({isActive}) => 
                  isActive 
                    ? "bg-white bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium flex items-center" 
                    : "px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:bg-opacity-10 flex items-center transition-all duration-200"
                }
              >
                <MessageSquareText className="h-4 w-4 mr-1" />
                AI Assistant
              </NavLink>
            </div>
          </div>
          
          <div className="md:hidden">
            <button 
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-white hover:bg-opacity-10 focus:outline-none transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-3 pt-2 space-y-1">
            <NavLink 
              to="/" 
              className={({isActive}) => 
                isActive 
                  ? "block bg-white bg-opacity-20 px-3 py-2 rounded-md text-base font-medium flex items-center" 
                  : "block px-3 py-2 rounded-md text-base font-medium hover:bg-white hover:bg-opacity-10 flex items-center"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </NavLink>
            
            <NavLink 
              to="/analysis" 
              className={({isActive}) => 
                isActive 
                  ? "block bg-white bg-opacity-20 px-3 py-2 rounded-md text-base font-medium flex items-center" 
                  : "block px-3 py-2 rounded-md text-base font-medium hover:bg-white hover:bg-opacity-10 flex items-center"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Placement Analysis
            </NavLink>
            
            <NavLink 
              to="/recruitment" 
              className={({isActive}) => 
                isActive 
                  ? "block bg-white bg-opacity-20 px-3 py-2 rounded-md text-base font-medium flex items-center" 
                  : "block px-3 py-2 rounded-md text-base font-medium hover:bg-white hover:bg-opacity-10 flex items-center"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              <Building2 className="h-4 w-4 mr-2" />
              Recruitment Details
            </NavLink>
            
            <NavLink 
              to="/companies" 
              className={({isActive}) => 
                isActive 
                  ? "block bg-white bg-opacity-20 px-3 py-2 rounded-md text-base font-medium flex items-center" 
                  : "block px-3 py-2 rounded-md text-base font-medium hover:bg-white hover:bg-opacity-10 flex items-center"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              <Buildings className="h-4 w-4 mr-2" />
              Companies
            </NavLink>
            
            <NavLink 
              to="/chatbot" 
              className={({isActive}) => 
                isActive 
                  ? "block bg-white bg-opacity-20 px-3 py-2 rounded-md text-base font-medium flex items-center" 
                  : "block px-3 py-2 rounded-md text-base font-medium hover:bg-white hover:bg-opacity-10 flex items-center"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageSquareText className="h-4 w-4 mr-2" />
              AI Assistant
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;