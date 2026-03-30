// Red Data Book on Jammu and Kashmir Fauna - Kashmir-Specific Dataset
// Source: Red Data Book on Jammu and Kashmir Fauna (Provided source image/text)
// 
// KASHMIR-SPECIFIC FOCUS:
// This module uses the Red Data Book exclusively for Kashmir-related threatened fauna intelligence.
// All species are filtered for Kashmir relevance and conservation significance.
//
// SOURCE CONTEXT:
// There are several species of animals which have either been wiped out completely or are on the 
// verge of local extinction due to hunting pressures, grazing competition with domestic livestock, 
// and poaching for fur trade. About 45% of the mammalian diversity of the state is listed as 
// globally threatened in the IUCN Red Data List and 34% is included in Schedule I of the Central 
// Wildlife Protection Act, 1972. This indicates the conservation value of the fauna of the region.
// There are also species facing similar threats that are not fully reflected in either list.

export interface RedDataSpecies {
  id: string;
  slug: string;
  commonName: string;
  taxonGroup: 'mammals' | 'birds' | 'reptiles-amphibians';
  sourceGroup: string;
  iucn1996Status: 'Endangered' | 'Vulnerable' | 'Intermediate' | 'Data Deficient' | 'Not Included';
  wildlifeProtectionAct1972Status: 'Schedule I' | 'Schedule II' | 'Schedule III' | 'Not Included';
  kashmirRelevance: boolean;
  prioritySpecies: boolean;
  source: string;
  sourceType: string;
  sourceNotes?: string[];
  conservationTheme: string;
  displayPriority: 'high' | 'medium' | 'low';
}

export const RED_DATA_SOURCE_METADATA = {
  sourceTitle: 'Red Data Book on Jammu and Kashmir Fauna',
  sourceType: 'Provided source image/text',
  focus: 'Kashmir-related threatened fauna',
  conservationContext: {
    summary: 'About 45% of mammalian diversity listed as globally threatened in IUCN Red Data List; 34% included in Schedule I of Wildlife Protection Act, 1972',
    threats: [
      'Hunting pressures',
      'Grazing competition with domestic livestock',
      'Poaching for fur trade',
      'Habitat degradation',
      'Human disturbance'
    ],
    significance: 'Indicates high conservation value of Kashmir region fauna'
  },
  speciesCounts: {
    mammals: 23,
    birds: 10,
    reptilesAmphibians: 4,
    total: 37,
    prioritySpecies: 7
  }
};

