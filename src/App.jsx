import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Layout from '@/components/Layout';
import NynjaReportPage from '@/pages/NynjaReportPage';
import InterrogatoireHubertPage from '@/pages/InterrogatoireHubertPage';
import InterrogatoireMonfredaPage from '@/pages/InterrogatoireMonfredaPage';
import { Toaster } from '@/components/ui/toaster';

function App() {
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