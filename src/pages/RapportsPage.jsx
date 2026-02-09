
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import ReportCard from '@/components/ReportCard';
import { Button } from '@/components/ui/button';

function RapportsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const categories = ['Tous', 'Aviation', 'Ferroviaire', 'Routier', 'Maritime'];

  const allReports = [
    {
      title: 'Incident technique sur le vol AF-1234 Paris-Marseille',
      date: '10 janvier 2026',
      category: 'Aviation',
      summary: 'Analyse d\'un dysfonctionnement du système hydraulique lors de la phase d\'approche. Aucune victime, atterrissage réussi après procédure d\'urgence.'
    },
    {
      title: 'Défaillance du système de signalisation ferroviaire en Île-de-France',
      date: '18 décembre 2025',
      category: 'Ferroviaire',
      summary: 'Enquête sur la panne du système de signalisation automatique ayant causé des retards importants et un risque potentiel de collision.'
    },
    {
      title: 'Accident de poids lourd sur autoroute A7',
      date: '05 décembre 2025',
      category: 'Routier',
      summary: 'Investigation sur les causes d\'un accident impliquant un poids lourd transportant des matières dangereuses. Facteurs météorologiques et mécaniques examinés.'
    },
    {
      title: 'Collision navire de plaisance et cargo commercial au large de Nice',
      date: '28 novembre 2025',
      category: 'Maritime',
      summary: 'Rapport d\'enquête sur une collision en mer méditerranée. Analyse des erreurs de navigation et des conditions de visibilité.'
    },
    {
      title: 'Atterrissage d\'urgence aéroport de Lyon suite à dépressurisation cabine',
      date: '15 novembre 2025',
      category: 'Aviation',
      summary: 'Enquête technique sur un incident de dépressurisation partielle de cabine. Recommandations pour la maintenance préventive des systèmes de pressurisation.'
    },
    {
      title: 'Déraillement partiel TGV en gare de Bordeaux',
      date: '08 novembre 2025',
      category: 'Ferroviaire',
      summary: 'Analyse des causes d\'un déraillement à basse vitesse en gare. Examen de l\'infrastructure ferroviaire et des protocoles de maintenance.'
    },
    {
      title: 'Série d\'accidents routiers sur RN7 en conditions météorologiques difficiles',
      date: '01 novembre 2025',
      category: 'Routier',
      summary: 'Étude approfondie des facteurs contribuant à une série d\'accidents en chaîne. Recommandations pour l\'amélioration de la signalisation et de la sécurité.'
    },
    {
      title: 'Incident technique ferry Marseille-Corse',
      date: '25 octobre 2025',
      category: 'Maritime',
      summary: 'Enquête sur une panne de propulsion en pleine mer. Analyse des systèmes de secours et des procédures d\'urgence.'
    },
    {
      title: 'Incident système anti-collision avion de ligne Paris CDG',
      date: '18 octobre 2025',
      category: 'Aviation',
      summary: 'Investigation sur un dysfonctionnement temporaire du système TCAS. Aucun danger immédiat, recommandations pour les procédures de vérification pré-vol.'
    },
    {
      title: 'Problème signalisation ligne TER région PACA',
      date: '10 octobre 2025',
      category: 'Ferroviaire',
      summary: 'Rapport sur une défaillance récurrente du système de signalisation en région PACA. Propositions d\'amélioration des protocoles de maintenance.'
    },
    {
      title: 'Accident bus scolaire département de la Loire',
      date: '02 octobre 2025',
      category: 'Routier',
      summary: 'Enquête complète sur un accident de bus scolaire. Analyse des facteurs humains, mécaniques et environnementaux.'
    },
    {
      title: 'Échouement navire commercial port de Dunkerque',
      date: '25 septembre 2025',
      category: 'Maritime',
      summary: 'Investigation sur les causes d\'un échouement lors des manœuvres portuaires. Examen des aides à la navigation et des procédures pilote.'
    }
  ];

  const filteredReports = useMemo(() => {
    return allReports.filter(report => {
      const matchesSearch = 
        report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.summary.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'Tous' || report.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, allReports]);

  return (
    <>
      <Helmet>
        <title>Rapports d'Enquête - CFDT</title>
        <meta name="description" content="Consultez les rapports d'enquête technique du CFDT sur les accidents de transport : aviation, ferroviaire, routier, maritime." />
      </Helmet>

      <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header Section */}
        <section className="bg-gradient-to-r from-[#000091] to-[#000091]/90 py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Rapports d'Enquête Technique
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Consultez l'ensemble des rapports d'investigation et analyses techniques publiés par le CFDT
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 bg-white shadow-md sticky top-20 z-40">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search Bar */}
              <div className="relative flex-1 w-full lg:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher un rapport..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#000091] text-gray-900 placeholder-gray-500"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 items-center">
                <Filter className="text-gray-600" size={20} />
                {categories.map((category) => (
                  <Button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    className={`transition-all ${
                      selectedCategory === category
                        ? 'bg-[#000091] text-white hover:bg-[#000091]/90'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mt-4 text-gray-600 text-sm">
              {filteredReports.length} rapport(s) trouvé(s)
            </div>
          </div>
        </section>

        {/* Reports Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredReports.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReports.map((report, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <ReportCard {...report} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                  <Search size={64} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Aucun rapport trouvé
                  </h3>
                  <p className="text-gray-600">
                    Essayez de modifier vos critères de recherche ou de sélectionner une autre catégorie.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default RapportsPage;