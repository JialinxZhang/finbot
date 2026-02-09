
import React, { useState } from 'react';
import { MOCK_POSTS } from './constants';
import StockCard from './components/StockCard';
import StockGridItem from './components/StockGridItem';
import ImageEditorModal from './components/ImageEditorModal';
import SearchView from './components/SearchView';
import ExploreView from './components/ExploreView';
import ProfileView from './components/ProfileView';
import { Post } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [editorState, setEditorState] = useState<{ isOpen: boolean; stockName: string; elementId: string }>({
    isOpen: false,
    stockName: '',
    elementId: ''
  });

  const openEditor = (stockName: string, elementId: string) => {
    setEditorState({ isOpen: true, stockName, elementId });
  };

  const renderHomeContent = () => {
    return (
      <div className="animate-fadeIn">
        {/* 3-Column Grid (Home Page) */}
        <div className="grid grid-cols-3 gap-0.5 pb-20">
          {MOCK_POSTS.map(post => (
            <StockGridItem 
              key={post.id} 
              post={post} 
              onClick={() => setSelectedPost(post)} 
            />
          ))}
          {/* Filling more mock items for demonstration of the grid density */}
          {MOCK_POSTS.map(post => (
            <StockGridItem 
              key={`${post.id}-copy`} 
              post={post} 
              onClick={() => setSelectedPost(post)} 
            />
          ))}
          {MOCK_POSTS.map(post => (
            <StockGridItem 
              key={`${post.id}-copy2`} 
              post={post} 
              onClick={() => setSelectedPost(post)} 
            />
          ))}
          {MOCK_POSTS.map(post => (
            <StockGridItem 
              key={`${post.id}-copy3`} 
              post={post} 
              onClick={() => setSelectedPost(post)} 
            />
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHomeContent();
      case 'search':
        return <SearchView />;
      case 'discover':
        return <ExploreView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <div className="p-10 text-center text-gray-400">Feature coming soon!</div>;
    }
  };

  const handlePlusClick = () => {
    openEditor(MOCK_POSTS[0].stock.name, `chart-${MOCK_POSTS[0].id}`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-lg mx-auto md:shadow-2xl md:my-4 md:rounded-3xl md:overflow-hidden relative overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b flex items-center justify-between px-4 h-14">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-xl italic shadow-sm">
            F
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-gray-900">FinTrend</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-800 p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
          <button className="text-gray-800 p-1 relative">
            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>

      {/* Detail Overlay (Modal for individual post) */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/60 backdrop-blur-sm animate-fadeIn max-w-lg mx-auto">
           <div className="flex-1 overflow-y-auto pt-10 pb-20">
              <div className="flex justify-between items-center px-4 mb-2 text-white">
                <button onClick={() => setSelectedPost(null)} className="p-2 hover:bg-white/10 rounded-full">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <span className="font-bold text-sm uppercase tracking-widest">Detail View</span>
                <div className="w-10"></div>
              </div>
              <StockCard post={selectedPost} onEdit={openEditor} />
           </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white/95 backdrop-blur-md border-t h-16 flex items-center justify-around px-4 z-40 md:rounded-b-3xl">
        <button onClick={() => { setActiveTab('home'); setSelectedPost(null); }} className={`p-2 transition-all ${activeTab === 'home' ? 'text-black scale-110' : 'text-gray-300 hover:text-gray-500'}`}>
          <svg className="w-7 h-7" fill={activeTab === 'home' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        </button>
        <button onClick={() => setActiveTab('search')} className={`p-2 transition-all ${activeTab === 'search' ? 'text-black scale-110' : 'text-gray-300 hover:text-gray-500'}`}>
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
        
        <button 
          onClick={handlePlusClick}
          className="p-2 mb-4 bg-gradient-to-tr from-blue-600 to-indigo-700 text-white rounded-2xl shadow-lg shadow-blue-200 active:scale-90 transition-transform"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
        </button>

        <button onClick={() => setActiveTab('discover')} className={`p-2 transition-all ${activeTab === 'discover' ? 'text-black scale-110' : 'text-gray-300 hover:text-gray-500'}`}>
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
        </button>
        <button onClick={() => setActiveTab('profile')} className={`p-2 transition-all ${activeTab === 'profile' ? 'text-black scale-110' : 'text-gray-300 hover:text-gray-500'}`}>
          <div className={`w-7 h-7 rounded-full border-2 overflow-hidden ${activeTab === 'profile' ? 'border-black' : 'border-transparent'}`}>
            <img src="https://picsum.photos/100/100" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </button>
      </nav>

      {/* Modals */}
      <ImageEditorModal 
        isOpen={editorState.isOpen} 
        onClose={() => setEditorState({ ...editorState, isOpen: false })} 
        targetElementId={editorState.elementId}
        stockName={editorState.stockName}
      />
    </div>
  );
};

export default App;
