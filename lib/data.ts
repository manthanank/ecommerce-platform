export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewsCount: number;
  inventory: number;
  description: string;
  features: string[];
  specs: Record<string, string>;
  colors: { name: string; hex: string }[];
  sizes?: string[];
  images: string[];
  isFeatured?: boolean;
  isNew?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  itemCount: number;
  image: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  size?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  status: "Confirmed" | "Processing" | "Shipped" | "Delivered";
  trackingNumber: string;
  carrier: string;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  items: OrderItem[];
}

export const CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Audio & Acoustics",
    slug: "audio",
    icon: "Headphones",
    description: "Lossless ANC headphones, studio monitors & high-fidelity gear",
    itemCount: 18,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
  },
  {
    id: "cat-2",
    name: "Desk & Workspaces",
    slug: "workspace",
    icon: "Laptop",
    description: "Machined aluminum stands, wireless docks & mechanical boards",
    itemCount: 24,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
  },
  {
    id: "cat-3",
    name: "Minimalist Wear",
    slug: "apparel",
    icon: "Shirt",
    description: "Merino wool layers, weatherproof technical shells & tailored staples",
    itemCount: 15,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80",
  },
  {
    id: "cat-4",
    name: "Everyday Carry",
    slug: "edc",
    icon: "Watch",
    description: "Titanium chronographs, RFID travel wallets & biometric key organizers",
    itemCount: 20,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Aura Pro Wireless Spatial Headphones",
    slug: "aura-pro-headphones",
    category: "audio",
    price: 349,
    compareAtPrice: 399,
    rating: 4.9,
    reviewsCount: 342,
    inventory: 48,
    isFeatured: true,
    isNew: true,
    description:
      "Crafted from aerospace titanium and breathable memory knit, the Aura Pro delivers custom-tuned 40mm beryllium drivers with hybrid active noise cancellation and 42-hour battery stamina.",
    features: [
      "Custom 40mm Beryllium acoustic drivers",
      "Adaptive ANC with 8 beamforming microphones",
      "Lossless 24-bit/96kHz ultra-low latency wireless",
      "42 hours of playback with 15-minute quick charge",
      "Ergonomic magnetic ear cushions with sheepskin leather",
    ],
    specs: {
      "Frequency Response": "5Hz - 45,000Hz",
      Impedance: "32 Ohms",
      Weight: "265g",
      Connectivity: "Bluetooth 5.4, USB-C DAC, 3.5mm analog",
      Battery: "42 Hours (ANC On)",
    },
    colors: [
      { name: "Matte Slate", hex: "#1e293b" },
      { name: "Silver Lunar", hex: "#94a3b8" },
      { name: "Midnight Obsidian", hex: "#0f172a" },
    ],
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80",
    ],
  },
  {
    id: "prod-2",
    name: "Linear CNC 75% Mechanical Keyboard",
    slug: "linear-75-keyboard",
    category: "workspace",
    price: 219,
    compareAtPrice: 249,
    rating: 4.8,
    reviewsCount: 189,
    inventory: 23,
    isFeatured: true,
    description:
      "Gasket-mounted acoustic dampening with hot-swappable tactile switches, frosted polycarbonate diffuser, and precision CNC anodized 6063 aluminum enclosure.",
    features: [
      "Gasket mounted plate design with PORON foam dampening",
      "Hot-swappable Kailh 5-pin mechanical switches",
      "Custom programmable QMK/VIA keymap firmware",
      "Anodized solid 6063 aerospace aluminum case",
      "Triple mode connectivity: 2.4GHz, Bluetooth 5.3, USB-C",
    ],
    specs: {
      Layout: "75% ANSI / ISO (82 keys)",
      Plate: "Polycarbonate Flex-Cut",
      Battery: "4000mAh Lithium-ion",
      Weight: "1,450g",
      Lighting: "Per-key South-facing RGB LEDs",
    },
    colors: [
      { name: "Space Gray", hex: "#334155" },
      { name: "Anodized Silver", hex: "#cbd5e1" },
      { name: "Forest Emerald", hex: "#064e3b" },
    ],
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80",
    ],
  },
  {
    id: "prod-3",
    name: "Chronos Titanium Automatic Field Watch",
    slug: "chronos-titanium-watch",
    category: "edc",
    price: 489,
    compareAtPrice: 550,
    rating: 5.0,
    reviewsCount: 96,
    inventory: 14,
    isFeatured: true,
    isNew: true,
    description:
      "A rugged yet refined automatic tool watch milled from Grade 5 titanium. Features double-domed anti-reflective sapphire crystal, Swiss Super-LumiNova markers, and 200m water resistance.",
    features: [
      "Grade 5 Titanium case with DLC scratch-resistant coating",
      "Double-domed sapphire crystal with 5 layers of AR coating",
      "Caliber 9039 high-beat 28,800 BPH automatic movement",
      "Grade X1 Swiss Super-LumiNova dial indices",
      "20 ATM / 200m depth rated with screw-down crown",
    ],
    specs: {
      Diameter: "38.5mm",
      Thickness: "10.8mm",
      "Lug-to-Lug": "46mm",
      Movement: "Miyota 9039 Automatic (42hr reserve)",
      Strap: "20mm quick-release FKM fluoroelastomer",
    },
    colors: [
      { name: "Titanium Raw", hex: "#64748b" },
      { name: "Tactical Matte Black", hex: "#0f172a" },
    ],
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80",
    ],
  },
  {
    id: "prod-4",
    name: "Thermal GORE-TEX Storm Parka",
    slug: "storm-parka",
    category: "apparel",
    price: 380,
    compareAtPrice: 420,
    rating: 4.7,
    reviewsCount: 120,
    inventory: 31,
    isFeatured: false,
    description:
      "Engineered for sub-zero alpine blizzards and torrential urban commutes. Triple-layer GORE-TEX Pro membrane taped with 800-fill responsible down insulation.",
    features: [
      "3-layer waterproof, windproof GORE-TEX Pro shell",
      "800-fill RDS certified goose down thermal core",
      "Storm-hood with dual-point Cohaesive cord lock system",
      "Magnetic storm flap closure with Aquaguard YKK zippers",
      "Internal thermal smartphone pouch with RF shielding",
    ],
    specs: {
      Material: "100% Recycled Nylon GORE-TEX 3L",
      "Fill Power": "800 Goose Down",
      "Waterproof Rating": "28,000mm",
      "Breathability Rating": "RET < 6",
    },
    colors: [
      { name: "Onyx Black", hex: "#111827" },
      { name: "Arctic Mist", hex: "#e2e8f0" },
      { name: "Sage Khaki", hex: "#3f4d38" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    ],
  },
  {
    id: "prod-5",
    name: "Apex Studio Hi-Fi Nearfield Monitors (Pair)",
    slug: "apex-studio-monitors",
    category: "audio",
    price: 599,
    compareAtPrice: 650,
    rating: 4.9,
    reviewsCount: 78,
    inventory: 12,
    isFeatured: false,
    description:
      "Bi-amplified reference studio monitors equipped with custom Kevlar woofers, waveguide silk tweeters, and room DSP acoustic correction.",
    features: [
      "120W Class-D bi-amplified architecture",
      "5.25\" woven Kevlar low-frequency drivers",
      "1\" silk dome waveguide high-frequency tweeters",
      "Integrated DSP boundary filter room correction",
      "Balanced XLR, TRS, and USB-C digital optical inputs",
    ],
    specs: {
      "Frequency Range": "42Hz - 22kHz (-3dB)",
      "Max Peak SPL": "108 dB",
      Power: "120W RMS (Pair)",
      Weight: "5.8kg per speaker",
    },
    colors: [
      { name: "Studio Matte Black", hex: "#18181b" },
      { name: "Polar White", hex: "#f4f4f5" },
    ],
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
    ],
  },
  {
    id: "prod-6",
    name: "MagDock 3-in-1 Solid Walnut Charging Station",
    slug: "magdock-walnut-charger",
    category: "workspace",
    price: 139,
    compareAtPrice: 160,
    rating: 4.8,
    reviewsCount: 215,
    inventory: 64,
    isFeatured: false,
    description:
      "Handcrafted from FSC-certified solid American walnut with zinc alloy accents. Qi2 certified 15W fast magnetic charging for iPhone, Apple Watch, and AirPods simultaneously.",
    features: [
      "Official Qi2 15W high-speed magnetic alignment",
      "Fast charging module for Apple Watch Ultra/Series 9",
      "Carved solid sustainable American Walnut base",
      "Weighted base with micro-suction anti-slip footing",
      "Includes 2m braided nylon USB-C power cable",
    ],
    specs: {
      Output: "15W Phone + 5W Watch + 5W Earbuds",
      Input: "30W USB-PD minimum",
      Dimensions: "180mm x 90mm x 115mm",
      Weight: "420g",
    },
    colors: [
      { name: "American Walnut", hex: "#5c4033" },
      { name: "Smoked Oak", hex: "#3b302a" },
    ],
    images: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
    ],
  },
  {
    id: "prod-7",
    name: "Aerospace Minimalist Cardholder & Clip",
    slug: "aerospace-cardholder",
    category: "edc",
    price: 89,
    compareAtPrice: 105,
    rating: 4.9,
    reviewsCount: 412,
    inventory: 85,
    isFeatured: false,
    description:
      "Block RFID skimming and streamline your pocket carry. CNC milled from 6061 billet aluminum with titanium cash clip and elastic silicone band.",
    features: [
      "Accommodates 1 to 12 cards without stretching",
      "Full RFID-blocking dual plate security barrier",
      "Integrated Grade 2 Titanium cash spring clip",
      "Beveled thumb card ejection slot for one-handed access",
    ],
    specs: {
      Weight: "58g",
      Dimensions: "86mm x 54mm x 6mm",
      Material: "6061-T6 Anodized Aluminum",
    },
    colors: [
      { name: "Gunmetal Gray", hex: "#475569" },
      { name: "Matte Black", hex: "#0f172a" },
      { name: "Desert Sand", hex: "#a18262" },
    ],
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80",
    ],
  },
  {
    id: "prod-8",
    name: "Seamless Merino Wool Base Crew",
    slug: "seamless-merino-crew",
    category: "apparel",
    price: 115,
    compareAtPrice: 135,
    rating: 4.6,
    reviewsCount: 88,
    inventory: 40,
    isFeatured: false,
    description:
      "Ultra-fine 17.5 micron Australian Merino wool knit into a seamless 3D contour silhouette. Thermoregulating, moisture-wicking, and naturally odor-resistant for weeks of travel.",
    features: [
      "100% 17.5-micron superfine ZQ certified Merino wool",
      "3D seamless circular knit eliminates friction and chafe",
      "Natural UV 30+ barrier protection",
      "Machine washable with cold gentle wool cycle",
    ],
    specs: {
      "Fabric Weight": "200 GSM Midweight",
      Origin: "New Zealand Wool, Knit in Italy",
      Fit: "Athletic Tailored",
    },
    colors: [
      { name: "Charcoal Heather", hex: "#374151" },
      { name: "Navy Ink", hex: "#1e3a5f" },
      { name: "Bone White", hex: "#f3f4f6" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80",
    ],
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: "ord-901",
    orderNumber: "ORD-84912-US",
    date: "2026-11-19",
    customerName: "Alex Mercer",
    customerEmail: "alex.mercer@gmail.com",
    shippingAddress: "742 Evergreen Terrace, Seattle, WA 98101",
    status: "Delivered",
    trackingNumber: "FEDEX-839210948",
    carrier: "FedEx Express Priority",
    subtotal: 568,
    discount: 50,
    shipping: 0,
    total: 518,
    items: [
      {
        productId: "prod-1",
        name: "Aura Pro Wireless Spatial Headphones",
        price: 349,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        color: "Matte Slate",
      },
      {
        productId: "prod-2",
        name: "Linear CNC 75% Mechanical Keyboard",
        price: 219,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
        color: "Space Gray",
      },
    ],
  },
  {
    id: "ord-902",
    orderNumber: "ORD-72019-EU",
    date: "2026-11-18",
    customerName: "Elena Rostova",
    customerEmail: "elena.r@nordictech.io",
    shippingAddress: "Karlavägen 45, Stockholm, Sweden",
    status: "Shipped",
    trackingNumber: "DHL-994821034",
    carrier: "DHL Express Worldwide",
    subtotal: 489,
    discount: 0,
    shipping: 25,
    total: 514,
    items: [
      {
        productId: "prod-3",
        name: "Chronos Titanium Automatic Field Watch",
        price: 489,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80",
        color: "Titanium Raw",
      },
    ],
  },
  {
    id: "ord-903",
    orderNumber: "ORD-61044-CA",
    date: "2026-11-17",
    customerName: "Marcus Vance",
    customerEmail: "m.vance@vancetech.ca",
    shippingAddress: "1080 Bay St, Toronto, ON M5S 0A5",
    status: "Processing",
    trackingNumber: "UPS-209481230",
    carrier: "UPS Ground Track",
    subtotal: 519,
    discount: 40,
    shipping: 15,
    total: 494,
    items: [
      {
        productId: "prod-4",
        name: "Thermal GORE-TEX Storm Parka",
        price: 380,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80",
        color: "Onyx Black",
        size: "L",
      },
      {
        productId: "prod-6",
        name: "MagDock 3-in-1 Solid Walnut Charging Station",
        price: 139,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
        color: "American Walnut",
      },
    ],
  },
  {
    id: "ord-904",
    orderNumber: "ORD-51928-US",
    date: "2026-11-16",
    customerName: "Sarah Jenkins",
    customerEmail: "sarah.j@designfirm.com",
    shippingAddress: "350 5th Ave, New York, NY 10118",
    status: "Confirmed",
    trackingNumber: "USPS-940011189",
    carrier: "USPS Priority Mail",
    subtotal: 599,
    discount: 60,
    shipping: 0,
    total: 539,
    items: [
      {
        productId: "prod-5",
        name: "Apex Studio Hi-Fi Nearfield Monitors (Pair)",
        price: 599,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80",
        color: "Studio Matte Black",
      },
    ],
  },
];

export const SALES_METRICS = [
  { month: "Jun", revenue: 42500, orders: 124, aov: 342 },
  { month: "Jul", revenue: 51200, orders: 148, aov: 345 },
  { month: "Aug", revenue: 64800, orders: 182, aov: 356 },
  { month: "Sep", revenue: 73900, orders: 204, aov: 362 },
  { month: "Oct", revenue: 89400, orders: 241, aov: 370 },
  { month: "Nov", revenue: 104200, orders: 286, aov: 364 },
];

export const CATEGORY_DISTRIBUTION = [
  { name: "Audio & Acoustics", value: 38, fill: "#3b82f6" },
  { name: "Desk & Workspaces", value: 28, fill: "#10b981" },
  { name: "Everyday Carry", value: 20, fill: "#8b5cf6" },
  { name: "Minimalist Wear", value: 14, fill: "#f59e0b" },
];