// NORMALIZED KASHMIR-FOCUSED THREATENED FAUNA DATASET
// "Do" values from source have been replaced with actual preceding status values
export const RED_DATA_KASHMIR_SPECIES: RedDataSpecies[] = [
  // ============================================================================
  // THREATENED MAMMALS (23 species)
  // ============================================================================
  {
    id: 'pale-grey-shrew',
    slug: 'pale-grey-shrew',
    commonName: 'Pale Grey Shrew',
    taxonGroup: 'mammals',
    sourceGroup: 'Threatened Mammals',
    iucn1996Status: 'Vulnerable',
    wildlifeProtectionAct1972Status: 'Not Included',
    kashmirRelevance: true,
    prioritySpecies: false,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Small mammal conservation',
    displayPriority: 'low'
  },
  {
    id: 'lesser-horse-shoe-bat',
    slug: 'lesser-horse-shoe-bat',
    commonName: 'Lesser Horse-shoe Bat',
    taxonGroup: 'mammals',
    sourceGroup: 'Threatened Mammals',
    iucn1996Status: 'Vulnerable',
    wildlifeProtectionAct1972Status: 'Schedule I',
    kashmirRelevance: true,
    prioritySpecies: false,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Bat conservation',
    displayPriority: 'medium'
  },
  {
    id: 'greater-horse-shoe-bat',
    slug: 'greater-horse-shoe-bat',
    commonName: 'Greater Horse-shoe Bat',
    taxonGroup: 'mammals',
    sourceGroup: 'Threatened Mammals',
    iucn1996Status: 'Intermediate',
    wildlifeProtectionAct1972Status: 'Schedule I',
    kashmirRelevance: true,
    prioritySpecies: false,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Bat conservation',
    displayPriority: 'medium'
  },
  {
    id: 'leislers-hairy-armed-bat',
    slug: 'leislers-hairy-armed-bat',
    commonName: "Leisler's Hairy-armed Bat",
    taxonGroup: 'mammals',
    sourceGroup: 'Threatened Mammals',
    iucn1996Status: 'Vulnerable',
    wildlifeProtectionAct1972Status: 'Schedule I',
    kashmirRelevance: true,
    prioritySpecies: false,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Bat conservation',
    displayPriority: 'medium'
  },
  {
    id: 'common-noctule',
    slug: 'common-noctule',
    commonName: 'Common Noctule',
    taxonGroup: 'mammals',
    sourceGroup: 'Threatened Mammals',
    iucn1996Status: 'Vulnerable',
    wildlifeProtectionAct1972Status: 'Schedule I',
    kashmirRelevance: true,
    prioritySpecies: false,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Bat conservation',
    displayPriority: 'medium'
  },
  {
    id: 'theobalds-bat',
    slug: 'theobalds-bat',
    commonName: "Theobald's Bat",
    taxonGroup: 'mammals',
    sourceGroup: 'Threatened Mammals',
    iucn1996Status: 'Vulnerable',
    wildlifeProtectionAct1972Status: 'Schedule I',
    kashmirRelevance: true,
    prioritySpecies: false,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Bat conservation',
    displayPriority: 'medium'
  },
  {
    id: 'leopard',
    slug: 'leopard',
    commonName: 'Leopard',
    taxonGroup: 'mammals',
    sourceGroup: 'Threatened Mammals',
    iucn1996Status: 'Vulnerable',
    wildlifeProtectionAct1972Status: 'Schedule I',
    kashmirRelevance: true,
    prioritySpecies: false,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Large carnivore conservation',
    displayPriority: 'high'
  },
  {
    id: 'snow-leopard',
    slug: 'snow-leopard',
    commonName: 'Snow Leopard',
    taxonGroup: 'mammals',
    sourceGroup: 'Threatened Mammals',
    iucn1996Status: 'Endangered',
    wildlifeProtectionAct1972Status: 'Schedule I',
    kashmirRelevance: true,
    prioritySpecies: true,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Flagship high-altitude carnivore',
    displayPriority: 'high'
  },
  {
    id: 'himalayan-brown-bear',
    slug: 'himalayan-brown-bear',
    commonName: 'Himalayan Brown Bear',
    taxonGroup: 'mammals',
    sourceGroup: 'Threatened Mammals',
    iucn1996Status: 'Vulnerable',
    wildlifeProtectionAct1972Status: 'Schedule I',
    kashmirRelevance: true,
    prioritySpecies: true,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Large omnivore conservation',
    displayPriority: 'high'
  },
  {
    id: 'himalayan-black-bear',
    slug: 'himalayan-black-bear',
    commonName: 'Himalayan Black Bear',
    taxonGroup: 'mammals',
    sourceGroup: 'Threatened Mammals',
    iucn1996Status: 'Vulnerable',
    wildlifeProtectionAct1972Status: 'Schedule II',
    kashmirRelevance: true,
    prioritySpecies: true,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Forest omnivore conservation',
    displayPriority: 'high'
  },
  {
    id: 'kashmir-stag',
    slug: 'kashmir-stag',
    commonName: 'Kashmir Stag',
    taxonGroup: 'mammals',
    sourceGroup: 'Threatened Mammals',
    iucn1996Status: 'Endangered',
    wildlifeProtectionAct1972Status: 'Schedule I',
    kashmirRelevance: true,
    prioritySpecies: true,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Kashmir endemic ungulate',
    displayPriority: 'high'
  },
  {
    id: 'himalayan-musk-deer',
    slug: 'himalayan-musk-deer',
    commonName: 'Himalayan Musk Deer',
    taxonGroup: 'mammals',
    sourceGroup: 'Threatened Mammals',
    iucn1996Status: 'Intermediate',
    wildlifeProtectionAct1972Status: 'Schedule I',
    kashmirRelevance: true,
    prioritySpecies: false,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'High-altitude ungulate',
    displayPriority: 'medium'
  },
  {
    id: 'pir-panjal-markhor',
    slug: 'pir-panjal-markhor',
    commonName: 'Pir Panjal Markhor',
    taxonGroup: 'mammals',
    sourceGroup: 'Threatened Mammals',
    iucn1996Status: 'Data Deficient',
    wildlifeProtectionAct1972Status: 'Schedule I',
    kashmirRelevance: true,
    prioritySpecies: true,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Kashmir endemic caprid',
    displayPriority: 'high'
  },
  {
    id: 'mainland-serow',
    slug: 'mainland-serow',
    commonName: 'Mainland Serow',
    taxonGroup: 'mammals',
    sourceGroup: 'Threatened Mammals',
    iucn1996Status: 'Vulnerable',
    wildlifeProtectionAct1972Status: 'Schedule I',
    kashmirRelevance: true,
    prioritySpecies: false,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Mountain ungulate',
    displayPriority: 'medium'
  },
  {
    id: 'himalayan-ibex',
    slug: 'himalayan-ibex',
    commonName: 'Himalayan Ibex',
    taxonGroup: 'mammals',
    sourceGroup: 'Threatened Mammals',
    iucn1996Status: 'Intermediate',
    wildlifeProtectionAct1972Status: 'Schedule I',
    kashmirRelevance: true,
    prioritySpecies: false,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'High-altitude caprid',
    displayPriority: 'medium'
  },
  {
    id: 'himalayan-tahr',
    slug: 'himalayan-tahr',
    commonName: 'Himalayan Tahr',
    taxonGroup: 'mammals',
    sourceGroup: 'Threatened Mammals',
    iucn1996Status: 'Vulnerable',
    wildlifeProtectionAct1972Status: 'Schedule I',
    kashmirRelevance: true,
    prioritySpecies: false,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Alpine ungulate',
    displayPriority: 'medium'
  },
  {
    id: 'himalayan-goral',
    slug: 'himalayan-goral',
    commonName: 'Himalayan Goral',
    taxonGroup: 'mammals',
    sourceGroup: 'Threatened Mammals',
    iucn1996Status: 'Intermediate',
    wildlifeProtectionAct1972Status: 'Schedule III',
    kashmirRelevance: true,
    prioritySpecies: false,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Mountain ungulate',
    displayPriority: 'medium'
  },
  {
    id: 'urial',
    slug: 'urial',
    commonName: 'Urial',
    taxonGroup: 'mammals',
    sourceGroup: 'Threatened Mammals',
    iucn1996Status: 'Endangered',
    wildlifeProtectionAct1972Status: 'Schedule I',
    kashmirRelevance: true,
    prioritySpecies: false,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Threatened wild sheep',
    displayPriority: 'high'
  },
  {
    id: 'kashmir-woolly-flying-squirrel',
    slug: 'kashmir-woolly-flying-squirrel',
    commonName: 'Kashmir Wolly Flying Squirrel',
    taxonGroup: 'mammals',
    sourceGroup: 'Threatened Mammals',
    iucn1996Status: 'Endangered',
    wildlifeProtectionAct1972Status: 'Not Included',
    kashmirRelevance: true,
    prioritySpecies: true,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Kashmir endemic rodent',
    displayPriority: 'high'
  },
  {
    id: 'small-kashmir-flying-squirrel',
    slug: 'small-kashmir-flying-squirrel',
    commonName: 'Small Kashmir Flying Squirrel',
    taxonGroup: 'mammals',
    sourceGroup: 'Threatened Mammals',
    iucn1996Status: 'Intermediate',
    wildlifeProtectionAct1972Status: 'Schedule I',
    kashmirRelevance: true,
    prioritySpecies: true,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Kashmir endemic rodent',
    displayPriority: 'high'
  },
  {
    id: 'royles-vole',
    slug: 'royles-vole',
    commonName: "Royle's Vole",
    taxonGroup: 'mammals',
    sourceGroup: 'Threatened Mammals',
    iucn1996Status: 'Intermediate',
    wildlifeProtectionAct1972Status: 'Schedule I',
    kashmirRelevance: true,
    prioritySpecies: false,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Small mammal conservation',
    displayPriority: 'low'
  },
  {
    id: 'little-grey-hamster',
    slug: 'little-grey-hamster',
    commonName: 'Little Grey Hamster',
    taxonGroup: 'mammals',
    sourceGroup: 'Threatened Mammals',
    iucn1996Status: 'Vulnerable',
    wildlifeProtectionAct1972Status: 'Schedule I',
    kashmirRelevance: true,
    prioritySpecies: false,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Small mammal conservation',
    displayPriority: 'low'
  },
  {
    id: 'royles-pika',
    slug: 'royles-pika',
    commonName: "Royle's Pika",
    taxonGroup: 'mammals',
    sourceGroup: 'Threatened Mammals',
    iucn1996Status: 'Vulnerable',
    wildlifeProtectionAct1972Status: 'Schedule I',
    kashmirRelevance: true,
    prioritySpecies: false,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Small mammal conservation',
    displayPriority: 'low'
  },

  // ============================================================================
  // THREATENED BIRDS (10 species)
  // ============================================================================
  {
    id: 'white-fronted-goose',
    slug: 'white-fronted-goose',
    commonName: 'White-fronted Goose',
    taxonGroup: 'birds',
    sourceGroup: 'Threatened Birds',
    iucn1996Status: 'Vulnerable',
    wildlifeProtectionAct1972Status: 'Schedule I',
    kashmirRelevance: true,
    prioritySpecies: false,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Migratory waterfowl',
    displayPriority: 'medium'
  },
  {
    id: 'white-headed-duck',
    slug: 'white-headed-duck',
    commonName: 'White-headed Duck',
    taxonGroup: 'birds',
    sourceGroup: 'Threatened Birds',
    iucn1996Status: 'Vulnerable',
    wildlifeProtectionAct1972Status: 'Schedule I',
    kashmirRelevance: true,
    prioritySpecies: false,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Threatened waterfowl',
    displayPriority: 'medium'
  },
  {
    id: 'european-black-vulture',
    slug: 'european-black-vulture',
    commonName: 'European Black Vulture',
    taxonGroup: 'birds',
    sourceGroup: 'Threatened Birds',
    iucn1996Status: 'Intermediate',
    wildlifeProtectionAct1972Status: 'Schedule I',
    kashmirRelevance: true,
    prioritySpecies: false,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Raptor conservation',
    displayPriority: 'medium'
  },
  {
    id: 'long-billed-vulture',
    slug: 'long-billed-vulture',
    commonName: 'Long-billed Vulture',
    taxonGroup: 'birds',
    sourceGroup: 'Threatened Birds',
    iucn1996Status: 'Vulnerable',
    wildlifeProtectionAct1972Status: 'Schedule I',
    kashmirRelevance: true,
    prioritySpecies: false,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Vulture conservation',
    displayPriority: 'high'
  },
  {
    id: 'western-tragopan',
    slug: 'western-tragopan',
    commonName: 'Western Tragopan',
    taxonGroup: 'birds',
    sourceGroup: 'Threatened Birds',
    iucn1996Status: 'Vulnerable',
    wildlifeProtectionAct1972Status: 'Schedule I',
    kashmirRelevance: true,
    prioritySpecies: true,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Kashmir pheasant',
    displayPriority: 'high'
  },
  {
    id: 'chir-pheasant',
    slug: 'chir-pheasant',
    commonName: 'Chir Pheasant',
    taxonGroup: 'birds',
    sourceGroup: 'Threatened Birds',
    iucn1996Status: 'Vulnerable',
    wildlifeProtectionAct1972Status: 'Schedule I',
    kashmirRelevance: true,
    prioritySpecies: false,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Pheasant conservation',
    displayPriority: 'medium'
  },
  {
    id: 'black-necked-crane',
    slug: 'black-necked-crane',
    commonName: 'Black-necked Crane',
    taxonGroup: 'birds',
    sourceGroup: 'Threatened Birds',
    iucn1996Status: 'Vulnerable',
    wildlifeProtectionAct1972Status: 'Schedule I',
    kashmirRelevance: true,
    prioritySpecies: false,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'High-altitude crane',
    displayPriority: 'high'
  },
  {
    id: 'kashmir-flycatcher',
    slug: 'kashmir-flycatcher',
    commonName: 'Kashmir Flycatcher',
    taxonGroup: 'birds',
    sourceGroup: 'Threatened Birds',
    iucn1996Status: 'Vulnerable',
    wildlifeProtectionAct1972Status: 'Not Included',
    kashmirRelevance: true,
    prioritySpecies: true,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Kashmir endemic passerine',
    displayPriority: 'high'
  },
  {
    id: 'tytlers-leaf-warbler',
    slug: 'tytlers-leaf-warbler',
    commonName: "Tytler's Leaf Warbler",
    taxonGroup: 'birds',
    sourceGroup: 'Threatened Birds',
    iucn1996Status: 'Intermediate',
    wildlifeProtectionAct1972Status: 'Schedule I',
    kashmirRelevance: true,
    prioritySpecies: false,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Warbler conservation',
    displayPriority: 'medium'
  },
  {
    id: 'long-billed-bush-warbler',
    slug: 'long-billed-bush-warbler',
    commonName: 'Long-billed Bush Warbler',
    taxonGroup: 'birds',
    sourceGroup: 'Threatened Birds',
    iucn1996Status: 'Vulnerable',
    wildlifeProtectionAct1972Status: 'Schedule I',
    kashmirRelevance: true,
    prioritySpecies: false,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Bush warbler conservation',
    displayPriority: 'medium'
  },

  // ============================================================================
  // THREATENED AMPHIBIANS / REPTILES (4 species)
  // ============================================================================
  {
    id: 'n-headed-softshell-turtle',
    slug: 'northern-headed-softshell-turtle',
    commonName: 'N.headed Softshell Turtle',
    taxonGroup: 'reptiles-amphibians',
    sourceGroup: 'Threatened Amphibians / Reptiles',
    iucn1996Status: 'Vulnerable',
    wildlifeProtectionAct1972Status: 'Not Included',
    kashmirRelevance: true,
    prioritySpecies: false,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Aquatic reptile conservation',
    displayPriority: 'medium'
  },
  {
    id: 'indian-tent-turtle',
    slug: 'indian-tent-turtle',
    commonName: 'Indian Tent Turtle',
    taxonGroup: 'reptiles-amphibians',
    sourceGroup: 'Threatened Amphibians / Reptiles',
    iucn1996Status: 'Intermediate',
    wildlifeProtectionAct1972Status: 'Schedule I',
    kashmirRelevance: true,
    prioritySpecies: false,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Freshwater turtle',
    displayPriority: 'medium'
  },
  {
    id: 'indian-rock-python',
    slug: 'indian-rock-python',
    commonName: 'Indian Rock Python',
    taxonGroup: 'reptiles-amphibians',
    sourceGroup: 'Threatened Amphibians / Reptiles',
    iucn1996Status: 'Vulnerable',
    wildlifeProtectionAct1972Status: 'Schedule I',
    kashmirRelevance: true,
    prioritySpecies: false,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Large snake conservation',
    displayPriority: 'high'
  },
  {
    id: 'central-asian-cobra',
    slug: 'central-asian-cobra',
    commonName: 'Central Asian Cobra',
    taxonGroup: 'reptiles-amphibians',
    sourceGroup: 'Threatened Amphibians / Reptiles',
    iucn1996Status: 'Vulnerable',
    wildlifeProtectionAct1972Status: 'Schedule I',
    kashmirRelevance: true,
    prioritySpecies: false,
    source: RED_DATA_SOURCE_METADATA.sourceTitle,
    sourceType: RED_DATA_SOURCE_METADATA.sourceType,
    conservationTheme: 'Venomous snake conservation',
    displayPriority: 'medium'
  },
];

