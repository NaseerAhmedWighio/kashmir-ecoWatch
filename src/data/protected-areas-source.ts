// Protected Area Network of Jammu and Kashmir - Full Source Dataset
// Source: Protected Area Network of Jammu and Kashmir (Provided source table)
// Units: Area in sq. kms
// 
// CATEGORY KEY:
// - NP = National Park
// - WLS = Wildlife Sanctuary
// - WR = Wildlife Reserve
// - GR = Game Reserve
// - WLR = Wetland Reserve
//
// KASHMIR-SPECIFIC FOCUS:
// This dataset includes all protected areas from the source but is presented
// with Kashmir-facing default behavior while maintaining full data integrity.

export interface ProtectedAreaSource {
  id: string;
  slug: string;
  name: string;
  categoryCode: 'NP' | 'WLS' | 'WR' | 'GR' | 'WLR';
  categoryLabel: string;
  areaSqKm: number | null;
  regionRaw: string;
  regionGroup: 'Kashmir' | 'Jammu' | 'Ladakh';
  districtHint: string;
  source: string;
  sourceType: string;
  sourceNotes?: string[];
  isKashmir: boolean;
  isJammu: boolean;
  isLadakh: boolean;
}

export const PROTECTED_AREA_SOURCE_METADATA = {
  sourceTitle: 'Protected Area Network of Jammu and Kashmir',
  sourceType: 'Provided source table/image',
  units: 'Area in sq. kms',
  sourceTotalAreaSqKm: 16243.5,
  sourceNotes: [
    'Kazinag Wildlife Sanctuary marked in source as new to the list along Line of Actual Control (India and Pakistan)',
    'Source total shown as 16243.5 sq. kms',
    'Source note indicates total excludes Changtang, Tso Morari, Noorichan Wetland Reserves and Bodhkharbu and Sabu Game Reserve'
  ],
  categoryCounts: {
    NP: 3,
    WLS: 19,
    WR: 19,
    GR: 4,
    WLR: 18
  }
};

// Helper function to determine region group from raw region string
function getRegionGroup(regionRaw: string): 'Kashmir' | 'Jammu' | 'Ladakh' {
  const region = regionRaw.toLowerCase();
  if (region.includes('kashmir') || region.includes('srinagar') || region.includes('pulwama') || 
      region.includes('ganderbal') || region.includes('anantnag') || region.includes('baramulla') || 
      region.includes('kupwara') || region.includes('budgam') || region.includes('bandipora')) {
    return 'Kashmir';
  }
  if (region.includes('ladakh') || region.includes('leh') || region.includes('kargil')) {
    return 'Ladakh';
  }
  // Jammu region includes Jammu, Doda, Kathua, Udhampur
  return 'Jammu';
}

// Helper function to extract district hint from region string
function getDistrictHint(regionRaw: string): string {
  const region = regionRaw.toLowerCase();
  // Extract first word or key district name
  const parts = region.split('/');
  if (parts.length > 0) {
    // Return the first meaningful district/area name
    const firstPart = parts[0].trim();
    // Remove common suffixes
    return firstPart
      .replace('kashmir', '')
      .replace('jammu', '')
      .replace('ladakh', '')
      .replace('lehd', '')
      .trim() || firstPart;
  }
  return regionRaw;
}

