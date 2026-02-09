import React from 'react';

function TechnicalDataTable() {
  const specs = [
    { label: 'Constructeur', value: 'Best Off Aircraft' },
    { label: 'Modèle', value: 'Nynja 912' },
    { label: 'Immatriculation', value: 'F-CDST' },
    { label: 'Moteur', value: 'Rotax 912 UL (80hp)' },
    { label: 'Hélice', value: 'Duc Swirl Inconel (Tripale)' },
    { label: 'Année de construction', value: '2015' },
    { label: 'Heures de vol totales', value: '452 h' },
    { label: 'Dernière visite (100h)', value: 'Non réalisée (Retard 52h)' },
    { label: 'Masse à vide', value: '298 kg' },
    { label: 'MTOW', value: '472.5 kg' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 h-full">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Caractéristique</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Donnée</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {specs.map((spec, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{spec.label}</td>
                <td className={`px-6 py-4 text-gray-600 font-mono ${spec.label.includes('Dernière visite') ? 'text-[#E1000F] font-bold' : ''}`}>
                  {spec.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-gray-50 border-t border-gray-100 text-xs text-gray-500 text-center italic">
        Données extraites du carnet de route et du manuel de vol.
      </div>
    </div>
  );
}

export default TechnicalDataTable;