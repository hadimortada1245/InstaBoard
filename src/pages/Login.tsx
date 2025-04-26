
import React from 'react';
import LoginForm from '@/components/LoginForm';
import Logo from '@/components/Logo';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="mb-8">
        <Logo />
      </div>
      
      <LoginForm />
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>© 2025 InstaBoard. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Login;
