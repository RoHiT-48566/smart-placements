import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Info } from 'lucide-react';
import { dashboardService } from '../services/api';

const CHART_COLORS = {
  primary: '#4F46E5',
  secondary: '#10B981',
  accent1: '#F59E0B',
  accent2: '#EC4899',
  accent3: '#8B5CF6',
  male: '#3B82F6',
  female: '#EC4899'
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const BRANCHES = [
  'CSE', 'IT', 'ECE', 'EEE','EIE', 'MECH', 'CIVIL','AME',
  'CSBS', 'AIML', 'CYS', 'IOT', 'DS' ,'AIDS'
];

const PlacementAnalysis = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [yearlyData, setYearlyData] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [currentYearStats, setCurrentYearStats] = useState(null);
  const [lastYearStats, setLastYearStats] = useState(null);
  const [yearWisePercentages, setYearWisePercentages] = useState([]);
  const [branchWisePercentages, setBranchWisePercentages] = useState([]);
  const [offersData, setOffersData] = useState([]);
  const [selectedMembersData, setSelectedMembersData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [sectorData, setSectorData] = useState([]);
  const [salaryTrends, setSalaryTrends] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch placement stats data
        const placementResponse = await dashboardService.getPlacementData();
        const placementData = placementResponse.data;

        // Get unique years from data and sort them in descending order
        const years = [...new Set(placementData.map(d => d.year))].sort((a, b) => b - a);
        
        // Get the last 5 years
        const last5Years = years.slice(0, 5);
        setAvailableYears(last5Years);
        
        // Set the most recent year as selected year
        setSelectedYear(last5Years[0]);

        // Filter data for last 5 years
        const filtered = placementData.filter(d => last5Years.includes(d.year));
        setFilteredData(filtered);

        // Process data for different visualizations
        processAllData(filtered);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Add effect to update visualizations when year changes
  useEffect(() => {
    if (filteredData.length > 0) {
      // Update branch-wise percentages
      const branchPercentages = processBranchWisePercentages(filteredData, selectedYear);
      setBranchWisePercentages(branchPercentages);

      // Update selected members data
      const selectedMembers = processSelectedMembers(filteredData, selectedYear);
      setSelectedMembersData(selectedMembers);

      // Update gender-wise data
      const genderStats = processGenderData(filteredData, selectedYear);
      setGenderData(genderStats);
    }
  }, [selectedYear, filteredData]);

  const processAllData = (data) => {
    // Get the available years from filtered data
    const years = [...new Set(data.map(d => d.year))].sort((a, b) => b - a);
    const filteredData = data.filter(d => years.includes(d.year));

    // Process yearly data
    const yearly = processYearlyData(filteredData);
    setYearlyData(yearly);

    // Process yearly percentages
    const yearlyPercentages = processYearWisePercentages(filteredData);
    setYearWisePercentages(yearlyPercentages);

    // Process branch-wise percentages
    const branchPercentages = processBranchWisePercentages(filteredData, selectedYear);
    setBranchWisePercentages(branchPercentages);

    // Process offers data
    const offers = processOffersData(filteredData);
    setOffersData(offers);

    // Process selected members data
    const selectedMembers = processSelectedMembers(filteredData, selectedYear);
    setSelectedMembersData(selectedMembers);

    // Process gender-wise data
    const genderStats = processGenderData(filteredData, selectedYear);
    setGenderData(genderStats);

    // Process sector data
    const sectors = processSectorData(filteredData, selectedYear);
    setSectorData(sectors);

    // Process salary trends
    const salaryStats = processSalaryTrends(filteredData);
    setSalaryTrends(salaryStats);
  };

  const processYearlyData = (data) => {
    const yearGroups = data.reduce((acc, curr) => {
      if (!acc[curr.year]) {
        acc[curr.year] = {
          year: curr.year.toString(),
          placed: 0,
          total: 0
        };
      }
      acc[curr.year].placed += curr.selected_total;
      acc[curr.year].total += curr.class_total;
      return acc;
    }, {});

    return Object.values(yearGroups).sort((a, b) => a.year - b.year);
  };

  const processYearWisePercentages = (data) => {
    const yearGroups = data.reduce((acc, curr) => {
      if (!acc[curr.year]) {
        acc[curr.year] = {
          year: curr.year,
          selected: 0,
          total: 0
        };
      }
      acc[curr.year].selected += curr.selected_total;
      acc[curr.year].total += curr.class_total;
      return acc;
    }, {});

    return Object.values(yearGroups)
      .map(({ year, selected, total }) => ({
        year: year.toString(),
        percentage: ((selected / total) * 100).toFixed(1)
      }))
      .sort((a, b) => b.year - a.year);
  };

  const processBranchWisePercentages = (data, year) => {
    const yearData = data.filter(d => d.year === year);
    return BRANCHES.map(branch => {
      const branchData = yearData.find(d => d.branch === branch);
      return {
        branch,
        percentage: branchData ? 
          ((branchData.selected_total / branchData.class_total) * 100).toFixed(1) : '0'
      };
    });
  };

  const processOffersData = (data) => {
    return data.reduce((acc, curr) => {
      if (!acc[curr.year]) {
        acc[curr.year] = {
          year: curr.year.toString(),
          single: 0,
          multiple: 0
        };
      }
      acc[curr.year].single += curr.single_offers;
      acc[curr.year].multiple += curr.multiple_offers;
      return acc;
    }, {});
  };

  const processSelectedMembers = (data, year) => {
    const yearData = data.filter(d => d.year === year);
    return BRANCHES.map(branch => {
      const branchData = yearData.find(d => d.branch === branch);
      return {
        branch,
        selected: branchData ? branchData.selected_total : 0
      };
    });
  };

  const processGenderData = (data, year) => {
    const yearData = data.filter(d => d.year === year);
    return BRANCHES.map(branch => {
      const branchData = yearData.find(d => d.branch === branch);
      return {
        branch,
        male: branchData ? branchData.selected_male : 0,
        female: branchData ? branchData.selected_female : 0
      };
    });
  };

  const processSectorData = (data, year) => {
    const currentYearData = data.filter(d => d.year === year);
    
    const sectors = {
      'IT': 0,
      'Finance': 0,
      'Consulting': 0,
      'Manufacturing': 0,
      'Others': 0
    };

    currentYearData.forEach(record => {
      if (record.sector && sectors.hasOwnProperty(record.sector)) {
        sectors[record.sector] += record.selected_total;
      } else {
        sectors['Others'] += record.selected_total;
      }
    });

    return Object.entries(sectors).map(([name, value]) => ({ name, value }));
  };

  const processSalaryTrends = (data) => {
    const yearGroups = data.reduce((acc, curr) => {
      if (!acc[curr.year]) {
        acc[curr.year] = {
          year: curr.year.toString(),
          salaries: []
        };
      }
      if (curr.avg_salary) {
        acc[curr.year].salaries.push(curr.avg_salary);
      }
      if (curr.highest_salary) {
        acc[curr.year].highest = Math.max(curr.highest_salary, acc[curr.year].highest || 0);
      }
      return acc;
    }, {});

    return Object.entries(yearGroups)
      .map(([year, data]) => ({
        year,
        average: data.salaries.length > 0 
          ? (data.salaries.reduce((a, b) => a + b, 0) / data.salaries.length).toFixed(1)
          : 0,
        highest: data.highest?.toFixed(1) || 0
      }))
      .sort((a, b) => a.year - b.year);
  };

  const calculateYearOverYearChange = (current, last) => {
    if (!current || !last) return 0;
    return ((current - last) / last * 100).toFixed(1);
  };

  const YearFilter = ({ value, onChange }) => (
    <div className="mb-4">
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm"
      >
        {availableYears.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Placement Analysis Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Placement Rate</h2>
            <div className="text-2xl font-bold text-indigo-600">
              {((yearlyData.find(d => d.year === availableYears[0]?.toString())?.placed / 
                yearlyData.find(d => d.year === availableYears[0]?.toString())?.total) * 100).toFixed(1)}%
            </div>
          </div>
          <p className="text-sm text-gray-500">{availableYears[0]} Academic Year</p>
          {yearlyData.length >= 2 && (
            <div className={`mt-2 text-sm flex items-center ${
              ((yearlyData.find(d => d.year === availableYears[0]?.toString())?.placed / 
                yearlyData.find(d => d.year === availableYears[0]?.toString())?.total) * 100) -
              ((yearlyData.find(d => d.year === availableYears[1]?.toString())?.placed / 
                yearlyData.find(d => d.year === availableYears[1]?.toString())?.total) * 100) > 0 
                ? 'text-green-500' 
                : 'text-red-500'
            }`}>
              <span>
                {(
                  ((yearlyData.find(d => d.year === availableYears[0]?.toString())?.placed / 
                    yearlyData.find(d => d.year === availableYears[0]?.toString())?.total) * 100) -
                  ((yearlyData.find(d => d.year === availableYears[1]?.toString())?.placed / 
                    yearlyData.find(d => d.year === availableYears[1]?.toString())?.total) * 100)
                ).toFixed(1)} percentage points from last year
              </span>
            </div>
          )}
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Placed Students</h2>
            <div className="text-2xl font-bold text-indigo-600">
              {yearlyData.find(d => d.year === availableYears[0]?.toString())?.placed || 0}
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Out of {yearlyData.find(d => d.year === availableYears[0]?.toString())?.total || 0} students
          </p>
          {yearlyData.length >= 2 && (
            <div className={`mt-2 text-sm flex items-center ${
              calculateYearOverYearChange(
                yearlyData.find(d => d.year === availableYears[0]?.toString())?.placed,
                yearlyData.find(d => d.year === availableYears[1]?.toString())?.placed
              ) > 0 
                ? 'text-green-500' 
                : 'text-red-500'
            }`}>
              <span>
                {calculateYearOverYearChange(
                  yearlyData.find(d => d.year === availableYears[0]?.toString())?.placed,
                  yearlyData.find(d => d.year === availableYears[1]?.toString())?.placed
                )}% from last year
              </span>
            </div>
          )}
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Total Offers</h2>
            <div className="text-2xl font-bold text-indigo-600">
              {(Object.values(offersData).find(d => d.year === availableYears[0]?.toString())?.single || 0) + 
               (Object.values(offersData).find(d => d.year === availableYears[0]?.toString())?.multiple || 0)}
            </div>
          </div>
          <p className="text-sm text-gray-500">
            {Object.values(offersData).find(d => d.year === availableYears[0]?.toString())?.single || 0} Single + {' '}
            {Object.values(offersData).find(d => d.year === availableYears[0]?.toString())?.multiple || 0} Multiple
          </p>
          {yearlyData.length >= 2 && (
            <div className={`mt-2 text-sm flex items-center ${
              calculateYearOverYearChange(
                (Object.values(offersData).find(d => d.year === availableYears[0]?.toString())?.single || 0) + 
                (Object.values(offersData).find(d => d.year === availableYears[0]?.toString())?.multiple || 0),
                (Object.values(offersData).find(d => d.year === availableYears[1]?.toString())?.single || 0) + 
                (Object.values(offersData).find(d => d.year === availableYears[1]?.toString())?.multiple || 0)
              ) > 0 
                ? 'text-green-500' 
                : 'text-red-500'
            }`}>
              <span>
                {calculateYearOverYearChange(
                  (Object.values(offersData).find(d => d.year === availableYears[0]?.toString())?.single || 0) + 
                  (Object.values(offersData).find(d => d.year === availableYears[0]?.toString())?.multiple || 0),
                  (Object.values(offersData).find(d => d.year === availableYears[1]?.toString())?.single || 0) + 
                  (Object.values(offersData).find(d => d.year === availableYears[1]?.toString())?.multiple || 0)
                )}% from last year
              </span>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Yearly Placement Trends</h2>
            <button className="text-gray-400 hover:text-gray-600">
              <Info className="h-5 w-5" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yearlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="placed" name="Students Placed" fill={CHART_COLORS.primary} />
              <Bar dataKey="total" name="Total Students" fill={CHART_COLORS.secondary} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Year-wise Placement Percentages</h2>
            <button className="text-gray-400 hover:text-gray-600">
              <Info className="h-5 w-5" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={yearWisePercentages}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="percentage" 
                name="Placement %" 
                stroke={CHART_COLORS.primary} 
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Branch-wise Percentages */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Branch-wise Placement Percentages</h2>
          <button className="text-gray-400 hover:text-gray-600">
            <Info className="h-5 w-5" />
          </button>
        </div>
        <YearFilter value={selectedYear} onChange={setSelectedYear} />
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={branchWisePercentages}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="branch" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="percentage" name="Placement %" fill={CHART_COLORS.secondary} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Single vs Multiple Offers */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Single vs Multiple Offers</h2>
          <button className="text-gray-400 hover:text-gray-600">
            <Info className="h-5 w-5" />
          </button>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={Object.values(offersData).sort((a, b) => b.year - a.year).slice(0, 5)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="single" name="Single Offers" fill={CHART_COLORS.accent1} />
            <Bar dataKey="multiple" name="Multiple Offers" fill={CHART_COLORS.accent2} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Branch-wise Single vs Multiple Offers */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Branch-wise Offers Distribution</h2>
          <button className="text-gray-400 hover:text-gray-600">
            <Info className="h-5 w-5" />
          </button>
        </div>
        <YearFilter value={selectedYear} onChange={setSelectedYear} />
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={BRANCHES.map(branch => {
            const branchData = filteredData.find(d => d.year === selectedYear && d.branch === branch);
            return {
              branch,
              single: branchData ? branchData.single_offers : 0,
              multiple: branchData ? branchData.multiple_offers : 0
            };
          })}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="branch" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="single" name="Single Offers" fill="#38BDF8" /> {/* Light blue */}
            <Bar dataKey="multiple" name="Multiple Offers" fill="#FB7185" /> {/* Light red */}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Selected Members Branch-wise */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Selected Members by Branch</h2>
          <button className="text-gray-400 hover:text-gray-600">
            <Info className="h-5 w-5" />
          </button>
        </div>
        <YearFilter value={selectedYear} onChange={setSelectedYear} />
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={selectedMembersData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="branch" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="selected" name="Selected Students" fill={CHART_COLORS.accent3} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gender Distribution Branch-wise */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Gender Distribution by Branch</h2>
          <button className="text-gray-400 hover:text-gray-600">
            <Info className="h-5 w-5" />
          </button>
        </div>
        <YearFilter value={selectedYear} onChange={setSelectedYear} />
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={genderData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="branch" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="male" name="Male" fill={CHART_COLORS.male} />
            <Bar dataKey="female" name="Female" fill={CHART_COLORS.female} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Key Insights */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Key Insights ({availableYears[0]})
        </h2>
        <div className="space-y-4">
          {yearlyData.length > 0 && (
            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Current Placement Rate</h3>
                <p className="text-gray-600 text-sm">
                  {((yearlyData.find(d => d.year === availableYears[0]?.toString())?.placed / 
                    yearlyData.find(d => d.year === availableYears[0]?.toString())?.total) * 100).toFixed(1)}% 
                  students placed ({yearlyData.find(d => d.year === availableYears[0]?.toString())?.placed} out of {yearlyData.find(d => d.year === availableYears[0]?.toString())?.total})
                </p>
              </div>
            </div>
          )}
          
          {branchWisePercentages.length > 0 && (
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Top Performing Branches</h3>
                <p className="text-gray-600 text-sm">
                  {branchWisePercentages
                    .filter(b => parseFloat(b.percentage) > 0)
                    .sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage))
                    .slice(0, 3)
                    .map(b => `${b.branch} (${b.percentage}%)`)
                    .join(', ')}
                </p>
              </div>
            </div>
          )}
          
          {offersData && Object.values(offersData).length > 0 && (
            <div className="flex items-start">
              <div className="bg-yellow-100 p-2 rounded-full mr-3">
                <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Current Offers Distribution</h3>
                <p className="text-gray-600 text-sm">
                  {Object.values(offersData).find(d => d.year === availableYears[0]?.toString())?.single || 0} students with single offers, {' '}
                  {Object.values(offersData).find(d => d.year === availableYears[0]?.toString())?.multiple || 0} with multiple offers
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlacementAnalysis;