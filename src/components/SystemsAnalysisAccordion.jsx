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
              <span className="font-bold text-gray-900 block">Circuit Carburant</span>
              <span className="text-sm text-[#E1000F] font-medium">Défaillance Critique Identifiée</span>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 pb-4 pl-[3.5rem]">
          L'examen de l'épave a révélé une obstruction majeure de la crépine d'aspiration (anguille) dans le réservoir principal. Des dépôts solides et gélatineux ont réduit le débit de carburant de 90%. Les durites présentaient également des signes de vieillissement avancé (craquelures).
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
              <span className="text-sm text-green-600">Fonctionnement nominal avant panne</span>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 pb-4 pl-[3.5rem]">
          Le moteur Rotax 912 n'a montré aucune trace de serrage ou de rupture mécanique interne. Les bougies présentaient un aspect normal. L'analyse de l'huile n'a révélé aucune limaille anormale. L'arrêt est confirmé comme étant d'origine externe (alimentation).
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="elec" className="border rounded-xl px-4 shadow-sm bg-white hover:bg-gray-50 transition-colors">
        <AccordionTrigger className="hover:no-underline py-4">
          <div className="flex items-center text-left">
            <div className="bg-yellow-100 p-2 rounded-lg mr-4 text-yellow-600">
              <Zap size={20} />
            </div>
            <div>
              <span className="font-bold text-gray-900 block">Circuit Électrique</span>
              <span className="text-sm text-gray-500">Pas d'anomalie</span>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 pb-4 pl-[3.5rem]">
          Les boîtiers d'allumage électronique (CDI) ont été testés et fonctionnaient correctement. Le faisceau électrique était intègre avant l'impact. La batterie était chargée.
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
              <span className="text-sm text-gray-500">Continuité établie</span>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 pb-4 pl-[3.5rem]">
          La continuité des câbles de commande a été vérifiée pour les trois axes (profondeur, ailerons, direction). Aucune rupture antérieure à l'impact n'a été décelée.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default SystemsAnalysisAccordion;