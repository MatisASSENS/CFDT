import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Droplet, Zap, Gauge, Fan } from 'lucide-react';

function SystemsAnalysisAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      <AccordionItem value="fuel" className="border rounded-xl px-4 shadow-sm bg-white data-[state=open]:border-[#E1000F] transition-colors">
        <AccordionTrigger className="hover:no-underline py-4">
          <div className="flex items-center text-left">
            <div className="bg-red-100 p-2 rounded-lg mr-4 text-[#E1000F]">
              <Droplet size={20} />
            </div>
            <div>
              <span className="font-bold text-gray-900 block">Instrumentation / Carburant</span>
              <span className="text-sm text-[#E1000F] font-medium">Anomalie observée sur jauge</span>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 pb-4 pl-[3.5rem]">
          L'examen de l'épave mentionne une anomalie de l'aiguille de jauge carburant. Aucune panne sèche n'est formellement établie, mais une indication erronée a pu augmenter la charge mentale du pilote et perturber la gestion de l'énergie en circuit.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="engine" className="border rounded-xl px-4 shadow-sm bg-white hover:bg-gray-50 transition-colors">
        <AccordionTrigger className="hover:no-underline py-4">
          <div className="flex items-center text-left">
            <div className="bg-blue-100 p-2 rounded-lg mr-4 text-blue-600">
              <Fan size={20} />
            </div>
            <div>
              <span className="font-bold text-gray-900 block">Groupe Motopropulseur</span>
              <span className="text-sm text-green-600">Pas de panne primaire démontrée</span>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 pb-4 pl-[3.5rem]">
          Les éléments disponibles ne permettent pas de retenir une défaillance moteur primaire comme cause directe. Une perte partielle de puissance reste évoquée dans les hypothèses, sans preuve technique formelle avant impact.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="elec" className="border rounded-xl px-4 shadow-sm bg-white hover:bg-gray-50 transition-colors">
        <AccordionTrigger className="hover:no-underline py-4">
          <div className="flex items-center text-left">
            <div className="bg-yellow-100 p-2 rounded-lg mr-4 text-yellow-600">
              <Zap size={20} />
            </div>
            <div>
              <span className="font-bold text-gray-900 block">Masse et centrage</span>
              <span className="text-sm text-gray-500">Marge réduite</span>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 pb-4 pl-[3.5rem]">
          La masse estimée au décollage est de 464 kg (284 + 70 + 68 + 42), proche de la limite opérationnelle mentionnée. Cette configuration réduit les performances en virage et augmente la vitesse de décrochage.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="instruments" className="border rounded-xl px-4 shadow-sm bg-white hover:bg-gray-50 transition-colors">
        <AccordionTrigger className="hover:no-underline py-4">
          <div className="flex items-center text-left">
            <div className="bg-gray-100 p-2 rounded-lg mr-4 text-gray-600">
              <Gauge size={20} />
            </div>
            <div>
              <span className="font-bold text-gray-900 block">Commandes de Vol</span>
              <span className="text-sm text-gray-500">Rupture de câble à expertiser</span>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 pb-4 pl-[3.5rem]">
          Un câble de commande sectionné a été identifié sur l'épave. Le caractère antérieur ou post-impact de la rupture n'est pas établi et nécessite une expertise métallurgique complémentaire.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default SystemsAnalysisAccordion;