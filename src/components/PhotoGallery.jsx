import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1559579449-ff779f875e1a',
      caption: 'Vue générale de l\'aéronef similaire'
    },
    {
      url: 'https://images.unsplash.com/photo-1699888621354-8b26bf229524',
      caption: 'Détail compartiment moteur Rotax 912'
    },
    {
      url: 'https://images.unsplash.com/photo-1537507438480-b802c3777ea7',
      caption: 'Environnement aérodrome LFBA'
    },
    {
      url: 'https://images.unsplash.com/photo-1590196771037-c355ce575028',
      caption: 'Inspection structurelle'
    }
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <motion.div 
            key={index}
            whileHover={{ scale: 1.03 }}
            className="group relative h-64 rounded-xl overflow-hidden shadow-lg cursor-pointer"
            onClick={() => setSelectedImage(img)}
          >
            <img 
              src={img.url} 
              alt={img.caption}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <ZoomIn className="text-white" size={32} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-white text-sm font-medium">{img.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={40} />
            </button>
            <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              <img 
                src={selectedImage.url} 
                alt={selectedImage.caption} 
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              <p className="text-white text-center mt-4 text-lg font-light">{selectedImage.caption}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default PhotoGallery;