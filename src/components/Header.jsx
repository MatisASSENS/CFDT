import React from 'react';
import { Link } from 'react-router-dom';
function Header() {
  return <header className="fixed top-0 left-0 right-0 z-50 bg-[#000091] shadow-lg">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 no-underline hover:no-underline" style={{
          textDecoration: 'none'
        }}>
            <img src="https://horizons-cdn.hostinger.com/1dae807e-b36f-455e-ac88-c8703f6958e3/generated-image_1-Xvn1D.png" alt="Logo CFDT" className="h-10 md:h-12 bg-white rounded-md p-1" />
            <span className="text-white font-bold text-lg hidden md:block border-l border-white/30 pl-3 leading-tight">
              Rapport d'Enquête Technique<br />
              <span className="font-normal text-sm opacity-90">Nynja 912 F-CDST</span>
            </span>
          </Link>

          <div className="text-white/80 text-sm hidden sm:block">
            Réf: CFDT-2026-004
          </div>
        </div>
      </nav>
    </header>;
}
export default Header;