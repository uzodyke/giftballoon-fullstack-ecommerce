export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  image: string;
  price: string;
  features: string[];
  occasions: string[];
  seoTitle: string;
  seoDescription: string;
  popularProducts: number[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const services: Service[] = [
  {
    id: "weddings",
    name: "Wedding Balloons",
    slug: "weddings",
    description: "Elegant balloon arrangements for your special day",
    longDescription: "Create magical memories with our bespoke wedding balloon arrangements. From ceremony backdrops to reception centerpieces, our romantic balloon designs perfectly complement your wedding theme. Choose from heart-shaped balloons, luxury bouquets, and custom color schemes that match your wedding palette.",
    image: "/images/1.Heart Stuffed balloon_ £30.85.jpg",
    price: "From £30.85",
    features: [
      "Custom color matching",
      "Romantic heart designs",
      "Luxury arrangements",
      "Ceremony & reception options",
      "Professional setup available",
      "Biodegradable options"
    ],
    occasions: ["Ceremonies", "Receptions", "Engagement parties", "Bridal showers", "Rehearsal dinners"],
    seoTitle: "Wedding Balloons | Romantic Balloon Arrangements | Gifted Balloon",
    seoDescription: "Beautiful wedding balloon arrangements and decorations. Custom romantic balloons for ceremonies, receptions, and wedding celebrations across the UK.",
    popularProducts: [1, 5, 2, 8],
    faqs: [
      {
        question: "Can you match our wedding colors?",
        answer: "Yes! We can customize balloon colors to perfectly match your wedding theme and color palette."
      },
      {
        question: "Do you offer wedding setup services?",
        answer: "We offer professional setup services for wedding venues across the UK. Contact us for availability in your area."
      },
      {
        question: "How far in advance should I book?",
        answer: "We recommend booking at least 2-3 weeks in advance for weddings to ensure availability and proper customization."
      }
    ]
  },
  {
    id: "corporate-events",
    name: "Corporate Event Balloons",
    slug: "corporate-events",
    description: "Professional balloon displays for business celebrations",
    longDescription: "Elevate your corporate events with our professional balloon arrangements. Perfect for product launches, company milestones, team celebrations, and corporate parties. Our sophisticated designs maintain professionalism while adding a touch of celebration to your business events.",
    image: "/images/2.Luxury Stuffed Balloons_£45.jpg",
    price: "From £45.00",
    features: [
      "Professional designs",
      "Company branding options",
      "Bulk ordering available",
      "Office delivery",
      "Event setup services",
      "Corporate color schemes"
    ],
    occasions: ["Product launches", "Company anniversaries", "Team achievements", "Office parties", "Conference events"],
    seoTitle: "Corporate Event Balloons | Business Celebration Balloons | Gifted Balloon",
    seoDescription: "Professional balloon arrangements for corporate events. Custom business balloons for product launches, company celebrations, and office parties.",
    popularProducts: [2, 9, 8, 6],
    faqs: [
      {
        question: "Can you include our company logo?",
        answer: "Yes, we can incorporate company logos and branding into our balloon arrangements for corporate events."
      },
      {
        question: "Do you offer bulk discounts?",
        answer: "We offer competitive pricing for bulk orders and regular corporate clients. Contact us for a custom quote."
      },
      {
        question: "Can you deliver to office buildings?",
        answer: "Yes, we regularly deliver to office buildings, business parks, and corporate venues across the UK."
      }
    ]
  },
  {
    id: "birthdays",
    name: "Birthday Balloons",
    slug: "birthdays",
    description: "Fun and festive balloons for birthday celebrations",
    longDescription: "Make every birthday special with our vibrant balloon collections. From milestone birthdays to children's parties, we have the perfect balloon arrangements to celebrate another year of life. Surprise your loved ones with personalized balloons featuring their name and age.",
    image: "/images/4.Stuffed Balloon Teddy Inside_£35.avif",
    price: "From £25.00",
    features: [
      "Age customization",
      "Name personalization",
      "Surprise elements",
      "Child-friendly options",
      "Adult celebrations",
      "Milestone birthdays"
    ],
    occasions: ["Children's birthdays", "Adult birthdays", "Milestone celebrations", "Surprise parties", "Birthday deliveries"],
    seoTitle: "Birthday Balloons | Personalized Birthday Celebrations | Gifted Balloon",
    seoDescription: "Custom birthday balloons with names and ages. Perfect for children's parties, adult celebrations, and milestone birthdays. Same day delivery available.",
    popularProducts: [4, 7, 9, 5],
    faqs: [
      {
        question: "Can you add the person's age to the balloon?",
        answer: "Absolutely! We can personalize balloons with names, ages, and special birthday messages."
      },
      {
        question: "Do you have balloons suitable for children?",
        answer: "Yes, we have many child-friendly options including teddy bear balloons and fun, colorful designs."
      },
      {
        question: "Can you deliver birthday surprises to workplaces?",
        answer: "Yes, we can deliver birthday balloon surprises to offices, schools, and other workplaces."
      }
    ]
  },
  {
    id: "graduations",
    name: "Graduation Balloons",
    slug: "graduations",
    description: "Celebrate academic achievements with special balloons",
    longDescription: "Honor academic achievements with our graduation balloon collections. Perfect for university graduations, school completions, and academic milestones. Our elegant designs celebrate the hard work and dedication that led to this special moment.",
    image: "/images/8.Golden Treasure Stuffed Balloon_£35.png",
    price: "From £26.00",
    features: [
      "Academic themes",
      "Achievement celebration",
      "Golden designs",
      "University delivery",
      "Class of 2024 options",
      "Elegant styling"
    ],
    occasions: ["University graduations", "School completions", "Academic achievements", "Degree ceremonies", "Success celebrations"],
    seoTitle: "Graduation Balloons | Academic Achievement Celebrations | Gifted Balloon",
    seoDescription: "Celebrate graduation with special achievement balloons. Perfect for university graduations and academic milestones. Delivery to all UK universities.",
    popularProducts: [8, 3, 2, 9],
    faqs: [
      {
        question: "Can you deliver to university campuses?",
        answer: "Yes, we deliver to all major UK universities and can coordinate delivery to graduation venues."
      },
      {
        question: "Do you have university-specific designs?",
        answer: "We can customize balloons with university colors and themes for a personalized graduation celebration."
      },
      {
        question: "Can you include the graduation year?",
        answer: "Absolutely! We can add graduation years, degree types, and personalized achievement messages."
      }
    ]
  },
  {
    id: "valentines-day",
    name: "Valentine's Day Balloons",
    slug: "valentines-day",
    description: "Romantic balloons for the season of love",
    longDescription: "Express your love with our romantic Valentine's Day balloon collection. From heart-shaped balloons to love bouquets, create unforgettable romantic moments. Perfect for proposals, romantic dinners, or simply showing someone how much you care.",
    image: "/images/5. Love bouquet_£30.png",
    price: "From £30.00",
    features: [
      "Heart-shaped designs",
      "Romantic colors",
      "Love messages",
      "Proposal perfect",
      "Surprise delivery",
      "Couples themes"
    ],
    occasions: ["Valentine's Day", "Proposals", "Anniversaries", "Romantic dinners", "Date nights"],
    seoTitle: "Valentine's Day Balloons | Romantic Heart Balloons | Gifted Balloon",
    seoDescription: "Romantic Valentine's Day balloons and love bouquets. Perfect for proposals, romantic dinners, and expressing your love. Same day delivery available.",
    popularProducts: [1, 5, 2, 6],
    faqs: [
      {
        question: "Can you deliver on Valentine's Day?",
        answer: "Yes, we offer same day delivery on Valentine's Day. We recommend ordering early to secure your preferred time slot."
      },
      {
        question: "Do you have balloons suitable for proposals?",
        answer: "Absolutely! Our heart-shaped and romantic balloon arrangements are perfect for proposal moments."
      },
      {
        question: "Can you include love messages?",
        answer: "Yes, we can personalize balloons with romantic messages, names, and special love quotes."
      }
    ]
  }
];

export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find(service => service.slug === slug);
};

export const getAllServiceSlugs = (): string[] => {
  return services.map(service => service.slug);
};