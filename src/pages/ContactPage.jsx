import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Le sujet est requis';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Le message doit contenir au moins 20 caractères';
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
      const existingMessages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
      const newMessage = {
        ...formData,
        id: Date.now(),
        submitted_at: new Date().toISOString()
      };
      existingMessages.push(newMessage);
      localStorage.setItem('contact_messages', JSON.stringify(existingMessages));

      toast({
        title: "✅ Message envoyé avec succès",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setErrors({});
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi. Veuillez réessayer.",
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
        <title>Contact - CFDT</title>
        <meta name="description" content="Contactez le CFDT pour toute question concernant nos enquêtes, rapports ou missions. Coordonnées et formulaire de contact." />
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Contactez-nous
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Notre équipe est à votre disposition pour répondre à vos questions
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Informations de contact
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-[#000091] rounded-lg p-3 flex-shrink-0">
                        <MapPin size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Adresse</h3>
                        <p className="text-gray-600">
                          81 Av. de Grande Bretagne<br />
                          31300 Toulouse, France
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-[#000091] rounded-lg p-3 flex-shrink-0">
                        <Phone size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Téléphone</h3>
                        <p className="text-gray-600">+33 1 23 45 67 89</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Ligne directe (urgences 24/7)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-[#000091] rounded-lg p-3 flex-shrink-0">
                        <Mail size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                        <p className="text-gray-600">contact@cfdt.gouv.fr</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Réponse sous 48h ouvrées
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-[#000091] rounded-lg p-3 flex-shrink-0">
                        <Clock size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Horaires</h3>
                        <p className="text-gray-600">
                          Lundi - Vendredi : 9h00 - 18h00<br />
                          Samedi - Dimanche : Fermé
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Service d'urgence disponible 24/7
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="h-[300px] bg-gray-200 relative">
                    <img
                      src="https://images.unsplash.com/photo-1524661135-423995f22d0b"
                      alt="Carte de localisation CFDT Paris"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#000091]/20 flex items-center justify-center">
                      <div className="bg-white rounded-lg p-4 shadow-xl">
                        <MapPin size={32} className="text-[#000091]" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Localisation
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Nos bureaux sont situés au cœur de Paris, facilement accessibles 
                      par les transports en commun (Métro ligne 1, 7, 14).
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Envoyez-nous un message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#000091] text-gray-900 placeholder-gray-500 ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
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
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                        Sujet *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Objet de votre message"
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#000091] text-gray-900 placeholder-gray-500 ${
                          errors.subject ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.subject && (
                        <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                        Message * (minimum 20 caractères)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        placeholder="Décrivez votre demande..."
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#000091] text-gray-900 placeholder-gray-500 resize-none ${
                          errors.message ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.message ? (
                        <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                      ) : (
                        <p className="text-gray-500 text-sm mt-1">
                          {formData.message.length} caractères
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#000091] hover:bg-[#E1000F] text-white py-4 text-lg font-semibold transition-colors"
                    >
                      <Send size={20} className="mr-2" />
                      Envoyer le message
                    </Button>

                    <p className="text-sm text-gray-500 text-center">
                      * Champs obligatoires
                    </p>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default ContactPage;