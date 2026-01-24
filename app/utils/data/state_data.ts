// ... (Keeping your existing State URLs and Coordinates maps for brevity) ...
export const STATE_URLS: { [key: string]: string } = {
  "Uttar Pradesh": "/geojson/states/uttar-pradesh.geojson",
  "Maharashtra": "/geojson/states/maharashtra.geojson",
  "Karnataka": "/geojson/states/karnataka.geojson",
  "Tamil Nadu": "/geojson/states/tamil-nadu.geojson",
  "West Bengal": "/geojson/states/west-bengal.geojson",
  "Gujarat": "/geojson/states/gujarat.geojson",
  "Rajasthan": "/geojson/states/rajasthan.geojson",
  "Bihar": "/geojson/states/bihar.geojson",
  "Andhra Pradesh": "/geojson/states/andhra-pradesh.geojson",
  "Odisha": "/geojson/states/odisha.geojson",
  "Telangana": "/geojson/states/telangana.geojson",
  "Punjab": "/geojson/states/punjab.geojson",
  "Haryana": "/geojson/states/haryana.geojson",
  "Chhattisgarh": "/geojson/states/chhattisgarh.geojson",
  "Jharkhand": "/geojson/states/jharkhand.geojson",
  "Assam": "/geojson/states/assam.geojson",
  "Kerala": "/geojson/states/kerala.geojson",
  "Uttarakhand": "/geojson/states/uttarakhand.geojson",
  "Himachal Pradesh": "/geojson/states/himachal-pradesh.geojson",
  "Tripura": "/geojson/states/tripura.geojson",
  "Meghalaya": "/geojson/states/meghalaya.geojson",
  "Manipur": "/geojson/states/manipur.geojson",
  "Nagaland": "/geojson/states/nagaland.geojson",
  "Goa": "/geojson/states/goa.geojson",
  "Arunachal Pradesh": "/geojson/states/arunachal-pradesh.geojson",
  "Mizoram": "/geojson/states/mizoram.geojson",
  "Sikkim": "/geojson/states/sikkim.geojson",
  "Dadra and Nagar Haveli and Daman and Diu": "/geojson/states/dadra-daman-diu.geojson",
  "Chandigarh": "/geojson/states/chandigarh.geojson",
  "Puducherry": "/geojson/states/puducherry.geojson",
  "Andaman and Nicobar Islands": "/geojson/states/andaman-and-nicobar-islands.geojson",
  "Lakshadweep": "/geojson/states/lakshadweep.geojson",
};

export const CenterForState: { [key: string]: [number, number] } = {
    "Uttar Pradesh": [80.9462, 26.8467],
    "Maharashtra": [75.7139, 19.7515],
    "Karnataka": [76.6394, 15.3173],
    "Tamil Nadu": [78.6569, 11.1271],
    "West Bengal": [87.8550, 22.9868],
    "Gujarat": [71.1924, 22.2587],
    "Rajasthan": [73.5714, 27.0238],
    "Bihar": [85.3131, 25.0961],
    "Andhra Pradesh": [79.0193, 15.9129],
    "Odisha": [85.0985, 20.9517],
    "Telangana": [78.4744, 17.3850],
    "Punjab": [75.3412, 30.9010],
    "Haryana": [76.7794, 29.0588],
    "Chhattisgarh": [81.8661, 21.2787],
    "Jharkhand": [85.2799, 23.6102],
    "Assam": [91.3662, 26.2006],
    "Kerala": [76.2711, 10.8505],
    "Uttarakhand": [79.0193, 30.0668],
    "Himachal Pradesh": [77.1650, 31.1048],
    "Tripura": [91.9882, 23.9408],
    "Meghalaya": [91.3662, 25.4670],
    "Manipur": [93.9063, 24.6637],
    "Nagaland": [94.5624, 26.1584],
    "Goa": [74.1240, 15.2993],
    "Arunachal Pradesh": [94.7278, 28.2180],
    "Mizoram": [92.9376, 23.1645],
    "Sikkim": [88.5122, 27.5330],
    "Dadra and Nagar Haveli and Daman and Diu": [72.8397, 20.1809],
    "Chandigarh": [76.7794, 30.7333],
    "Puducherry": [79.8083, 11.9416],
    "Andaman and Nicobar Islands": [92.6586, 11.7401],
    "Lakshadweep": [72.6369, 10.3280],
    "Delhi": [77.1025, 28.7041],
    "Jammu and Kashmir": [74.7973, 33.7782],
    "Ladakh": [77.5619, 34.1526]
};

