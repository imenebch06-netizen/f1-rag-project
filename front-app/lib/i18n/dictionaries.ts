export type Lang = "fr" | "en";

export const LANGS: { code: Lang; label: string }[] = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
];

const fr = {
  brand: {
    nameA: "F1",
    nameB: "BLOG",
    tagline: "La F1 expliquée simplement, pour tout le monde.",
  },
  nav: {
    feed: "Fil d'Actualité",
    grandPrix: "Grand Prix",
    teams: "Ecuries & Pilotes",
    tech: "Technique & Data",
  },
  header: {
    liveSeason: "LIVE SEASON",
    menu: "Menu",
    closeMenu: "Fermer",
    langLabel: "Langue",
    themeDark: "Passer en mode clair",
    themeLight: "Passer en mode sombre",
  },
  footer: "PIT WALL OS — PROJET FAN. NON AFFILIÉ À LA FORMULA 1.",
  home: {
    heroKicker: "/// BIENVENUE SUR F1 BLOG",
    heroTitleA: "Plonge dans",
    heroTitleB: "la course",
    heroSub:
      "La voiture du jour, les chiffres et toute l'actu t'attendent juste en bas.",
    heroCta: "Plonger",
    heroHint: "Défile pour commencer",
    carKicker: "/// VOITURE DU JOUR",
    carCta: "Dossier technique",
    weekTitle: "Cette semaine au garage",
    today: "Aujourd'hui",
    statsKicker: "/// LA F1 EN CHIFFRES",
    statsTitle: "La F1 en chiffres",
    statsHint: "Clique sur un chiffre pour comprendre ce qu'il veut dire.",
    feedKicker: "/// FIL D'ACTUALITÉ",
    feedTitleA: "Paddock",
    feedTitleB: "Live",
    feedCount: "ARTICLES — SYNC PADDOCK",
    specPower: "Puissance",
    specGrip: "Adhérence",
    specLegacy: "Héritage",
    photoCredit: "Photo",
  },
  stats: [
    {
      value: "24",
      label: "Courses par saison",
      detail:
        "Une saison = 24 Grands Prix, de mars à décembre, sur 5 continents. Chaque week-end : essais libres, qualifications, puis la course du dimanche.",
    },
    {
      value: "10",
      label: "Écuries en piste",
      detail:
        "10 équipes s'affrontent, avec 2 voitures chacune : ça fait 20 pilotes au départ de chaque course.",
    },
    {
      value: "372",
      label: "km/h en pointe",
      detail:
        "Le record de vitesse en course. Et une F1 freine de 300 à 100 km/h en 2 secondes à peine — ton cou n'aimerait pas.",
    },
    {
      value: "6",
      label: "Voitures de légende",
      detail:
        "Chaque jour, cette page met une voiture mythique à l'honneur en haut de page. Reviens demain pour découvrir la suivante !",
    },
  ],
  feed: {
    all: "Tout",
    technical: "Technique",
    race: "Grand Prix",
    rumor: "Rumeurs",
    heroTag: "/// À LA UNE",
    empty: "Aucun article dans cette catégorie pour le moment.",
    minRead: "min",
    originalIn: "Article d'origine en français",
  },
  pages: {
    grandPrixKicker: "/// GRAND PRIX",
    grandPrixTitle: "Calendrier & Résultats",
    grandPrixBody:
      "12 manches de mars à décembre, sur 5 continents. Voici comment la saison est découpée — et comment se déroule un week-end de course, du vendredi au dimanche.",
    grandPrixCalendarTitle: "Le calendrier",
    grandPrixCalendarSub:
      "Chaque Grand Prix = une manche du championnat. Les points marqués le dimanche décident des titres pilotes et constructeurs en fin de saison.",
    grandPrixRound: "Manche",
    grandPrixNext: "Prochain",
    grandPrixDone: "Terminé",
    grandPrixWeekendTitle: "Comment se passe un week-end",
    grandPrixWeekendSub:
      "Trois jours, trois missions : tester le vendredi, signer le chrono le samedi, marquer des points le dimanche.",
    grandPrixSprintNote:
      "Note : certains week-ends utilisent le format Sprint (course courte le samedi). Le format classique ci-dessous reste la base.",
    grandPrixWeekendCta: "Voir les actus course",
    grandPrixImageCaption: "Des premiers essais au drapeau à damier.",
    grandPrixSteps: [
      {
        day: "Vendredi",
        title: "Essais libres : tester et collecter",
        body: "Journée consacrée à apprivoiser le circuit, tester les réglages aéro, gérer la charge d'essence et mesurer l'usure des pneus.",
        sessions: [
          "EL1 — 60 min en début d'après-midi : découverte et premiers réglages.",
          "EL2 — 60 min en fin d'après-midi : simulations de qualification et longs relais.",
        ],
      },
      {
        day: "Samedi",
        title: "Derniers réglages et qualifications",
        body: "On passe de la collecte de données à la vitesse pure sur un tour. Dès le début des qualifications, les voitures sont en Parc Fermé : plus aucun réglage majeur jusqu'à la fin du week-end.",
        sessions: [
          "EL3 — 60 min le matin : ajustements finaux grâce aux données du vendredi.",
          "Q1 — 18 min : 20 voitures en piste, les 5 plus lentes éliminées (places 16 à 20).",
          "Q2 — 15 min : chronos remis à zéro, les 5 plus lentes éliminées (places 11 à 15).",
          "Q3 — 12 min : les 10 plus rapides se battent pour la pole position.",
        ],
      },
      {
        day: "Dimanche",
        title: "Jour de course : le Grand Prix",
        body: "Le sommet du week-end : c'est là que les points du championnat se gagnent.",
        sessions: [
          "Distance : 305 km minimum (Monaco fait exception, plus court).",
          "Durée : entre 1h30 et 2h selon la piste, la météo et les safety cars.",
          "Arrêt obligatoire : au moins 1 passage aux stands pour changer de pneus sur course sèche.",
        ],
      },
    ],
    teamsKicker: "/// ECURIES & PILOTES",
    teamsTitle: "Teams & Drivers",
    teamsBody:
      "Fiches écuries, duos pilotes et comparatifs télémétrie. Prochaine étape après le feed.",
    techKicker: "/// TECHNIQUE & DATA",
    techTitle: "Aéro & Power Units",
    techBody:
      "Analyses aéro, règlements et visualisations data. Alimenté par la catégorie Technique du feed.",
  },
  ai: {
    title: "PIT WALL AI",
    subtitle: "F1 HISTORY — GROUNDED RAG",
    welcome:
      "Posez une question sur l'histoire F1. Réponses grounded depuis data/f1_knowledge.",
    placeholder: "Ex : Qui a gagné le GP de Monaco 1988 ?",
    error:
      "Erreur de connexion au Pit Wall. Vérifiez qu'Ollama tourne (`ollama serve` + `ollama pull llama3`).",
    sources: "SOURCES",
    send: "Envoyer",
    stop: "Stop",
    close: "Fermer",
    prompts: [
      "Qui a gagné le GP de Monaco 1988 ?",
      "Explique l'effet de sol en aéro",
      "Senna vs Prost 1988 : qui a gagné ?",
      "Que change la PU 2026 ?",
    ],
  },
};

