// ─── EDITABLE SITE CONFIGURATION ─────────────────────────────────────────────
// All text, navigation, and train hover content lives here.

export const siteConfig = {
  logo: {
    text: 'RAILTECH',
    tagline: 'Railway Track Solutions',
    href: '/',
  },

  navigation: [
    { label: 'Products', href: '#products' },
    { label: 'Projects', href: '#projects' },
    { label: 'What We Do', href: '#what-we-do' },
    { label: 'Contact Us', href: '#contact' },
  ],

  hero: {
    title: 'Engineering the Future of Rail',
    subtitle: 'From classic sleepers to precision high-speed track systems',
  },

  // ─── TRAIN HOVER POPUPS ───────────────────────────────────────────────────
  // Edit name, period, description, sleeperType, railType, maxSpeed freely.
  trains: [
    {
      id: 1,
      trackLabel: 'Track 1',
      name: 'Steam Era',
      period: '1820s – 1900s',
      description:
        'The birth of railway infrastructure. Wrought iron rails fixed to wooden sleepers carried the first steam locomotives at modest speeds across continents.',
      sleeperType: 'Wooden Sleepers',
      railType: 'Wrought Iron Rails',
      maxSpeed: '~30 km/h',
      accentColor: '#b5651d',
    },
    {
      id: 2,
      trackLabel: 'Track 2',
      name: 'Industrial Revolution',
      period: '1900s – 1950s',
      description:
        'Steel rails and creosote-treated timber sleepers enabled heavy freight and intercity passenger networks worldwide.',
      sleeperType: 'Treated Timber Sleepers',
      railType: 'Flat-Bottom Steel Rails',
      maxSpeed: '~80 km/h',
      accentColor: '#4a7a3d',
    },
    {
      id: 3,
      trackLabel: 'Track 3',
      name: 'Concrete Revolution',
      period: '1950s – 1980s',
      description:
        'Pre-stressed concrete sleepers replaced timber, enabling heavier axle loads, reduced maintenance cycles, and improved track geometry.',
      sleeperType: 'Mono-Block Concrete Sleepers',
      railType: 'UIC 60 Heavy Rail',
      maxSpeed: '~160 km/h',
      accentColor: '#3a5a8a',
    },
    {
      id: 4,
      trackLabel: 'Track 4',
      name: 'High-Speed Networks',
      period: '1980s – 2010s',
      description:
        'Twin-block sleepers and advanced elastic fastening systems unlocked Europe and Asia\'s intercity express networks at unprecedented speed.',
      sleeperType: 'Twin Block Sleepers',
      railType: '60E1 Rail Profile',
      maxSpeed: '~250 km/h',
      accentColor: '#5a3a8a',
    },
    {
      id: 5,
      trackLabel: 'Track 5',
      name: 'Shinkansen N700S',
      period: '2010s – Present',
      description:
        'Ultra-precision engineered slab track systems support Japan\'s N700S Shinkansen. Zero-maintenance ballastless design for maximum reliability at record speed.',
      sleeperType: 'Rheda 2000 Slab Track',
      railType: 'Shinkansen 60 kg/m Rail',
      maxSpeed: '~320 km/h',
      accentColor: '#1a6aaa',
    },
  ],
} as const

export type TrainData = (typeof siteConfig.trains)[number]
