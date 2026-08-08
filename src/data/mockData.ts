import type { RoutePackage, PrivateVehicle, TicketBooking } from '../types';

export const MOCK_PACKAGES: RoutePackage[] = [
  {
    id: 'pkg-banos',
    title: 'Baños de Agua Santa & Ruta de las Cascadas VIP',
    region: 'Sierra',
    origin: 'Quito',
    destination: 'Baños de Agua Santa',
    intermediateStops: ['Tambillo', 'Machachi', 'Latacunga', 'Salcedo', 'Ambato'],
    price: 89,
    originalPrice: 120,
    durationDays: 2,
    rating: 4.9,
    reviewsCount: 142,
    imageUrl: '/images/banos.jpg',
    inclusions: {
      transport: true,
      hotel: true,
      breakfast: true,
      activities: true,
    },
    departureTimes: ['06:00 AM', '07:30 AM', '09:00 AM'],
    description: 'Experiencia completa en el portal de la Amazonía ecuatoriana. Incluye transporte VIP interprovincial, hospedaje 4 estrellas en el centro de Baños, desayuno buffet andino y entrada directa a la Pailón del Diablo, Tarabita y Casa del Árbol.',
    hotelName: 'Hotel Sangay Spa & Resort (Baños)',
    activitiesList: [
      'Entrada VIP al Pailón del Diablo y Paseo en Tarabita sobre el Río Pastaza',
      'Visita a la Casa del Árbol y Columpio del Fin del Mundo',
      'Tour nocturno en Chiva Turística con canelazo tradicional',
      'Paseo por el Mirador de Bellavista'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Quito - Baños & Aventura de Cascadas',
        description: 'Salida desde Quito o paradas intermedias (Machachi, Latacunga). Arribo a Baños, check-in en hotel spa. Tarde de ruta de las cascadas y paseo en tarabita sobre el cañón del río Pastaza.'
      },
      {
        day: 2,
        title: 'Columpio del Fin del Mundo & Retorno VIP',
        description: 'Desayuno buffet, tour a la Casa del Árbol con vista panorámica al volcán Tungurahua. Tiempo libre para compras de melcochas y retorno cómodo a Quito.'
      }
    ]
  },
  {
    id: 'pkg-cotopaxi',
    title: 'Aventura Andina: Volcán Cotopaxi & Laguna Quilotoa',
    region: 'Sierra',
    origin: 'Quito',
    destination: 'Latacunga / Quilotoa',
    intermediateStops: ['Tambillo', 'Machachi', 'Lasso', 'Pujilí'],
    price: 65,
    originalPrice: 95,
    durationDays: 1,
    rating: 4.8,
    reviewsCount: 98,
    imageUrl: '/images/cotopaxi.jpg',
    inclusions: {
      transport: true,
      hotel: false,
      breakfast: true,
      activities: true,
    },
    departureTimes: ['05:30 AM', '06:30 AM'],
    description: 'Conoce los dos gigantes andinos en un solo día. Ascenso al Refugio José Rivas en el volcán Cotopaxi y descenso a la espectacular cráter-laguna de Quilotoa.',
    hotelName: 'Hostería Papagayo Cotopaxi (Día entero)',
    activitiesList: [
      'Caminata guiada al Refugio José Rivas (4.860m.s.n.m.)',
      'Visita al Centro de Interpretación y Laguna Limpiopungo',
      'Descenso y caminata en el cráter turquesa de Quilotoa',
      'Desayuno andino de páramo y almuerzo buffet local'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Exploración Cotopaxi + Quilotoa Full Day',
        description: 'Recogida matutina en origen o puntos intermedios. Entrada al P.N. Cotopaxi, caminata fotográfica con caballos salvajes. Traslado a Quilotoa para contemplar el cráter volcánico.'
      }
    ]
  },
  {
    id: 'pkg-cuenca',
    title: 'Cuenca Patrimonio Cultural & Parque Nacional Cajas',
    region: 'Sierra',
    origin: 'Guayaquil',
    destination: 'Cuenca',
    intermediateStops: ['El Triunfo', 'Puerto Inca', 'Molleturo', 'Cajas'],
    price: 135,
    originalPrice: 175,
    durationDays: 3,
    rating: 5.0,
    reviewsCount: 210,
    imageUrl: '/images/cuenca.jpg',
    inclusions: {
      transport: true,
      hotel: true,
      breakfast: true,
      activities: true,
    },
    departureTimes: ['06:00 AM', '08:00 AM', '02:00 PM'],
    description: 'Disfruta de la Atenas del Ecuador. Transporte panorámico cruzando el Cajas, hospedaje boutique colonial cerca del Parque Calderón y tour guiado por la Catedral y Mirador Turi.',
    hotelName: 'Hotel Boutique Carvallo (Centro Histórico Cuenca)',
    activitiesList: [
      'City Tour Colonial: Catedral Azul, Calle de las Cruces y Mirador Turi',
      'Visita a los talleres tradicionales de Sombreros de Paja Toquilla (Panama Hat)',
      'Excursión al Parque Nacional El Cajas (Laguna La Toreadora)',
      'Cena de bienvenida con gastronomía azuaya'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Ruta Guayaquil - Cajas - Arribo a Cuenca',
        description: 'Salida desde Guayaquil cruzando la cordillera. Parada panorámica en El Cajas. Llegada a Cuenca y recorrido a pie por el barranco del río Tomebamba.'
      },
      {
        day: 2,
        title: 'Cultura Colonial & Artesanías de Gualaceo',
        description: 'Desayuno cuencano. Visita a la Catedral de la Inmaculada Concepción y talleres artesanales en Chordeleg y Gualaceo.'
      },
      {
        day: 3,
        title: 'Lagunas de Cajas & Retorno',
        description: 'Mañana libre para compras de recuerdos y cafeterías coloniales. Retorno en bus VIP a Guayaquil.'
      }
    ]
  },
  {
    id: 'pkg-manta',
    title: 'Manta Beach Resort & Ruta del Spondylus Luxury',
    region: 'Costa',
    origin: 'Quito',
    destination: 'Manta',
    intermediateStops: ['Santo Domingo', 'Quevedo', 'Portoviejo', 'Montecristi'],
    price: 159,
    originalPrice: 210,
    durationDays: 3,
    rating: 4.9,
    reviewsCount: 176,
    imageUrl: '/images/manta.jpg',
    inclusions: {
      transport: true,
      hotel: true,
      breakfast: true,
      activities: true,
    },
    departureTimes: ['07:00 AM', '09:00 PM (Nocturno)'],
    description: 'Escápate a las playas del Pacífico ecuatoriano. Transporte interprovincial en bus cama VIP con aire acondicionado, hospedaje frente al mar en Manta y paseos por Montecristi.',
    hotelName: 'Oro Verde Manta Beachfront Resort',
    activitiesList: [
      'Paseo por Playa Murciélago y Malecón Escénico de Manta',
      'Visita a Ciudad Alfaro y talleres en Montecristi',
      'Paseo en lancha y avistamiento costero',
      'Cenas buffet con ceviches manabitas'
    ],
    itinerary: [
      {
        day: 1,
        title: 'De los Andes a la Costa Pacífica',
        description: 'Salida en bus VIP pasando por la ceja de selva de Santo Domingo. Arribo a Manta, check-in en resort marítimo y tarde libre de playa.'
      },
      {
        day: 2,
        title: 'Ruta Spondylus & Montecristi',
        description: 'Desayuno marinero buffet. Recorrido a Montecristi para admirar el tejido fino del sombrero de paja toquilla y la historia de Eloy Alfaro.'
      },
      {
        day: 3,
        title: 'Gastronomía Manabita & Retorno',
        description: 'Almuerzo de ceviche manabita tradicional en la playa y retorno confortable.'
      }
    ]
  },
  {
    id: 'pkg-otavalo',
    title: 'Otavalo Artesanal, Cascada de Peguche & Cuicocha',
    region: 'Sierra',
    origin: 'Quito',
    destination: 'Otavalo',
    intermediateStops: ['Calderón', 'Guayllabamba', 'Cayambe'],
    price: 55,
    originalPrice: 80,
    durationDays: 1,
    rating: 4.8,
    reviewsCount: 115,
    imageUrl: '/images/otavalo.jpg',
    inclusions: {
      transport: true,
      hotel: false,
      breakfast: true,
      activities: true,
    },
    departureTimes: ['07:00 AM', '08:30 AM'],
    description: 'Recorre el mercado indígena más famoso de Sudamérica. Degusta los tradicionales bizcochos de Cayambe, contempla la mística cascada de Peguche y pasea en lancha por la laguna volcánica de Cuicocha.',
    hotelName: 'Hostería Cabañas del Lago (Almuerzo andino)',
    activitiesList: [
      'Parada gastronómica en Cayambe (Bizcochos y Queso de Hoja)',
      'Visita libre a la Plaza de Ponchos en el Mercado de Otavalo',
      'Caminata sagrada en la Cascada de Peguche',
      'Paseo en lancha en la Laguna de Cuicocha al pie del Cotacachi'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Ruta del Sol de la Mitad del Mundo a Imbabura',
        description: 'Salida matutina. Parada en Cayambe para probar bizcochos calientes. Recorrido artesanal en Otavalo y paseo panorámico en Cuicocha antes del retorno a Quito.'
      }
    ]
  },
  {
    id: 'pkg-tena',
    title: 'Expedición Amazónica Tena, Misahuallí & Eco-Lodge',
    region: 'Amazonía',
    origin: 'Quito',
    destination: 'Tena',
    intermediateStops: ['Papallacta', 'Baeza', 'Archidona'],
    price: 145,
    originalPrice: 190,
    durationDays: 3,
    rating: 4.9,
    reviewsCount: 134,
    imageUrl: '/images/tena.jpg',
    inclusions: {
      transport: true,
      hotel: true,
      breakfast: true,
      activities: true,
    },
    departureTimes: ['06:30 AM', '01:00 PM'],
    description: 'Adéntrate en la selva alta del Ecuador. Transporte 4x4 especializado, alojamiento en eco-lodge de madera a orillas del río Napo, avistamiento de monos en Puerto Misahuallí y excursión a Cavernas de Jumandy.',
    hotelName: 'Yacuma Eco-Lodge & Rainforest Reserve',
    activitiesList: [
      'Caminata con guía nativo kichwa por senderos de plantas medicinales',
      'Navegación en canoa a motor por el Río Napo',
      'Visita a Puerto Misahuallí y convivencia con monos capuchinos',
      'Exploración en la Cueva de Jumandy con linternas frontales'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Descenso de los Andes a la Amazonía',
        description: 'Cruza el abra de Papallacta (4.000m) y desciende hacia la selva tropical de Archidona y Tena. Check-in en Eco-lodge y caminata nocturna de insectos luminosos.'
      },
      {
        day: 2,
        title: 'Navegación por el Río Napo & Comunidad Kichwa',
        description: 'Navegación en canoa, elaboración tradicional de chocolate de cacao fino de aroma y baño en cascadas de agua cristalina.'
      },
      {
        day: 3,
        title: 'Cavernas de Jumandy & Retorno',
        description: 'Desayuno amazónico con guayusa, recorrido subterráneo en las cavernas de Jumandy y retorno a Quito.'
      }
    ]
  },
  {
    id: 'pkg-galapagos',
    title: 'Galápagos Mágico: Santa Cruz & Islas Encantadas VIP',
    region: 'Insular',
    origin: 'Guayaquil',
    destination: 'Puerto Ayora (Galápagos)',
    intermediateStops: ['Baltra', 'Canal de Itabaca'],
    price: 490,
    originalPrice: 650,
    durationDays: 4,
    rating: 5.0,
    reviewsCount: 320,
    imageUrl: '/images/galapagos.jpg',
    inclusions: {
      transport: true,
      hotel: true,
      breakfast: true,
      activities: true,
    },
    departureTimes: ['08:00 AM', '10:30 AM'],
    description: 'Vive el paraíso biológico del planeta. Incluye transfer terrestre VIP hasta aeropuerto, hotel en Puerto Ayora, caminata a Tortuga Bay, Estación Científica Charles Darwin y snorkel con lobos marinos y tortugas gigantes.',
    hotelName: 'Hotel Solymar Galapagos Beachfront',
    activitiesList: [
      'Caminata escénica y baño de playa en Tortuga Bay',
      'Visita a la Reserva de Tortugas Gigantes en estado natural (Parte Alta)',
      'Entrada a la Estación Científica Charles Darwin',
      'Tour de snorkel en Bahía Franklin y Grietas con lobos marinos'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Llegada a Baltra - Canal Itabaca - Santa Cruz',
        description: 'Transfer VIP, cruce del canal de Itabaca y almuerzo en la parte alta observando tortugas gigantes libres.'
      },
      {
        day: 2,
        title: 'Caminata a Tortuga Bay & Estación Darwin',
        description: 'Mañana en la playa blanca de Tortuga Bay con iguanas marinas. Tarde en la Estación Charles Darwin.'
      },
      {
        day: 3,
        title: 'Tour de Bahía & Snorkel con Fauna Silvestre',
        description: 'Excursión en yate a La Lobería, Las Grietas y Playa de los Perros con guías naturalistas del PNG.'
      },
      {
        day: 4,
        title: 'Última foto en los Cráteres Gemelos & Retorno',
        description: 'Parada en Los Gemelos antes del traslado al aeropuerto de Baltra.'
      }
    ]
  },
  {
    id: 'pkg-montanita',
    title: 'Montañita & Olón Surf, Relax & Sunset Escape',
    region: 'Costa',
    origin: 'Guayaquil',
    destination: 'Montañita / Olón',
    intermediateStops: ['Vía a la Costa', 'Manglaralto', 'Valdivia'],
    price: 79,
    originalPrice: 110,
    durationDays: 2,
    rating: 4.7,
    reviewsCount: 89,
    imageUrl: '/images/montanita.jpg',
    inclusions: {
      transport: true,
      hotel: true,
      breakfast: true,
      activities: true,
    },
    departureTimes: ['07:00 AM', '01:30 PM'],
    description: 'Siente la vibra playera del Pacífico ecuatoriano. Transporte interprovincial directo, alojamiento boutique con piscina en Olón/Montañita, clase introductoria de surf y cóctel de bienvenida al atardecer.',
    hotelName: 'Hostería Nativa Bambú Resort (Olón)',
    activitiesList: [
      'Clase introductoria de Surf con instructores profesionales',
      'Recorrido gastronómico por la calle de los cócteles en Montañita',
      'Visita al Santuario de la Virgen de Olón con vista panorámica a los acantilados',
      'Atardecer en la playa con fogata costera'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Guayaquil a la Costa del Surf',
        description: 'Viaje panorámico por la Vía a la Costa. Check-in en Olón, tarde de surf y atardecer inolvidable.'
      },
      {
        day: 2,
        title: 'Gastronomía de Mariscos & Relax',
        description: 'Desayuno tropical con jugos naturales, tiempo libre de playa y retorno cómodo en bus VIP.'
      }
    ]
  },
  {
    id: 'pkg-guaranda',
    title: 'Ruta del Cacao, Salinas de Guaranda & Chimborazo',
    region: 'Sierra',
    origin: 'Quito',
    destination: 'Guaranda',
    intermediateStops: ['Machachi', 'Ambato', 'San Miguel'],
    price: 95,
    originalPrice: 130,
    durationDays: 2,
    rating: 4.8,
    reviewsCount: 76,
    imageUrl: '/images/guaranda.jpg',
    inclusions: {
      transport: true,
      hotel: true,
      breakfast: true,
      activities: true,
    },
    departureTimes: ['06:00 AM'],
    description: 'Descubre el espíritu comunitario de los Andes. Recorre las fábricas artesanales de queso y chocolates en Salinas de Guaranda y contempla las nieves del majestuoso volcán Chimborazo.',
    hotelName: 'Hotel El Ángel (Guaranda)',
    activitiesList: [
      'Visita guiada a las fábricas comunitarias de Quesos y Chocolates Salinerito',
      'Degustación de chocolates finos de aroma y secado tradicional',
      'Mirador al Coloso Chimborazo (El punto más cercano al Sol)',
      'Tour histórico por el centro colonial de Guaranda'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Viaje a la Provincia de Bolívar & Salinas',
        description: 'Salida desde Quito bordeando la cordillera. Arribo a Salinas de Guaranda y recorrido por los emprendimientos comunitarios.'
      },
      {
        day: 2,
        title: 'Aproximación al Chimborazo & Retorno',
        description: 'Visita a las faldas del Chimborazo para observar vicuñas andinas y retorno cómodo a origen.'
      }
    ]
  },
  {
    id: 'pkg-puerto-lopez',
    title: 'Puerto López, Avistamiento de Ballenas & Isla de la Plata',
    region: 'Costa',
    origin: 'Quito',
    destination: 'Puerto López',
    intermediateStops: ['Santo Domingo', 'Chone', 'Jipijapa'],
    price: 165,
    originalPrice: 220,
    durationDays: 3,
    rating: 4.9,
    reviewsCount: 168,
    imageUrl: '/images/puerto_lopez.jpg',
    inclusions: {
      transport: true,
      hotel: true,
      breakfast: true,
      activities: true,
    },
    departureTimes: ['07:30 AM', '09:00 PM (Nocturno)'],
    description: 'Un encuentro único con la megafauna marina en el Parque Nacional Machalilla. Incluye bus nocturno o diurno VIP, hospedaje frente a la bahía de Puerto López, navegación en catamarán a Isla de la Plata y avistamiento de ballenas jorobadas (en temporada).',
    hotelName: 'Hostería Mandala Eco-Lodge (Puerto López)',
    activitiesList: [
      'Navegación en catamarán a la Isla de la Plata (Galápagos Chiquito)',
      'Avistamiento de ballenas jorobadas con salto acrobático y cantos marinos',
      'Snorkel en arrecifes de coral con peces tropicales',
      'Visita a la Playa de los Frailes y Laguna de Agua Sulfurosa de Salango'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Ruta al Parque Nacional Machalilla',
        description: 'Arribo a Puerto López, check-in en lodge ecológico y tarde en la idílica Playa de los Frailes.'
      },
      {
        day: 2,
        title: 'Navegación a la Isla de la Plata & Ballenas',
        description: 'Día entero de expedición marítima con avistamiento de aves de patas azules, ballenas jorobadas y snorkel.'
      },
      {
        day: 3,
        title: 'Museo Arqueológico de Salango & Retorno',
        description: 'Almuerzo de cazuela marinera y retorno en bus cama interprovincial.'
      }
    ]
  }

];

