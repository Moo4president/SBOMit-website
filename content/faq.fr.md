---
author: "SBOMit Maintainers"
title: "FAQ"
translationKey: "faq"
ShowToc: false
---
## Qu&#x27;est-ce que SBOMit ?

SBOMit est le nom du projet qui gère le format de spécification SBOMit. Un document SBOMit est en réalité un SBOM, auquel ont été ajoutées des informations de vérification supplémentaires générées au moment de la création de la chaîne d’approvisionnement. Ces informations de vérification, qui utilisent des attestations et des schémas « in toto », peuvent être validées par une partie prenante afin d’obtenir un niveau élevé d’assurance concernant le logiciel.

## Que contient un document SBOMit et pourquoi ?

Un document SBOMit est un document signé qui se compose de plusieurs éléments différents.  

Tout d’abord, il contient une série d’attestations « in-toto » générées au fur et à mesure de la création du logiciel décrit.  Cela inclut des informations détaillées sur les différentes étapes de la chaîne logistique du logiciel, notamment sur le système de contrôle de version, le processus de compilation, les tests unitaires, les dépendances utilisées, le fuzzing, les vérifications de conformité des licences, le packaging, etc.  Par exemple, le système de compilation utilisé pour compiler le logiciel figurant dans la SBOM contient des métadonnées « in-toto » comprenant les noms et les hachages sécurisés des fichiers extraits du système de contrôle de version (VCS) en vue de leur compilation, les noms et les hachages sécurisés des fichiers créés lors de la compilation, une série d’informations sur le compilateur, ainsi qu’une signature générée par une clé privée détenue par le compilateur.

Ces informations d&#x27;attestation peuvent être utilisées en coordination avec le deuxième élément du document SBOMit : une structure « in-toto ». La structure « in-toto » est signée par le responsable du projet et décrit à quoi ressemblent les métadonnées d&#x27;attestation valides pour le projet. Ce schéma spécifie les clés privées des parties chargées des attestations, ainsi que la manière dont les différentes étapes s’enchaînent.  Par exemple, le système de contrôle de version (VCS) doit disposer d’une balise Git signée, sur laquelle le système de compilation va ensuite opérer.  Les fichiers compilés par le système de compilation doivent être ceux qui ont été soumis aux tests unitaires, lesquels doivent avoir été réussis.   Il est important de noter qu’une structure « in-toto » fournit une politique lisible par machine capable de valider les attestations « in-toto » afin de garantir que toutes ces étapes ont été suivies, dans le bon ordre, sur les éléments appropriés, et sans qu’aucun élément n’ait été ajouté, omis ou supprimé.

Le dernier élément qui figure systématiquement dans le document SBOMit concerne les informations complémentaires relatives à la SBOM. Ces informations, associées aux attestations « in-toto » et à la structure « in-toto », peuvent être utilisées pour générer une SBOM proprement dite dans divers formats.  Les informations complémentaires relatives à la SBOM peuvent inclure des éléments tels que le nom de l’entreprise ou d’autres informations qui ne sont pas prises en compte dans le processus « in-toto », mais dont l’intégration dans la SBOM finale est souhaitable.  De cette manière, une SBOM générée à partir d’un document SBOMit peut inclure des informations complémentaires qui ne faisaient pas partie du processus « in-toto ».

Il existe également un moyen d&#x27;ajouter des annexes à un document SBOMit, qui sera décrit plus loin.

## Quels sont les avantages d&#x27;un document SBOMit par rapport à l&#x27;utilisation d&#x27;un outil de génération de SBOM qui analyse le logiciel ?

De par leur nature même, les outils d&#x27;analyse examinent un logiciel pour tenter de déterminer ce qui s&#x27;est passé auparavant. De par leur nature même, ils sont imparfaits, car ils s&#x27;appuient sur des informations incomplètes pour tenter de reconstituer ce qui s&#x27;est passé dans le passé. L&#x27;expérience pratique a montré que différents outils d&#x27;analyse peuvent donner des résultats très divergents pour un même logiciel.  

Les parties d&#x27;un document SBOMit consacrées aux attestations « in-toto » sont générées au moment où le logiciel est traité au sein de la chaîne d&#x27;approvisionnement logicielle.  Par conséquent, ces informations seront beaucoup plus précises, car les attestations « in-toto » recueillent des informations détaillées au moment même de la fabrication du produit logiciel.  De par sa nature même, un document SBOMit est ainsi beaucoup plus précis.

## Quels sont les avantages d&#x27;un document SBOMit par rapport à la simple signature d&#x27;une SBOM ?

Une SBOM signée est une déclaration signée par une personne détenant la clé de signature au sein d&#x27;une organisation, attestant que la SBOM est exacte. Si la clé est volée, ou si la personne signant la SBOM se trompe sur la manière dont le logiciel a été développé, alors la SBOM sera inexacte.

