
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to login page
    navigate('/');
  }, [navigate]);
  
  return null;
};

export default Index;
