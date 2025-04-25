"use client"

import { useState, useEffect } from 'react';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  // Sample data for daily congestion
  const [dailyData, setDailyData] = useState([
    { time: '8 AM', congestion: 25 },
    { time: '9 AM', congestion: 40 },
    { time: '10 AM', congestion: 35 },
    { time: '11 AM', congestion: 50 },
    { time: '12 PM', congestion: 65 },
    { time: '1 PM', congestion: 60 },
    { time: '2 PM', congestion: 55 },
    { time: '3 PM', congestion: 70 },
    { time: '4 PM', congestion: 75 },
    { time: '5 PM', congestion: 80 },
    { time: '6 PM', congestion: 65 },
    { time: '7 PM', congestion: 45 },
    { time: '8 PM', congestion: 30 },
    { time: '9 PM', congestion: 20 },
  ]);
  
  // Live stats data (simulated)
  const [liveData, setLiveData] = useState([
    { minute: '5 min ago', vehicles: 12 },
    { minute: '4 min ago', vehicles: 15 },
    { minute: '3 min ago', vehicles: 10 },
    { minute: '2 min ago', vehicles: 18 },
    { minute: '1 min ago', vehicles: 22 },
    { minute: 'Current', vehicles: 25 },
  ]);
  
  const [currentTime, setCurrentTime] = useState('');
  const [currentCongestion, setCurrentCongestion] = useState(0);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  
  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      
      // Find current hour's congestion level
      const hour = now.getHours();
      if (hour >= 8 && hour <= 21) {
        const index = hour - 8;
        if (index >= 0 && index < dailyData.length) {
          setCurrentCongestion(dailyData[index].congestion);
        }
      }
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [dailyData]);
  
  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newVehicles = Math.floor(Math.random() * 15) + 10;
      
      setLiveData(prevData => {
        const newData = prevData.slice(1);
        newData.push({ minute: 'Current', vehicles: newVehicles });
        
        // Update labels
        return newData.map((entry, index) => {
          if (index === newData.length - 1) return { minute: 'Current', vehicles: entry.vehicles };
          return { minute: `${newData.length - 1 - index} min ago`, vehicles: entry.vehicles };
        });
      });
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const toggleEmergencyMode = () => {
    setIsEmergencyMode(!isEmergencyMode);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Animated stars */}
        {[...Array(50)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 py-6 px-8 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSIxMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iLjA1IiBjeD0iNzIwIiBjeT0iNjAiIHI9IjYwIi8+PGNpcmNsZSBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9Ii4wNSIgY3g9IjcyMCIgY3k9IjEyMCIgcj0iNjAiLz48Y2lyY2xlIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iLjA1IiBjeD0iNzIwIiBjeT0iMTgwIiByPSI2MCIvPjxjaXJjbGUgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiIGN4PSI3MjAiIGN5PSIyNDAiIHI9IjYwIi8+PGNpcmNsZSBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9Ii4wNSIgY3g9IjcyMCIgY3k9IjMwMCIgcj0iNjAiLz48Y2lyY2xlIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iLjA1IiBjeD0iNzIwIiBjeT0iMzYwIiByPSI2MCIvPjxjaXJjbGUgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiIGN4PSI3MjAiIGN5PSI0MjAiIHI9IjYwIi8+PGNpcmNsZSBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9Ii4wNSIgY3g9IjcyMCIgY3k9IjQ4MCIgcj0iNjAiLz48Y2lyY2xlIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iLjA1IiBjeD0iNzIwIiBjeT0iNTQwIiByPSI2MCIvPjxjaXJjbGUgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiIGN4PSI3MjAiIGN5PSI2MDAiIHI9IjYwIi8+PGNpcmNsZSBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9Ii4wNSIgY3g9IjcyMCIgY3k9IjY2MCIgcj0iNjAiLz48Y2lyY2xlIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iLjA1IiBjeD0iNzIwIiBjeT0iNzIwIiByPSI2MCIvPjxjaXJjbGUgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiIGN4PSI3MjAiIGN5PSI3ODAiIHI9IjYwIi8+PGNpcmNsZSBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9Ii4wNSIgY3g9IjcyMCIgY3k9Ijg0MCIgcj0iNjAiLz48Y2lyY2xlIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iLjA1IiBjeD0iNzIwIiBjeT0iOTAwIiByPSI2MCIvPjxjaXJjbGUgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiIGN4PSI3MjAiIGN5PSI5NjAiIHI9IjYwIi8+PGNpcmNsZSBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9Ii4wNSIgY3g9IjcyMCIgY3k9IjEwMjAiIHI9IjYwIi8+PGNpcmNsZSBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9Ii4wNSIgY3g9IjcyMCIgY3k9IjEwODAiIHI9IjYwIi8+PGNpcmNsZSBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9Ii4wNSIgY3g9IjcyMCIgY3k9IjExNDAiIHI9IjYwIi8+PGNpcmNsZSBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9Ii4wNSIgY3g9IjcyMCIgY3k9IjEyMDAiIHI9IjYwIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-3xl font-bold text-white transform transition-all duration-300 hover:scale-105 animate-text-shadow">
              Smart Route Admin
            </h1>
            <p className="text-blue-100 mt-1 animate-pulse">
              Traffic Management Dashboard
            </p>
          </div>
          
          <div className="flex items-center">
            <div className="mr-4 bg-gray-800 px-4 py-2 rounded-lg text-white border border-gray-700">
              <div className="text-sm text-gray-400">Current Time</div>
              <div className="text-xl font-semibold">{currentTime}</div>
            </div>
            
            <div className="mr-4 bg-gray-800 px-4 py-2 rounded-lg text-white border border-gray-700">
              <div className="text-sm text-gray-400">Traffic Status</div>
              <div className={`text-xl font-semibold ${
                currentCongestion < 30 ? 'text-green-400' : 
                currentCongestion < 60 ? 'text-yellow-400' : 
                'text-red-400'
              }`}>
                {currentCongestion < 30 ? 'Low' : 
                 currentCongestion < 60 ? 'Moderate' : 
                 'High'} ({currentCongestion}%)
              </div>
            </div>
            
            {/* Emergency Mode Button (Circular) */}
            <button 
              onClick={toggleEmergencyMode}
              className={`relative w-16 h-16 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                isEmergencyMode ? 'bg-red-600 focus:ring-red-500' : 'bg-green-500 focus:ring-green-400'
              }`}
            >
              <div className={`absolute inset-0 rounded-full ${isEmergencyMode ? 'bg-red-500' : 'bg-green-400'} animate-ping opacity-50`}></div>
              <div className="relative flex items-center justify-center h-full">
                {isEmergencyMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 p-6 bg-gray-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Stats Chart */}
          <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-800 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">Daily Congestion (8AM - 9PM)</h2>
              <p className="text-blue-200 text-sm">Traffic percentage throughout the day</p>
            </div>
            <div className="p-4 h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dailyData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', borderColor: '#4B5563', color: '#E5E7EB' }} 
                    itemStyle={{ color: '#E5E7EB' }}
                    cursor={{ fill: 'rgba(107, 114, 128, 0.2)' }}
                  />
                  <Legend wrapperStyle={{ color: '#E5E7EB' }} />
                  <Bar 
                    dataKey="congestion" 
                    name="Congestion %" 
                    fill="#3B82F6" 
                    radius={[4, 4, 0, 0]}
                    barSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Live Stats Chart */}
          <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-800 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">Live Traffic Monitor</h2>
              <p className="text-purple-200 text-sm">Vehicles passing through in real-time</p>
            </div>
            <div className="p-4 h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={liveData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="minute" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', borderColor: '#4B5563', color: '#E5E7EB' }} 
                    itemStyle={{ color: '#E5E7EB' }}
                    cursor={{ stroke: '#6B7280', strokeWidth: 1 }}
                  />
                  <Legend wrapperStyle={{ color: '#E5E7EB' }} />
                  <Line 
                    type="monotone" 
                    dataKey="vehicles" 
                    name="Vehicles" 
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    dot={{ r: 6, fill: '#4C1D95', stroke: '#8B5CF6', strokeWidth: 2 }}
                    activeDot={{ r: 8, fill: '#6D28D9', stroke: '#DDD6FE', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Control panel */}
        <div className="mt-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-gray-700 to-gray-900 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Traffic Control Options</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-3 rounded-lg shadow transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12z" />
                <path d="M15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
              </svg>
              Reroute Traffic
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-lg shadow transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              System Settings
            </button>
            <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-3 rounded-lg shadow transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Alert Authorities
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}