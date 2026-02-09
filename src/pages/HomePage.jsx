import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield, FileText, Users, TrendingUp } from 'lucide-react';
import NewsCard from '@/components/NewsCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const missionCards = [
    {
      icon: Shield,
      title: 'Indépendance',
      description: 'Une autorité indépendante garantissant l\'objectivité des enquêtes techniques.'
    },
    {
      icon: FileText,
      title: 'Rigueur Technique',
      description: 'Des analyses approfondies menées par des experts spécialisés en sécurité des transports.'
    },
    {
      icon: TrendingUp,
      title: 'Prévention',
      description: 'Des recommandations concrètes pour améliorer la sécurité et prévenir les accidents futurs.'
    }
  ];

  const recentNews = [
    {
      title: 'Nouveau rapport sur la sécurité ferroviaire en 2025',
      date: '15 janvier 2026',
      category: 'Ferroviaire',
      excerpt: 'Le CFDT publie son analyse annuelle des incidents ferroviaires avec des recommandations pour renforcer la sécurité des voyageurs.'
    },
    {
      title: 'Enquête complète sur l\'accident aérien de Lyon',
      date: '08 janvier 2026',
      category: 'Aviation',
      excerpt: 'Publication du rapport final d\'enquête technique concernant l\'incident survenu en décembre 2025 à l\'aéroport de Lyon-Saint Exupéry.'
    },
    {
      title: 'Bilan des accidents routiers du quatrième trimestre 2025',
      date: '02 janvier 2026',
      category: 'Routier',
      excerpt: 'Analyse détaillée des accidents routiers majeurs et identification des facteurs de risque principaux pour améliorer la prévention.'
    },
    {
      title: 'Collaboration internationale renforcée en sécurité maritime',
      date: '28 décembre 2025',
      category: 'Maritime',
      excerpt: 'Le CFDT signe un accord de coopération avec plusieurs organismes européens pour harmoniser les normes de sécurité maritime.'
    }
  ];

  const categories = ['Aviation', 'Ferroviaire', 'Routier', 'Maritime'];

  return (
    <>
      <Helmet>
        <title>CFDT - Comité Français pour la Détermination des causes Techniques</title>
        <meta name="description" content="Autorité indépendante d'enquête sur les accidents de transport en France. Rapports techniques, prévention et amélioration de la sécurité." />
      </Helmet>

      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1702726859966-24f35aa496c7)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#000091]/95 via-[#000091]/85 to-[#000091]/70"></div>
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Sécurité et Prévention<br />des Transports
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90"
            >
              Autorité indépendante d'enquête technique au service de la sécurité des transports en France
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                onClick={() => navigate('/rapports')}
                size="lg" 
                className="bg-[#E1000F] hover:bg-[#E1000F]/90 text-white px-8 py-6 text-lg"
              >
                Consulter les rapports
              </Button>
              <Button 
                onClick={() => navigate('/mission')}
                size="lg" 
                variant="outline" 
                className="bg-white/10 hover:bg-white/20 text-white border-2 border-white px-8 py-6 text-lg backdrop-blur-sm"
              >
                Notre mission
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Mission Statement Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Nos Valeurs Fondamentales
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Le CFDT s'engage à garantir la transparence et l'excellence dans chaque enquête technique
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {missionCards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-[#000091] to-[#E1000F] rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6">
                    <card.icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent News Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Actualités Récentes
              </h2>
              <p className="text-xl text-gray-600">
                Les dernières publications et communiqués du CFDT
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentNews.map((news, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <NewsCard {...news} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Access Section */}
        <section className="py-16 bg-gradient-to-br from-[#000091] to-[#000091]/80">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Accès Rapide aux Rapports
              </h2>
              <p className="text-xl text-white/90">
                Consultez nos enquêtes techniques par catégorie de transport
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              {categories.map((category, index) => (
                <Button
                  key={index}
                  onClick={() => navigate('/rapports')}
                  size="lg"
                  className="bg-white/20 hover:bg-white/30 text-white border-2 border-white backdrop-blur-sm px-8 py-6 text-lg transition-all"
                >
                  {category}
                </Button>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <Button 
                onClick={() => navigate('/rapports')}
                size="lg" 
                className="bg-[#E1000F] hover:bg-[#E1000F]/90 text-white px-10 py-6 text-lg shadow-xl"
              >
                <FileText size={24} className="mr-2" />
                Voir tous les rapports
              </Button>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-[#000091] to-[#E1000F] rounded-3xl shadow-2xl p-12 text-center text-white"
            >
              <Users size={64} className="mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Signalez un Incident
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
                Vous avez été témoin ou victime d'un incident de transport ? Aidez-nous à améliorer la sécurité en le signalant.
              </p>
              <Button 
                onClick={() => navigate('/signaler-incident')}
                size="lg" 
                className="bg-white text-[#000091] hover:bg-gray-100 px-10 py-6 text-lg shadow-xl"
              >
                Faire un signalement
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;