// ============================================================================
// DATA ACCESS FUNCTIONS
// ============================================================================

export const getRedDataSpecies = {
  all: (): RedDataSpecies[] => RED_DATA_KASHMIR_SPECIES,
  
  byTaxonGroup: (group: 'mammals' | 'birds' | 'reptiles-amphibians'): RedDataSpecies[] => {
    return RED_DATA_KASHMIR_SPECIES.filter(sp => sp.taxonGroup === group);
  },
  
  bySlug: (slug: string): RedDataSpecies | undefined => {
    return RED_DATA_KASHMIR_SPECIES.find(sp => sp.slug === slug);
  },
  
  prioritySpecies: (): RedDataSpecies[] => {
    return RED_DATA_KASHMIR_SPECIES.filter(sp => sp.prioritySpecies);
  },
  
  byIUCNStatus: (status: string): RedDataSpecies[] => {
    return RED_DATA_KASHMIR_SPECIES.filter(sp => sp.iucn1996Status === status);
  },
  
  bySchedule: (schedule: string): RedDataSpecies[] => {
    return RED_DATA_KASHMIR_SPECIES.filter(sp => sp.wildlifeProtectionAct1972Status === schedule);
  },
  
  search: (term: string): RedDataSpecies[] => {
    const lowerTerm = term.toLowerCase();
    return RED_DATA_KASHMIR_SPECIES.filter(sp => 
      sp.commonName.toLowerCase().includes(lowerTerm) ||
      sp.conservationTheme.toLowerCase().includes(lowerTerm)
    );
  },
};

