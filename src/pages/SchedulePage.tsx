import React from 'react';
import { Navigate } from 'react-router-dom';

export const SchedulePage: React.FC = () => {
  return <Navigate to="/contact#schedule" replace />;
};

export default SchedulePage;
