export type Category =
  | 'Plages'
  | 'Randonnées'
  | 'Rivières & Cascades'
  | 'Culture & Patrimoine'
  | 'Sport & Aventure'
  | 'Gastronomie & Distilleries';

export type Zone = 'Nord Caraïbe' | 'Sud Caraïbe' | 'Nord Atlantique' | 'Centre';

export interface Place {
  id: string;
  nom: string;
  categorie: Category;
  zone: Zone;
  description: string;
  descriptionLongue: string;
  galerie: string[];
  niveauEffort: number; // 1-5
  dureeMoyenne: string;
  costEstimate: string;
  image: string;
  bestTimeOfDay: 'matin' | 'apresMidi' | 'soir' | 'any';
}

export const CATEGORIES: Category[] = [
  'Plages',
  'Randonnées',
  'Rivières & Cascades',
  'Culture & Patrimoine',
  'Sport & Aventure',
  'Gastronomie & Distilleries',
];

export const CATEGORY_ICONS: Record<Category, string> = {
  'Plages': 'Waves',
  'Randonnées': 'Mountain',
  'Rivières & Cascades': 'Droplets',
  'Culture & Patrimoine': 'Landmark',
  'Sport & Aventure': 'Compass',
  'Gastronomie & Distilleries': 'Wine',
};

export const ZONES: Zone[] = [
  'Nord Caraïbe',
  'Sud Caraïbe',
  'Nord Atlantique',
  'Centre',
];