// ============================================================================
// METRICS AND STATISTICS
// ============================================================================

export const getRedDataMetrics = () => {
  const total = RED_DATA_KASHMIR_SPECIES.length;
  const mammals = getRedDataSpecies.byTaxonGroup('mammals');
  const birds = getRedDataSpecies.byTaxonGroup('birds');
  const reptilesAmphibians = getRedDataSpecies.byTaxonGroup('reptiles-amphibians');
  const priority = getRedDataSpecies.prioritySpecies();
  
  // Count by IUCN status
  const endangered = getRedDataSpecies.byIUCNStatus('Endangered').length;
  const vulnerable = getRedDataSpecies.byIUCNStatus('Vulnerable').length;
  const intermediate = getRedDataSpecies.byIUCNStatus('Intermediate').length;
  const dataDeficient = getRedDataSpecies.byIUCNStatus('Data Deficient').length;
  
  // Count by Schedule
  const scheduleI = getRedDataSpecies.bySchedule('Schedule I').length;
  const scheduleII = getRedDataSpecies.bySchedule('Schedule II').length;
  const scheduleIII = getRedDataSpecies.bySchedule('Schedule III').length;
  const notIncluded = getRedDataSpecies.bySchedule('Not Included').length;
  
  return {
    total,
    byTaxon: {
      mammals: mammals.length,
      birds: birds.length,
      reptilesAmphibians: reptilesAmphibians.length,
    },
    prioritySpecies: priority.length,
    byIUCNStatus: {
      endangered,
      vulnerable,
      intermediate,
      dataDeficient,
    },
    bySchedule: {
      scheduleI,
      scheduleII,
      scheduleIII,
      notIncluded,
    },
    conservationGaps: {
      // Species with IUCN status but not in Schedule I
      iucnButNotScheduleI: RED_DATA_KASHMIR_SPECIES.filter(sp => 
        (sp.iucn1996Status === 'Endangered' || sp.iucn1996Status === 'Vulnerable') && 
        sp.wildlifeProtectionAct1972Status !== 'Schedule I'
      ).length,
      // Species in Schedule I but IUCN not Endangered/Vulnerable
      scheduleIButNotThreatened: RED_DATA_KASHMIR_SPECIES.filter(sp => 
        sp.wildlifeProtectionAct1972Status === 'Schedule I' && 
        sp.iucn1996Status !== 'Endangered' && 
        sp.iucn1996Status !== 'Vulnerable'
      ).length,
    }
  };
};

export const RED_DATA_METRICS = getRedDataMetrics();

// ============================================================================
// PRIORITY SPECIES FOR KASHMIR-FACING UI
// ============================================================================

export const PRIORITY_KASHMIR_SPECIES = getRedDataSpecies.prioritySpecies();
