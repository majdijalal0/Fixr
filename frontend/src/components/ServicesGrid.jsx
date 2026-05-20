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
      <Sidebar 
        selectedServiceId={selectedServiceId} 
        setSelectedServiceId={handleServiceChange} 
      />

      <main className="flex-1">
        <CardLayout selectedServiceId={selectedServiceId} />
      </main>
    </div>
  );
};

export default ServicesGrid;