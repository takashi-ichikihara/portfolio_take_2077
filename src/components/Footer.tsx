import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-800 bg-red-600 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center">
          <p>&copy; 2025 Portfolio Digital | Takashi Ichikihara. Todos os Direitos Reservados.</p>
          <div className="flex gap-4">
            <a href="https://github.com/takashi-ichikihara/" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/takashi-ichikihara/" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">
              <Linkedin size={20} />
            </a>
            <a href="https://wa.me/5511960284036?text=Como%20posso%20ajudar%3F" className="hover:text-red-600">
              <FaWhatsapp size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
