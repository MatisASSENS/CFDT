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
        <title>Modele Swiss Cheese de l'accident Nynja F-CDST - CFDT</title>
        <meta
          name="description"
          content="Visualisation 3D plein ecran du modele Swiss Cheese de l'accident Nynja F-CDST."
        />
      </Helmet>

      <div className="pt-24 h-screen bg-gradient-to-b from-gray-50 to-slate-100">
        <div className="h-full px-4 md:px-6 pb-4 flex flex-col gap-3">
          <div className="flex items-center justify-end gap-3 shrink-0">
            <Link to="/rapport-nynja#factors">
              <Button variant="outline">Retour</Button>
            </Link>
          </div>

          <SwissCheese3D className="flex-1 min-h-0" />
        </div>
      </div>
    </>
  );
}

export default SwissCheeseModelPage;