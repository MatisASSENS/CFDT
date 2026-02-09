import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function InterrogatoireMonfredaPage() {
  const baseUrl = import.meta.env.BASE_URL || '/';
  const withBase = (path) => {
    const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
    return `${normalizedBase}${normalizedPath}`;
  };

  const sourceDocHref = withBase('documents/Interrogatoire%20Monfreda.docx');
  const photoHref = withBase('documents/Monfredat.jpeg');

  const transcript = `Interrogatoire - Flavien Monfreda - Aéroclub d'Agen

Contexte Général

Un crash d'avion s'est produit en octobre 2025. Les investigations ont révélé que les tâches de contrôle et de maintenance n'ont pas été effectuées suite au départ de Monsieur Monfreda de l'aéroclub d'Agen. Cet interrogatoire vise à clarifier les raisons de son départ et les responsabilités concernant la maintenance de l'aéronef.


Déroulement de l'Interrogatoire

Objet de l'Enquête

Les enquêteurs interrogent Monsieur Monfreda directement sur les circonstances de son départ de l'aéroclub d'Agen et les tensions éventuelles qui auraient pu motiver son départ, sachant que celui-ci a directement conduit à l'arrêt de la maintenance des avions.

Transcription Complète de l'Interrogatoire

Heure de début : 00:00:00
Participants : Speaker 1 (Enquêteur), Speaker 2 (Monsieur Monfreda - Interrogé)


Speaker 1 [00:00:00] Alors, on a eu des informations comme quoi il y a, on sait pas encore il y a combien de temps, mais vous avez quitté votre aéroclub, aéroclub d'Agen.

Speaker 2 [00:00:10] Voilà, mon aéroclub d'Agen, bien sûr, tout à fait.

Speaker 1 [00:00:13] OK, et est-ce que vous avez pouvez nous donner une date par hasard, enfin autour?

Speaker 2 [00:00:19] À laquelle je vais quitter mon aéroclub ? Oui, je l'ai quitté il y a 4 mois.

Speaker 1 [00:00:24] Il y a 4 mois. Ok, parce qu'apparemment il y a eu un crash en octobre et il y a eu notamment des complications, des complications au fait que vous soyez parti puisque la maintenance sur l'avion n'était plus faite. Est-ce que vous aviez des tensions avec certaines personnes là-bas dans l'aéroclub?

Speaker 2 [00:00:47] Absolument.

Speaker 1 [00:00:48] OK, il faut que je dise lesquels alors si possible. Ouais, ça serait cool.

Speaker 2 [00:00:57] C'est un peu compliqué déjà, mais en fait le problème vient d'un manque de formation. C'est à dire une personne qui est arrivée pour diriger l'aéroclub et qui était mal formée et donc c'est ça qui m'a fait partir, cette personne qui prenait les mauvaises décisions.

Speaker 1 [00:01:15] Et est-ce que c'est cette personne qui a repris votre poste et donc l'entretien des avions?

Speaker 2 [00:01:20] Absolument.

Speaker 1 [00:01:21] Ok, vous avez pas de nom.

Speaker 2 [00:01:24] Non, OK, d'accord, c'est pas grave, mais merci beaucoup.

Speaker 1 [00:01:32] C'est Monsieur Piola, Monsieur Piola.


Analyse des Réponses Clés

1. Date de Départ de l'Aéroclub

Question : Pouvez-vous nous donner une date de départ de l'aéroclub d'Agen ?
Réponse : Monsieur Monfreda confirme qu'il a quitté l'aéroclub il y a 4 mois.


2. Présence de Tensions

Question : Aviez-vous des tensions avec certaines personnes à l'aéroclub ?
Réponse : Oui.


3. Identification des Conflits

Réponse : Monsieur Monfreda décrit un manque de formation chez une personne arrivée pour diriger l'aéroclub, prenant de mauvaises décisions.


4. Succession au Poste

Réponse : Il confirme que cette personne a repris son poste et la responsabilité de l'entretien des avions.


5. Identification de la Personne

Réponse : Le nom « Monsieur Piola » est mentionné.


Conclusion

Cet interrogatoire établit un lien entre le départ de Monsieur Monfreda et l'arrêt de la maintenance des aéronefs. Une investigation complémentaire sur les décisions spécifiques et la compétence de la personne mentionnée est recommandée.`;

  return (
    <>
      <Helmet>
        <title>Interrogatoire Flavien Monfreda - CFDT</title>
        <meta name="description" content="Interrogatoire complet (fictif) - Flavien Monfreda, Aéroclub d'Agen." />
      </Helmet>

      <div className="pt-24 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Interrogatoire Flavien Monfreda</h1>
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
                <img src={photoHref} alt="Photo Flavien Monfreda" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="text-gray-600">
                <div className="font-semibold text-gray-900">Photo - personne interrogée</div>
                <div className="text-sm">Fichier: Monfredat.jpeg</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="text-sm text-gray-500 mb-4">Affichage intégral (texte). Source: Interrogatoire Monfreda.docx</div>
            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
              {transcript}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InterrogatoireMonfredaPage;
