import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Layout from '@/components/Layout';
import NynjaReportPage from '@/pages/NynjaReportPage';
import InterrogatoireHubertPage from '@/pages/InterrogatoireHubertPage';
import InterrogatoireMonfredaPage from '@/pages/InterrogatoireMonfredaPage';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const konamiIndexRef = useRef(0);

  useEffect(() => {
    const sequence = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a',
      'Enter',
    ];

    const isTypingTarget = (target) => {
      if (!target) return false;
      const tag = target.tagName?.toLowerCase();
      return (
        target.isContentEditable ||
        tag === 'input' ||
        tag === 'textarea' ||
        tag === 'select'
      );
    };

    const onKeyDown = (event) => {
      if (event.defaultPrevented) return;
      if (isTypingTarget(event.target)) return;

      const expected = sequence[konamiIndexRef.current];
      const key = event.key;
      const normalizedKey = key.length === 1 ? key.toLowerCase() : key;
      const normalizedExpected = expected.length === 1 ? expected.toLowerCase() : expected;

      if (normalizedKey === normalizedExpected) {
        konamiIndexRef.current += 1;
        if (konamiIndexRef.current >= sequence.length) {
          konamiIndexRef.current = 0;
          window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank', 'noopener,noreferrer');
        }
        return;
      }

      konamiIndexRef.current = normalizedKey === sequence[0] ? 1 : 0;
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Marianne:wght@300;400;500;700;800&display=swap" rel="stylesheet" />
      </Helmet>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<NynjaReportPage />} />
            <Route path="/rapport-nynja" element={<NynjaReportPage />} />
            <Route path="/interrogatoire-hubert" element={<InterrogatoireHubertPage />} />
            <Route path="/interrogatoire-monfreda" element={<InterrogatoireMonfredaPage />} />
          </Routes>
        </Layout>
        <Toaster />
      </Router>
    </>
  );
}

export default App;