export const MOCK_VEHICLES: PrivateVehicle[] = [
  {
    id: 'veh-sprinter',
    name: 'Mercedes-Benz Sprinter VIP',
    type: 'Van Luxury',
    capacity: 15,
    pricePerDay: 180,
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop',
    features: ['Aire Acondicionado Tri-Zona', 'WiFi 5G ilimitado', 'Asientos de cuero reclinables', 'Puertos USB en cada fila', 'Pantalla TV HD 24"'],
    driverIncluded: true,
    idealFor: 'Familias extensas, grupos corporativos o tours privados interprovinciales.'
  },
  {
    id: 'veh-coaster',
    name: 'Toyota Coaster Executive',
    type: 'Coaster VIP',
    capacity: 24,
    pricePerDay: 240,
    imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=800&auto=format&fit=crop',
    features: ['Suspension neumática confort', 'Nevera a bordo', 'Micrófono para guía turístico', 'Bodega de equipaje amplia'],
    driverIncluded: true,
    idealFor: 'Delegaciones turísticas, bodas de destino y eventos de empresa.'
  },
  {
    id: 'veh-bus-pano',
    name: 'Scania Bus Panorámico Doble Piso',
    type: 'Bus Panorámico',
    capacity: 45,
    pricePerDay: 420,
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop',
    features: ['Baño químico doble', 'Camas tipo poltrona 160°', 'Sistema audio envolvente JBL', 'Monitoreo GPS 24/7'],
    driverIncluded: true,
    idealFor: 'Giras colegiales, promociones de graduación y excursiones multitudinarias.'
  },
  {
    id: 'veh-h1',
    name: 'Hyundai H1 Starex Executive',
    type: 'Minivan VIP',
    capacity: 8,
    pricePerDay: 120,
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop',
    features: ['Techo panorámico corredizo', 'Dirección asistida confort', 'Maletero mediano', 'Flexibilidad total de horarios'],
    driverIncluded: true,
    idealFor: 'Grupos pequeños de amigos o viajes de negocios VIP.'
  }
];

