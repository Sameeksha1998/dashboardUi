import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import MetricsView from '../components/MetricsView';
import AnalyticsView from '../components/Analytics/AnalyticsView';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<Navigate to="metrics" replace />} />
        
        <Route path="metrics" element={<MetricsView />} />
        <Route path="analytics" element={<AnalyticsView />} />
        
        <Route path="*" element={<div>Page not found</div>} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
