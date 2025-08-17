import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaSpinner, FaLock, FaEnvelope, FaArrowRight } from 'react-icons/fa';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/admin/dashboard');
      } else {
        setError(result.message || 'Login failed. Please check your credentials and try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* SAS FC Brand Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#339c0c] via-[#f9fd06] to-[#339c0c]"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#f9fd06]/10 blur-3xl"></div>
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#339c0c]/10 blur-3xl"></div>

      <div className="container mx-auto px-4 flex items-center justify-center min-h-screen relative z-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          {/* Login Header */}
          <div className="bg-gradient-to-r from-[#339c0c] to-[#2a850a] p-6 text-center">
            <h2 className="text-2xl font-bold text-white">
              SAS FC Admin Portal
            </h2>
            <p className="text-white/90 mt-2">Access your management dashboard</p>
          </div>

          {/* Login Form */}
          <div className="p-8">
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#339c0c] focus:border-[#339c0c] transition-all placeholder-gray-400"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#339c0c] focus:border-[#339c0c] transition-all placeholder-gray-400"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#339c0c] focus:ring-[#339c0c] border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="/forgot-password" className="font-medium text-[#339c0c] hover:text-[#2a850a]">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#339c0c] to-[#2a850a] hover:from-[#2a850a] hover:to-[#339c0c] text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-70 flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin mr-3" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <FaArrowRight className="ml-3" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Need help? Contact support
                  </span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <a 
                  href="mailto:support@sasfc.com" 
                  className="text-sm font-medium text-[#339c0c] hover:text-[#2a850a]"
                >
                  support@sasfc.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};