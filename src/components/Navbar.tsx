import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Fechar o menu quando uma rota é alterada
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Detectar scroll para mudar o estilo do navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || isMenuOpen ? 'bg-black/90 backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-red-600 text-4xl font-bold">TAKASHI ICHIKIHARA</Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`hover:text-red-600 transition-colors ${location.pathname === '/' ? 'text-red-600' : 'text-white'}`}>
              Home
            </Link>
            <Link to="/sobre" className={`hover:text-red-600 transition-colors ${location.pathname === '/sobre' ? 'text-red-600' : 'text-white'}`}>
              Sobre
            </Link>
            <Link to="/servicos" className={`hover:text-red-600 transition-colors ${location.pathname === '/servicos' ? 'text-red-600' : 'text-white'}`}>
              Serviços
            </Link>
            <Link to="/cases" className={`hover:text-red-600 transition-colors ${location.pathname === '/cases' ? 'text-red-600' : 'text-white'}`}>
              Cases
            </Link>
            <Link to="/contato" className={`hover:text-red-600 transition-colors ${location.pathname === '/contato' ? 'text-red-600' : 'text-white'}`}>
              Contato
            </Link>
            {/* <Link to="/login" className={`hover:text-red-600 transition-colors ${location.pathname === '/login' ? 'text-red-600' : 'text-white'}`}>
              Login
            </Link> */}
          </div>

          {/* Social Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="https://github.com/takashi-ichikihara/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-600 transition-colors">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/takashi-ichikihara/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-600 transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="https://wa.me/5511960284036?text=Como%20posso%20ajudar%3F" className="text-white hover:text-red-600 transition-colors">
              <FaWhatsapp size={24} />
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white hover:text-red-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className={`text-lg py-2 ${location.pathname === '/' ? 'text-red-600' : 'text-white'}`}>
                Home
              </Link>
              <Link to="/sobre" className={`text-lg py-2 ${location.pathname === '/sobre' ? 'text-red-600' : 'text-white'}`}>
                Sobre
              </Link>
              <Link to="/servicos" className={`text-lg py-2 ${location.pathname === '/servicos' ? 'text-red-600' : 'text-white'}`}>
                Serviços
              </Link>
              <Link to="/cases" className={`text-lg py-2 ${location.pathname === '/cases' ? 'text-red-600' : 'text-white'}`}>
                Cases
              </Link>
              <Link to="/contato" className={`text-lg py-2 ${location.pathname === '/contato' ? 'text-red-600' : 'text-white'}`}>
                Contato
              </Link>
              <Link to="/login" className={`text-lg py-2 ${location.pathname === '/login' ? 'text-red-600' : 'text-white'}`}>
                Login
              </Link>
              
              {/* Social Icons for Mobile */}
              <div className="flex space-x-4 py-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-600 transition-colors">
                  <Github size={24} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-600 transition-colors">
                  <Linkedin size={24} />
                </a>
                <a href="https://wa.me/5511960284036?text=Como%20posso%20ajudar%3F" className="text-white hover:text-red-600 transition-colors">
                  <FaWhatsapp size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
