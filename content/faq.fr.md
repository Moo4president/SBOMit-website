---
author: "SBOMit Maintainers"
title: "FAQ"
translationKey: "faq"
ShowToc: false
---
## Qu'est-ce que «SBOMit » ?

SBOMit C'est le nom du projet qui gère le format de spécification «SBOMit». Un document «SBOMit» correspond en réalité à un «SBOM», auquel ont été ajoutées des informations de vérification générées lors de la création de la chaîne d'approvisionnement. Ces informations de vérification, qui s'appuient sur les sites in-toto, attestations et layouts, peuvent être validées par une tierce partie afin d'obtenir un niveau élevé d'assurance concernant le logiciel.

## Que contient un document « SBOMit » et pourquoi ?

Un document «SBOMit» est un document signé composé de plusieurs éléments distincts.  

Tout d’abord, il contient une série de fichiers «in-toto » (attestations) générés au fur et à mesure de la création du logiciel décrit. Cela comprend des informations détaillées sur les différentes étapes de la chaîne logistique du logiciel, notamment sur le système de contrôle de version, le processus de compilation, les tests unitaires, les dépendances utilisées, le fuzzing, les vérifications de conformité des licences, le packaging, etc.  Par exemple, le système de compilation utilisé pour compiler le logiciel dans l’SBOM contient in-toto metadata les noms et les hachages sécurisés des fichiers extraits du système de contrôle de version (VCS) pour être compilés, les noms et les hachages sécurisés des fichiers créés lors de la compilation, une série d’informations sur le compilateur, ainsi qu’une signature générée par une clé privée détenue par le compilateur.

Ces informations relatives à l’attestation peuvent être utilisées en coordination avec le deuxième élément du document « SBOMit » : un « in-toto » (layout). Le document « in-toto » (layout) est signé par le responsable du projet et décrit à quoi ressemble une « attestation » (metadata) valide pour le projet. Le fichier « layout » spécifie les clés privées des parties intervenant dans l’attestations, ainsi que la manière dont les différentes étapes s’enchaînent.  Par exemple, le système de contrôle de version (VCS) doit disposer d’une balise Git signée, sur laquelle le système de compilation opère ensuite.  Les fichiers compilés par le système de compilation doivent être ceux qui ont été soumis aux tests unitaires, lesquels doivent avoir été réussis.   Il est important de noter qu’un « in-toto » (layout) fournit une politique lisible par machine capable de valider le « in-toto » (attestations) afin de garantir que toutes ces étapes ont été suivies, dans le bon ordre, sur les bons éléments, et sans rien ajouter, sauter ou supprimer.

Le dernier élément qui figure systématiquement dans le document SBOMit est l’information complémentaire SBOM. Ces informations, associées à celles disponibles sur in-toto, attestations et in-toto, layout, peuvent être utilisées pour générer un SBOM complet dans divers formats. L’information complémentaire SBOM peut inclure des éléments tels que le nom de l’entreprise ou d’autres renseignements qui ne figurent pas sur in-toto mais qu’il est souhaitable d’inclure dans le SBOM final.  De cette manière, un document SBOM généré à partir d’un document SBOMit peut inclure des informations supplémentaires qui ne faisaient pas partie du processus de in-toto.

Il existe également un moyen d'ajouter un fichier « addendums » à un document « SBOMit », qui sera décrit plus loin.

## Quels sont les avantages d'un document « SBOMit » par rapport à l'utilisation d'un outil de génération de « SBOM » qui analyse le logiciel ?

De par leur nature même, les outils d'analyse examinent un logiciel pour tenter de déterminer ce qui s'est passé auparavant. Ils sont, par nature, imparfaits, car ils s'appuient sur des informations incomplètes pour tenter de reconstituer ce qui s'est passé dans le passé. L'expérience pratique a montré que différents outils d'analyse peuvent donner des résultats très divergents pour un même logiciel.  

Les sections «in-toto» (attestation) d’un document «SBOMit» sont générées au moment où le logiciel est traité tout au long de la chaîne d’approvisionnement logicielle. Par conséquent, ces informations seront bien plus précises, car in-toto attestations recueillent des informations détaillées au moment même de la fabrication du produit logiciel. Cela rend, par nature, un document «SBOMit» bien plus précis.

## Quels sont les avantages d'un document « SBOMit » par rapport à la simple signature d'un « SBOM » ?

Une «SBOM » signée est une déclaration signée par une personne détenant la clé de signature au sein d'une organisation, attestant que l'SBOM est exacte. Si la clé est volée, ou si la personne signant l'SBOM se trompe sur la manière dont le logiciel a été créé, alors l'SBOM sera inexacte.

