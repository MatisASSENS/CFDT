import React from 'react';

function TechnicalDataTable() {
  const specs = [
    { label: 'Type', value: 'NYNJA' },
    { label: 'Année', value: '2015' },
    { label: 'Propriétaire / Exploitant', value: "Aéroclub d'Agen" },
    { label: 'Base', value: 'Agen' },
    { label: 'Motorisation', value: 'Rotax 912S' },
    { label: 'Masse max (MTOW)', value: '470 kg (réf. enquête initiale)' },
    { label: 'Masse max (autre source)', value: '472.5 kg (calcul masse/centrage)' },
    { label: 'Modèle', value: 'Best Off Nynja' },
    { label: 'Immatriculation', value: 'F-CDST' },
    { label: 'Masse à vide', value: '284 kg' },
    { label: 'Pilote', value: 'Jean Dupotager - 70 kg - 62 h' },
    { label: 'Passager', value: 'Alexandre Lamitie - 68 kg - 45 h' },
    { label: 'Carburant embarqué (max)', value: '60 L (~42 kg)' },
    { label: 'Masse estimée au décollage', value: '464 kg' },
    { label: 'Configuration du vol', value: 'Vol local en tours de piste' },
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
                <td className={`px-6 py-4 text-gray-600 font-mono ${spec.label.includes('Masse estimée') ? 'text-[#E1000F] font-bold' : ''}`}>
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