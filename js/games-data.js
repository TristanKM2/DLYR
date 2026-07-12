/* ============================================================
   D'LYR — Données des jeux VR (source : présentation client)
   ============================================================ */
window.DLYR_GAMES = [
  {
    slug: 'harbor-siege', name: 'Harbor Siege', genre: 'Action',
    tags: ['Conquête', 'Stratégie', "Esprit d'équipe"],
    type: 'Domination', pl: '2 à 12 joueurs', players: 12, dur: 20,
    img: 'uploads/harbor-siege.png', vid: 'uploads/harbor-siege.mp4',
    objective: 'Capturer et défendre les zones de contrôle pour mener votre équipe à la victoire.',
    tagline: 'Prenez le contrôle du port.<br>Dominez le champ de bataille.',
    story: [
      "Plongez au cœur d'un ancien port abandonné, un véritable labyrinthe de ruelles étroites, d'entrepôts oubliés et de caisses de marchandises. Dans cet environnement chargé d'histoire, chaque recoin peut cacher un adversaire.",
      "Formez votre équipe et partez à la conquête des zones stratégiques du port. Plus vous contrôlez de territoires, plus vous accumulez de points. Mais attention\u00a0: vos adversaires feront tout pour reprendre le contrôle et inverser le cours de la bataille.",
      "Coordination, rapidité et sens tactique seront les clés de la victoire dans cette expérience immersive où chaque décision compte."
    ]
  },
  {
    slug: 'outbreak-lab', name: 'Outbreak Lab', genre: 'Horreur',
    tags: ['Survie', 'Action', 'Horreur'],
    type: 'Zombies', pl: '2 à 12 joueurs', players: 12, dur: 30,
    objective: 'Survivre, éliminer les menaces et révéler le secret de X-Labs.',
    tagline: "Survivez à une invasion<br>de zombies",
    img: 'uploads/outbreak-lab.png', vid: 'uploads/video-gamers.mp4',
    story: [
      "Le laboratoire secret de X-Labs a cessé toute communication. L'équipe Alpha, envoyée sur place pour rétablir le contact, ne donne plus aucun signe de vie. C'est désormais à vous d'entrer en scène.",
      "Équipe Bravo, à vous de jouer\u00a0! Dès votre déploiement, vous allez vite comprendre que la mission a viré au cauchemar. Des expériences interdites ont échappé à tout contrôle, et des créatures terrifiantes hantent désormais les couloirs du complexe.",
      "Votre objectif\u00a0: progressez dans les profondeurs du laboratoire, affrontez des hordes de monstres, découvrez ce qui est arrivé à vos frères d'armes et neutralisez l'origine de la catastrophe avant qu'il ne soit trop tard.",
      "Bonne chance, Bravo. Rompez."
    ]
  },
  {
    slug: 'paradise-expedition', name: 'Paradise Expedition', genre: 'Action',
    tags: ['Free For All', 'Compétition', 'Survie'],
    type: 'Free For All', pl: '2 à 12 joueurs', players: 12, dur: 30,
    img: 'uploads/paradise-expedition.png', vid: 'uploads/paradise-expedition.mp4',
    objective: "Éliminer un maximum d'adversaires et réaliser le meilleur score.",
    tagline: 'Dans ce paradis perdu, chaque<br>rencontre peut être votre dernière',
    story: [
      "Au cœur d'une terre aride et oubliée du monde se cache un sanctuaire inattendu\u00a0: une immense serre tropicale où la nature a repris ses droits. Cascades cristallines, végétation luxuriante et ruines envahies par les lianes composent un décor aussi magnifique que dangereux.",
      "Mais derrière cette oasis paradisiaque se cache un terrain de combat impitoyable. Dans ce labyrinthe végétal, chaque joueur lutte pour sa propre survie. Utilisez les feuillages pour vous dissimuler, surprenez vos adversaires au détour d'un sentier ou lancez-vous dans des affrontements explosifs au milieu des cascades et des jardins suspendus.",
      "Ici, aucune alliance n'est possible. Chacun joue pour lui-même. Seuls les plus rapides, les plus précis et les plus stratégiques parviendront à dominer cet éden perdu."
    ]
  },
  {
    slug: 'volcanic-warfare', name: 'Volcanic Warfare', genre: 'Action',
    tags: ['Team Deathmatch', 'Coopération', 'Tactique'],
    type: 'Team Deathmatch', pl: '4 à 8 joueurs', players: 8, dur: 30,
    img: 'uploads/volcanic-warfare.png', vid: 'uploads/volcanic-warfare.mp4',
    objective: "Éliminer un maximum d'adversaires et permettre à votre équipe d'atteindre le score le plus élevé.",
    tagline: 'Deux équipes.<br>Une seule victoire.',
    story: [
      "Au milieu d'un archipel oublié, une île volcanique est entrée en éruption. La lave dévale les flancs de la montagne, transformant ce paradis tropical en un champ de bataille brûlant où chaque décision peut faire basculer l'issue du combat.",
      "Entre rivières de magma, falaises escarpées et végétation calcinée, deux équipes s'affrontent pour prendre le contrôle du terrain. Au centre de l'île se dresse une immense plateforme élévatrice à poulie, offrant une vue imprenable sur toute la zone. Véritable point stratégique, elle permet d'anticiper les mouvements ennemis et de dominer le champ de bataille.",
      "La coopération est essentielle. Coordonnez vos attaques, couvrez vos équipiers et exploitez chaque avantage tactique pour prendre l'ascendant sur l'équipe adverse. Dans cet environnement extrême, seuls les groupes les plus organisés survivront à la chaleur de l'affrontement."
    ]
  },
  {
    slug: 'snow-village', name: 'Snow Village', genre: 'Famille',
    tags: ['Famille', 'Coopératif', 'Magie de Noël'],
    type: 'Family Adventure', pl: '2 à 12 joueurs', players: 12, dur: 15,
    img: 'uploads/snow-village.png', vid: 'uploads/snow-village.mp4',
    objective: 'Défendre le village du Père Noël, sauver les habitants et vaincre les armées du sorcier maléfique.',
    tagline: 'La magie de Noël est en danger.<br>Devenez les héros de Snow Village.',
    story: [
      "Au cœur des montagnes enneigées se cache Snow Village, le célèbre village du Père Noël, où lutins, rennes et habitants vivent en harmonie. Mais cette année, les festivités sont menacées.",
      "Un puissant sorcier maléfique a lancé une attaque contre le village. Des créatures de glace, des golems enchantés et des monstres venus des terres gelées envahissent les rues enneigées, détruisant tout sur leur passage. Les habitants sont en danger et la magie de Noël risque de disparaître à jamais.",
      "En équipe, les joueurs devront parcourir le village, défendre les maisons, protéger les lutins et repousser les vagues d'ennemis toujours plus puissantes. Au fil de leur progression, ils affronteront les terribles créatures du sorcier avant de se mesurer à ses plus redoutables champions.",
      "Le destin du village repose désormais entre leurs mains."
    ]
  },
  {
    slug: 'brain-arena', name: 'Brain Arena', genre: 'Quiz',
    tags: ['Quiz', 'Multijoueur', 'Culture générale'],
    type: 'Quiz immersif multijoueur', pl: '2 à 8 joueurs', players: 8, dur: 30,
    img: 'uploads/brain-arena.png', vid: 'uploads/brain-arena.mp4',
    objective: 'Accumuler le maximum de points en répondant correctement et rapidement aux questions pour terminer en tête du classement.',
    tagline: 'La connaissance est<br>votre meilleure arme',
    story: [
      "Bienvenue dans Brain Arena, le premier jeu télévisé immersif où votre intelligence devient votre véritable super-pouvoir.",
      "Dans une arène futuriste digne des plus grands shows de compétition, vous affrontez vos amis dans une série de défis de culture générale aussi amusants qu'intenses. Histoire, cinéma, musique, sport, sciences, jeux vidéo, géographie ou encore pop culture\u00a0: choisissez vos catégories et préparez-vous à faire chauffer vos neurones.",
      "Mais ici, connaître la réponse ne suffit pas. Il faut également être le plus rapide. Chaque seconde compte et chaque bonne réponse peut faire basculer le classement. Les scores évoluent en temps réel, la pression monte et les retournements de situation sont fréquents jusqu'à la dernière question.",
      "Entre compétition acharnée, éclats de rire et surprises, Brain Arena transforme la culture générale en une véritable expérience immersive où chacun peut devenir champion. Alors, êtes-vous prêt à prouver que vous êtes le plus brillant de l'arène\u00a0?"
    ]
  },
  {
    slug: 'spirit-of-the-wild', name: 'Spirit of the Wild', genre: 'Aventure',
    tags: ['Sensoriel', 'Nature', 'Légendes'],
    type: 'Expérience sensorielle', pl: '2 à 10 joueurs', players: 10, dur: 30,
    img: 'uploads/spirit-of-the-wild.png',
    objective: null,
    tagline: "Éveillez l'animal<br>qui sommeille en vous",
    story: [
      "Dans un monde inspiré des légendes du Grand Nord, laissez votre esprit s'unir à la nature. Transformez-vous en créature mythique, explorez des paysages enchanteurs et découvrez une expérience immersive où votre regard, votre voix et vos émotions deviennent votre véritable pouvoir."
    ]
  },
  {
    slug: 'icarus-station', name: 'Icarus Station', genre: 'Escape game',
    tags: ['Escape game', 'Coopératif', 'Science-fiction'],
    type: 'Escape Game coopératif', pl: '2 à 12 joueurs', players: 12, dur: 30,
    img: 'uploads/icarus-station.png', vid: 'uploads/icarus-station.mp4',
    objective: "Réparer les systèmes de la station, traverser les secteurs sinistrés et rejoindre la plateforme d'extraction avant l'effondrement d'Icarus-7.",
    tagline: "Échappez-vous avant que la station<br>ne sombre dans le vide spatial",
    story: [
      "Une catastrophe sans précédent frappe la station spatiale Icarus-7. Alors qu'elle poursuit sa mission aux confins de l'espace, un mystérieux virus informatique prend le contrôle des systèmes critiques de la station. En quelques minutes, les communications sont coupées, les protocoles de sécurité désactivés et la commandante de bord neutralisée. Vous faites partie des derniers survivants.",
      "Privée de contrôle, la station se désagrège peu à peu. Les sas se verrouillent, les systèmes vitaux tombent en panne et des secteurs entiers sont désormais inaccessibles. Dans le silence glacé de l'espace, chaque erreur peut être fatale.",
      "Votre mission est simple\u00a0: traverser les différentes zones endommagées, réactiver les systèmes essentiels, résoudre les pannes provoquées par l'attaque et atteindre la plateforme mobile d'extraction avant qu'il ne soit trop tard.",
      "Mais vous n'êtes pas seuls. Une présence inconnue semble évoluer dans les couloirs de la station, tandis que le compte à rebours vers la destruction approche inexorablement de son terme. Le temps presse. L'ennemi se rapproche. L'espace ne pardonne aucune erreur."
    ]
  },
  {
    slug: 'time-quest', name: 'Time Quest', genre: 'Aventure',
    tags: ['Narratif', 'Culturel', 'Exploration'],
    type: 'Aventure culturelle immersive', pl: '2 à 20 participants', players: 20, dur: 30,
    img: 'uploads/time-quest.png', vid: 'uploads/time-quest.mp4',
    objective: 'Explorer les civilisations du passé et résoudre les mystères du temps.',
    tagline: "Traversez les siècles.<br>Vivez l'Histoire.",
    story: [
      "Embarquez pour une aventure extraordinaire à travers les âges. À la suite d'une mystérieuse perturbation temporelle, vous êtes propulsés dans les plus grandes civilisations de l'Histoire. Explorez la majesté de la Rome impériale, découvrez les trésors de la légendaire Maison de la Sagesse de Bagdad et plongez au cœur de l'Inde moghole dans une expérience immersive unique.",
      "Voyagez librement avec votre groupe à travers des mondes reconstitués à taille réelle, rencontrez leurs habitants, percez leurs secrets et vivez l'Histoire comme si vous y étiez.",
      "Une expérience culturelle spectaculaire où technologie, découverte et émerveillement se rencontrent pour vous faire voyager au-delà du temps."
    ]
  }
];