export const PLACES: Place[] = [
  // === PLAGES ===
  {
    id: 'salines',
    nom: 'Les Salines',
    categorie: 'Plages',
    zone: 'Sud Caraïbe',
    description: "La plage la plus célèbre de Martinique, carte postale par excellence avec son sable blanc et ses cocotiers. Eaux turquoises peu profondes, idéale pour les familles.",
    descriptionLongue: "Les Salines est sans conteste la plage la plus emblématique de Martinique. Ce lagon turquoise aux eaux peu profondes s'étire sur plus d'un kilomètre, bordé de cocotiers penchés vers la mer. Le sable, d'un blanc immaculé, contraste avec le vert intense de la végétation tropicale environnante. La plage est protégée par un récif corallien qui calme les vagues, créant un environnement parfait pour les familles avec enfants. Quelques snack-bars locaux proposent des plats créoles et des rafraîchissements. Le site peut être très fréquenté en haute saison, d'où l'importance d'arriver tôt le matin. Une balade à pied jusqu'à la pointe sud offre une vue spectaculaire sur l'ensemble de la baie.",
    galerie: [
      'https://images.pexels.com/photos/18197918/pexels-photo-18197918.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/35236003/pexels-photo-35236003.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/12858540/pexels-photo-12858540.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    niveauEffort: 1,
    dureeMoyenne: '3h',
    costEstimate: 'Gratuit',
    image: 'https://images.pexels.com/photos/10490921/pexels-photo-10490921.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    bestTimeOfDay: 'matin',
  },
  {
    id: 'anse-noire-dufour',
    nom: 'Anse Noire & Anse Dufour',
    categorie: 'Plages',
    zone: 'Sud Caraïbe',
    description: "Deux criques voisines aux contrastes saisissants : sable noir volcanique à Anse Noire, sable blanc à Anse Dufour. Spot de snorkeling réputé avec tortues marines.",
    descriptionLongue: "Anse Noire et Anse Dufour sont deux petites plages situées aux Anses-d'Arlet, accessibles par un chemin étroit à travers un quartier de pêcheurs. Anse Noire surprend par son sable noir d'origine volcanique, un phénomène rare en Martinique où la plupart des plages du sud sont blanches. Anse Dufour, juste à côté, offre un sable clair et des eaux calmes abritées par la pointe rocheuse. C'est l'un des meilleurs spots de snorkeling de l'île : tortues marines, poissons-perroquets, oursins et coraux peuplent les herbiers marins peu profonds. Les tortues vertes viennent s'y nourir d'algues et de phanérogames. Apportez masque et tuba, la location de matériel est limitée sur place. Le site est préservé et convient parfaitement à une matinée de découverte.",
    galerie: [
      'https://images.pexels.com/photos/2314945/pexels-photo-2314945.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/7903014/pexels-photo-7903014.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/3041869/pexels-photo-3041869.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    niveauEffort: 2,
    dureeMoyenne: '3h',
    costEstimate: 'Gratuit',
    image: 'https://images.pexels.com/photos/7005963/pexels-photo-7005963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    bestTimeOfDay: 'matin',
  },
  {
    id: 'anse-couleuvre',
    nom: 'Anse Couleuvre',
    categorie: 'Plages',
    zone: 'Nord Caraïbe',
    description: "Plage sauvage de sable noir au pied de falaises volcaniques. Accès par sentier à travers la forêt tropicale. Vagues puissantes, ambiance préservée et authentique.",
    descriptionLongue: "Anse Couleuvre est l'une des plages les plus sauvages et préservées de Martinique. Située au nord de la côte Caraïbe, elle se distingue par son sable noir volcanique et ses falaises basaltiques couvertes de végétation tropicale. L'accès se fait par un sentier de 15 minutes à travers la forêt tropicale humide, ce qui filtre les visiteurs et préserve l'aspect authentique du site. Les vagues y sont puissantes et la baignade est déconseillée, mais le paysage est saisissant de beauté. La plage est bordée de cocotiers sauvages et de raisiniers de bord de mer. Au lever du jour, la lumière dorée sur le sable noir offre des opportunités photographiques exceptionnelles. Le Prêcheur, commune voisine, propose des sentiers de marche le long de la côte volcanique.",
    galerie: [
      'https://images.pexels.com/photos/464319/pexels-photo-464319.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/15576656/pexels-photo-15576656.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/36955224/pexels-photo-36955224.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    niveauEffort: 3,
    dureeMoyenne: '2h30',
    costEstimate: 'Gratuit',
    image: 'https://images.pexels.com/photos/30234520/pexels-photo-30234520.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    bestTimeOfDay: 'matin',
  },
  {
    id: 'pointe-marin',
    nom: 'Pointe du Marin',
    categorie: 'Plages',
    zone: 'Sud Caraïbe',
    description: "Plage tranquille au sud du Marin, protégée par une pointe rocheuse. Eaux calmes parfaites pour le farniente et la baignade en famille, avec restaurants de plage à proximité.",
    descriptionLongue: "La Pointe du Marin est une plage tranquille située au sud du Marin, idéalement protégée par une pointe rocheuse naturelle qui bloque les vagues et les courants. Les eaux y sont d'une clarté remarquable et d'une température agréable toute l'année. Cette plage est particulièrement adaptée aux familles avec enfants grâce à sa faible profondeur et à l'absence de vagues. Plusieurs restaurants de plage et snacks bordent le site, proposant une cuisine locale de qualité à des prix raisonnables. La plage offre une vue magnifique sur le Rocher du Diamant au loin. Le coucher de soleil depuis la pointe rocheuse est un moment à ne pas manquer. C'est un lieu de détente par excellence, parfait pour une après-midi de farniente après des activités plus sportives le matin.",
    galerie: [
      'https://images.pexels.com/photos/12446345/pexels-photo-12446345.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/319912/pexels-photo-319912.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/11193432/pexels-photo-11193432.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    niveauEffort: 1,
    dureeMoyenne: '2h',
    costEstimate: 'Gratuit',
    image: 'https://images.pexels.com/photos/2627087/pexels-photo-2627087.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    bestTimeOfDay: 'any',
  },

  // === RANDONNÉES ===
  {
    id: 'montagne-pelee',
    nom: 'Montagne Pelée',
    categorie: 'Randonnées',
    zone: 'Nord Atlantique',
    description: "Ascension du volcan mythique (1397m) à travers forêt tropicale puis paysage lunaire. Vue panoramique sur l'île par temps clair. Randonnée exigeante, départ avant l'aube recommandé.",
    descriptionLongue: "La Montagne Pelée est le point culminant de Martinique avec ses 1397 mètres. Ce volcan actif, à l'origine de la destruction de Saint-Pierre en 1902, est aujourd'hui un site de randonnée majeur. L'ascension se fait généralement par le sentier de l'Aileron, qui traverse d'abord une forêt tropicale humide luxuriante avant de déboucher sur un paysage lunaire de cendres et de roches volcaniques. Les deux derniers cents mètres nécessitent une escalade facile mais aérienne. Par temps clair, le sommet offre une vue panoramique à 360° sur toute l'île, la Dominique et Sainte-Lucie. Le départ doit se faire impérativement avant l'aube, car le sommet est régulièrement englouti dans les nuages dès 10h. Comptez 5 à 6 heures aller-retour. Prévoyez 2 litres d'eau par personne, une veste coupe-vent, un chapeau et de quoi se protéger du soleil. Un guide est recommandé pour les randonneurs peu expérimentés.",
    galerie: [
      'https://images.pexels.com/photos/29902718/pexels-photo-29902718.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/31350286/pexels-photo-31350286.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/37559058/pexels-photo-37559058.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    niveauEffort: 5,
    dureeMoyenne: '5h',
    costEstimate: '10€ (guide optionnel)',
    image: 'https://images.pexels.com/photos/35753266/pexels-photo-35753266.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    bestTimeOfDay: 'matin',
  },
  {
    id: 'caravelle',
    nom: "Presqu'île de la Caravelle",
    categorie: 'Randonnées',
    zone: 'Nord Atlantique',
    description: "Sentier côtier de 12 km à travers mangrove, savane et ruines du château Dubuc. Vues spectaculaires sur l'Atlantique. Faune variée, iguanes et oiseaux marins.",
    descriptionLongue: "La presqu'île de la Caravelle offre l'un des sentiers de randonnée les plus diversifiés de Martinique. Ce parcours de 12 km traverse une mosaïque de paysages : mangrove, savane herbeuse, forêt sèche, falaises basaltiques et plages isolées. Le sentier longe la côte Atlantique avec des vues spectaculaires sur l'océan et les vagues qui se brisent sur les rochers. En chemin, vous découvrirez les ruines du château Dubuc, une ancienne habitation sucrière du XVIIIe siècle, et l'ancienne distillerie. La faune est remarquable : iguanes verts, oiseaux marins, crabes et parfois des baleines à bosse en saison. Le sentier se termine par la plage de l'Anse Chauvet, idéale pour se rafraîchir. Apportez impérativement chapeau, crème solaire et eau, car le sentier est peu ombragé sur la portion de savane.",
    galerie: [
      'https://images.pexels.com/photos/33843311/pexels-photo-33843311.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/5118096/pexels-photo-5118096.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/3997407/pexels-photo-3997407.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    niveauEffort: 3,
    dureeMoyenne: '4h',
    costEstimate: 'Gratuit',
    image: 'https://images.pexels.com/photos/7134253/pexels-photo-7134253.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    bestTimeOfDay: 'matin',
  },
  {
    id: 'trace-jesuites',
    nom: 'Trace des Jésuites',
    categorie: 'Randonnées',
    zone: 'Centre',
    description: "Sentier historique pavé datant du XVIIe siècle à travers la forêt tropicale humide. Cheminement entre murs de pierre couverts de mousse, tunnels de verdure et ruisseaux.",
    descriptionLongue: "La Trace des Jésuites est un sentier historique pavé datant du XVIIe siècle, utilisé autrefois par les missionnaires jésuites pour traverser l'île du nord au sud. Le chemin s'enfonce dans la forêt tropicale humide du parc naturel régional de la Martinique, offrant une expérience immersive au cœur de la nature. Le sentier est bordé de murs de pierre couverts de mousse, de fougères arborescentes et de racines de figuiers étrangleurs. Des tunnels de verdure créent une ambiance presque mystique, ponctuée par le bruit des ruisseaux et le chant des oiseaux. Le sentier est relativement plat mais peut être glissant après la pluie. Des chaussures de marche sont recommandées. Le départ se fait depuis le parking de l'Ajoupa-Bouillon. C'est une randonnée accessible qui convient à tous les niveaux.",
    galerie: [
      'https://images.pexels.com/photos/11798146/pexels-photo-11798146.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/904808/pexels-photo-904808.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/235734/pexels-photo-235734.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    niveauEffort: 2,
    dureeMoyenne: '2h30',
    costEstimate: 'Gratuit',
    image: 'https://images.pexels.com/photos/4268092/pexels-photo-4268092.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    bestTimeOfDay: 'matin',
  },

  // === RIVIÈRES & CASCADES ===
  {
    id: 'saut-gendarme',
    nom: 'Saut Gendarme',
    categorie: 'Rivières & Cascades',
    zone: 'Nord Atlantique',
    description: "Bassin naturel d'eau douce rafraîchissante au cœur de la forêt tropicale. Petit saut de 3m accessible à tous. Parfait pour se rafraîchir après une randonnée matinale.",
    descriptionLongue: "Le Saut Gendarme est un bassin naturel d'eau douce rafraîchissante niché au cœur de la forêt tropicale de la route de la Trace. Un petit saut de 3 mètres permet de plonger dans le bassin, accessible à tous les nageurs. Le site est entouré d'une végétation luxuriante qui filtre la lumière et maintient une ambiance fraîche et humide, idéale en matinée. Le bassin est alimenté par une petite cascade et l'eau y est d'une clarté remarquable. Le site est peu aménagé : pas de sanitaires ni de snack, d'où l'importance d'apporter eau et collations. Le parking est limité le long de la route de la Trace. C'est un lieu parfait pour se rafraîchir après une randonnée matinale dans les environs. Le site est gratuit et accessible à tous.",
    galerie: [
      'https://images.pexels.com/photos/31356361/pexels-photo-31356361.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/12832511/pexels-photo-12832511.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/37197891/pexels-photo-37197891.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    niveauEffort: 2,
    dureeMoyenne: '2h',
    costEstimate: 'Gratuit',
    image: 'https://images.pexels.com/photos/4965898/pexels-photo-4965898.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    bestTimeOfDay: 'matin',
  },
  {
    id: 'cascades-didier',
    nom: 'Cascades Didier',
    categorie: 'Rivières & Cascades',
    zone: 'Centre',
    description: "Suite de cascades successives dans un cadre luxuriant. Accès par un sentier escarpé avec marches. Bassins naturels à plusieurs niveaux pour la baignade.",
    descriptionLongue: "Les Cascades Didier forment une suite de cascades successives dans un cadre tropical luxuriant, situées sur la commune de Fort-de-France. L'accès se fait par un sentier escarpé avec des marches en béton et en bois, qui descend à travers la forêt. Le site comprend plusieurs bassins naturels à différents niveaux, chacun alimenté par une cascade. Le bassin principal, le plus grand, est le plus prisé pour la baignade. Les roches sont glissantes : prévoyez des chaussures aquatiques. La cascade la plus haute nécessite une escalade facile mais délicate. Le site est ombragé, ce qui le rend agréable même en milieu de journée. L'accès est gratuit mais le parking est limité au bord de la route. Le sentier peut être fermé après de fortes pluies pour des raisons de sécurité.",
    galerie: [
      'https://images.pexels.com/photos/11710190/pexels-photo-11710190.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/37197891/pexels-photo-37197891.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/12832511/pexels-photo-12832511.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    niveauEffort: 3,
    dureeMoyenne: '3h',
    costEstimate: 'Gratuit',
    image: 'https://images.pexels.com/photos/15381973/pexels-photo-15381973.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    bestTimeOfDay: 'matin',
  },
  {
    id: 'gorges-falaise',
    nom: 'Gorges de la Falaise',
    categorie: 'Rivières & Cascades',
    zone: 'Nord Atlantique',
    description: "Canyon spectaculaire avec cascade de 40m. Accès par escalier de 200 marches. Bassin profond pour nageurs confirmés. Site emblématique du nord Atlantique.",
    descriptionLongue: "Les Gorges de la Falaise sont un canyon spectaculaire creusé dans la roche volcanique, dominé par une cascade de 40 mètres de hauteur. L'accès au site se fait par un escalier de 200 marches qui descend dans la gorge, offrant des vues vertigineuses sur les parois rocheuses couvertes de fougères et de mousses. Au pied de la cascade, un bassin profond permet la baignade, mais il est réservé aux nageurs confirmés en raison de la profondeur et du courant généré par la chute d'eau. Le site est aménagé et payant (parking à 5€), avec des sanitaires et un snack. Le site ferme à 16h30, d'où l'importance d'arriver tôt. C'est l'un des sites naturels les plus spectaculaires du nord Atlantique, à combiner idéalement avec la presqu'île de la Caravelle voisine.",
    galerie: [
      'https://images.pexels.com/photos/12832511/pexels-photo-12832511.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/31356361/pexels-photo-31356361.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/11710190/pexels-photo-11710190.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    niveauEffort: 3,
    dureeMoyenne: '3h',
    costEstimate: '5€ (parking)',
    image: 'https://images.pexels.com/photos/32182187/pexels-photo-32182187.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    bestTimeOfDay: 'matin',
  },

  // === CULTURE & PATRIMOINE ===
  {
    id: 'memorial-caffard',
    nom: "Mémorial de l'Anse Caffard",
    categorie: 'Culture & Patrimoine',
    zone: 'Sud Caraïbe',
    description: "Mémorial poignant du naufrage négrier de 1830. 15 statues blanches tournées vers la mer. Site chargé d'histoire, vue imprenable sur la côte sud.",
    descriptionLongue: "Le Mémorial de l'Anse Caffard commémore le naufrage d'un navire négrier survenu le 26 avril 1830, au large du Diamant. Les 15 statues blanches, alignées face à la mer, rendent hommage aux victimes de la traite négrière et à celles du naufrage. L'œuvre du sculpteur Laurent Valère est à la fois poignante et majestueuse, les silhouettes tournées vers l'horizon évoquant à la fois le deuil et l'espoir. Le site est en plein air, gratuit et accessible à tout moment. La vue sur le Rocher du Diamant et la côte sud est imprenable. C'est un lieu de recueillement et de mémoire, à combiner avec une visite du Diamant. La lumière est particulièrement belle en fin d'après-midi, lorsque les statues projettent de longues ombres sur l'herbe.",
    galerie: [
      'https://images.pexels.com/photos/34541267/pexels-photo-34541267.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/32947930/pexels-photo-32947930.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/13568250/pexels-photo-13568250.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    niveauEffort: 1,
    dureeMoyenne: '1h',
    costEstimate: 'Gratuit',
    image: 'https://images.pexels.com/photos/13568250/pexels-photo-13568250.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    bestTimeOfDay: 'any',
  },
  {
    id: 'habitation-clement',
    nom: 'Habitation Clément',
    categorie: 'Culture & Patrimoine',
    zone: 'Centre',
    description: "Ancienne plantation de canne à sucre restaurée, classée Monument Historique. Visite des bâtiments, de la distillerie et des jardins. Lieu du sommet Franco-Africain de 1991.",
    descriptionLongue: "L'Habitation Clément est une ancienne plantation de canne à sucre du XVIIe siècle, méticuleusement restaurée et classée Monument Historique. Le site comprend l'ancienne maison de maître, les dépendances, la distillerie et de magnifiques jardins botaniques créoles. C'est ici qu'a eu lieu le sommet Franco-Africain de 1991, réunissant le Président Mitterrand et les chefs d'État africains. La visite guidée permet de découvrir l'histoire de l'habitation, le processus de fabrication du rhum agricole et l'architecture créole traditionnelle. Les jardins botaniques, avec leurs collections de plantes médicinales et ornementales, valent la visite à eux seuls. Une boutique de rhum et un restaurant sont sur place. La visite dure environ 2 heures, dernière entrée à 16h.",
    galerie: [
      'https://images.pexels.com/photos/15047925/pexels-photo-15047925.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/32155884/pexels-photo-32155884.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/13103343/pexels-photo-13103343.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    niveauEffort: 1,
    dureeMoyenne: '2h',
    costEstimate: '12€',
    image: 'https://images.pexels.com/photos/5769567/pexels-photo-5769567.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    bestTimeOfDay: 'any',
  },
  {
    id: 'musee-banane',
    nom: 'Musée de la Banane',
    categorie: 'Culture & Patrimoine',
    zone: 'Nord Atlantique',
    description: "Musée unique en son genre retrace l'histoire de la culture bananière en Martinique. Plantation de 40 variétés de bananiers, dégustation et boutique de produits locaux.",
    descriptionLongue: "Le Musée de la Banane est un musée unique en son genre, installé dans une ancienne plantation bananière de la commune du Macouba, dans le nord Atlantique. Il retrace l'histoire de la culture bananière en Martinique, de son introduction au XIXe siècle à nos jours. Le parcours présente plus de 40 variétés de bananiers, des plus communes aux plus rares, avec des explications détaillées sur la botanique, la culture et l'économie de la banane. La visite se fait à travers un parcours ombragé et accessible, ponctué de panneaux explicatifs et de démonstrations. Une dégustation de produits dérivés (confiture, chips, rhum) est incluse dans le billet d'entrée. La boutique propose des produits locaux à base de banane. Le musée ferme le dimanche. C'est une visite instructive et conviviale, idéale pour les familles.",
    galerie: [
      'https://images.pexels.com/photos/16761787/pexels-photo-16761787.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/15876349/pexels-photo-15876349.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/19643774/pexels-photo-19643774.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    niveauEffort: 1,
    dureeMoyenne: '1h30',
    costEstimate: '8€',
    image: 'https://images.pexels.com/photos/34454659/pexels-photo-34454659.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    bestTimeOfDay: 'any',
  },
  {
    id: 'saint-pierre',
    nom: 'Saint-Pierre',
    categorie: 'Culture & Patrimoine',
    zone: 'Nord Caraïbe',
    description: "Ancienne 'Petite Paris des Antilles' détruite par l'éruption de 1902. Ruines du théâtre, cachot de Cyparis, musée volcanologique. Ville d'art et d'histoire au bord de mer.",
    descriptionLongue: "Saint-Pierre, ancienne 'Petite Paris des Antilles', fut la capitale économique et culturelle de la Martinique jusqu'à sa destruction totale par l'éruption de la Montagne Pelée le 8 mai 1902. L'éruption fit 28 000 victimes en moins de deux minutes. Aujourd'hui, la ville conserve les ruines de son théâtre, de sa cathédrale et du cachot de Cyparis, le seul survivant de la catastrophe. Le musée volcanologique retrace l'histoire de l'éruption avec des artefacts poignants et des explications scientifiques. La ville a été reconstruite et est aujourd'hui un lieu de mémoire et de culture, avec un front de mer animé, des restaurants et des galeries d'art. Saint-Pierre est classée Ville d'Art et d'Histoire. La visite se fait à pied, en flânant dans les rues et le long du front de mer. Garez-vous sur le bord de mer, accès libre aux ruines.",
    galerie: [
      'https://images.pexels.com/photos/38101423/pexels-photo-38101423.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/31832050/pexels-photo-31832050.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/33678797/pexels-photo-33678797.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    niveauEffort: 1,
    dureeMoyenne: '3h',
    costEstimate: '15€ (musées)',
    image: 'https://images.pexels.com/photos/35342168/pexels-photo-35342168.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    bestTimeOfDay: 'any',
  },

  // === SPORT & AVENTURE ===
  {
    id: 'snorkeling-anses-arlet',
    nom: 'Snorkeling Anses d\'Arlet',
    categorie: 'Sport & Aventure',
    zone: 'Sud Caraïbe',
    description: "Spot de snorkeling de renom, réserve marine protégée. Tortues marines, poissons-perroquets, coraux. Eaux calmes et claires, accessible aux débutants.",
    descriptionLongue: "Les Anses d'Arlet abritent l'un des spots de snorkeling les plus réputés de Martinique, dans une réserve marine protégée. Les eaux calmes et claires abritent une biodiversité exceptionnelle : tortues vertes, tortues imbriquées, poissons-perroquets, poissons-clowns, oursins, étoiles de mer et une grande variété de coraux. Les herbiers marins peu profonds sont le lieu de nutrition des tortues, qui peuvent être observées de près sans les déranger. Le spot est accessible aux débutants comme aux confirmés, avec une profondeur variant de 1 à 8 mètres. Le matériel de snorkeling peut être loué sur place. La meilleure période pour la visibilité est le matin, avant que le vent ne se lève. Respectez la réserve marine : ne touchez pas les coraux, ne nourrissez pas les poissons, et maintenez une distance respectueuse avec les tortues.",
    galerie: [
      'https://images.pexels.com/photos/2314945/pexels-photo-2314945.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/20443161/pexels-photo-20443161.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/7903014/pexels-photo-7903014.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    niveauEffort: 2,
    dureeMoyenne: '2h30',
    costEstimate: '25€ (matériel)',
    image: 'https://images.pexels.com/photos/2404370/pexels-photo-2404370.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    bestTimeOfDay: 'matin',
  },
  {
    id: 'kayak-mangrove',
    nom: 'Kayak Mangrove aux Trois-Îlets',
    categorie: 'Sport & Aventure',
    zone: 'Centre',
    description: "Exploration de la mangrove en kayak à travers chenaux naturels. Observation d'iguanes, oiseaux et crustacés. Écosystème unique, parcours guidé ou libre.",
    descriptionLongue: "La mangrove des Trois-Îlets est un écosystème unique et fragile, explorable en kayak à travers un réseau de chenaux naturels. Cette forêt inondée, composée de palétuviers à racines échasses, abrite une biodiversité remarquable : iguanes verts, oiseaux marins (hérons, aigrettes), crustacés (crabes violonistes), et une multitude de poissons juvéniles qui trouvent refuge dans les racines. Le parcours serpente entre les arbres, offrant une ambiance calme et mystérieuse, à l'abri du soleil et du vent. Des sorties guidées sont proposées par des associations locales, avec des explications sur l'écologie de la mangrove et son rôle de nurserie marine. Le parcours libre est également possible pour les kayakistes expérimentés. La marée haute est idéale pour naviguer dans tous les chenaux. Appliquez une crème solaire 30 minutes avant, car la mangrove n'offre pas d'ombre sur les portions ouvertes.",
    galerie: [
      'https://images.pexels.com/photos/29643901/pexels-photo-29643901.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/32882940/pexels-photo-32882940.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/28961799/pexels-photo-28961799.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    niveauEffort: 2,
    dureeMoyenne: '2h30',
    costEstimate: '30€',
    image: 'https://images.pexels.com/photos/29643901/pexels-photo-29643901.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    bestTimeOfDay: 'matin',
  },
  {
    id: 'canyoning',
    nom: 'Canyoning',
    categorie: 'Sport & Aventure',
    zone: 'Nord Atlantique',
    description: "Descente de canyon avec sauts, toboggans naturels et rappel sous cascade. Encadrement professionnel obligatoire. Sensations fortes garanties dans les gorges du nord.",
    descriptionLongue: "Le canyoning en Martinique consiste à descendre des gorges et canyons naturels par une combinaison de marche, de nage, de sauts, de toboggans naturels et de rappel sous des cascades. Les gorges du nord Atlantique, creusées dans la roche volcanique, offrent des parcours variés adaptés à différents niveaux. L'encadrement par un moniteur professionnel est obligatoire, le matériel technique (combinaison, casque, baudrier, cordes) est fourni. Les sauts varient de 2 à 8 mètres, les toboggans naturels offrent des glissades ludiques dans des bassins d'eau douce. Le rappel sous cascade est l'apogée de l'expérience. La sortie dure environ 4 heures, dont 2 à 3 heures dans l'eau. Prévoyez maillot, chaussures fermées et serviette. La réservation est obligatoire, les créneaux sont principalement le matin. Sensations fortes garanties dans un cadre naturel spectaculaire.",
    galerie: [
      'https://images.pexels.com/photos/26976906/pexels-photo-26976906.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/26976907/pexels-photo-26976907.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/11047812/pexels-photo-11047812.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    niveauEffort: 4,
    dureeMoyenne: '4h',
    costEstimate: '65€',
    image: 'https://images.pexels.com/photos/26976906/pexels-photo-26976906.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    bestTimeOfDay: 'matin',
  },

  // === GASTRONOMIE & DISTILLERIES ===
  {
    id: 'distillerie-depaz',
    nom: 'Distillerie Depaz',
    categorie: 'Gastronomie & Distilleries',
    zone: 'Nord Caraïbe',
    description: "Domaine de 1634 au pied de la Montagne Pelée. Château bleu, jardins créoles, visite de la distillerie et dégustation de rhum agricole. Cadre magique et vue sur la baie.",
    descriptionLongue: "La Distillerie Depaz est un domaine historique fondé en 1634, niché au pied de la Montagne Pelée avec une vue magnifique sur la baie de Saint-Pierre. Le domaine est célèbre pour son château bleu, ses jardins créoles impeccables et sa distillerie en activité. La visite guidée permet de découvrir le processus complet de fabrication du rhum agricole, de la coupe de la canne à sucre à la fermentation et à la distillation. La dégustation de rhum commentée à la fin de la visite est un moment privilégié pour apprécier les différentes cuvées. Les jardins créoles, avec leurs allées bordées de fleurs et de plantes tropicales, sont un véritable havre de paix. La visite dure environ 2 heures, avec des créneaux à 10h et 14h30. La boutique propose des rhums et des produits dérivés. C'est un site à combiner absolument avec la visite de Saint-Pierre voisine.",
    galerie: [
      'https://images.pexels.com/photos/5720872/pexels-photo-5720872.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/14593410/pexels-photo-14593410.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/10602640/pexels-photo-10602640.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    niveauEffort: 1,
    dureeMoyenne: '2h',
    costEstimate: '10€',
    image: 'https://images.pexels.com/photos/5720872/pexels-photo-5720872.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    bestTimeOfDay: 'any',
  },
  {
    id: 'distillerie-neisson',
    nom: 'Distillerie Neisson',
    categorie: 'Gastronomie & Distilleries',
    zone: 'Nord Caraïbe',
    description: "Distillerie familiale réputée pour ses rhums agricoles primés mondialement. Visite guidée du processus de fabrication, de la canne à la bouteille. Dégustation commentée.",
    descriptionLongue: "La Distillerie Neisson est une entreprise familiale située au Carbet, réputée mondialement pour la qualité de ses rhums agricoles. Fondée en 1931, elle est l'une des dernières distilleries indépendantes de Martinique. La visite guidée permet de suivre le processus complet de fabrication, de la réception de la canne à sucre fraîche à la mise en bouteille, en passant par la fermentation, la distillation au column et le vieillissement en fûts de chêne. La dégustation commentée à la fin permet d'apprécier les différentes expressions du rhum agricole : blanc, élevé sous bois, et vieux. La boutique propose des éditions limitées et des rhums rares introuvables ailleurs. Les visites se font sur réservation, avec des créneaux à 10h et 15h. La distillerie ferme le week-end. C'est une visite incontournable pour les amateurs de rhum et les curieux de l'artisanat martiniquais.",
    galerie: [
      'https://images.pexels.com/photos/10039992/pexels-photo-10039992.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/34968168/pexels-photo-34968168.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/10602640/pexels-photo-10602640.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    niveauEffort: 1,
    dureeMoyenne: '1h30',
    costEstimate: '12€',
    image: 'https://images.pexels.com/photos/10039992/pexels-photo-10039992.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    bestTimeOfDay: 'any',
  },
  {
    id: 'marche-fort-de-france',
    nom: 'Marché de Fort-de-France',
    categorie: 'Gastronomie & Distilleries',
    zone: 'Centre',
    description: "Grand marché couvert aux couleurs et senteurs des Antilles. Épices, fruits exotiques, plats créoles, artisanat. L'âme de la ville, à découvrir en matinée.",
    descriptionLongue: "Le marché de Fort-de-France est le grand marché couvert de la capitale, un lieu vibrant aux couleurs et senteurs des Antilles. Sous une structure métallique datant du début du XXe siècle, les étals proposent une profusion de produits : épices en vrac (curcuma, colombo, piment, muscade), fruits exotiques (mangues, ananas, goyaves, fruits de la passion), plats créoles préparés sur place (accras, boudin, dombrés), et artisanat local (vannerie, bijoux créoles, madras). C'est l'âme de la ville, un lieu de rencontre et d'échange où les Martiniquais font leurs courses et discutent. Le marché est plus animé le matin, les stands ferment vers 15h. Évitez les heures de pointe en ville (7h-9h et 16h30-18h30) pour vous y rendre. C'est un lieu idéal pour découvrir les saveurs et l'ambiance de la Martinique authentique.",
    galerie: [
      'https://images.pexels.com/photos/14776501/pexels-photo-14776501.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/30521864/pexels-photo-30521864.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/30893227/pexels-photo-30893227.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    niveauEffort: 1,
    dureeMoyenne: '1h30',
    costEstimate: 'Gratuit',
    image: 'https://images.pexels.com/photos/14776501/pexels-photo-14776501.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    bestTimeOfDay: 'matin',
  },
];

export const ZONE_DISTANCES: Record<Zone, Record<Zone, number>> = {
  'Nord Caraïbe': {
    'Nord Caraïbe': 15,
    'Sud Caraïbe': 90,
    'Nord Atlantique': 45,
    'Centre': 35,
  },
  'Sud Caraïbe': {
    'Nord Caraïbe': 90,
    'Sud Caraïbe': 20,
    'Nord Atlantique': 75,
    'Centre': 45,
  },
  'Nord Atlantique': {
    'Nord Caraïbe': 45,
    'Sud Caraïbe': 75,
    'Nord Atlantique': 20,
    'Centre': 30,
  },
  'Centre': {
    'Nord Caraïbe': 35,
    'Sud Caraïbe': 45,
    'Nord Atlantique': 30,
    'Centre': 15,
  },
};

export const HEBERGEMENTS = [
  'Les Anses-d\'Arlet',
  'L\'Ajoupa-Bouillon',
  'Basse-Pointe',
  'Bellefontaine',
  'Le Carbet',
  'Case-Pilote',
  'Le Diamant',
  'Ducos',
  'Fonds-Saint-Denis',
  'Fort-de-France',
  'Gros-Morne',
  'Le Lamentin',
  'Le Lorrain',
  'Le Marin',
  'Le Morne-Rouge',
  'Le Prêcheur',
  'Les Trois-Îlets',
  'Rivière-Pilote',
  'Rivière-Salée',
  'Le Robert',
  'Sainte-Anne',
  'Sainte-Luce',
  'Sainte-Marie',
  'Saint-Esprit',
  'Saint-Joseph',
  'Saint-Pierre',
  'Schœlcher',
  'La Trinité',
  'Le Vauclin',
];

export const COMMUNES = HEBERGEMENTS;

export const GROUPES = ['Couple', 'Famille', 'Solo', 'Amis'] as const;
export type Groupe = typeof GROUPES[number];

export const TRANSPORTS = ['Voiture', 'Transports'] as const;
export type Transport = typeof TRANSPORTS[number];
