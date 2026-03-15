import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SwissCheese3D from '@/components/SwissCheese3D';

function SwissCheeseModelPage() {
  useEffect(() => {
    const { body, documentElement } = document;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyOverscroll = body.style.overscrollBehavior;
    const previousHtmlOverflow = documentElement.style.overflow;
    const previousHtmlOverscroll = documentElement.style.overscrollBehavior;

    body.style.overflow = 'hidden';
    body.style.overscrollBehavior = 'none';
    documentElement.style.overflow = 'hidden';
    documentElement.style.overscrollBehavior = 'none';

    return () => {
      body.style.overflow = previousBodyOverflow;
      body.style.overscrollBehavior = previousBodyOverscroll;
      documentElement.style.overflow = previousHtmlOverflow;
      documentElement.style.overscrollBehavior = previousHtmlOverscroll;
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Modele du Swiss Cheese - CFDT</title>
        <meta
          name="description"
          content="Visualisation 3D du modele Swiss Cheese applique a l'accident du Nynja F-CDST."
        />
      </Helmet>

      <div className="pt-24 min-h-screen bg-gradient-to-b from-gray-50 to-slate-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">V.V - Modele du Swiss Cheese (3D)</h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">Visualisation interactive des failles alignees dans les barrieres de securite.</p>
            </div>
            <div className="flex gap-2">
              <Link to="/rapport-nynja#factors">
                <Button variant="outline">Retour aux facteurs</Button>
              </Link>
              <Link to="/">
                <Button className="bg-[#000091] hover:bg-[#000091]/90 text-white">Retour au rapport</Button>
              </Link>
            </div>
          </div>

          <SwissCheese3D />
        </div>
      </div>
    </>
  );
}

export default SwissCheeseModelPage;