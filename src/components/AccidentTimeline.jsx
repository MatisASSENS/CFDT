import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Clock, AlertTriangle } from 'lucide-react';

function AccidentTimeline() {
  const [expandedId, setExpandedId] = useState(null);

  const events = [
    {
      time: '14:30 UTC',
      title: 'Conditions observées (METAR LFBA)',
      type: 'normal',
      description: 'Vent 250° 10 kt avec rafales à 20 kt, direction variable et présence de TCU: environnement VFR légal mais instable pour un circuit ULM.'
    },
    {
      time: '15:30 - 15:50',
      title: 'Tours de piste en cours à LFBA',
      type: 'normal',
      description: 'L\'équipage poursuit les évolutions locales malgré une dégradation progressive de l\'environnement aérologique.'
    },
    {
      time: '15:52',
      title: 'Alerte front orageux (tour)',
      type: 'warning',
      description: 'La tour signale l\'arrivée d\'un front orageux au nord-ouest et questionne l\'équipage sur la poursuite des tours de piste.'
    },
    {
      time: '15:58',
      title: 'Signalement windshear',
      type: 'warning',
      description: 'Un windshear est reporté sur la plateforme. Le pilote annonce en radio: "beaucoup de vent" et "ça turbule vraiment fort".'
    },
    {
      time: 'vers 16:00',
      title: 'Perte de contrôle à basse hauteur',
      type: 'critical',
      description: 'En phase de virage de circuit, la marge aérodynamique se dégrade. Le scénario retenu est un décrochage dissymétrique non récupérable à cette altitude.'
    },
    {
      time: '16:00+',
      title: 'Impact',
      type: 'critical',
      description: 'L\'ULM impacte violemment le sol près de l\'aérodrome d\'Agen - La Garenne. Les deux occupants décèdent sur place.'
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
          (() => {
            const isCritical = event.type === 'critical';
            const isWarning = event.type === 'warning';
            const badgeClass = isCritical
              ? 'bg-red-50 text-red-600'
              : isWarning
                ? 'bg-amber-50 text-amber-700'
                : 'bg-blue-50 text-blue-600';
            const dotClass = isCritical
              ? 'bg-[#E1000F] text-white'
              : isWarning
                ? 'bg-amber-500 text-white'
                : 'bg-[#003366] text-white';

            return (
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
              ${dotClass}
              ${expandedId === index ? 'scale-110' : 'scale-100'}
            `}>
              {isCritical || isWarning ? <AlertTriangle size={20} /> : <Clock size={20} />}
            </div>

            {/* Content Card */}
            <div className={`
              ml-20 w-full bg-white rounded-xl shadow-sm border p-4 transition-all duration-300 hover:shadow-md
              ${expandedId === index ? 'border-[#000091] ring-1 ring-[#000091]/20' : 'border-gray-100'}
            `}>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <span className={`font-mono font-bold px-2 py-1 rounded text-sm ${badgeClass}`}>
                    {event.time}
                  </span>
                  <h3 className={`font-bold text-lg ${isCritical ? 'text-gray-900' : 'text-gray-700'}`}>
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
            );
          })()
        ))}
      </div>
    </div>
  );
}

export default AccidentTimeline;