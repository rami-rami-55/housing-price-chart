import React from 'react';
import { DashboardProvider, useDashboard } from '../contexts/DashboardContext';
import { HamburgerMenuButton, MainBoard, Sidebar } from '../features';

const DashboardContent: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useDashboard();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        className={`sidebar w-full md:w-80 bg-white p-6 shadow-xl transform transition-transform duration-300 ease-in-out md:translate-x-0 absolute md:relative z-40 h-full overflow-y-auto ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      />
      <HamburgerMenuButton isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
      <MainBoard />
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
};

export default Dashboard;