// FULL SOURCE DATA - All records from the provided dataset
export const PROTECTED_AREAS_FULL_SOURCE: ProtectedAreaSource[] = [
  // ============================================================================
  // NATIONAL PARKS (NP) - 3 declared
  // ============================================================================
  {
    id: 'dachigam-np',
    slug: 'dachigam-national-park',
    name: 'Dachigam',
    categoryCode: 'NP',
    categoryLabel: 'National Park',
    areaSqKm: 171.25,
    regionRaw: 'Srinagar/Pulwama - Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Srinagar',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'salim-ali-np',
    slug: 'salim-ali-city-forest-national-park',
    name: 'Salim Ali /City Forest',
    categoryCode: 'NP',
    categoryLabel: 'National Park',
    areaSqKm: 9.00,
    regionRaw: 'Srinagar',
    regionGroup: 'Kashmir',
    districtHint: 'Srinagar',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    sourceNotes: ['marked with asterisk in source'],
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'hemis-np',
    slug: 'hemis-national-park',
    name: 'Hemis',
    categoryCode: 'NP',
    categoryLabel: 'National Park',
    areaSqKm: 4100.00,
    regionRaw: 'Ladakh',
    regionGroup: 'Ladakh',
    districtHint: 'Ladakh',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: false,
    isJammu: false,
    isLadakh: true
  },
  {
    id: 'kishtwar-np',
    slug: 'kishtwar-national-park',
    name: 'Kishtwar',
    categoryCode: 'NP',
    categoryLabel: 'National Park',
    areaSqKm: 400.00,
    regionRaw: 'Doda Jammu',
    regionGroup: 'Jammu',
    districtHint: 'Doda',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: false,
    isJammu: true,
    isLadakh: false
  },

  // ============================================================================
  // WILDLIFE SANCTUARIES (WLS) - 19 declared
  // ============================================================================
  {
    id: 'baltal-thajwas-wls',
    slug: 'baltal-thajwas-wildlife-sanctuary',
    name: 'Baltal Thajwas',
    categoryCode: 'WLS',
    categoryLabel: 'Wildlife Sanctuary',
    areaSqKm: 210.50,
    regionRaw: 'Ganderbal Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Ganderbal',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'hokersar-wls',
    slug: 'hokersar-wildlife-sanctuary',
    name: 'Hokersar',
    categoryCode: 'WLS',
    categoryLabel: 'Wildlife Sanctuary',
    areaSqKm: 10.00,
    regionRaw: 'Budgam Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Budgam',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'rajparian-wls',
    slug: 'rajparian-wildlife-sanctuary',
    name: 'Rajparian',
    categoryCode: 'WLS',
    categoryLabel: 'Wildlife Sanctuary',
    areaSqKm: 20.00,
    regionRaw: 'Anantnag Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Anantnag',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'overa-wls',
    slug: 'overa-wildlife-sanctuary',
    name: 'Overa',
    categoryCode: 'WLS',
    categoryLabel: 'Wildlife Sanctuary',
    areaSqKm: 32.00,
    regionRaw: 'Anantnag Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Anantnag',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'overa-aru-wls',
    slug: 'overa-aru-wildlife-sanctuary',
    name: 'Overa - Aru',
    categoryCode: 'WLS',
    categoryLabel: 'Wildlife Sanctuary',
    areaSqKm: 511.00,
    regionRaw: 'Anantnag Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Anantnag',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'gulmarg-wls',
    slug: 'gulmarg-wildlife-sanctuary',
    name: 'Gulmarg',
    categoryCode: 'WLS',
    categoryLabel: 'Wildlife Sanctuary',
    areaSqKm: 139.25,
    regionRaw: 'Baramulla Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Baramulla',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'hirpura-wls',
    slug: 'hirpora-wildlife-sanctuary',
    name: 'Hirpura',
    categoryCode: 'WLS',
    categoryLabel: 'Wildlife Sanctuary',
    areaSqKm: 114.50,
    regionRaw: 'Baramulla Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Baramulla',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'limber-wls',
    slug: 'limber-wildlife-sanctuary',
    name: 'Limber',
    categoryCode: 'WLS',
    categoryLabel: 'Wildlife Sanctuary',
    areaSqKm: 43.75,
    regionRaw: 'Baramulla Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Baramulla',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'lachipora-wls',
    slug: 'lachipora-wildlife-sanctuary',
    name: 'Lachipora',
    categoryCode: 'WLS',
    categoryLabel: 'Wildlife Sanctuary',
    areaSqKm: 93.50,
    regionRaw: 'Baramulla Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Baramulla',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'kazinag-wls',
    slug: 'kazinag-wildlife-sanctuary',
    name: 'Kazinag',
    categoryCode: 'WLS',
    categoryLabel: 'Wildlife Sanctuary',
    areaSqKm: 211.00,
    regionRaw: 'Baramulla Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Baramulla',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    sourceNotes: ['double-asterisk note in source - new to the list along Line of Actual Control (India and Pakistan)'],
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'naganari-wls',
    slug: 'naganari-wildlife-sanctuary',
    name: 'Naganari',
    categoryCode: 'WLS',
    categoryLabel: 'Wildlife Sanctuary',
    areaSqKm: 22.25,
    regionRaw: 'Baramulla Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Baramulla',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'ramnagar-wls',
    slug: 'ramnagar-wildlife-sanctuary',
    name: 'Ramnagar',
    categoryCode: 'WLS',
    categoryLabel: 'Wildlife Sanctuary',
    areaSqKm: 12.75,
    regionRaw: 'Jammu',
    regionGroup: 'Jammu',
    districtHint: 'Jammu',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: false,
    isJammu: true,
    isLadakh: false
  },
  {
    id: 'surinsar-mansar-wls',
    slug: 'surinsar-mansar-wildlife-sanctuary',
    name: 'Surinsar- Mansar',
    categoryCode: 'WLS',
    categoryLabel: 'Wildlife Sanctuary',
    areaSqKm: 55.50,
    regionRaw: 'Jammu',
    regionGroup: 'Jammu',
    districtHint: 'Jammu',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: false,
    isJammu: true,
    isLadakh: false
  },
  {
    id: 'nandni-wls',
    slug: 'nandni-wildlife-sanctuary',
    name: 'Nandni',
    categoryCode: 'WLS',
    categoryLabel: 'Wildlife Sanctuary',
    areaSqKm: 44.25,
    regionRaw: 'Jammu',
    regionGroup: 'Jammu',
    districtHint: 'Jammu',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: false,
    isJammu: true,
    isLadakh: false
  },
  {
    id: 'trikuta-wls',
    slug: 'trikuta-wildlife-sanctuary',
    name: 'Trikuta',
    categoryCode: 'WLS',
    categoryLabel: 'Wildlife Sanctuary',
    areaSqKm: 27.75,
    regionRaw: 'Jammu',
    regionGroup: 'Jammu',
    districtHint: 'Jammu',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: false,
    isJammu: true,
    isLadakh: false
  },
  {
    id: 'jasrota-wls',
    slug: 'jasrota-wildlife-sanctuary',
    name: 'Jasrota',
    categoryCode: 'WLS',
    categoryLabel: 'Wildlife Sanctuary',
    areaSqKm: 25.75,
    regionRaw: 'Kathua',
    regionGroup: 'Jammu',
    districtHint: 'Kathua',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: false,
    isJammu: true,
    isLadakh: false
  },
  {
    id: 'karokoram-wls',
    slug: 'karokoram-wildlife-sanctuary',
    name: 'Karokoram',
    categoryCode: 'WLS',
    categoryLabel: 'Wildlife Sanctuary',
    areaSqKm: 5000.00,
    regionRaw: 'Leh Ladakh',
    regionGroup: 'Ladakh',
    districtHint: 'Leh',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: false,
    isJammu: false,
    isLadakh: true
  },
  {
    id: 'changthang-wls',
    slug: 'changthang-wildlife-sanctuary',
    name: 'Changthang',
    categoryCode: 'WLS',
    categoryLabel: 'Wildlife Sanctuary',
    areaSqKm: 4000.00,
    regionRaw: 'Leh Ladakh',
    regionGroup: 'Ladakh',
    districtHint: 'Leh',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: false,
    isJammu: false,
    isLadakh: true
  },

  // ============================================================================
  // WILDLIFE RESERVES (WR) - 19 declared
  // ============================================================================
  {
    id: 'dara-khimber-wr',
    slug: 'dara-khimber-wildlife-reserve',
    name: 'Dara/Khimber',
    categoryCode: 'WR',
    categoryLabel: 'Wildlife Reserve',
    areaSqKm: 34.00,
    regionRaw: 'Srinagar Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Srinagar',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'brain-wr',
    slug: 'brain-wildlife-reserve',
    name: 'Brain',
    categoryCode: 'WR',
    categoryLabel: 'Wildlife Reserve',
    areaSqKm: 15.75,
    regionRaw: 'Srinagar Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Srinagar',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'wangat-chategul-wr',
    slug: 'wangat-chategul-wildlife-reserve',
    name: 'Wangat (Chategul)',
    categoryCode: 'WR',
    categoryLabel: 'Wildlife Reserve',
    areaSqKm: 12.00,
    regionRaw: 'Ganderbal Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Ganderbal',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'khonmoh-wr',
    slug: 'khonmoh-wildlife-reserve',
    name: 'Khonmoh',
    categoryCode: 'WR',
    categoryLabel: 'Wildlife Reserve',
    areaSqKm: 67.00,
    regionRaw: 'Pulwama Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Pulwama',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'khew-wr',
    slug: 'khew-wildlife-reserve',
    name: 'Khew',
    categoryCode: 'WR',
    categoryLabel: 'Wildlife Reserve',
    areaSqKm: 50.25,
    regionRaw: 'Pulwama Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Pulwama',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'khirani-wr',
    slug: 'khirani-wildlife-reserve',
    name: 'Khirani',
    categoryCode: 'WR',
    categoryLabel: 'Wildlife Reserve',
    areaSqKm: 15.75,
    regionRaw: 'Anantnag Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Anantnag',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'achabal-wr',
    slug: 'achabal-wildlife-reserve',
    name: 'Achabal',
    categoryCode: 'WR',
    categoryLabel: 'Wildlife Reserve',
    areaSqKm: 0.50,
    regionRaw: 'Pulwama Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Pulwama',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'khanagund-wr',
    slug: 'khanagund-wildlife-reserve',
    name: 'Khanagund',
    categoryCode: 'WR',
    categoryLabel: 'Wildlife Reserve',
    areaSqKm: 15.00,
    regionRaw: 'Pulwama Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Pulwama',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'panyar-wr',
    slug: 'panyar-wildlife-reserve',
    name: 'Panyar',
    categoryCode: 'WR',
    categoryLabel: 'Wildlife Reserve',
    areaSqKm: 10.00,
    regionRaw: 'Pulwama Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Pulwama',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'shikargah-wr',
    slug: 'shikargah-wildlife-reserve',
    name: 'Shikargah',
    categoryCode: 'WR',
    categoryLabel: 'Wildlife Reserve',
    areaSqKm: 15.50,
    regionRaw: 'Pulwama Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Pulwama',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'khiram-wr',
    slug: 'khiram-wildlife-reserve',
    name: 'Khiram',
    categoryCode: 'WR',
    categoryLabel: 'Wildlife Reserve',
    areaSqKm: 15.75,
    regionRaw: 'Anantnag Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Anantnag',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'ajas-wr',
    slug: 'ajas-wildlife-reserve',
    name: 'Ajas',
    categoryCode: 'WR',
    categoryLabel: 'Wildlife Reserve',
    areaSqKm: 48.00,
    regionRaw: 'Baramulla Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Baramulla',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'zaloora-harwan-wr',
    slug: 'zaloora-harwan-wildlife-reserve',
    name: 'Zaloora - Harwan',
    categoryCode: 'WR',
    categoryLabel: 'Wildlife Reserve',
    areaSqKm: 25.25,
    regionRaw: 'Baramulla Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Baramulla',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'naganari-wr',
    slug: 'naganari-wildlife-reserve',
    name: 'Naganari',
    categoryCode: 'WR',
    categoryLabel: 'Wildlife Reserve',
    areaSqKm: 22.25,
    regionRaw: 'Baramulla Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Baramulla',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'sud-mahadev-wr',
    slug: 'sud-mahadev-wildlife-reserve',
    name: 'Sud-Mahadev',
    categoryCode: 'WR',
    categoryLabel: 'Wildlife Reserve',
    areaSqKm: 142.25,
    regionRaw: 'Udhampur Jammu',
    regionGroup: 'Jammu',
    districtHint: 'Udhampur',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: false,
    isJammu: true,
    isLadakh: false
  },
  {
    id: 'jawahar-tunnel-wr',
    slug: 'jawahar-tunnel-wildlife-reserve',
    name: 'Jawahar-Tunnel',
    categoryCode: 'WR',
    categoryLabel: 'Wildlife Reserve',
    areaSqKm: 18.00,
    regionRaw: 'Doda Jammu',
    regionGroup: 'Jammu',
    districtHint: 'Doda',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: false,
    isJammu: true,
    isLadakh: false
  },
  {
    id: 'thein-wr',
    slug: 'thein-wildlife-reserve',
    name: 'Thein',
    categoryCode: 'WR',
    categoryLabel: 'Wildlife Reserve',
    areaSqKm: 19.00,
    regionRaw: 'Kathua Jammu',
    regionGroup: 'Jammu',
    districtHint: 'Kathua',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: false,
    isJammu: true,
    isLadakh: false
  },
  {
    id: 'bahu-wr',
    slug: 'bahu-wildlife-reserve',
    name: 'Bahu',
    categoryCode: 'WR',
    categoryLabel: 'Wildlife Reserve',
    areaSqKm: 19.75,
    regionRaw: 'Jammu',
    regionGroup: 'Jammu',
    districtHint: 'Jammu',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: false,
    isJammu: true,
    isLadakh: false
  },
  {
    id: 'kanji-wr',
    slug: 'kanji-wildlife-reserve',
    name: 'Kanji',
    categoryCode: 'WR',
    categoryLabel: 'Wildlife Reserve',
    areaSqKm: 100.00,
    regionRaw: 'Kargil Ladakh',
    regionGroup: 'Ladakh',
    districtHint: 'Kargil',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: false,
    isJammu: false,
    isLadakh: true
  },

  // ============================================================================
  // GAME RESERVES (GR) - 4 declared
  // ============================================================================
  {
    id: 'achabal-gr',
    slug: 'achabal-game-reserve',
    name: 'Achabal',
    categoryCode: 'GR',
    categoryLabel: 'Game Reserve',
    areaSqKm: 0.50,
    regionRaw: 'Pulwama Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Pulwama',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'sabu-gr',
    slug: 'sabu-game-reserve',
    name: 'Sabu',
    categoryCode: 'GR',
    categoryLabel: 'Game Reserve',
    areaSqKm: null,
    regionRaw: 'Leh Ladakh',
    regionGroup: 'Ladakh',
    districtHint: 'Leh',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    sourceNotes: ['Area excluded from source total'],
    isKashmir: false,
    isJammu: false,
    isLadakh: true
  },
  {
    id: 'bodhkharbu-gr',
    slug: 'bodhkharbu-game-reserve',
    name: 'Bodhkharbu',
    categoryCode: 'GR',
    categoryLabel: 'Game Reserve',
    areaSqKm: null,
    regionRaw: 'Kargil Ladakh',
    regionGroup: 'Ladakh',
    districtHint: 'Kargil',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    sourceNotes: ['Area excluded from source total'],
    isKashmir: false,
    isJammu: false,
    isLadakh: true
  },
  {
    id: 'shang-gr',
    slug: 'shang-game-reserve',
    name: 'Shang',
    categoryCode: 'GR',
    categoryLabel: 'Game Reserve',
    areaSqKm: 100.00,
    regionRaw: 'Leh Ladakh',
    regionGroup: 'Ladakh',
    districtHint: 'Leh',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: false,
    isJammu: false,
    isLadakh: true
  },

  // ============================================================================
  // WETLAND RESERVES (WLR) - 18 declared
  // ============================================================================
  {
    id: 'narkara-wlr',
    slug: 'narkara-wetland-reserve',
    name: 'Narkara',
    categoryCode: 'WLR',
    categoryLabel: 'Wetland Reserve',
    areaSqKm: 3.25,
    regionRaw: 'Badgam Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Badgam',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'malgam-wlr',
    slug: 'malgam-wetland-reserve',
    name: 'Malgam',
    categoryCode: 'WLR',
    categoryLabel: 'Wetland Reserve',
    areaSqKm: 4.50,
    regionRaw: 'Baramulla Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Baramulla',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'ajas-wlr',
    slug: 'ajas-wetland-reserve',
    name: 'Ajas',
    categoryCode: 'WLR',
    categoryLabel: 'Wetland Reserve',
    areaSqKm: 1.00,
    regionRaw: 'Baramulla Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Baramulla',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'hygam-wlr',
    slug: 'hygam-wetland-reserve',
    name: 'Hygam',
    categoryCode: 'WLR',
    categoryLabel: 'Wetland Reserve',
    areaSqKm: 7.25,
    regionRaw: 'Baramulla Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Baramulla',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'mirgund-wlr',
    slug: 'mirgund-wetland-reserve',
    name: 'Mirgund',
    categoryCode: 'WLR',
    categoryLabel: 'Wetland Reserve',
    areaSqKm: 8.25,
    regionRaw: 'Badgam Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Badgam',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'hokera-wlr',
    slug: 'hokera-wetland-reserve',
    name: 'Hokera',
    categoryCode: 'WLR',
    categoryLabel: 'Wetland Reserve',
    areaSqKm: 13.75,
    regionRaw: 'Badgam Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Badgam',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'shallabugh-wlr',
    slug: 'shallabugh-wetland-reserve',
    name: 'Shallabugh',
    categoryCode: 'WLR',
    categoryLabel: 'Wetland Reserve',
    areaSqKm: 16.00,
    regionRaw: 'Srinagar Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Srinagar',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'chatlum-pampore-wlr',
    slug: 'chatlum-pampore-wetland-reserve',
    name: 'Chatlum-Pampore',
    categoryCode: 'WLR',
    categoryLabel: 'Wetland Reserve',
    areaSqKm: 0.25,
    regionRaw: 'Pulwama Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Pulwama',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'manibugh-wlr',
    slug: 'manibugh-wetland-reserve',
    name: 'Manibugh',
    categoryCode: 'WLR',
    categoryLabel: 'Wetland Reserve',
    areaSqKm: 0.25,
    regionRaw: 'Pulwama Kashmir',
    regionGroup: 'Kashmir',
    districtHint: 'Pulwama',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: true,
    isJammu: false,
    isLadakh: false
  },
  {
    id: 'garana-wlr',
    slug: 'garana-wetland-reserve',
    name: 'Garana',
    categoryCode: 'WLR',
    categoryLabel: 'Wetland Reserve',
    areaSqKm: 0.75,
    regionRaw: 'Jammu',
    regionGroup: 'Jammu',
    districtHint: 'Jammu',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: false,
    isJammu: true,
    isLadakh: false
  },
  {
    id: 'pargawal-wlr',
    slug: 'pargawal-wetland-reserve',
    name: 'Pargawal',
    categoryCode: 'WLR',
    categoryLabel: 'Wetland Reserve',
    areaSqKm: 49.25,
    regionRaw: 'Jammu',
    regionGroup: 'Jammu',
    districtHint: 'Jammu',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: false,
    isJammu: true,
    isLadakh: false
  },
  {
    id: 'kukarian-wlr',
    slug: 'kukarian-wetland-reserve',
    name: 'Kukarian',
    categoryCode: 'WLR',
    categoryLabel: 'Wetland Reserve',
    areaSqKm: 24.25,
    regionRaw: 'Jammu',
    regionGroup: 'Jammu',
    districtHint: 'Jammu',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: false,
    isJammu: true,
    isLadakh: false
  },
  {
    id: 'nanga-wlr',
    slug: 'nanga-wetland-reserve',
    name: 'Nanga',
    categoryCode: 'WLR',
    categoryLabel: 'Wetland Reserve',
    areaSqKm: 15.25,
    regionRaw: 'Jammu',
    regionGroup: 'Jammu',
    districtHint: 'Jammu',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: false,
    isJammu: true,
    isLadakh: false
  },
  {
    id: 'sangral-wlr',
    slug: 'sangral-wetland-reserve',
    name: 'Sangral',
    categoryCode: 'WLR',
    categoryLabel: 'Wetland Reserve',
    areaSqKm: 7.00,
    regionRaw: 'Jammu',
    regionGroup: 'Jammu',
    districtHint: 'Jammu',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    isKashmir: false,
    isJammu: true,
    isLadakh: false
  },
  {
    id: 'changtang-wlr',
    slug: 'changtang-wetland-reserve',
    name: 'Changtang',
    categoryCode: 'WLR',
    categoryLabel: 'Wetland Reserve',
    areaSqKm: null,
    regionRaw: 'Ladakh',
    regionGroup: 'Ladakh',
    districtHint: 'Ladakh',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    sourceNotes: ['Area excluded from source total'],
    isKashmir: false,
    isJammu: false,
    isLadakh: true
  },
  {
    id: 'tso-morari-wlr',
    slug: 'tso-morari-wetland-reserve',
    name: 'Tso Morari',
    categoryCode: 'WLR',
    categoryLabel: 'Wetland Reserve',
    areaSqKm: null,
    regionRaw: 'Ladakh',
    regionGroup: 'Ladakh',
    districtHint: 'Ladakh',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    sourceNotes: ['Area excluded from source total'],
    isKashmir: false,
    isJammu: false,
    isLadakh: true
  },
  {
    id: 'noorichan-wlr',
    slug: 'noorichan-wetland-reserve',
    name: 'Noorichan',
    categoryCode: 'WLR',
    categoryLabel: 'Wetland Reserve',
    areaSqKm: null,
    regionRaw: 'Ladakh',
    regionGroup: 'Ladakh',
    districtHint: 'Ladakh',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    sourceNotes: ['Area excluded from source total'],
    isKashmir: false,
    isJammu: false,
    isLadakh: true
  },
  {
    id: 'hanley-wlr',
    slug: 'hanley-wetland-reserve',
    name: 'Hanley',
    categoryCode: 'WLR',
    categoryLabel: 'Wetland Reserve',
    areaSqKm: null,
    regionRaw: 'Ladakh',
    regionGroup: 'Ladakh',
    districtHint: 'Ladakh',
    source: PROTECTED_AREA_SOURCE_METADATA.sourceTitle,
    sourceType: PROTECTED_AREA_SOURCE_METADATA.sourceType,
    sourceNotes: ['Area excluded from source total'],
    isKashmir: false,
    isJammu: false,
    isLadakh: true
  },
];

