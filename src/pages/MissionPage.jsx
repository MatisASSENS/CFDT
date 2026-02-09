import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Target, Scale, Shield, Globe, CheckCircle } from 'lucide-react';

function MissionPage() {
  const objectives = [
    'Enquêter de manière indépendante sur les accidents et incidents graves de transport',
    'Déterminer les causes techniques et les facteurs contributifs',
    'Émettre des recommandations de sécurité pour prévenir de futurs accidents',
    'Publier des rapports transparents et accessibles au public',
    'Collaborer avec les organismes internationaux de sécurité des transports'
  ];

  const methodology = [
    {
      title: 'Notification et déploiement',
      description: 'Dès qu\'un accident est signalé, nos équipes sont mobilisées et déployées sur le site dans les plus brefs délais.'
    },
    {
      title: 'Collecte des preuves',
      description: 'Recueil et préservation de toutes les données techniques, témoignages, enregistrements et débris matériels.'
    },
    {
      title: 'Analyse technique',
      description: 'Examen approfondi par des experts spécialisés utilisant des méthodes scientifiques et des technologies avancées.'
    },
    {
      title: 'Détermination des causes',
      description: 'Identification des causes immédiates, sous-jacentes et contributives de l\'accident.'
    },
    {
      title: 'Recommandations',
      description: 'Formulation de recommandations concrètes pour améliorer la sécurité et prévenir des incidents similaires.'
    },
    {
      title: 'Publication',
      description: 'Diffusion publique du rapport final garantissant transparence et partage des enseignements.'
    }
  ];

  const values = [
    {
      icon: Scale,
      title: 'Indépendance',
      description: 'Le CFDT opère en toute indépendance vis-à-vis des acteurs économiques, des compagnies de transport et des autorités réglementaires. Cette indépendance est garantie par la loi et assure l\'objectivité de nos enquêtes.'
    },
    {
      icon: Target,
      title: 'Rigueur Technique',
      description: 'Nos enquêteurs sont des experts reconnus dans leurs domaines respectifs. Chaque investigation suit des protocoles scientifiques rigoureux et s\'appuie sur des analyses techniques approfondies et des technologies de pointe.'
    },
    {
      icon: Shield,
      title: 'Prévention',
      description: 'Notre objectif n\'est pas d\'attribuer des responsabilités mais de comprendre les causes pour prévenir. Chaque rapport contient des recommandations concrètes visant à améliorer durablement la sécurité des transports.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Notre Mission - CFDT</title>
        <meta name="description" content="Découvrez la mission du CFDT : enquêtes indépendantes, rigueur technique et prévention des accidents de transport en France." />
      </Helmet>

      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1607615896122-6c919f897e55)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#000091]/95 via-[#000091]/85 to-[#000091]/70"></div>
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              Notre Mission
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90"
            >
              Enquêter, comprendre et prévenir pour améliorer la sécurité des transports
            </motion.p>
          </div>
        </section>

        {/* Objectives Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
                Nos Objectifs
              </h2>
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl p-8 md:p-12">
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  Le Comité Français pour la Détermination des causes Techniques des accidents de transport (CFDT) 
                  est une autorité administrative indépendante créée pour enquêter sur les accidents et incidents 
                  graves survenus dans les domaines de l'aviation civile, du transport ferroviaire, maritime et routier.
                </p>
                <ul className="space-y-4">
                  {objectives.map((objective, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <CheckCircle className="text-[#000091] mr-4 mt-1 flex-shrink-0" size={24} />
                      <span className="text-lg text-gray-700">{objective}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Methodology Section */}
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
                Notre Méthodologie d'Enquête
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Un processus rigoureux conforme aux standards internationaux
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {methodology.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="bg-[#000091] text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 font-bold text-xl">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="flex items-center mb-4">
                <Globe className="text-[#000091] mr-3" size={32} />
                <h3 className="text-2xl font-bold text-gray-900">
                  Standards Internationaux
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Le CFDT applique les normes et recommandations de l'Organisation de l'Aviation Civile Internationale (OACI), 
                de l'Agence de l'Union européenne pour la sécurité aérienne (AESA), et collabore étroitement avec les 
                organismes homologues européens et internationaux. Nos méthodes d'investigation respectent les meilleures 
                pratiques reconnues mondialement pour garantir des résultats fiables et exhaustifs.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
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
                Nos Valeurs Fondamentales
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Les principes qui guident chacune de nos actions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-[#000091] to-[#E1000F] rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6">
                    <value.icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-br from-[#000091] to-[#000091]/80">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center text-white max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Contribuez à la Sécurité
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Votre signalement peut aider à prévenir de futurs accidents et sauver des vies.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

export default MissionPage;