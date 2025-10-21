export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  features: string[];
  occasions: string[];
  seoKeywords: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Heart Stuffed Balloon",
    price: 30.85,
    image: "/images/1.Heart Stuffed balloon_ £30.85.jpg",
    description: "Romantic heart-shaped balloon perfect for Valentine's Day and anniversaries",
    category: "romantic",
    features: ["Heart-shaped design", "Stuffed with surprises", "Premium ribbon", "Helium filled"],
    occasions: ["Valentine's Day", "Anniversary", "Proposals", "Romantic Dinners"],
    seoKeywords: ["heart balloon", "romantic balloon", "valentine balloon", "love balloon"]
  },
  {
    id: 2,
    name: "Luxury Stuffed Balloons",
    price: 45.00,
    image: "/images/2.Luxury Stuffed Balloons_£45.jpg",
    description: "Premium luxury balloon arrangement for special celebrations",
    category: "luxury",
    features: ["Premium materials", "Multiple balloons", "Luxury packaging", "Professional arrangement"],
    occasions: ["Corporate Events", "Weddings", "Milestone Birthdays", "VIP Celebrations"],
    seoKeywords: ["luxury balloons", "premium balloons", "corporate balloons", "wedding balloons"]
  },
  {
    id: 3,
    name: "Rose Charm Balloon",
    price: 26.00,
    image: "/images/3.Rose charm balloon_£26.avif",
    description: "Elegant rose-themed balloon with charming details",
    category: "elegant",
    features: ["Rose decorations", "Elegant design", "Charm attachments", "Sophisticated styling"],
    occasions: ["Mother's Day", "Graduations", "Thank You", "Elegant Parties"],
    seoKeywords: ["rose balloon", "elegant balloon", "charm balloon", "mothers day balloon"]
  },
  {
    id: 4,
    name: "Stuffed Balloon Teddy Inside",
    price: 35.00,
    image: "/images/4.Stuffed Balloon Teddy Inside_£35.avif",
    description: "Surprise balloon with adorable teddy bear inside",
    category: "surprise",
    features: ["Hidden teddy bear", "Surprise element", "Child-friendly", "Interactive fun"],
    occasions: ["Birthdays", "Baby Showers", "Children's Parties", "Get Well Soon"],
    seoKeywords: ["teddy balloon", "surprise balloon", "kids balloon", "baby shower balloon"]
  },
  {
    id: 5,
    name: "Love Bouquet",
    price: 30.00,
    image: "/images/5. Love bouquet_£30.png",
    description: "Beautiful love-themed balloon bouquet for romantic occasions",
    category: "romantic",
    features: ["Multiple balloons", "Love theme", "Bouquet arrangement", "Romantic colors"],
    occasions: ["Valentine's Day", "Anniversaries", "Proposals", "Date Nights"],
    seoKeywords: ["love bouquet", "romantic bouquet", "valentine bouquet", "balloon bouquet"]
  },
  {
    id: 6,
    name: "Stuffed Wine Balloon",
    price: 35.00,
    image: "/images/6.Stuffed Wine Balloon_£35.avif",
    description: "Sophisticated wine-themed balloon for celebrations",
    category: "sophisticated",
    features: ["Wine theme", "Adult celebration", "Sophisticated design", "Party ready"],
    occasions: ["Wine Tastings", "Adult Birthdays", "Congratulations", "Housewarming"],
    seoKeywords: ["wine balloon", "adult balloon", "celebration balloon", "congratulations balloon"]
  },
  {
    id: 7,
    name: "Stuffed Balloon Teddy Outside",
    price: 35.00,
    image: "/images/7.Stuffed Balloon Teddy Outside_£35.jpg",
    description: "Charming balloon with teddy bear attachment",
    category: "cute",
    features: ["External teddy bear", "Cute design", "Child-friendly", "Huggable attachment"],
    occasions: ["Children's Birthdays", "New Baby", "Get Well Soon", "Just Because"],
    seoKeywords: ["teddy attachment balloon", "cute balloon", "children balloon", "new baby balloon"]
  },
  {
    id: 8,
    name: "Golden Treasure Stuffed Balloon",
    price: 35.00,
    image: "/images/8.Golden Treasure Stuffed Balloon_£35.png",
    description: "Luxurious golden balloon with treasure surprise",
    category: "luxury",
    features: ["Golden design", "Treasure surprise", "Premium look", "Special occasion"],
    occasions: ["Graduations", "Achievements", "Golden Anniversaries", "Success Celebrations"],
    seoKeywords: ["golden balloon", "treasure balloon", "graduation balloon", "achievement balloon"]
  },
  {
    id: 9,
    name: "Simplistic Glow",
    price: 25.00,
    image: "/images/9. Simplistic glow_£25.png",
    description: "Elegant minimalist balloon with beautiful glow effect",
    category: "minimalist",
    features: ["Minimalist design", "Glow effect", "Elegant styling", "Versatile use"],
    occasions: ["Modern Parties", "Corporate Events", "Minimalist Celebrations", "Any Occasion"],
    seoKeywords: ["minimalist balloon", "glow balloon", "simple balloon", "modern balloon"]
  },
  {
    id: 10,
    name: "Picture Special",
    price: 40.00,
    image: "/images/10.PictureSpecial_£40.jpg",
    description: "Custom picture balloon for personalized memories",
    category: "custom",
    features: ["Custom photo printing", "Personalized design", "Memory preservation", "Unique gift"],
    occasions: ["Memorials", "Photo Celebrations", "Custom Gifts", "Special Memories"],
    seoKeywords: ["photo balloon", "custom balloon", "picture balloon", "personalized balloon"]
  }
];

export const productCategories = [
  { id: "romantic", name: "Romantic", description: "Perfect for love and romance" },
  { id: "luxury", name: "Luxury", description: "Premium balloons for special occasions" },
  { id: "elegant", name: "Elegant", description: "Sophisticated and refined designs" },
  { id: "surprise", name: "Surprise", description: "Balloons with hidden surprises" },
  { id: "sophisticated", name: "Sophisticated", description: "For mature celebrations" },
  { id: "cute", name: "Cute", description: "Adorable designs for all ages" },
  { id: "minimalist", name: "Minimalist", description: "Clean and modern designs" },
  { id: "custom", name: "Custom", description: "Personalized and unique" }
];