// ============================================================================
// DATA ACCESS FUNCTIONS
// ============================================================================

export const getProtectedAreasSource = {
  all: (): ProtectedAreaSource[] => PROTECTED_AREAS_FULL_SOURCE,
  
  byRegion: (region: 'All' | 'Kashmir' | 'Jammu' | 'Ladakh'): ProtectedAreaSource[] => {
    if (region === 'All') return PROTECTED_AREAS_FULL_SOURCE;
    return PROTECTED_AREAS_FULL_SOURCE.filter(pa => {
      if (region === 'Kashmir') return pa.isKashmir;
      if (region === 'Jammu') return pa.isJammu;
      if (region === 'Ladakh') return pa.isLadakh;
      return false;
    });
  },
  
  byCategory: (categoryCode: 'NP' | 'WLS' | 'WR' | 'GR' | 'WLR'): ProtectedAreaSource[] => {
    return PROTECTED_AREAS_FULL_SOURCE.filter(pa => pa.categoryCode === categoryCode);
  },
  
  bySlug: (slug: string): ProtectedAreaSource | undefined => {
    return PROTECTED_AREAS_FULL_SOURCE.find(pa => pa.slug === slug);
  },
  
  search: (term: string): ProtectedAreaSource[] => {
    const lowerTerm = term.toLowerCase();
    return PROTECTED_AREAS_FULL_SOURCE.filter(pa => 
      pa.name.toLowerCase().includes(lowerTerm) ||
      pa.regionRaw.toLowerCase().includes(lowerTerm) ||
      pa.districtHint.toLowerCase().includes(lowerTerm)
    );
  },
  
  kashmir: (): ProtectedAreaSource[] => {
    return PROTECTED_AREAS_FULL_SOURCE.filter(pa => pa.isKashmir);
  },
  
  jammu: (): ProtectedAreaSource[] => {
    return PROTECTED_AREAS_FULL_SOURCE.filter(pa => pa.isJammu);
  },
  
  ladakh: (): ProtectedAreaSource[] => {
    return PROTECTED_AREAS_FULL_SOURCE.filter(pa => pa.isLadakh);
  },
};

