import React, { useState } from 'react';
import { Search, Filter, Building2, MapPin, Users, Briefcase, ExternalLink } from 'lucide-react';

// Sample company data
const companiesData = [
  {
    id: 1,
    name: 'Microsoft',
    logo: 'https://images.unsplash.com/photo-1554830072-52d78d0d4c18?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    description: 'Microsoft Corporation is an American multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.',
    industry: 'Technology',
    location: 'Redmond, Washington, USA',
    employees: '181,000+',
    founded: '1975',
    website: 'https://microsoft.com',
    hiringRoles: ['Software Engineer', 'Product Manager', 'Data Scientist'],
    avgPackage: '18-22 LPA',
    recruitmentProcess: 'Online assessment, technical interviews, HR round',
    eligibility: 'CGPA > 7.5, No active backlogs'
  },
  {
    id: 2,
    name: 'Google',
    logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    description: 'Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, a search engine, cloud computing, software, and hardware.',
    industry: 'Technology',
    location: 'Mountain View, California, USA',
    employees: '135,000+',
    founded: '1998',
    website: 'https://google.com',
    hiringRoles: ['Software Engineer', 'UX Designer', 'Technical Program Manager'],
    avgPackage: '20-25 LPA',
    recruitmentProcess: 'Online coding challenge, multiple technical interviews, team matching',
    eligibility: 'CGPA > 8.0, Strong problem-solving skills'
  },
  {
    id: 3,
    name: 'TCS',
    logo: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    description: 'Tata Consultancy Services is an Indian multinational information technology services and consulting company headquartered in Mumbai, Maharashtra, India. It is a subsidiary of the Tata Group and operates in 149 locations across 46 countries.',
    industry: 'IT Services & Consulting',
    location: 'Mumbai, India',
    employees: '600,000+',
    founded: '1968',
    website: 'https://tcs.com',
    hiringRoles: ['Systems Engineer', 'Digital Specialist', 'Business Analyst'],
    avgPackage: '3.6-7.5 LPA',
    recruitmentProcess: 'National Qualifier Test, Technical Interview, HR Interview',
    eligibility: 'CGPA > 6.0, No active backlogs'
  },
  {
    id: 4,
    name: 'Infosys',
    logo: 'https://images.unsplash.com/photo-1579389083046-e3df9c2b3325?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    description: 'Infosys Limited is an Indian multinational information technology company that provides business consulting, information technology and outsourcing services.',
    industry: 'IT Services & Consulting',
    location: 'Bangalore, India',
    employees: '300,000+',
    founded: '1981',
    website: 'https://infosys.com',
    hiringRoles: ['Systems Engineer', 'Power Programmer', 'Digital Specialist'],
    avgPackage: '3.6-8 LPA',
    recruitmentProcess: 'InfyTQ assessment, Technical Interview, HR Interview',
    eligibility: 'CGPA > 6.0, No active backlogs'
  },
  {
    id: 5,
    name: 'Amazon',
    logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    description: 'Amazon.com, Inc. is an American multinational technology company which focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence.',
    industry: 'Technology, E-commerce',
    location: 'Seattle, Washington, USA',
    employees: '1,500,000+',
    founded: '1994',
    website: 'https://amazon.com',
    hiringRoles: ['Software Development Engineer', 'Business Analyst', 'Operations Manager'],
    avgPackage: '16-25 LPA',
    recruitmentProcess: 'Online assessment, multiple technical interviews, bar raiser interview',
    eligibility: 'CGPA > 7.0, Strong problem-solving skills'
  },
  {
    id: 6,
    name: 'Wipro',
    logo: 'https://images.unsplash.com/photo-1579389083046-e3df9c2b3325?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    description: 'Wipro Limited is an Indian multinational corporation that provides information technology, consulting and business process services.',
    industry: 'IT Services & Consulting',
    location: 'Bangalore, India',
    employees: '250,000+',
    founded: '1945',
    website: 'https://wipro.com',
    hiringRoles: ['Project Engineer', 'Technical Lead', 'Business Analyst'],
    avgPackage: '3.5-7 LPA',
    recruitmentProcess: 'National Talent Hunt, Technical Interview, HR Interview',
    eligibility: 'CGPA > 6.0, No active backlogs'
  },
  {
    id: 7,
    name: 'IBM',
    logo: 'https://images.unsplash.com/photo-1569098644584-210bcd375b59?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    description: 'International Business Machines Corporation is an American multinational technology company headquartered in Armonk, New York, with operations in over 170 countries.',
    industry: 'Technology, Consulting',
    location: 'Armonk, New York, USA',
    employees: '280,000+',
    founded: '1911',
    website: 'https://ibm.com',
    hiringRoles: ['Software Developer', 'Data Scientist', 'Technical Consultant'],
    avgPackage: '6-12 LPA',
    recruitmentProcess: 'Online assessment, technical interview, manager interview',
    eligibility: 'CGPA > 6.5, No active backlogs'
  },
  {
    id: 8,
    name: 'Accenture',
    logo: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    description: 'Accenture plc is an Irish-domiciled multinational professional services company that provides services in strategy, consulting, digital, technology and operations.',
    industry: 'IT Services & Consulting',
    location: 'Dublin, Ireland',
    employees: '700,000+',
    founded: '1989',
    website: 'https://accenture.com',
    hiringRoles: ['Associate Software Engineer', 'Technical Architect', 'Business Analyst'],
    avgPackage: '4.5-10 LPA',
    recruitmentProcess: 'Cognitive assessment, coding test, technical interview, HR interview',
    eligibility: 'CGPA > 6.0, No active backlogs'
  }
];

const CompanyList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  
  const filteredCompanies = companiesData.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleCompanyClick = (id) => {
    setSelectedCompany(id === selectedCompany ? null : id);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Company Directory</h1>
        <div className="flex space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search companies..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button className="flex items-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-700">Companies ({filteredCompanies.length})</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map(company => (
              <div key={company.id} className="p-6">
                <div 
                  className="flex justify-between items-start cursor-pointer"
                  onClick={() => handleCompanyClick(company.id)}
                >
                  <div className="flex items-center space-x-4">
                    <img 
                      src={company.logo} 
                      alt={`${company.name} logo`} 
                      className="w-12 h-12 object-cover rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{company.name}</h3>
                      <p className="text-sm text-gray-500">{company.industry}</p>
                    </div>
                  </div>
                  <div className="text-sm text-indigo-600 font-medium">
                    {selectedCompany === company.id ? 'Hide details' : 'View details'}
                  </div>
                </div>
                
                {selectedCompany === company.id && (
                  <div className="mt-4 pl-16">
                    <p className="text-gray-600 mb-4">{company.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Headquarters</p>
                          <p className="text-sm text-gray-900">{company.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Users className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Employees</p>
                          <p className="text-sm text-gray-900">{company.employees}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Building2 className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Founded</p>
                          <p className="text-sm text-gray-900">{company.founded}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Briefcase className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Average Package</p>
                          <p className="text-sm text-gray-900">{company.avgPackage}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-500 mb-1">Hiring Roles</p>
                      <div className="flex flex-wrap gap-2">
                        {company.hiringRoles.map((role, index) => (
                          <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-500 mb-1">Recruitment Process</p>
                      <p className="text-sm text-gray-900">{company.recruitmentProcess}</p>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-500 mb-1">Eligibility</p>
                      <p className="text-sm text-gray-900">{company.eligibility}</p>
                    </div>
                    
                    <a 
                      href={company.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Visit website <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              No companies found matching your search criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyList;