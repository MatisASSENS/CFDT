import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

function ContributoryFactorsDiagram() {
  const steps = [
    {
      title: "Conditions Latentes",
      color: "bg-orange-500",
      items: ["Défaut de maintenance", "Vieillissement circuit essence"]
    },
    {
      title: "Déclencheurs",
      color: "bg-red-500",
      items: ["Obstruction carburant", "Vent turbulent (20kt)"]
    },
    {
      title: "Conséquences",
      color: "bg-gray-800",
      items: ["Arrêt moteur 300ft", "Perte de contrôle"]
    }
  ];

  return (
    <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 md:gap-0">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="flex-1"
          >
            <div className={`h-full rounded-2xl p-6 ${step.color} bg-opacity-90 backdrop-blur-sm text-white shadow-lg border border-white/10 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300`}>
              <h3 className="text-lg font-bold mb-4 uppercase tracking-wider opacity-80 border-b border-white/20 pb-2 w-full">
                {step.title}
              </h3>
              <ul className="space-y-3 mt-2">
                {step.items.map((item, i) => (
                  <li key={i} className="bg-black/20 rounded-lg px-4 py-2 text-sm font-medium w-full">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          
          {index < steps.length - 1 && (
            <div className="hidden md:flex flex-col justify-center px-2 text-white/50">
              <ArrowRight size={32} />
            </div>
          )}
          
          {index < steps.length - 1 && (
             <div className="md:hidden flex justify-center py-2 text-white/50">
                <ArrowRight size={24} className="rotate-90" />
             </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default ContributoryFactorsDiagram;
