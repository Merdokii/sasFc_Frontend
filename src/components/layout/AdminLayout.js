import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { AuthContext } from '../../context/AuthContext';

const AdminLayout = ({ children }) => {
  const { admin, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === '/admin/login';

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Conditionally render sidebar only when NOT on login page */}
      {!isLoginPage && <AdminSidebar />}
      
      {/* MAIN CONTENT AREA */}
      <div className={`flex-1 flex flex-col overflow-hidden ${isLoginPage ? 'flex items-center justify-center' : ''}`}>
        {/* Hide header on login page */}
        {!isLoginPage && (
          <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              {/* BREADCRUMB PLACEHOLDER */}
              <div className="text-sm text-gray-500">
                Dashboard / Overview
              </div>
              
              {/* ADMIN CONTROLS */}
              {admin && (
                <div className="flex items-center space-x-6">
                  {/* NOTIFICATION BELL */}
                  <button className="relative p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="absolute top-0 right-0 w-2 h-2 bg-[#f9fd06] rounded-full"></span>
                  </button>
                  
                  {/* USER PROFILE */}
                  <div className="flex items-center space-x-3 group cursor-pointer">
                    <div className="relative">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#339c0c] to-[#2a850a] flex items-center justify-center text-white font-bold text-sm">
                        {admin.name.charAt(0)}
                      </div>
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-800">{admin.name}</p>
                      <p className="text-xs text-gray-500">Admin</p>
                    </div>
                  </div>
                  
                  {/* LOGOUT BUTTON */}
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 hover:border-[#f9fd06]/50 transition-all flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </header>
        )}

        {/* MAIN CONTENT - CENTERED ON LOGIN PAGE */}
        <main className={`flex-grow ${isLoginPage ? 'flex items-center justify-center p-4' : 'p-6'}`}>
          {isLoginPage ? (
            <div className="w-full max-w-md">
              {children}
            </div>
          ) : (
            <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              {children}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;