export const INITIAL_TICKETS: TicketBooking[] = [
  {
    id: 'tkt-1001',
    ticketCode: 'MOV-8849-EC',
    packageId: 'pkg-banos',
    packageName: 'Baños de Agua Santa & Ruta de las Cascadas VIP',
    origin: 'Quito (Terrestre Quitumbe)',
    destination: 'Baños de Agua Santa',
    intermediatePickup: 'Machachi (Intercambiador Sur)',
    departureDate: '2026-08-15',
    departureTime: '07:30 AM',
    seatNumber: '07A (Ventanilla)',
    passengerName: 'María Fernanda Jaramillo',
    passengerDoc: '1723948501',
    passengerPhone: '+593 99 847 2109',
    totalPaid: 89,
    status: 'Confirmed',
    inclusions: {
      transport: true,
      hotel: true,
      breakfast: true,
      activities: true,
    },
    vehicleType: 'Bus Volvo VIP 9700 Grand',
    qrPayload: 'MOV-8849-EC|1723948501|Machachi|07A|Confirmed',
    createdAt: '2026-08-07T10:15:00Z'
  },
  {
    id: 'tkt-1002',
    ticketCode: 'MOV-4120-EC',
    packageId: 'pkg-cuenca',
    packageName: 'Cuenca Patrimonio Cultural & Parque Nacional Cajas',
    origin: 'Guayaquil (Terminal Jaime Roldós)',
    destination: 'Cuenca',
    intermediatePickup: 'Molleturo (Parada Turística)',
    departureDate: '2026-08-18',
    departureTime: '06:00 AM',
    seatNumber: '04B (Pasillo)',
    passengerName: 'Carlos Andrés Morales',
    passengerDoc: '0918273645',
    passengerPhone: '+593 98 123 4567',
    totalPaid: 135,
    status: 'Boarded',
    inclusions: {
      transport: true,
      hotel: true,
      breakfast: true,
      activities: true,
    },
    vehicleType: 'Mercedes-Benz Sprinter Executive',
    qrPayload: 'MOV-4120-EC|0918273645|Molleturo|04B|Boarded',
    createdAt: '2026-08-06T14:30:00Z'
  }
];

export const ECUADOR_CITIES = [
  'Quito',
  'Guayaquil',
  'Cuenca',
  'Baños de Agua Santa',
  'Latacunga',
  'Otavalo',
  'Manta',
  'Tena',
  'Puerto Ayora (Galápagos)',
  'Montañita',
  'Guaranda',
  'Puerto López',
  'Santo Domingo',
  'Ambato'
];
