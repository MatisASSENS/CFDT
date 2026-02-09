import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, AlertTriangle, Calendar, Users, Wrench, Thermometer, Clock, Target, Book, Download, AlertCircle, ChevronDown, ChevronUp, Zap, Droplet, Activity, Camera, Map, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

// Import sub-components (these will be defined in the same file to keep it self-contained or separate files as requested)
import InteractiveMap from '@/components/InteractiveMap';
import AccidentTimeline from '@/components/AccidentTimeline';
import ContributoryFactorsDiagram from '@/components/ContributoryFactorsDiagram';
import TechnicalDataTable from '@/components/TechnicalDataTable';
import SystemsAnalysisAccordion from '@/components/SystemsAnalysisAccordion';
import PhotoGallery from '@/components/PhotoGallery';
import SectionNavigation from '@/components/SectionNavigation';
function NynjaReportPage() {
  const {
    toast
  } = useToast();
  const [activeSection, setActiveSection] = useState('summary');
  const handleDownload = () => {
    toast({
      title: "Téléchargement initié",
      description: "Le rapport complet (PDF) est en cours de génération..."
    });
  };
  const sections = [{
    id: 'summary',
    label: 'Résumé',
    icon: FileText
  }, {
    id: 'timeline',
    label: 'Chronologie',
    icon: Clock
  }, {
    id: 'map',
    label: 'Cartographie',
    icon: Map
  }, {
    id: 'technical',
    label: 'Données Techniques',
    icon: Activity
  }, {
    id: 'systems',
    label: 'Analyse Systèmes',
    icon: Wrench
  }, {
    id: 'interviews',
    label: 'Interrogatoires',
    icon: Users
  }, {
    id: 'factors',
    label: 'Facteurs',
    icon: BarChart
  }, {
    id: 'media',
    label: 'Médias',
    icon: Camera
  }, {
    id: 'documents',
    label: 'Documents',
    icon: Book
  }];

  const victims = [
    {
      name: 'Jean Dupotager',
      performedAt: "Réalisée le 27 octobre 2025 par Timothée Chalumeau, CHU d'Agen",
      timeOfDeath: '16h00 approx.',
      age: '30 ans',
      findings: [
        "Choc important. Rupture de la boite crânienne.",
        'Ruptures des cervicales.',
        'Perforation des organes.',
      ],
      toxicology: [
        'Analyse de sang : Pas de trace de stupéfiants. Pas de trace d’alcool.',
        'Analyse gastrique : Normale.',
        'Taux de glycémie : Normal.',
      ],
      conclusion: 'Décès causé par le choc subi lors de l’accident.',
    },
    {
      name: 'Alexandre Lamitié',
      performedAt: "Réalisée le 27 octobre 2025 par Timothée Chalumeau, CHU d'Agen",
      timeOfDeath: '16h00 approx.',
      age: '28 ans',
      findings: [
        "Choc important. Rupture de la boite crânienne.",
        'Ruptures des cervicales.',
        'Perforation des organes.',
      ],
      toxicology: [
        'Analyse de sang : Pas de trace de stupéfiants. Pas de trace d’alcool.',
        'Analyse gastrique : Normale.',
        'Taux de glycémie : Normal.',
      ],
      conclusion: 'Décès causé par le choc subi lors de l’accident.',
    },
  ];

  const maintenanceNotes = [
    "Tâches de maintenance non effectuées depuis le départ de F. MONFREDA.",
    "Problème connu d’anguille (crépine d’aspiration) / jauge essence défectueuse.",
  ];

  const interrogationDocs = {
    hubert: {
      label: 'Interrogatoire Hubert (DOCX)',
      href: '/documents/Interrogatoire%20Hubert.docx',
    },
    monfreda: {
      label: 'Interrogatoire Monfreda (DOCX)',
      href: '/documents/Interrogatoire%20Monfreda.docx',
    },
  };

  const interviewsReport = [
    {
      title: 'Interrogatoire Hubert',
      doc: interrogationDocs.hubert,
      keyPoints: [
        "Le témoin indique que M. Monfreda parlait beaucoup de l’aéroclub auparavant, mais plus depuis octobre.",
        "La date exacte du départ de M. Monfreda n’est pas connue du témoin; seulement que c’était avant le crash.",
        "Le témoin évoque des plaintes générales sur des personnes, sans détails.",
        "Le témoin ne rapporte pas de discussion directe sur le crash.",
      ],
    },
    {
      title: 'Interrogatoire Monfreda',
      doc: interrogationDocs.monfreda,
      keyPoints: [
        "M. Monfreda affirme avoir quitté l’aéroclub il y a ~4 mois (avant le crash d’octobre 2025).",
        "Il décrit des tensions et un problème de manque de formation chez la personne ayant repris la direction.",
        "Il indique que cette personne a repris son poste et la responsabilité d’entretien des aéronefs.",
        "Le nom « Monsieur Piola » est mentionné comme successeur (selon le document).",
      ],
    },
  ];

  const reportDocuments = [
    { label: '190-03103-00_b.pdf', href: '/documents/190-03103-00_b.pdf' },
    { label: '4X-ONA_02-05-2015.jpg', href: '/documents/4X-ONA_02-05-2015.jpg' },
    { label: 'Données_BE2.pdf', href: '/documents/Donn%C3%A9es_BE2.pdf' },
    { label: 'FlavienMonfreda (1).mp3', href: '/documents/FlavienMonfreda%20(1).mp3' },
    { label: 'FlavienMonfreda.mp3', href: '/documents/FlavienMonfreda.mp3' },
    { label: 'Interrogatoire Hubert.docx', href: interrogationDocs.hubert.href },
    { label: 'Interrogatoire Monfreda.docx', href: interrogationDocs.monfreda.href },
    { label: 'La Dépêche de Quatorze Heures.pdf', href: '/documents/La%20D%C3%A9p%C3%AAche%20de%20Quatorze%20Heures.pdf' },
    { label: 'LFBA.pdf', href: '/documents/LFBA.pdf' },
    { label: 'miac1_agen_lfba (1).pdf', href: '/documents/miac1_agen_lfba%20(1).pdf' },
    { label: 'miac1_agen_lfba (2).pdf', href: '/documents/miac1_agen_lfba%20(2).pdf' },
    { label: 'Rapport scéance 1.docx', href: '/documents/Rapport%20sc%C3%A9ance%201.docx' },
    { label: 'image.png', href: '/documents/image.png' },
    { label: 'imazdge.png', href: '/documents/imazdge.png' },
    { label: 'imefefeage.png', href: '/documents/imefefeage.png' },
    { label: 'imefefeage2.png', href: '/documents/imefefeage2.png' },
  ];
  const fadeIn = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: 0.6
    }
  };
  return <>
      <Helmet>
        <title>Rapport d'Enquête Nynja F-CDST - CFDT</title>
        <meta name="description" content="Rapport d'enquête technique détaillé concernant l'accident de l'ULM Nynja 912 immatriculé F-CDST." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 font-sans pb-20">
        
        {/* Hero Section */}
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-[#003366]">
          <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay" style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1590196771037-c355ce575028)'
        }}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#000091]/90 via-[#000091]/70 to-[#000091]"></div>
          
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <motion.div initial={{
            opacity: 0,
            y: -30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }} className="mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-red-600/20 border border-red-500 rounded-full text-red-300 font-bold tracking-wider uppercase text-sm mb-6 backdrop-blur-sm">
                <AlertTriangle size={16} className="mr-2" />
                Rapport Préliminaire
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
                Rapport d'Enquête<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                  Nynja F-CDST
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-light">
                Analyse technique de l'accident survenu le 21 Janvier 2026 à Agen (LFBA)
              </p>
            </motion.div>

            <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.5,
            duration: 0.8
          }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Button onClick={handleDownload} size="lg" className="bg-[#E1000F] hover:bg-[#b3000c] text-white px-8 py-6 rounded-full text-lg shadow-lg hover:shadow-red-900/50 transition-all">
                <Download size={20} className="mr-2" />
                Télécharger le PDF
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-8 py-6 rounded-full text-lg backdrop-blur-sm" onClick={() => document.getElementById('summary').scrollIntoView({
              behavior: 'smooth'
            })}>
                Lire le rapport en ligne
                <ChevronDown size={20} className="ml-2" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Navigation Sticky Bar */}
        <div className="sticky top-[60px] z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm overflow-x-auto">
          <SectionNavigation sections={sections} activeSection={activeSection} setActiveSection={setActiveSection} />
        </div>

        <div className="container mx-auto px-4 py-12 max-w-6xl space-y-24">

          {/* SECTION: EXECUTIVE SUMMARY */}
          <section id="summary" className="scroll-mt-32">
            <motion.div {...fadeIn} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-[#000091] p-6 text-white flex justify-between items-center">
                <h2 className="text-2xl font-bold flex items-center">
                  <FileText className="mr-3" /> Résumé Exécutif
                </h2>
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Section A</span>
              </div>
              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Contexte</h3>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        Le 21 janvier 2026, l'ULM Nynja 912 immatriculé F-CDST a subi un arrêt moteur complet en phase de montée initiale au départ de l'aérodrome d'Agen (LFBA). L'appareil a décroché à basse altitude avant d'impacter le sol.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Bilan</h3>
                      <div className="flex items-center bg-red-50 text-red-700 px-4 py-3 rounded-xl border border-red-100 font-bold">
                        <Users className="mr-3" /> 2 Décès constatés (Pilote + Passager)
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <h3 className="text-[#000091] font-bold mb-4 flex items-center">
                      <Target className="mr-2" size={20} /> Conclusions Préliminaires
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start text-gray-700">
                        <span className="bg-[#E1000F] w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Défaillance du système d'alimentation carburant (obstruction).
                      </li>
                      <li className="flex items-start text-gray-700">
                        <span className="bg-[#E1000F] w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Maintenance critique non effectuée par le précédent propriétaire.
                      </li>
                      <li className="flex items-start text-gray-700">
                        <span className="bg-[#E1000F] w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Conditions météorologiques (rafales) aggravantes.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-12 grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-[#000091] font-bold mb-4 flex items-center">
                      <Book className="mr-2" size={20} /> Constatations médico-légales (fictif)
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {victims.map((victim) => (
                        <div key={victim.name} className="bg-gray-50 rounded-xl border border-gray-100 p-5">
                          <div className="font-bold text-gray-900 text-lg">{victim.name}</div>
                          <div className="text-sm text-gray-600 mt-1">{victim.performedAt}</div>
                          <div className="mt-3 text-sm text-gray-700">
                            <div><span className="font-semibold">Heure du décès :</span> {victim.timeOfDeath}</div>
                            <div><span className="font-semibold">Âge :</span> {victim.age}</div>
                          </div>
                          <div className="mt-3">
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Chocs corporels</div>
                            <ul className="text-sm text-gray-700 list-disc ml-5 space-y-1">
                              {victim.findings.map((line, idx) => (
                                <li key={idx}>{line}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="mt-3">
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Analyses</div>
                            <ul className="text-sm text-gray-700 list-disc ml-5 space-y-1">
                              {victim.toxicology.map((line, idx) => (
                                <li key={idx}>{line}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="mt-3 text-sm text-gray-800 font-semibold">
                            Conclusion : <span className="font-normal">{victim.conclusion}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-[#000091] font-bold mb-4 flex items-center">
                      <Wrench className="mr-2" size={20} /> Maintenance (notes)
                    </h3>
                    <ul className="text-sm text-gray-700 list-disc ml-5 space-y-2">
                      {maintenanceNotes.map((note, idx) => (
                        <li key={idx}>{note}</li>
                      ))}
                    </ul>
                    <div className="mt-6 text-xs text-gray-500 italic">
                      Ces éléments alimentent l’analyse mais ne constituent pas une attribution de responsabilités.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* SECTION: TIMELINE */}
          <section id="timeline" className="scroll-mt-32">
            <div className="mb-8 pl-4 border-l-4 border-[#E1000F]">
              <h2 className="text-3xl font-bold text-gray-900">Chronologie de l'événement</h2>
              <p className="text-gray-500 mt-1">Reconstitution basée sur les témoignages et données radar</p>
            </div>
            <AccidentTimeline />
          </section>

          {/* SECTION: MAP */}
          <section id="map" className="scroll-mt-32">
            <div className="mb-8 pl-4 border-l-4 border-[#000091]">
              <h2 className="text-3xl font-bold text-gray-900">Cartographie & Trajectoire</h2>
              <p className="text-gray-500 mt-1">Zone de l'accident - Agen (LFBA)</p>
            </div>
            <InteractiveMap />
          </section>

          {/* SECTION: TECHNICAL DATA */}
          <section id="technical" className="scroll-mt-32">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-[#003366] text-white rounded-2xl p-8 shadow-xl h-full flex flex-col justify-center">
                  <Activity size={48} className="mb-6 opacity-80" />
                  <h2 className="text-3xl font-bold mb-4">Données Techniques</h2>
                  <p className="text-white/80 mb-6">
                    Spécifications détaillées de l'appareil Nynja 912 et état de navigabilité au moment de l'incident.
                  </p>
                  <div className="mt-auto pt-6 border-t border-white/20">
                    <div className="text-sm opacity-60 uppercase tracking-widest mb-1">Modèle</div>
                    <div className="text-2xl font-bold">Best Off Nynja</div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <TechnicalDataTable />
              </div>
            </div>
          </section>

          {/* SECTION: SYSTEMS ANALYSIS */}
          <section id="systems" className="scroll-mt-32">
            <div className="mb-8 pl-4 border-l-4 border-[#E1000F]">
              <h2 className="text-3xl font-bold text-gray-900">Analyse des Systèmes</h2>
              <p className="text-gray-500 mt-1">Investigation technique détaillée par composant</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="order-2 lg:order-1">
                <SystemsAnalysisAccordion />
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                 <div className="bg-white rounded-2xl shadow-lg p-2 border border-gray-100">
                    <img src="https://horizons-cdn.hostinger.com/1dae807e-b36f-455e-ac88-c8703f6958e3/20-D4mkl.jpg" alt="Schéma système carburant" className="w-full h-auto rounded-xl object-cover" />
                    <div className="p-3 text-center text-sm text-gray-500 italic">
                      Fig 1. Schéma de principe du circuit carburant Rotax 912
                    </div>
                 </div>
                 <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                   <h4 className="text-red-800 font-bold mb-2 flex items-center">
                     <AlertCircle size={18} className="mr-2" /> Point Critique
                   </h4>
                   <p className="text-red-700 text-sm">
                     L'analyse a révélé une obstruction quasi-totale de la crépine d'aspiration (anguille) du réservoir principal, compatible avec l'arrêt moteur constaté.
                   </p>
                 </div>
              </div>
            </div>
          </section>

          {/* SECTION: INTERROGATIONS */}
          <section id="interviews" className="scroll-mt-32">
            <div className="mb-8 pl-4 border-l-4 border-[#000091]">
              <h2 className="text-3xl font-bold text-gray-900">Rapport - Interrogatoires</h2>
              <p className="text-gray-500 mt-1">Synthèse basée sur les deux documents d’interrogatoire (fictif)</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {interviewsReport.map((interview) => (
                <div key={interview.title} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{interview.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">Document source: {interview.doc.label}</p>
                    </div>
                    <a
                      className="inline-flex"
                      href={interview.doc.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button className="bg-[#000091] hover:bg-[#000091]/90 text-white">
                        <Download size={18} className="mr-2" /> Ouvrir
                      </Button>
                    </a>
                  </div>

                  <div className="mt-5">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Points clés</div>
                    <ul className="text-sm text-gray-700 list-disc ml-5 space-y-2">
                      {interview.keyPoints.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION: CONTRIBUTORY FACTORS */}
          <section id="factors" className="scroll-mt-32">
             <div className="bg-gray-900 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative">
               <div className="absolute top-0 right-0 p-32 bg-blue-500 rounded-full filter blur-[100px] opacity-20"></div>
               <div className="relative z-10">
                 <div className="mb-12 text-center">
                   <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Facteurs Contributifs</h2>
                   <p className="text-gray-400 max-w-2xl mx-auto">
                     Représentation visuelle de la chaîne d'événements ayant mené à l'accident (Modèle de Reason).
                   </p>
                 </div>
                 <ContributoryFactorsDiagram />
               </div>
             </div>
          </section>

          {/* SECTION: MEDIA GALLERY */}
          <section id="media" className="scroll-mt-32">
            <div className="mb-8 pl-4 border-l-4 border-[#000091]">
              <h2 className="text-3xl font-bold text-gray-900">Galerie d'Investigation</h2>
              <p className="text-gray-500 mt-1">Clichés techniques et environnementaux</p>
            </div>
            <PhotoGallery />
          </section>

          {/* SECTION: DOCUMENTS */}
          <section id="documents" className="scroll-mt-32">
            <div className="mb-8 pl-4 border-l-4 border-[#E1000F]">
              <h2 className="text-3xl font-bold text-gray-900">Documents</h2>
              <p className="text-gray-500 mt-1">Dossier statique: <span className="font-mono">public/documents</span></p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <ul className="space-y-3">
                {reportDocuments.map((doc) => (
                  <li key={doc.href}>
                    <a className="text-[#000091] hover:underline" href={doc.href} target="_blank" rel="noreferrer">
                      {doc.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>

        </div>
      </div>
    </>;
}
export default NynjaReportPage;