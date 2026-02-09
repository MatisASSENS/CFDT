import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

function NewsCard({ title, date, category, excerpt, link = '#' }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-block px-3 py-1 bg-[#000091] text-white text-xs font-semibold rounded-full">
            {category}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar size={16} className="mr-1" />
            {date}
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {excerpt}
        </p>
        <a 
          href={link}
          className="inline-flex items-center text-[#000091] font-semibold hover:text-[#E1000F] transition-colors group"
        >
          Lire la suite
          <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}

export default NewsCard;