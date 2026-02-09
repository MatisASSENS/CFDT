import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
function Footer() {
  return <footer className="bg-[#000091] text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Branding */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src="https://horizons-cdn.hostinger.com/1dae807e-b36f-455e-ac88-c8703f6958e3/generated-image_1-CihHo.png" alt="Logo CFDT" className="h-12 bg-white rounded-lg p-1" />
              <span className="text-xl font-bold">CFDT</span>
            </div>
            <p className="text-white/80 text-sm max-w-md">Confrérie Française des Transports. Autorité indépendante d'enquête de sécurité.</p>
          </div>

          {/* Contact Minimal */}
          <div className="flex flex-col md:items-end space-y-3">
            <div className="flex items-center space-x-2">
              <MapPin size={16} className="text-white/60" />
              <span className="text-white/80 text-sm">81 Av. de Grande Bretagne, 31300 Toulouse</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone size={16} className="text-white/60" />
              <span className="text-white/80 text-sm">+33 1 23 45 67 89</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={16} className="text-white/60" />
              <span className="text-white/80 text-sm">contact@cfdt.gouv.fr</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-center text-xs text-white/60">
          <p>© {new Date().getFullYear()} CFDT - Tous droits réservés | République Française</p>
        </div>
      </div>
    </footer>;
}
export default Footer;