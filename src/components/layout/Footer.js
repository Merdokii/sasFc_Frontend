import { SocialMediaIcons } from '../common/SocialMediaIcons';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white border-t border-[#339c0c]/30">
      {/* MAIN FOOTER CONTENT */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* BRAND COLUMN */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="group mb-6">
              <img 
                src="/logo.png" 
                alt="SAS FC Logo"
                className="h-20 w-20 object-contain drop-shadow-lg group-hover:drop-shadow-[0_0_15px_rgba(249,253,6,0.5)] transition-all duration-300"
              />
            </div>
            <p className="text-center lg:text-left text-white/80 leading-relaxed max-w-xs">
              Saris Addis Sefer Football Club —  
              <span className="text-[#f9fd06] font-medium"> Elevating football excellence</span> in our community since 1995.
            </p>
          </div>
          
          {/* QUICK LINKS */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-[#f9fd06]">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { path: "/", name: "Home" },
                { path: "/about", name: "About Us" },
                { path: "/team", name: "Our Team" },
                { path: "/matches", name: "Matches" }
              ].map((link) => (
                <li key={link.path}>
                  <a 
                    href={link.path} 
                    className="text-white/80 hover:text-[#f9fd06] transition-colors duration-300 flex items-center group"
                  >
                    <span className="mr-2 text-[#f9fd06] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* CONTACT */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-[#f9fd06]">
              Contact
            </h3>
            <address className="not-italic space-y-3 text-white/80">
              <div className="flex items-start">
                <svg className="w-5 h-5 mt-0.5 mr-3 text-[#f9fd06]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Saris Addis Sefer, Addis Ababa</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-[#f9fd06]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@sasfc.com" className="hover:text-[#f9fd06] transition-colors">info@sasfc.com</a>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-[#f9fd06]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+251123456789" className="hover:text-[#f9fd06] transition-colors">+251 123 456 789</a>
              </div>
            </address>
          </div>
          
          {/* SOCIAL MEDIA */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-[#f9fd06]">
              Follow Us
            </h3>
            <div className="mb-6">
              <SocialMediaIcons />
            </div>
            <p className="text-white/60 text-sm">
              Join our community of passionate fans and stay updated with exclusive content.
            </p>
          </div>
        </div>
      </div>
      
      {/* COPYRIGHT */}
      <div className="bg-gray-900/80 border-t border-gray-800 py-6 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm mb-3 md:mb-0">
              &copy; {new Date().getFullYear()} Saris Addis Sefer FC. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-white/60 hover:text-[#f9fd06] transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-white/60 hover:text-[#f9fd06] transition-colors text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};