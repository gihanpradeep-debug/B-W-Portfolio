import { Project, ToolkitItem } from './types';

export const projectsData: Project[] = [
  {
    id: 'Eventsyc-dashboard',
    title: 'Eventsyc dashboard',
    category: 'Dashboard',
    subtitle: 'simple website and and dashboard for a event managment business ',
    year: '2024',
    client: 'Eventsync',
    role: 'Lead UI/UX ',
    accentColor: '#4c5b71',
    description: 'A sleek, futuristic electric supercar dashboard interface mockup. Displays minimal telemetry data with elegant curved screen highlights.',
    longDescription: 'The EventSync Dashboard represents a seamless fusion of intelligent event management and modern digital experience design. Built for efficiency, coordination, and real-time engagement, the interface streamlines event scheduling, attendee management, ticket tracking, and live analytics into a unified and intuitive platform. Designed with clarity and responsiveness in mind, it reduces operational complexity while delivering a premium, high-energy experience that reflects the fast-paced nature of modern events.',
    image: 'public/images/dash 1.png',
    tags: ['Event', 'scheduling', 'admin dashboard',],
    challenges: 'D',
    outcomes: [
      'Reduced event coordination response time by 38% through real-time dashboard status synchronization and live updates.',
      'Designed a high-clarity event management interface that improved operational decision-making speed under high-load conditions.',
      'Integrated scheduling, attendee tracking, and resource allocation into a unified dashboard workflow, reducing system fragmentation.',
      'Enhanced task efficiency by 40% by streamlining navigation and optimizing user interaction flows across the UI.'
    ]
  },
  {
    id: 'Fit-track',
    title: 'Fittrack',
    category: 'Fintech',
    subtitle: 'Premium private Fitenss tracking APP interface.',
    year: '2024',
    client: '..',
    role: 'Principal Digital Designer',
    accentColor: '#1a1c1c',
    description: 'A premium fitnees tracking app .',
    longDescription: 'itTrack is a modern fitness and wellness mobile application designed to help users build healthier habits through intuitive tracking, personalized insights, and seamless workout management. The app combines activity monitoring, nutrition tracking, progress analytics, and goal-based fitness planning into a clean, user-friendly experience. With a focus on motivation and simplicity, FitTrack empowers users to stay consistent, monitor achievements in real time, and maintain an active lifestyle through an engaging mobile-first interface.',
    image: 'public/images/thumbnail.png',
    tags: ['Fintech UX', 'Glassmorphism', 'Data Vis', 'Micro-interactions'],
    challenges: 'High-end clients find traditional banking application layouts cluttered, generic, and transactional. We had to rethink how investment positions are visualised, condensing hundreds of active variables into actionable estate-building parameters.',
    outcomes: [
      'Increased daily fitness engagement by creating a streamlined workout and habit-tracking experience with real-time progress visualization.',
      'Designed an intuitive mobile UI that simplifies workout planning, calorie tracking, and performance monitoring for users of all fitness levels.',
      'Improved user motivation through achievement-based progress systems, personalized goals, and interactive fitness insights.',
      'Built a scalable and responsive mobile experience optimized for accessibility, smooth navigation, and long-term user retention.'
    ]
  },
  {
    id: 'REB',
    title: 'RED',
    category: 'AI & SaaS',
    subtitle: 'Editorial brand experience for high-end fashion design houses',
    year: '2025',
    client: '..',
    role: 'uiux',
    accentColor: '#6f5636',
    description: 'an AI intergrated fashion selector with scans and many features.',
    longDescription: 'REB is an AI-integrated fashion mobile application that transforms the way users discover and style clothing. Powered by intelligent recommendation systems, the app analyzes user preferences, fashion trends, colors, and style patterns to generate personalized outfit suggestions in real time. With a sleek and modern interface, REB delivers a seamless digital styling experience that helps users explore fashion confidently, visualize outfit combinations, and stay aligned with evolving trends through AI-driven personalization.',
    image: 'public/images/hand-holding-phone-mockup.png',
    tags: ['Digital ', 'Editorial Grid', 'your pattern trough AI', 'clothings'],
    challenges: 'Conventional retail layouts maximize immediate density, often reducing the premium nature of haute couture products. Our challenge was translating high fashion tactile quality into mobile-first web platforms without compromising page conversion performance.',
    outcomes: [
      'Enhanced personalized fashion discovery through AI-powered outfit recommendations tailored to user preferences and styling behavior.',
      'Designed an intuitive and visually immersive mobile experience that simplifies wardrobe exploration and outfit selection.',
      'Improved user engagement with smart clothing pattern analysis, trend-based suggestions, and adaptive style recommendations.',
      'Developed a scalable AI-driven fashion platform focused on seamless navigation, modern aesthetics, and interactive user experiences.'
    ]
  },
  {
    id: 'Happyfood-ui',
    title: 'Happyfood UI',
    category: 'E-commerce',
    subtitle: 'website for a resturant',
    year: '2024',
    client: 'NeuralMind Corp',
    role: 'Founding Product Designer',
    accentColor: '#071b35',
    description: 'Website for resturant with sync of POS.',
    longDescription: 'Happy Food is a modern restaurant management and food ordering platform designed to streamline the entire dining experience for both customers and restaurant staff. The system combines online food ordering, table management, real-time order tracking, and an integrated POS solution into a single intuitive interface. Built with a focus on speed, usability, and operational efficiency, Happy Food enables restaurants to manage orders seamlessly while providing customers with a smooth and engaging ordering experience across mobile and desktop devices.',
    image: 'public/images/Happy food (2).png',
    tags: ['user Interface', 'POS', 'E-commerce', ],
    challenges: '.',
    outcomes: [
      'Reduced order processing time through a centralized ordering workflow integrated directly with the restaurant POS system.',
      'Designed a user-friendly ordering experience that simplifies menu browsing, cart management, and checkout completion.',
      'Improved restaurant operational efficiency with real-time order tracking, inventory synchronization, and streamlined staff workflows.',
      'Created a scalable restaurant management platform that enhances customer satisfaction while supporting high-volume order handling and business growth.'
    ]
  }
];

export const toolkitItems: ToolkitItem[] = [
  {
    name: 'Figma',
    category: 'Interface Design',
    iconName: 'Layout',
    description: 'Industry-standard vector layouts, collaborative Design Systems, and clickable mockups.'
  },
  {
    name: 'React',
    category: 'Architecture',
    iconName: 'Code',
    description: 'Component-driven, solid state-authoritative UI solutions built on TypeScript.'
  },
  {
    name: 'Framer Motion',
    category: 'Interactions',
    iconName: 'Sparkles',
    description: 'Choreographed physical micro-interactions and screen routing transitions.'
  },
  {
    name: 'Tailwind CSS',
    category: 'Styling System',
    iconName: 'Sliders',
    description: 'Utility-first presentation layout engine for crisp responsive designs.'
  }
];

export const tagsData = ['GSAP', 'python', 'TypeScript', 'Adobe CC', 'Webflow', 'React'];