Un document SBOMit contient des métadonnées signées cryptographiquement concernant toutes les étapes ayant conduit à la création du logiciel et décrit la politique à respecter. Il est ainsi beaucoup plus difficile que des inexactitudes accidentelles, telles que l&#x27;omission d&#x27;une étape (ce qui a toujours constitué un problème), ou des actions malveillantes passent inaperçues.  In-toto offre également une plus grande capacité à se remettre en toute sécurité d&#x27;une compromission, ainsi qu&#x27;à détecter et à contrer les actions malveillantes menées par un acteur au sein d&#x27;une organisation.

Pour utiliser une analogie, une SBOM correspond aujourd’hui en grande partie à la liste des ingrédients figurant sur un produit. Seulement, dans la pratique, ces informations sont souvent inexactes, peuvent être modifiées par une partie malveillante et ne font l’objet d’aucune vérification.   La signature d’une SBOM permet d’empêcher toute modification par une partie malveillante, ce qui vous garantit que la liste des ingrédients qui vous est fournie a bien été approuvée par une entreprise spécifique.  Un document SBOMit décrit également en détail le processus de fabrication du produit et contient les métadonnées ainsi que les signatures de toutes les parties impliquées, y compris la vérification que les clés utilisées étaient à jour à ce moment-là. Ainsi, dans le cas d’un document SBOMit, vous disposez d’un haut niveau de garantie que les politiques et procédures appropriées ont été respectées.

Pour plus d&#x27;informations à ce sujet, veuillez consulter la rubrique [Quels sont les avantages d&#x27;in-toto ?](https://in-toto.io/in-toto/) sur le site web d&#x27;in-toto.

## Que se passe-t-il si la chaîne d&#x27;approvisionnement d&#x27;un logiciel comporte des étapes non sécurisées ?  

Les attestations « in-toto » ne remplacent pas la mise en place de mesures de sécurité adéquates tout au long de la chaîne d&#x27;approvisionnement logicielle. Par exemple, si vous utilisez un processus de compilation non sécurisé consistant simplement à récupérer et à compiler un logiciel à partir d&#x27;un site web, les schémas « in-toto » peuvent répertorier cette action non sécurisée et vérifier les attestations signées indiquant que vous avez effectivement effectué cette action non sécurisée.  

C&#x27;est pourquoi des projets tels que SLSA et FRSCA s&#x27;articulent autour d&#x27;un ensemble de règles bien définies qui s&#x27;appuient sur des étapes « in-toto ». Ils précisent quelles actions sont prioritaires pour la sécurité de la chaîne d&#x27;approvisionnement logicielle et rendent certaines d&#x27;entre elles obligatoires.  

Ces projets apportent des solutions à différents problèmes à différents niveaux. In-toto vous permet de collecter des informations sur vos étapes, de garantir l&#x27;application des politiques qui s&#x27;y rapportent, de gérer la confiance des clés, etc. Des frameworks tels que SLSA et FRSCA utilisent In-toto comme mécanisme permettant de collecter et d&#x27;appliquer un ensemble spécifique de politiques qui renforcent la sécurité des chaînes d&#x27;approvisionnement.  

Des efforts sont actuellement déployés pour mettre au point des outils automatisés destinés aux normes SLSA et FRSCA, capables de traiter des schémas « in-toto » et de valider la conformité. Lorsque ces outils auront atteint leur maturité, ils pourront être intégrés pour analyser un document SBOMit et attribuer le niveau de notation approprié à la chaîne d’approvisionnement logicielle qui y est décrite.   Ainsi, un utilisateur pourra alors configurer son système pour qu’il n’accepte que des logiciels de niveau SLSA 4 ou supérieur, accompagnés d’un document SBOMit valide.

## Que se passe-t-il si un document SBOMit doit être modifié au fil du temps ? Par exemple, pour affirmer qu’il ne présente pas une certaine vulnérabilité exploitable, pour ajouter ultérieurement des informations complémentaires qui n’étaient pas nécessaires au moment de sa création, etc.

Un document SBOMit peut comporter une série d&#x27;avenants a posteriori. Ceux-ci sont ajoutés après coup et doivent être signés, en dernier ressort, par la clé principale du document SBOMit d&#x27;origine. Ils servent à modifier les différents champs du document SBOMit ou à ajouter des informations complémentaires.  

Le recours à des avenants plutôt qu&#x27;à la création d&#x27;un nouveau document SBOMit présente un avantage. De cette manière, tant le document d&#x27;origine que les éventuels avenants seront vérifiables, et l&#x27;historique de ces modifications sera entièrement consigné dans le document SBOMit. Les avenants constituent donc la méthode recommandée pour gérer les modifications apportées à un document SBOMit.

## Puis-je générer une SBOM à partir d&#x27;un document SBOMit ?

Oui ! Plusieurs outils sont en cours de développement et permettront de générer une SBOM à partir d&#x27;un document SBOMit. Vous pouvez obtenir des SBOM dans divers formats en utilisant différents outils.
