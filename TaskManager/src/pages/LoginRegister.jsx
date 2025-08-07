import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthenticationContext';

export default function Login() {
  const [step, setStep] = useState('credentials');
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [otp,setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

    const handleCredentialsSubmit = (e) => {
    e.preventDefault();
    // Generating a random 6-digit OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    alert(`Your OTP is: ${newOtp}`);
    setStep('otp');
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === generatedOtp) {
      login(credentials);
      navigate('/dashboard');
    } else {
      alert('Invalid OTP');
    }
  };
  
  if (step === 'otp') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="bg-white p-8 rounded-lg shadow-xl w-96">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Enter OTP</h2>
          <p className="text-sm text-gray-600 mb-4 text-center">
            We sent a code to {credentials.email}
          </p>
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength="6"
            />
            <button 
              type="submit" 
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Verify OTP
            </button>
            <button 
              type="button"
              onClick={() => setStep('credentials')}
              className="w-full p-3 text-gray-600 hover:text-gray-800"
            >
              Back to Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  
 return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Welcome Back</h2>
        <form onSubmit={handleCredentialsSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            />
          </div>
          <button 
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );

}