import React from 'react';
import { motion } from 'framer-motion';

function SectionNavigation({ sections, activeSection, setActiveSection }) {
  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });

      // Keep URL in sync without navigating/reloading
      if (window.history?.replaceState) {
        window.history.replaceState(null, '', `#${id}`);
      }
    }
  };

  return (
    <div className="flex space-x-2 p-2 w-full justify-start md:justify-center min-w-max">
      {sections.map((section) => {
        const Icon = section.icon;
        const isActive = activeSection === section.id;
        
        return (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`
              flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${isActive 
                ? 'bg-[#000091] text-white shadow-md scale-105' 
                : 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-[#000091]'
              }
            `}
          >
            <Icon size={16} className={`mr-2 ${isActive ? 'text-white' : 'text-gray-400'}`} />
            {section.label}
          </button>
        );
      })}
    </div>
  );
}

export default SectionNavigation;