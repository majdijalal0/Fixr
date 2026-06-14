import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import CardLayout from './CardLayout';

const ServicesGrid = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q')?.toLowerCase();

  const standardServices = [
    'electrical',
    'painting',
    'plumbing',
    'flooring',
    'appliance installation',
    'hvac',
    'carpentry',
    'cleaning',
    'gardening & landscaping',
    'roofing'
  ];

  const getInitialServiceId = () => {
    if (!queryParam) return 'all';
    if (standardServices.includes(queryParam)) {
      return queryParam;
    }
    return 'all';
  };

  const [selectedServiceId, setSelectedServiceId] = useState(getInitialServiceId());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (queryParam) {
      if (standardServices.includes(queryParam)) {
        setSelectedServiceId(queryParam);
      } else {
        setSelectedServiceId('all');
      }
    } else {
      setSelectedServiceId('all');
    }
  }, [queryParam]);

  const handleServiceChange = (serviceId) => {
    setSelectedServiceId(serviceId);
    setSidebarOpen(false);
    if (serviceId === 'all') {
      searchParams.delete('q');
    } else if (serviceId === 'other') {
      searchParams.delete('q');
    } else {
      const matchedService = standardServices.find(s => s.toLowerCase() === serviceId.toLowerCase());
      if (matchedService) {
        const capitalized = matchedService.charAt(0).toUpperCase() + matchedService.slice(1);
        searchParams.set('q', capitalized);
      }
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-amber-500 text-white p-4 rounded-full shadow-xl hover:bg-amber-600 transition-colors"
        aria-label="Toggle categories"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className={`${sidebarOpen ? 'fixed inset-0 z-40' : 'hidden'} lg:relative lg:block`}>
        <div
          className={`${sidebarOpen ? 'fixed inset-0 bg-black/50' : 'hidden'} lg:hidden`}
          onClick={() => setSidebarOpen(false)}
        />
        <div className={`${sidebarOpen ? 'fixed left-0 top-0 bottom-0 z-50' : 'hidden'} lg:block lg:static`}>
          <Sidebar
            selectedServiceId={selectedServiceId}
            setSelectedServiceId={handleServiceChange}
            onClose={() => setSidebarOpen(false)}
          />
        </div>
      </div>

      <main className="flex-1 min-w-0">
        <CardLayout selectedServiceId={selectedServiceId} />
      </main>
    </div>
  );
};

export default ServicesGrid;