export const SHORT_NAMES: { [key: string]: string } = {
  "Dadra and Nagar Haveli and Daman and Diu": "DNH & DD",
  "Andaman and Nicobar Islands": "Andaman & Nicobar",
  "Jammu and Kashmir": "J&K",
  "Arunachal Pradesh": "Arunachal",
  "Himachal Pradesh": "Himachal",
  "Uttar Pradesh": "U.P.",
  "Madhya Pradesh": "M.P.",
  "Andhra Pradesh": "Andhra",
};
export const factsMap: { [key: string]: any } = {
  "Uttar Pradesh": {
    history: [
      "Home to the Taj Mahal, one of the Seven Wonders of the World.",
      "Key region in the First War of Independence (1857)."
    ],
    economy: [
      "Leading agricultural producer (Sugarcane, Wheat).",
      "Major contributor to Indian politics."
    ],
    geography: [
      "The Ganges River flows through the state.",
      "Most populous state in India."
    ],
    science: [],
    concepts: [
      "Rich cultural and historical heritage.",
    ]
  },

  "Maharashtra": {
    history: [
      "Ajanta and Ellora caves are UNESCO World Heritage Sites.",
      "Land of the Maratha Empire."
    ],
    economy: [
      "Mumbai is the financial capital of India.",
      "Industrial and economic powerhouse."
    ],
    geography: [
      "Second-most populous state in India.",
      "Deccan Plateau region."
    ],
    science: [],
    concepts: [
      "Center of Bollywood film industry.",
      "Diverse geography and culture."
    ]
  },

  "Bihar": {
    history: [
      "Birthplace of Buddhism and Jainism.",
      "Nalanda University was a major ancient center of learning.",
      "One of the oldest inhabited regions in the world."
    ],
    economy: [
      "Agriculture-based economy."
    ],
    geography: [
      "The Ganges flows through the state."
    ],
    science: [],
    concepts: [
      "Rich ancient history."
    ]
  },

  "West Bengal": {
    history: [
      "Kolkata was the capital of British India till 1911.",
      "Center of the Bengal Renaissance."
    ],
    economy: [
      "Jute and Rice production hub."
    ],
    geography: [
      "The Sundarbans is the largest mangrove forest in the world.",
      "The Hooghly River flows through the state."
    ],
    science: [],
    concepts: [
      "Strong literary and artistic traditions.",
      "Cultural hub of eastern India."
    ]
  },

  "Tamil Nadu": {
    history: [
      "Home to the Chola, Chera, and Pandya dynasties.",
      "Has one of the oldest classical languages, Tamil."
    ],
    economy: [
      "Chennai is a major IT and automobile hub.",
      "Leading manufacturing state."
    ],
    geography: [
      "The state has many Dravidian-style temples.",
      "Southernmost state on the mainland coast."
    ],
    science: [],
    concepts: [
      "Ancient temple architecture.",
      "Strong classical music and dance traditions."
    ]
  },

  "Karnataka": {
    history: [
      "Home to the Vijayanagara Empire (Hampi).",
      "Second-highest number of protected monuments."
    ],
    economy: [
      "Bengaluru is known as the Silicon Valley of India.",
      "Major coffee producer."
    ],
    geography: [
      "Jog Falls is one of the highest waterfalls in India.",
      "Diverse climatic regions."
    ],
    science: [],
    concepts: [
      "Major IT and startup ecosystem.",
      "Blend of modern tech and heritage."
    ]
  },

  "Kerala": {
    history: [
      "Major center of the spice trade (Vasco da Gama landed here).",
      "Strong tradition of Ayurveda."
    ],
    economy: [
      "Tourism-driven economy.",
      "High remittances from Gulf countries."
    ],
    geography: [
      "Famous for its backwaters and houseboats.",
      "Highest literacy rate in India."
    ],
    science: [],
    concepts: [
      "Strong human development indicators.",
      "Unique healthcare and education model."
    ]
  },

  "Rajasthan": {
    history: [
      "Land of Kings (Rajputs).",
      "Jaipur is known as the Pink City."
    ],
    economy: [
      "Tourism-based economy.",
      "Mineral rich."
    ],
    geography: [
      "Largest state by area.",
      "The Thar Desert is located here."
    ],
    science: [],
    concepts: [
      "Rich royal and warrior history.",
      "Distinct folk art and music."
    ]
  },

  "Gujarat": {
    history: [
      "Birthplace of Mahatma Gandhi.",
      "Lothal was a major Indus Valley Civilization port."
    ],
    economy: [
      "Major port and trade state.",
      "Rapid industrial growth."
    ],
    geography: [
      "Longest coastline in India.",
      "The Statue of Unity is located here."
    ],
    science: [],
    concepts: [
      "Strong entrepreneurial culture."
    ]
  },

  "Punjab": {
    history: [
      "Amritsar houses the Golden Temple.",
      "Center of Sikhism."
    ],
    economy: [
      "Known as the Granary of India (Wheat bowl).",
      "Agriculture-driven economy."
    ],
    geography: [
      "Land of Five Rivers.",
      "Fertile alluvial soil."
    ],
    science: [],
    concepts: [
      "Vibrant culture and festivals.",
      "Strong military tradition."
    ]
  },

  "Haryana": {
    history: [
      "Kurukshetra is the site of the Mahabharata war.",
      "Panipat saw three historic battles."
    ],
    economy: [
      "Gurugram is a major financial and tech hub.",
      "Major automobile manufacturing hub."
    ],
    geography: [
      "Surrounds Delhi on three sides.",
      "Mainly agrarian landscape."
    ],
    science: [],
    concepts: [
      "rapid urbanization.",
      "strong sports culture."
    ]
  },

  "Madhya Pradesh": {
    history: [
      "Sanchi Stupa is a Buddhist complex.",
      "Khajuraho temples (Chandela dynasty)."
    ],
    economy: [
      "Diamond mines in Panna.",
      "Agriculture-based economy."
    ],
    geography: [
      "Known as the Heart of India.",
      "Kanha and Bandhavgarh national parks."
    ],
    science: [],
    concepts: [
      "Rich wildlife biodiversity.",
      "Tribal cultural heritage."
    ]
  },

  "Chhattisgarh": {
    history: [
      "Carved out of Madhya Pradesh in 2000.",
      "Ancient region of Dakshin Kosala."
    ],
    economy: [
      "Rich in mineral resources (Coal, Iron ore).",
      "Steel production hub (Bhilai)."
    ],
    geography: [
      "Has dense forests (Dandakaranya).",
      "Indravati National Park."
    ],
    science: [],
    concepts: [
      "Tribal-dominated population.",
      "Mining-based economy."
    ]
  },

  "Jharkhand": {
    history: [
      "Carved out of Bihar in 2000.",
      "Land of Birsa Munda's rebellion."
    ],
    economy: [
      "Rich in coal and iron ore (Jamshedpur/Tata).",
      "Industrial growth potential."
    ],
    geography: [
      "Chota Nagpur Plateau.",
      "Betla National Park."
    ],
    science: [],
    concepts: [
      "Mineral-driven economy.",
      "Strong tribal heritage."
    ]
  },

  "Odisha": {
    history: [
      "Ancient Kalinga Empire.",
      "Konark Sun Temple (Black Pagoda)."
    ],
    economy: [
      "Rourkela Steel Plant (Second Five Year Plan).",
      "Mineral-rich economy."
    ],
    geography: [
      "Chilika Lake (largest brackish water lagoon).",
      "Prone to cyclones."
    ],
    science: [],
    concepts: [
      "Ancient temple architecture.",
      "Strong disaster management systems."
    ]
  },

  "Assam": {
    history: [
      "Ahom Kingdom ruled for 600 years.",
      "Gateway to Northeast India."
    ],
    economy: [
      "Famous for Tea and Oil (Digboi).",
      "Silk production (Muga silk)."
    ],
    geography: [
      "Brahmaputra River flows through the state.",
      "Kaziranga: One-horned Rhinoceros."
    ],
    science: [],
    concepts: [
      "Biodiversity hotspot.",
      "Cultural diversity."
    ]
  },

  "Arunachal Pradesh": {
    history: [
      "Tawang Monastery is the largest in India.",
      "McMahon Line border dispute."
    ],
    economy: [
      "Hydroelectric potential.",
      "Tourism and forestry."
    ],
    geography: [
      "Easternmost state (Land of Dawn-lit Mountains).",
      "Shares borders with China, Bhutan, Myanmar."
    ],
    science: [],
    concepts: [
      "Strategic importance.",
      "Tribal cultural diversity."
    ]
  },

  "Manipur": {
    history: [
      "Independent kingdom before 1949.",
      "Birthplace of modern polo."
    ],
    economy: [
      "Handloom and handicraft industry.",
      "Agriculture (Rice)."
    ],
    geography: [
      "Jewel of India.",
      "Loktak Lake (Floating Phumdis).",
    ],
    science: [],
    concepts: [
      "Distinct dance and martial arts.",
      "Strategic border state."
    ]
  },

  "Meghalaya": {
    history: [
      "Carved out of Assam.",
      "Meaning: Abode of Clouds."
    ],
    economy: [
      "Tourism and Mining.",
      "Horticulture."
    ],
    geography: [
      "Wettest places on Earth (Mawsynram/Cherrapunji).",
      "Living root bridges."
    ],
    science: [],
    concepts: [
      "Matrilineal society (Khasi/Garo).",
      "Rainforest biodiversity."
    ]
  },

  "Mizoram": {
    history: [
      "Mizo Peace Accord (1986).",
      "Previously Lushai Hills district."
    ],
    economy: [
      "Bamboo industry.",
      "Agriculture (Jhum cultivation)."
    ],
    geography: [
      "Blue Mountain (Phawngpui).",
      "Shares border with Myanmar/Bangladesh."
    ],
    science: [],
    concepts: [
      "Peaceful social structure.",
      "High literacy rate."
    ]
  },

  "Nagaland": {
    history: [
      "Kohima: Major WWII battle site.",
      "Statehood in 1963."
    ],
    economy: [
      "Agriculture and forestry.",
      "Tourism (Hornbill Festival)."
    ],
    geography: [
      "Mount Saramati highest peak.",
      "Diverse tribal population."
    ],
    science: [],
    concepts: [
      "Strong tribal identity.",
      "Traditional governance systems."
    ]
  },

  "Tripura": {
    history: [
      "Ruled by Manikya dynasty.",
      "Ujjayanta Palace."
    ],
    economy: [
      "Rubber and Bamboo production.",
      "Natural Gas reserves."
    ],
    geography: [
      "Surrounded by Bangladesh on three sides.",
      "Clouded Leopard NP."
    ],
    science: [],
    concepts: [
      "Cultural blend of tribes and Bengalis.",
      "Strategic connectivity role."
    ]
  },

  "Sikkim": {
    history: [
      "Became Indian state in 1975.",
      "Ruled by Chogyals previously."
    ],
    economy: [
      "India's first Organic State.",
      "Pharmaceutical hub."
    ],
    geography: [
      "Kanchenjunga (3rd highest peak).",
      "Specific flora (Rhododendrons)."
    ],
    science: [],
    concepts: [
      "Eco-friendly policies.",
      "Himalayan biodiversity."
    ]
  },

  "Andhra Pradesh": {
    history: [
      "Satavahana dynasty.",
      "Tirupati is a major pilgrimage center."
    ],
    economy: [
      "Visakhapatnam is a major port.",
      "Aquaculture hub."
    ],
    geography: [
      "Long eastern coastline.",
      "Godavari and Krishna and deltas."
    ],
    science: [],
    concepts: [
      "Strong maritime economy.",
      "Rapid infrastructure growth."
    ]
  },

  "Telangana": {
    history: [
      "Formed in 2014 from Andhra Pradesh.",
      "Golconda Fort and Charminar."
    ],
    economy: [
      "Hyderabad is a global IT/Pharma hub.",
      "Agriculture (Rice bowl)."
    ],
    geography: [
      "Deccan Plateau.",
      "Semi-arid climate."
    ],
    science: [],
    concepts: [
      "Tech-driven economy.",
      "Historical Deccan heritage."
    ]
  },

  "Himachal Pradesh": {
    history: [
      "Shimla: Summer capital of British India.",
      "Ancient temples."
    ],
    economy: [
      "Hydroelectric power.",
      "Apple production."
    ],
    geography: [
      "Rohtang Pass and Spiti Valley.",
      "Himalayan state."
    ],
    science: [],
    concepts: [
      "Tourism-driven economy.",
      "Clean and green governance."
    ]
  },

  "Uttarakhand": {
    history: [
      "Known as Devbhoomi (Land of Gods).",
      "Chipko Movement origin."
    ],
    economy: [
      "Tourism (Char Dham Yatra).",
      "Hydropower."
    ],
    geography: [
      "Ganges and Yamuna originate here.",
      "Jim Corbett National Park."
    ],
    science: [],
    concepts: [
      "Spiritual tourism.",
      "Disaster-prone mountainous terrain."
    ]
  },

  "Goa": {
    history: [
      "Portuguese colony till 1961.",
      "Operation Vijay (Annexation)."
    ],
    economy: [
      "Tourism and Mining (Iron ore).",
      "Fishing industry."
    ],
    geography: [
      "Smallest state by area.",
      "Mandovi and Zuari rivers."
    ],
    science: [],
    concepts: [
      "Indo-Portuguese culture.",
      "High per capita income."
    ]
  }
};

