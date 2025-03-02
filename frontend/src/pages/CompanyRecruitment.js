import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Filter, Download, ArrowUpRight } from 'lucide-react';

// Sample data for the company recruitment page
const monthlyRecruitmentData = [
  { month: 'Jan', companies: 5, offers: 45 },
  { month: 'Feb', companies: 8, offers: 62 },
  { month: 'Mar', companies: 6, offers: 51 },
  { month: 'Apr', companies: 4, offers: 32 },
  { month: 'May', companies: 3, offers: 28 },
  { month: 'Jun', companies: 2, offers: 18 },
  { month: 'Jul', companies: 7, offers: 58 },
  { month: 'Aug', companies: 12, offers: 95 },
  { month: 'Sep', companies: 15, offers: 120 },
  { month: 'Oct', companies: 10, offers: 85 },
  { month: 'Nov', companies: 8, offers: 70 },
  { month: 'Dec', companies: 6, offers: 55 },
];

const topRecruitersData = [
  { name: 'TCS', students: 45 },
  { name: 'Infosys', students: 38 },
  { name: 'Wipro', students: 32 },
  { name: 'Accenture', students: 30 },
  { name: 'IBM', students: 28 },
  { name: 'Cognizant', students: 25 },
  { name: 'HCL', students: 22 },
  { name: 'Amazon', students: 18 },
  { name: 'Microsoft', students: 15 },
  { name: 'Google', students: 8 },
];

const roleDistributionData = [
  { name: 'Software Engineer', value: 40 },
  { name: 'Data Analyst', value: 15 },
  { name: 'Business Analyst', value: 12 },
  { name: 'Product Manager', value: 8 },
  { name: 'UI/UX Designer', value: 7 },
  { name: 'DevOps Engineer', value: 6 },
  { name: 'Others', value: 12 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

const CompanyRecruitment = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Company Recruitment Analysis</h1>
        <div className="flex space-x-3">
          <button className="flex items-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
          <button className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Total Companies</h2>
            <div className="text-2xl font-bold text-indigo-600">86</div>
          </div>
          <p className="text-sm text-gray-500">Current academic year</p>
          <div className="mt-2 text-green-500 text-sm flex items-center">
            <span>↑ 12% from last year</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Total Offers</h2>
            <div className="text-2xl font-bold text-indigo-600">719</div>
          </div>
          <p className="text-sm text-gray-500">Current academic year</p>
          <div className="mt-2 text-green-500 text-sm flex items-center">
            <span>↑ 8.3% from last year</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Offers per Student</h2>
            <div className="text-2xl font-bold text-indigo-600">1.24</div>
          </div>
          <p className="text-sm text-gray-500">Current academic year</p>
          <div className="mt-2 text-green-500 text-sm flex items-center">
            <span>↑ 5.1% from last year</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Monthly Recruitment Activity</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyRecruitmentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="companies" name="Companies Visited" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line yAxisId="right" type="monotone" dataKey="offers" name="Offers Made" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Top Recruiters</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={topRecruitersData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="students" name="Students Hired" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Role Distribution</h2>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={roleDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {roleDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Recruitment Drives</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Positions</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Offers</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package (LPA)</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">Microsoft</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">15 Oct 2023</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Software Engineer</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">15</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">18-22</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900 flex items-center">
                    Details <ArrowUpRight className="h-3 w-3 ml-1" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">Amazon</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">12 Oct 2023</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">SDE I, II</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">18</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">16-25</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900 flex items-center">
                    Details <ArrowUpRight className="h-3 w-3 ml-1" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">TCS</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">5 Oct 2023</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Digital, Ninja, Ninja+</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">45</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">3.6-7.5</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900 flex items-center">
                    Details <ArrowUpRight className="h-3 w-3 ml-1" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">Infosys</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">28 Sep 2023</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Systems Engineer, Power Programmer</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">38</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">3.6-8</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900 flex items-center">
                    Details <ArrowUpRight className="h-3 w-3 ml-1" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">Google</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">20 Sep 2023</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Software Engineer</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">8</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">20-25</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900 flex items-center">
                    Details <ArrowUpRight className="h-3 w-3 ml-1" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompanyRecruitment;