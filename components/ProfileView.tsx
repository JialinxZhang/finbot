
import React from 'react';

const ProfileView: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      {/* Profile Header */}
      <div className="p-6 bg-white border-b">
        <div className="flex items-center justify-between mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 p-1">
            <div className="bg-white p-1 rounded-full w-full h-full overflow-hidden">
               <img src="https://picsum.photos/200/200" className="w-full h-full object-cover rounded-full" />
            </div>
          </div>
          <div className="flex space-x-6 text-center">
            <div><p className="font-bold text-gray-900">12</p><p className="text-xs text-gray-500">Posts</p></div>
            <div><p className="font-bold text-gray-900">1.2k</p><p className="text-xs text-gray-500">Followers</p></div>
            <div><p className="font-bold text-gray-900">450</p><p className="text-xs text-gray-500">Following</p></div>
          </div>
        </div>
        <div className="mb-4">
          <h2 className="font-bold text-gray-900 text-lg">Finance Enthusiast</h2>
          <p className="text-sm text-gray-500">Mastering the markets with Gemini AI 🚀 | Tech & EV Analyst</p>
        </div>
        <button className="w-full py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-900">
          Edit Profile
        </button>
      </div>

      {/* Portfolio Quick Glance */}
      <div className="p-4">
        <div className="bg-black rounded-2xl p-4 text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider">Estimated Balance</p>
              <h3 className="text-2xl font-bold">$124,560.80</h3>
            </div>
            <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">+12.4%</span>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>Portfolio Health: Strong</span>
            <span>3 Alerts Today</span>
          </div>
        </div>
      </div>

      {/* Tabs for content */}
      <div className="flex border-b">
        <button className="flex-1 py-3 text-sm font-bold border-b-2 border-black">MY ANALYSES</button>
        <button className="flex-1 py-3 text-sm font-medium text-gray-400">SAVED</button>
        <button className="flex-1 py-3 text-sm font-medium text-gray-400">FAVORITES</button>
      </div>

      {/* Grid of past analyses */}
      <div className="grid grid-cols-3 gap-0.5 mt-0.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="aspect-square bg-gray-200">
            <img src={`https://picsum.photos/seed/post-${i}/300/300`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileView;