Un document « SBOMit » contient des metadatas signées cryptographiquement concernant toutes les étapes ayant conduit à la création du logiciel et décrit la politique à respecter.  Il est ainsi beaucoup plus difficile que des inexactitudes accidentelles, telles que l’omission d’une étape (ce qui a souvent posé problème par le passé), ou des actions malveillantes passent inaperçues.  La «in-toto » offre également une plus grande capacité à se remettre en toute sécurité d’une compromission, ainsi qu’à détecter et à contrer les actions malveillantes menées par un acteur au sein d’une organisation.

Pour utiliser une analogie, une « SBOM » (déclaration de composition) correspond aujourd’hui en grande partie à la liste des ingrédients figurant sur un produit. Seulement, dans la pratique, ces informations sont souvent inexactes, peuvent être modifiées par une partie malveillante et ne font l’objet d’aucune vérification. La signature d’une « SBOM » permet d’empêcher toute modification par une partie malveillante, ce qui vous garantit que la liste des ingrédients qui vous est fournie a bien été approuvée par une entreprise spécifique.  Un document « SBOMit » décrit également en détail le processus de fabrication du produit et contient l’metadata ainsi que les signatures de toutes les parties impliquées, y compris la vérification que les clés utilisées étaient à jour à ce moment-là. Ainsi, dans le cas d’un document « SBOMit », vous disposez d’un haut degré de garantie que les politiques et procédures appropriées ont été respectées.

Pour plus d'informations à ce sujet, veuillez consulter la rubrique [Quels sont les avantages d'in-toto ?](https://in-toto.io/in-toto/) sur le site in-toto.

## Que se passe-t-il si la chaîne d'approvisionnement d'un logiciel comporte des étapes non sécurisées ?  

in-toto attestations ne remplacent pas la mise en place de mesures de sécurité adéquates tout au long de la chaîne logistique logicielle. Par exemple, si vous utilisez un processus de compilation non sécurisé qui se contente de récupérer et de compiler un logiciel à partir d’un site web, in-toto layouts peut répertorier cette action non sécurisée et vérifier le fichier signé attestations indiquant que vous avez effectué cette action non sécurisée.  

C'est pourquoi des projets tels que SLSA et FRSCA s'appuient sur les étapes décrites sur in-toto pour définir un ensemble de règles bien définies. Ils précisent quelles mesures sont prioritaires pour la sécurité de la chaîne d'approvisionnement logicielle et rendent certaines d'entre elles obligatoires.  

Ces projets apportent des solutions à différents problèmes à différents niveaux.  in-toto vous permet de collecter des informations sur vos étapes, de veiller à l'application des politiques qui s'y rapportent, de gérer la confiance des clés, etc.  Des frameworks tels que SLSA et FRSCA utilisent in-toto comme mécanisme permettant de collecter et d'appliquer un ensemble spécifique de politiques visant à renforcer la sécurité des chaînes d'approvisionnement.  

Des efforts sont actuellement déployés pour permettre aux outils automatisés destinés aux sites SLSA et FRSCA de fonctionner sur in-toto et layouts, et de valider la conformité. Lorsque ces outils auront atteint leur maturité, ils pourront être intégrés pour analyser un document SBOMit et attribuer le niveau de notation approprié à la chaîne d'approvisionnement logicielle qui y est décrite. Ainsi, un utilisateur pourra alors configurer son système pour n'accepter que des logiciels de niveau 4 ou supérieur selon SLSA, accompagnés d'un document SBOMit valide.

## Que se passe-t-il si un document «SBOMit» doit être modifié au fil du temps ? Par exemple, pour affirmer qu’il ne présente pas une certaine vulnérabilité exploitable, pour ajouter ultérieurement des informations complémentaires qui n’étaient pas nécessaires au moment de sa création, etc.

Un document « SBOMit » peut comporter une série d’addendums a posteriori. Celles-ci sont ajoutées après coup et doivent être signées, en dernier ressort, par la clé principale du document « SBOMit » d’origine. Elles servent à modifier les différents champs du document « SBOMit » ou à ajouter des informations complémentaires.  

L'utilisation d'un document « addendums » plutôt que la création d'un nouveau document « SBOMit » présente un avantage. De cette manière, tant le document d'origine que toute modification apportée (addendums) seront vérifiables, et l'historique de ces modifications sera entièrement conservé dans le document « SBOMit ». Ainsi, les documents « addendums » constituent le modèle recommandé pour gérer les modifications apportées à un document « SBOMit ».

## Puis-je créer une «SBOM » à partir d'un document « SBOMit » ?

Oui ! Plusieurs outils sont en cours de développement et permettront de générer un fichier «SBOM» à partir d'un document «SBOMit». Vous pouvez obtenir des fichiers «SBOMs» dans divers formats en utilisant ces différents outils.
