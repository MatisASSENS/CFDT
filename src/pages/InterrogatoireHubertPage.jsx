import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function InterrogatoireHubertPage() {
  const baseUrl = import.meta.env.BASE_URL || '/';
  const withBase = (path) => {
    const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
    return `${normalizedBase}${normalizedPath}`;
  };

  const sourceDocHref = withBase('documents/Interrogatoire%20Hubert.docx');
  const photoHref = withBase('documents/hubert.jpeg');

  const transcript = `Interrogatoire - Incident Aérien du 26 Octobre 2025

Contexte Général

Un crash d'avion s'est produit le 26 octobre 2025. Les investigations ont révélé
que les tâches de contrôle et de maintenance n'ont pas été effectuées depuis le départ de Monsieur Monfreda de l'aéroclub. Les autorités cherchent à clarifier les circonstances de ce départ et les informations pertinentes concernant cet événement.


Déroulement de l'Interrogatoire

Objet de l'Enquête

Les enquêteurs cherchent à identifier les liens entre Monsieur Monfreda et le témoin interrogé, et à obtenir toute information susceptible d'éclaircir les raisons de son départ de l'aéroclub ainsi que les défaillances de maintenance qui ont suivi.

Transcription Complète de l'Interrogatoire

Heure de début : 00:00:00
Participants : Speaker 1 (Enquêteur principal), Speaker 2 (Enquêteur), Speaker 3 (Témoin)


Speaker 1 [00:00:00] En fait, il y a un crash d'avion.

Speaker 1 [00:00:02] Ouais, et du coup, ce qu'on a trouvé, c'est que depuis en fait les sur l'avion... Les tâches effectuées de contrôle n'ont pas été effectuées depuis le départ de Monsieur Monfreda. Et du coup, on aurait voulu l'interroger.

Speaker 2 [00:00:18] Il a quitté l'aéroclub il y a quelques années. On voulait savoir s'il vous en a peut être parlé à un moment.

Speaker 1 [00:00:24] Est-ce que vous avez été lié à Monsieur Monfreda ? Est-ce que vous avez eu des informations?

Speaker 3 [00:00:28] C'est depuis qu'il a quitté le club, c'est ça ?

Speaker 2 [00:00:28] Oui.

Speaker 3 [00:00:29] C'était quand?

Speaker 2 [00:00:31] Oui, justement. C'est une information qu'on aimerait bien essayer de récupérer. On ne sait pas. On ne sait pas quand est-ce qu'il est parti.

Speaker 1 [00:00:37] Mais le crash a eu lieu le 26 octobre 2025.

Speaker 3 [00:00:42] Ok, c'est récent, c'est juste après le 26 octobre.

Speaker 2 [00:00:46] Donc il est parti avant ce crash.

Speaker 1 [00:00:48] Oui.

Speaker 2 [00:00:49] On ne sait pas quand.

Speaker 1 [00:00:50] Et du coup les maintenances n'ont pas été faites sur l'avion.

Speaker 2 [00:00:52] Oui, on voulait savoir s'il vous a déjà parlé de cet aéroclub, de son aéroclub d'agent.

Speaker 3 [00:00:55] Oui, d'agent.

Speaker 3 [00:00:59] C'est bizarre parce qu'il m'en a beaucoup parlé avant, mais depuis effectivement le mois d'octobre, il n'en parle pas trop. Ouais, OK, ça m'a un peu surpris. Je n'ai pas posé de questions, mais ouais, depuis cette période là, je trouve qu'il m'en parle pas trop. Donc ça pourrait peut être expliquer des choses.

Speaker 2 [00:01:14] Il y a ce qu'il y a des choses, sans rentrer dans les détails, quand il vous parlait de l'aéroclub qui notamment sur la gestion, le contrôle des avions et tout ça qui qu'il aurait fait. La raison pour laquelle il aurait quitté cet aéroclub, est-ce que vous la connaissez ou pas?

Speaker 3 [00:01:32] Non, il n'en a pas spécialement parlé.

Speaker 2 [00:01:34] Mais il s'est jamais plaint de l'aéroclub.

Speaker 3 [00:01:37] Si il se plaignait des gens, alors je sais pas trop de qui il parlait, il se plaignait des gens qui le saoulait tout ça. Mais comme je disais depuis ouais alors je sais pas exactement quand, mais depuis peut-être 2 mois en fait il en parle plus du tout.

Speaker 2 [00:01:47] Ok, il vous a jamais parlé du crash?

Speaker 3 [00:01:50] Non je crois pas.

Speaker 2 [00:01:51] Okokok, ben merci beaucoup, de rien, passez une bonne soirée.


Analyse des Réponses Clés

1. Connaissance de Monsieur Monfreda

Question : Est-ce que vous avez été lié à Monsieur Monfreda ? Est-ce que vous avez eu des informations sur lui ?
Réponse : Le témoin reconnaît une connaissance antérieure avec Monsieur Monfreda.


2. Départ de l'Aéroclub

Question : Quand exactement Monsieur Monfreda a-t-il quitté l'aéroclub ?
Réponse : Date inconnue. Le témoin confirme qu'il est parti avant le 26 octobre 2025 (date du crash), mais la date précise de son départ n'a pas pu être établie lors de cet interrogatoire.


3. Communications Récentes

Question : Monsieur Monfreda vous a-t-il parlé de l'aéroclub, notamment de la gestion et du contrôle des avions ?
Réponse : Oui, le témoin déclare que Monsieur Monfreda parlait beaucoup de l'aéroclub avant, mais depuis octobre (approximativement 2 mois avant cet interrogatoire), il n'en parle pratiquement plus.


4. Raisons du Départ

Question : Connaissez-vous les raisons pour lesquelles Monsieur Monfreda aurait quitté cet aéroclub ?
Réponse : Le témoin ne connaît pas les raisons précises. Monsieur Monfreda n'en a pas parlé explicitement.


5. Plaintes et Mécontentement

Question : S'est-il jamais plaint de l'aéroclub ou des personnes qui y travaillaient ?
Réponse : Le témoin rapporte que Monsieur Monfreda se plaignait de certaines personnes qui le dérangeaient, sans détails.


6. Connaissance du Crash

Question : Monsieur Monfreda vous a-t-il parlé du crash du 26 octobre 2025 ?
Réponse : Non.


Conclusion

Cet interrogatoire n'a pas permis de clarifier les raisons précises du départ de Monsieur Monfreda ni les causes directes du crash. Cependant, il révèle un changement comportemental significatif du témoin concernant le sujet de l'aéroclub, temporellement lié au crash. Une enquête complémentaire auprès de Monsieur Monfreda est recommandée.`;

  return (
    <>
      <Helmet>
        <title>Interrogatoire Hubert - CFDT</title>
        <meta name="description" content="Interrogatoire complet (fictif) - Incident aérien du 26 octobre 2025." />
      </Helmet>

      <div className="pt-24 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Interrogatoire Hubert</h1>
            <div className="flex gap-2">
              <a href={sourceDocHref} target="_blank" rel="noreferrer">
                <Button className="bg-[#000091] hover:bg-[#000091]/90 text-white">Ouvrir le DOCX</Button>
              </a>
              <Link to="/">
                <Button variant="outline">Retour au rapport</Button>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 flex-shrink-0">
                <img src={photoHref} alt="Photo Hubert" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="text-gray-600">
                <div className="font-semibold text-gray-900">Photo - personne interrogée</div>
                <div className="text-sm">Fichier: hubert.jpeg</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="text-sm text-gray-500 mb-4">Affichage intégral (texte). Source: Interrogatoire Hubert.docx</div>
            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
              {transcript}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InterrogatoireHubertPage;