// ============================================================================
// METRICS AND STATISTICS
// ============================================================================

export const getProtectedAreaMetrics = (region: 'All' | 'Kashmir' | 'Jammu' | 'Ladakh' = 'All') => {
  const data = getProtectedAreasSource.byRegion(region);
  
  const totalArea = data.reduce((sum, pa) => sum + (pa.areaSqKm || 0), 0);
  const withAreaData = data.filter(pa => pa.areaSqKm !== null);
  
  return {
    total: data.length,
    totalArea: totalArea,
    byCategory: {
      NP: data.filter(pa => pa.categoryCode === 'NP').length,
      WLS: data.filter(pa => pa.categoryCode === 'WLS').length,
      WR: data.filter(pa => pa.categoryCode === 'WR').length,
      GR: data.filter(pa => pa.categoryCode === 'GR').length,
      WLR: data.filter(pa => pa.categoryCode === 'WLR').length,
    },
    areaByCategory: {
      NP: data.filter(pa => pa.categoryCode === 'NP').reduce((sum, pa) => sum + (pa.areaSqKm || 0), 0),
      WLS: data.filter(pa => pa.categoryCode === 'WLS').reduce((sum, pa) => sum + (pa.areaSqKm || 0), 0),
      WR: data.filter(pa => pa.categoryCode === 'WR').reduce((sum, pa) => sum + (pa.areaSqKm || 0), 0),
      GR: data.filter(pa => pa.categoryCode === 'GR').reduce((sum, pa) => sum + (pa.areaSqKm || 0), 0),
      WLR: data.filter(pa => pa.categoryCode === 'WLR').reduce((sum, pa) => sum + (pa.areaSqKm || 0), 0),
    },
    recordsWithAreaData: withAreaData.length,
    recordsWithoutAreaData: data.length - withAreaData.length,
  };
};

// Kashmir-default metrics (for Kashmir-facing presentation)
export const PROTECTED_AREA_METRICS_KASHMIR = getProtectedAreaMetrics('Kashmir');
export const PROTECTED_AREA_METRICS_ALL = getProtectedAreaMetrics('All');
