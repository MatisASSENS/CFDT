import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { AlertTriangle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

function SignalerIncidentPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    type_incident: '',
    date_incident: '',
    lieu: '',
    description: '',
    contact_name: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});

  const incidentTypes = [
    'Aviation - Incident en vol',
    'Aviation - Incident au sol',
    'Ferroviaire - Déraillement',
    'Ferroviaire - Collision',
    'Ferroviaire - Problème signalisation',
    'Routier - Accident poids lourd',
    'Routier - Accident véhicule léger',
    'Routier - Infrastructure défectueuse',
    'Maritime - Collision',
    'Maritime - Échouement',
    'Maritime - Problème technique',
    'Autre'
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.type_incident) {
      newErrors.type_incident = 'Le type d\'incident est requis';
    }
    if (!formData.date_incident) {
      newErrors.date_incident = 'La date de l\'incident est requise';
    }
    if (!formData.lieu.trim()) {
      newErrors.lieu = 'Le lieu est requis';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise';
    } else if (formData.description.trim().length < 50) {
      newErrors.description = 'La description doit contenir au moins 50 caractères';
    }
    if (!formData.contact_name.trim()) {
      newErrors.contact_name = 'Le nom est requis';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!/^[0-9+\s()-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Format de téléphone invalide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez corriger les erreurs dans le formulaire.",
        variant: "destructive"
      });
      return;
    }

    try {
      const existingReports = JSON.parse(localStorage.getItem('incident_reports') || '[]');
      const newReport = {
        ...formData,
        id: Date.now(),
        submitted_at: new Date().toISOString()
      };
      existingReports.push(newReport);
      localStorage.setItem('incident_reports', JSON.stringify(existingReports));

      toast({
        title: "✅ Signalement envoyé avec succès",
        description: "Votre signalement a été enregistré. Nos équipes vont l'examiner dans les plus brefs délais.",
      });

      setFormData({
        type_incident: '',
        date_incident: '',
        lieu: '',
        description: '',
        contact_name: '',
        email: '',
        phone: ''
      });
      setErrors({});
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement. Veuillez réessayer.",
        variant: "destructive"
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <>
      <Helmet>
        <title>Signaler un Incident - CFDT</title>
        <meta name="description" content="Signalez un incident ou accident de transport au CFDT. Votre témoignage contribue à améliorer la sécurité des transports." />
      </Helmet>

      <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <section className="bg-gradient-to-r from-[#000091] to-[#000091]/90 py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              <AlertTriangle size={64} className="mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Signaler un Incident
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Votre signalement contribue à améliorer la sécurité des transports en France
              </p>
            </motion.div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Formulaire de signalement
                  </h2>
                  <p className="text-gray-600">
                    Remplissez le formulaire ci-dessous avec le maximum de détails. Toutes les informations sont 
                    traitées de manière confidentielle et contribuent à nos enquêtes techniques.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Type d'incident */}
                  <div>
                    <label htmlFor="type_incident" className="block text-sm font-semibold text-gray-900 mb-2">
                      Type d'incident *
                    </label>
                    <select
                      id="type_incident"
                      name="type_incident"
                      value={formData.type_incident}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#000091] text-gray-900 ${
                        errors.type_incident ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Sélectionnez un type</option>
                      {incidentTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.type_incident && (
                      <p className="text-red-500 text-sm mt-1">{errors.type_incident}</p>
                    )}
                  </div>

                  {/* Date incident */}
                  <div>
                    <label htmlFor="date_incident" className="block text-sm font-semibold text-gray-900 mb-2">
                      Date de l'incident *
                    </label>
                    <input
                      type="date"
                      id="date_incident"
                      name="date_incident"
                      value={formData.date_incident}
                      onChange={handleChange}
                      max={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#000091] text-gray-900 ${
                        errors.date_incident ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.date_incident && (
                      <p className="text-red-500 text-sm mt-1">{errors.date_incident}</p>
                    )}
                  </div>

                  {/* Lieu */}
                  <div>
                    <label htmlFor="lieu" className="block text-sm font-semibold text-gray-900 mb-2">
                      Lieu de l'incident *
                    </label>
                    <input
                      type="text"
                      id="lieu"
                      name="lieu"
                      value={formData.lieu}
                      onChange={handleChange}
                      placeholder="Ville, département, ou localisation précise"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#000091] text-gray-900 placeholder-gray-500 ${
                        errors.lieu ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.lieu && (
                      <p className="text-red-500 text-sm mt-1">{errors.lieu}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
                      Description détaillée de l'incident * (minimum 50 caractères)
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Décrivez l'incident avec le maximum de détails : circonstances, conditions météo, personnes impliquées, dommages matériels, etc."
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#000091] text-gray-900 placeholder-gray-500 resize-none ${
                        errors.description ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <div className="flex justify-between items-center mt-1">
                      {errors.description ? (
                        <p className="text-red-500 text-sm">{errors.description}</p>
                      ) : (
                        <p className="text-gray-500 text-sm">
                          {formData.description.length} caractères
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Coordonnées */}
                  <div className="border-t-2 border-gray-200 pt-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Vos coordonnées
                    </h3>
                    <p className="text-gray-600 mb-6 text-sm">
                      Ces informations nous permettront de vous recontacter si nécessaire
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="contact_name" className="block text-sm font-semibold text-gray-900 mb-2">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          id="contact_name"
                          name="contact_name"
                          value={formData.contact_name}
                          onChange={handleChange}
                          placeholder="Prénom et nom"
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#000091] text-gray-900 placeholder-gray-500 ${
                            errors.contact_name ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.contact_name && (
                          <p className="text-red-500 text-sm mt-1">{errors.contact_name}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="votre.email@exemple.fr"
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#000091] text-gray-900 placeholder-gray-500 ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                          Téléphone *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="06 12 34 56 78"
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#000091] text-gray-900 placeholder-gray-500 ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-[#000091] hover:bg-[#E1000F] text-white py-4 text-lg font-semibold transition-colors"
                    >
                      <Send size={20} className="mr-2" />
                      Envoyer le signalement
                    </Button>
                  </div>

                  <p className="text-sm text-gray-500 text-center">
                    * Champs obligatoires. Vos données sont traitées de manière confidentielle.
                  </p>
                </form>
              </div>

              {/* Information Box */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  ℹ️ Information importante
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Le CFDT enquête uniquement sur les aspects techniques des accidents et incidents. 
                  Nous ne traitons pas les plaintes individuelles ni les demandes d'indemnisation. 
                  Pour ces questions, veuillez contacter les autorités compétentes ou votre assurance.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

export default SignalerIncidentPage;