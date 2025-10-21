export interface Location {
  id: string;
  name: string;
  slug: string;
  region: string;
  postcodes: string[];
  deliveryTime: string;
  specialFeatures: string[];
  popularProducts: number[];
  description: string;
  seoTitle: string;
  seoDescription: string;
  landmarks: string[];
  universities: string[];
  businessAreas: string[];
}

export const locations: Location[] = [
  {
    id: "london",
    name: "London",
    slug: "london",
    region: "Greater London",
    postcodes: ["WC", "EC", "N", "SE", "SW", "E", "W", "NW"],
    deliveryTime: "Same Day",
    specialFeatures: ["Same day delivery", "All London zones", "Corporate events", "Hotel delivery"],
    popularProducts: [2, 1, 8, 5],
    description: "Same day personalised balloon delivery across Greater London. From Westminster to Greenwich, Camden to Croydon.",
    seoTitle: "Personalised Balloons London | Same Day Delivery | Gifted Balloon",
    seoDescription: "Personalised balloon delivery in London. Custom balloon bouquets, giant balloons and personalised gifts delivered same day across Greater London. Order now!",
    landmarks: ["Westminster", "The City", "Canary Wharf", "Greenwich", "Camden", "Kensington"],
    universities: ["UCL", "Imperial College", "King's College", "LSE", "Queen Mary"],
    businessAreas: ["The City", "Canary Wharf", "Westminster", "Shoreditch"]
  },
  {
    id: "manchester",
    name: "Manchester",
    slug: "manchester",
    region: "Greater Manchester",
    postcodes: ["M"],
    deliveryTime: "Next Day",
    specialFeatures: ["Football themes", "University delivery", "Weather protection", "Greater Manchester coverage"],
    popularProducts: [7, 6, 9, 2],
    description: "Next day personalised balloon delivery across Greater Manchester. Football themes and university specialties.",
    seoTitle: "Personalised Balloons Manchester | Next Day Delivery | Gifted Balloon",
    seoDescription: "Personalised balloon delivery in Manchester. Custom balloon bouquets and personalised gifts delivered across Greater Manchester. Fast, reliable service!",
    landmarks: ["Northern Quarter", "Spinningfields", "Deansgate", "Piccadilly", "Ancoats"],
    universities: ["University of Manchester", "Manchester Metropolitan University"],
    businessAreas: ["City Centre", "Spinningfields", "MediaCity"]
  },
  {
    id: "birmingham",
    name: "Birmingham",
    slug: "birmingham",
    region: "West Midlands",
    postcodes: ["B"],
    deliveryTime: "Next Day",
    specialFeatures: ["Business district delivery", "University specialists", "West Midlands coverage", "Corporate events"],
    popularProducts: [2, 4, 8, 1],
    description: "Next day personalised balloon delivery across Birmingham and West Midlands. Business and university specialists.",
    seoTitle: "Personalised Balloons Birmingham | Next Day Delivery | Gifted Balloon",
    seoDescription: "Personalised balloon delivery in Birmingham. Custom balloon bouquets and personalised gifts delivered across Birmingham and West Midlands. Order today!",
    landmarks: ["Jewellery Quarter", "Digbeth", "Bullring", "New Street", "Corporation Street"],
    universities: ["University of Birmingham", "Birmingham City University", "Aston University"],
    businessAreas: ["City Centre", "Jewellery Quarter", "Eastside"]
  },
  {
    id: "coventry",
    name: "Coventry",
    slug: "coventry",
    region: "Warwickshire",
    postcodes: ["CV"],
    deliveryTime: "Fast Delivery",
    specialFeatures: ["City of Culture themes", "University delivery", "Warwickshire coverage", "Cultural events"],
    popularProducts: [3, 10, 9, 5],
    description: "Fast personalised balloon delivery across Coventry and Warwickshire. City of Culture specialists.",
    seoTitle: "Personalised Balloons Coventry | Fast Delivery | Gifted Balloon",
    seoDescription: "Personalised balloon delivery in Coventry. Custom balloon bouquets and personalised gifts delivered across Coventry and Warwickshire. Fast, reliable service!",
    landmarks: ["Cathedral Quarter", "City Centre", "Ring Road"],
    universities: ["Coventry University", "University of Warwick"],
    businessAreas: ["City Centre", "Business Quarter"]
  },
  {
    id: "leeds",
    name: "Leeds",
    slug: "leeds",
    region: "West Yorkshire",
    postcodes: ["LS"],
    deliveryTime: "Next Day",
    specialFeatures: ["University city", "Business hub", "Yorkshire coverage", "Student delivery"],
    popularProducts: [2, 6, 7, 9],
    description: "Next day personalised balloon delivery across Leeds and West Yorkshire.",
    seoTitle: "Personalised Balloons Leeds | Next Day Delivery | Gifted Balloon",
    seoDescription: "Personalised balloon delivery in Leeds. Custom balloon bouquets delivered across West Yorkshire.",
    landmarks: ["City Centre", "Headingley", "Chapel Allerton"],
    universities: ["University of Leeds", "Leeds Beckett University"],
    businessAreas: ["City Centre", "Holbeck"]
  },
  {
    id: "liverpool",
    name: "Liverpool",
    slug: "liverpool",
    region: "Merseyside",
    postcodes: ["L"],
    deliveryTime: "Next Day",
    specialFeatures: ["Waterfront delivery", "Football themes", "Cultural events", "Merseyside coverage"],
    popularProducts: [5, 2, 7, 8],
    description: "Next day personalised balloon delivery across Liverpool and Merseyside.",
    seoTitle: "Personalised Balloons Liverpool | Next Day Delivery | Gifted Balloon",
    seoDescription: "Personalised balloon delivery in Liverpool. Custom balloon bouquets delivered across Merseyside.",
    landmarks: ["Albert Dock", "Cavern Quarter", "Mathew Street"],
    universities: ["University of Liverpool", "Liverpool John Moores University"],
    businessAreas: ["City Centre", "Baltic Triangle"]
  }
];

export const getLocationBySlug = (slug: string): Location | undefined => {
  return locations.find(location => location.slug === slug);
};

export const getAllLocationSlugs = (): string[] => {
  return locations.map(location => location.slug);
};