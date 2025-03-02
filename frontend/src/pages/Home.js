import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Building2, Users, TrendingUp, Award, Briefcase, ArrowRight, MessageSquareText } from 'lucide-react';

const Home = () => {
  const [animateChart, setAnimateChart] = useState(false);
  const [animateStats, setAnimateStats] = useState(false);
  const [animateCompanies, setAnimateCompanies] = useState(false);
  const [animateChat, setAnimateChat] = useState(false);
  
  useEffect(() => {
    // Trigger animations sequentially
    setTimeout(() => setAnimateChart(true), 300);
    setTimeout(() => setAnimateStats(true), 600);
    setTimeout(() => setAnimateCompanies(true), 900);
    setTimeout(() => setAnimateChat(true), 1200);
  }, []);
  
  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="relative px-8 py-16 md:py-24 md:px-12 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                VNR Training & Placement Cell
              </h1>
              <p className="text-lg md:text-xl mb-8 text-purple-100">
                Empowering students with career opportunities and industry connections through data-driven placement analytics.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/analysis" className="bg-white text-purple-700 hover:bg-purple-50 px-6 py-3 rounded-lg font-medium flex items-center transition-all duration-200">
                  Explore Analytics <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/chatbot" className="bg-transparent border border-white hover:bg-white hover:bg-opacity-10 px-6 py-3 rounded-lg font-medium flex items-center transition-all duration-200">
                  Ask AI Assistant <MessageSquareText className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
                <div className="absolute inset-4 bg-white bg-opacity-10 rounded-full animate-pulse animation-delay-300"></div>
                <div className="absolute inset-8 bg-white bg-opacity-10 rounded-full animate-pulse animation-delay-600"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <TrendingUp className="h-24 w-24 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Key Stats */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 transform ${animateStats ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-all duration-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">Placement Rate</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">94.8%</h3>
              <p className="text-green-500 text-sm mt-1 flex items-center">
                <span>↑ 3.2%</span>
                <span className="text-gray-400 ml-1">from last year</span>
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-500 hover:shadow-lg transition-all duration-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Companies</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">86</h3>
              <p className="text-green-500 text-sm mt-1 flex items-center">
                <span>↑ 12%</span>
                <span className="text-gray-400 ml-1">from last year</span>
              </p>
            </div>
            <div className="bg-indigo-100 p-3 rounded-lg">
              <Building2 className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-violet-500 hover:shadow-lg transition-all duration-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">Students Placed</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">550</h3>
              <p className="text-green-500 text-sm mt-1 flex items-center">
                <span>↑ 8.3%</span>
                <span className="text-gray-400 ml-1">from last year</span>
              </p>
            </div>
            <div className="bg-violet-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-violet-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-all duration-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">Highest Package</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">₹25 LPA</h3>
              <p className="text-green-500 text-sm mt-1 flex items-center">
                <span>↑ 13.6%</span>
                <span className="text-gray-400 ml-1">from last year</span>
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Award className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Analytics Preview */}
      <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-700 transform ${animateChart ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Placement Analytics</h2>
            <Link to="/analysis" className="text-purple-600 hover:text-purple-700 font-medium flex items-center text-sm">
              View detailed analysis <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Placement Growth</h3>
              <div className="h-64 bg-gray-50 rounded-lg p-4 flex items-end justify-between">
                {/* Animated bar chart */}
                {[65, 75, 60, 85, 90, 95].map((height, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-12 bg-gradient-to-t from-purple-500 to-indigo-600 rounded-t-md transition-all duration-1000 ease-out" 
                      style={{ 
                        height: animateChart ? `${height}%` : '0%',
                        transitionDelay: `${index * 100}ms`
                      }}
                    ></div>
                    <div className="text-xs text-gray-500 mt-2">{2018 + index}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Sector Distribution</h3>
              <div className="h-64 bg-gray-50 rounded-lg p-4 flex items-center justify-center">
                {/* Animated pie chart */}
                <div className="relative w-48 h-48">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="transparent" 
                      stroke="#8b5cf6" 
                      strokeWidth="10" 
                      strokeDasharray={`${animateChart ? 45 * 2.83 : 0} 283`} 
                      strokeDashoffset="0"
                      className="transition-all duration-1000 ease-out"
                    />
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="transparent" 
                      stroke="#6366f1" 
                      strokeWidth="10" 
                      strokeDasharray={`${animateChart ? 20 * 2.83 : 0} 283`} 
                      strokeDashoffset={`${animateChart ? -45 * 2.83 : 0}`}
                      className="transition-all duration-1000 ease-out"
                      style={{ transitionDelay: '200ms' }}
                    />
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="transparent" 
                      stroke="#ec4899" 
                      strokeWidth="10" 
                      strokeDasharray={`${animateChart ? 15 * 2.83 : 0} 283`} 
                      strokeDashoffset={`${animateChart ? -65 * 2.83 : 0}`}
                      className="transition-all duration-1000 ease-out"
                      style={{ transitionDelay: '400ms' }}
                    />
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="transparent" 
                      stroke="#14b8a6" 
                      strokeWidth="10" 
                      strokeDasharray={`${animateChart ? 20 * 2.83 : 0} 283`} 
                      strokeDashoffset={`${animateChart ? -80 * 2.83 : 0}`}
                      className="transition-all duration-1000 ease-out"
                      style={{ transitionDelay: '600ms' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Top Companies */}
      <div className={`transition-all duration-700 transform ${animateCompanies ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Top Recruiters</h2>
          <Link to="/companies" className="text-purple-600 hover:text-purple-700 font-medium flex items-center">
            View all companies <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'TCS', logo: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', students: 45, color: 'bg-blue-500' },
            { name: 'Infosys', logo: 'https://images.unsplash.com/photo-1579389083046-e3df9c2b3325?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', students: 38, color: 'bg-indigo-500' },
            { name: 'Microsoft', logo: 'https://images.unsplash.com/photo-1554830072-52d78d0d4c18?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', students: 15, color: 'bg-purple-500' },
            { name: 'Google', logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', students: 8, color: 'bg-pink-500' }
          ].map((company, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-200"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`h-2 ${company.color}`}></div>
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <img 
                    src={company.logo} 
                    alt={`${company.name} logo`} 
                    className="w-12 h-12 object-cover rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{company.name}</h3>
                    <div className="flex items-center mt-1">
                      <Briefcase className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500">{company.students} students hired</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* AI Assistant Preview */}
      <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-700 transform ${animateChat ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">AI Placement Assistant</h2>
            <Link to="/chatbot" className="text-purple-600 hover:text-purple-700 font-medium flex items-center text-sm">
              Chat with AI <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-start space-x-3 mb-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <MessageSquareText className="h-5 w-5 text-purple-600" />
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm max-w-md">
                <p className="text-gray-700">Hello! I'm your VNR Placement Assistant. Ask me anything about placement statistics, company information, or preparation tips.</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              <button className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-3 py-1.5 rounded-full text-sm transition-colors duration-200">
                What companies hire the most students?
              </button>
              <button className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 px-3 py-1.5 rounded-full text-sm transition-colors duration-200">
                How can I prepare for interviews?
              </button>
              <button className="bg-violet-100 hover:bg-violet-200 text-violet-800 px-3 py-1.5 rounded-full text-sm transition-colors duration-200">
                What is the average package?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;