export type Dict = typeof fr;

const en: Dict = {
  brand: {
    nameA: "F1",
    nameB: "BLOG",
    tagline: "F1 explained simply, for everyone.",
  },
  nav: {
    feed: "News Feed",
    grandPrix: "Grand Prix",
    teams: "Teams & Drivers",
    tech: "Tech & Data",
  },
  header: {
    liveSeason: "LIVE SEASON",
    menu: "Menu",
    closeMenu: "Close",
    langLabel: "Language",
    themeDark: "Switch to light mode",
    themeLight: "Switch to dark mode",
  },
  footer: "PIT WALL OS — FAN PROJECT. NOT AFFILIATED WITH FORMULA 1.",
  home: {
    heroKicker: "/// WELCOME TO F1 BLOG",
    heroTitleA: "Dive into",
    heroTitleB: "the race",
    heroSub:
      "Today's car, the numbers and all the news are waiting just below.",
    heroCta: "Dive in",
    heroHint: "Scroll to start",
    carKicker: "/// CAR OF THE DAY",
    carCta: "Tech dossier",
    weekTitle: "This week in the garage",
    today: "Today",
    statsKicker: "/// F1 IN NUMBERS",
    statsTitle: "F1 in numbers",
    statsHint: "Tap a number to understand what it means.",
    feedKicker: "/// NEWS FEED",
    feedTitleA: "Paddock",
    feedTitleB: "Live",
    feedCount: "ARTICLES — PADDOCK SYNC",
    specPower: "Power",
    specGrip: "Grip",
    specLegacy: "Legacy",
    photoCredit: "Photo",
  },
  stats: [
    {
      value: "24",
      label: "Races per season",
      detail:
        "One season = 24 Grands Prix, March to December, across 5 continents. Each weekend: free practice, qualifying, then Sunday's race.",
    },
    {
      value: "10",
      label: "Teams on track",
      detail:
        "10 teams compete with 2 cars each: that's 20 drivers starting every race.",
    },
    {
      value: "372",
      label: "km/h top speed",
      detail:
        "The in-race speed record. And an F1 brakes from 300 to 100 km/h in barely 2 seconds — your neck would not enjoy it.",
    },
    {
      value: "6",
      label: "Legend cars",
      detail:
        "Every day, this page honours a different iconic car at the top. Come back tomorrow for the next one!",
    },
  ],
  feed: {
    all: "All",
    technical: "Technical",
    race: "Race",
    rumor: "Rumors",
    heroTag: "/// HEADLINE",
    empty: "No articles in this category yet.",
    minRead: "min",
    originalIn: "Original article in French",
  },
  pages: {
    grandPrixKicker: "/// GRAND PRIX",
    grandPrixTitle: "Calendar & Results",
    grandPrixBody:
      "12 rounds from March to December, across 5 continents. Here's how the season is spread out — and how a race weekend unfolds, from Friday to Sunday.",
    grandPrixCalendarTitle: "The calendar",
    grandPrixCalendarSub:
      "Each Grand Prix is one round of the championship. Sunday's points decide the drivers' and constructors' titles at season's end.",
    grandPrixRound: "Round",
    grandPrixNext: "Next up",
    grandPrixDone: "Completed",
    grandPrixWeekendTitle: "How a weekend works",
    grandPrixWeekendSub:
      "Three days, three missions: test on Friday, set the lap time on Saturday, score points on Sunday.",
    grandPrixSprintNote:
      "Note: some weekends use the Sprint format (short race on Saturday). The classic format below remains the baseline.",
    grandPrixWeekendCta: "See race news",
    grandPrixImageCaption: "From first practice to the chequered flag.",
    grandPrixSteps: [
      {
        day: "Friday",
        title: "Free practice: test and gather",
        body: "A day for learning the track, testing aero setups, managing fuel loads and measuring tyre wear.",
        sessions: [
          "FP1 — 60 min early afternoon: discovery and first setups.",
          "FP2 — 60 min late afternoon: qualifying simulations and long runs.",
        ],
      },
      {
        day: "Saturday",
        title: "Final tweaks and qualifying",
        body: "From data gathering to raw single-lap speed. Once qualifying starts, cars are under Parc Fermé: no major setup changes until the weekend ends.",
        sessions: [
          "FP3 — 60 min in the morning: final tweaks from Friday's data.",
          "Q1 — 18 min: 20 cars on track, slowest 5 eliminated (grid spots 16–20).",
          "Q2 — 15 min: times reset, slowest 5 eliminated (grid spots 11–15).",
          "Q3 — 12 min: the 10 fastest fight for pole position.",
        ],
      },
      {
        day: "Sunday",
        title: "Race day: the Grand Prix",
        body: "The weekend's peak: this is where championship points are won.",
        sessions: [
          "Distance: 305 km minimum (Monaco is the shorter exception).",
          "Duration: 90 minutes to 2 hours depending on track, weather and safety cars.",
          "Mandatory stop: at least 1 pit stop to change tyres in a dry race.",
        ],
      },
    ],
    teamsKicker: "/// TEAMS & DRIVERS",
    teamsTitle: "Teams & Drivers",
    teamsBody:
      "Team sheets, driver pairings and telemetry comparisons. Next step after the feed.",
    techKicker: "/// TECH & DATA",
    techTitle: "Aero & Power Units",
    techBody:
      "Aero analysis, regulations and data visualizations. Powered by the Technical feed category.",
  },
  ai: {
    title: "PIT WALL AI",
    subtitle: "F1 HISTORY — GROUNDED RAG",
    welcome:
      "Ask anything about F1 history. Answers grounded from data/f1_knowledge.",
    placeholder: "E.g. Who won the 1988 Monaco GP?",
    error:
      "Pit Wall connection error. Make sure Ollama is running (`ollama serve` + `ollama pull llama3`).",
    sources: "SOURCES",
    send: "Send",
    stop: "Stop",
    close: "Close",
    prompts: [
      "Who won the 1988 Monaco GP?",
      "Explain ground effect aerodynamics",
      "Senna vs Prost 1988: who won?",
      "What changes with the 2026 PU?",
    ],
  },
};

export const dictionaries: Record<Lang, Dict> = { fr, en };
