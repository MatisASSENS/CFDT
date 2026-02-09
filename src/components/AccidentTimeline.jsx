import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Clock, AlertTriangle, Play, Pause } from 'lucide-react';

function AccidentTimeline() {
  const [expandedId, setExpandedId] = useState(null);

  const events = [
    {
      time: '14:05',
      title: 'Mise en route',
      type: 'normal',
      description: 'Démarrage du moteur Rotax 912 sans anomalie signalée. Essais magnétos effectués au point d\'arrêt.'
    },
    {
      time: '14:12',
      title: 'Décollage Piste 25',
      type: 'normal',
      description: 'Alignement et mise en puissance. Accélération et rotation conformes. Vent 250° 10kt rafales 20kt.'
    },
    {
      time: '14:13:05',
      title: 'Montée Initiale',
      type: 'normal',
      description: 'Passage 300ft sol. Vitesse stabilisée 110 km/h.'
    },
    {
      time: '14:13:20',
      title: 'Arrêt Moteur',
      type: 'critical',
      description: 'Coupure nette du moteur. Bruit caractéristique d\'étouffement rapporté par témoins au sol.'
    },
    {
      time: '14:13:25',
      title: 'Perte de Contrôle',
      type: 'critical',
      description: 'Tentative de virage à gauche (demi-tour). Inclinaison excessive à basse vitesse. Décrochage asymétrique.'
    },
    {
      time: '14:13:32',
      title: 'Impact',
      type: 'critical',
      description: 'Impact violent avec le sol dans un champ à 400m du seuil de piste.'
    }
  ];

  const toggleExpand = (index) => {
    setExpandedId(expandedId === index ? null : index);
  };

  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-[27px] top-0 bottom-0 w-1 bg-gray-200 rounded-full"></div>

      <div className="space-y-6">
        {events.map((event, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative flex items-start group cursor-pointer"
            onClick={() => toggleExpand(index)}
          >
            {/* Timeline Dot */}
            <div className={`
              absolute left-0 w-14 h-14 rounded-full flex items-center justify-center z-10 border-4 border-white shadow-md transition-colors duration-300
              ${event.type === 'critical' ? 'bg-[#E1000F] text-white' : 'bg-[#003366] text-white'}
              ${expandedId === index ? 'scale-110' : 'scale-100'}
            `}>
              {event.type === 'critical' ? <AlertTriangle size={20} /> : <Clock size={20} />}
            </div>

            {/* Content Card */}
            <div className={`
              ml-20 w-full bg-white rounded-xl shadow-sm border p-4 transition-all duration-300 hover:shadow-md
              ${expandedId === index ? 'border-[#000091] ring-1 ring-[#000091]/20' : 'border-gray-100'}
            `}>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <span className={`font-mono font-bold px-2 py-1 rounded text-sm ${event.type === 'critical' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                    {event.time}
                  </span>
                  <h3 className={`font-bold text-lg ${event.type === 'critical' ? 'text-gray-900' : 'text-gray-700'}`}>
                    {event.title}
                  </h3>
                </div>
                <ChevronDown 
                  className={`text-gray-400 transition-transform duration-300 ${expandedId === index ? 'rotate-180' : ''}`} 
                  size={20} 
                />
              </div>
              
              <AnimatePresence>
                {expandedId === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                      {event.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default AccidentTimeline;