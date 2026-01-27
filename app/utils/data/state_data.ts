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
    facts: [
      "Uttar Pradesh is the most populous state in India.",
      "It is home to the Taj Mahal, one of the Seven Wonders of the World.",
      "The Ganges River flows through the state."
    ],
    concepts: [
      "Rich cultural and historical heritage.",
      "Major contributor to Indian politics.",
      "Leading agricultural producer."
    ]
  },

  "Maharashtra": {
    facts: [
      "Maharashtra is the second-most populous state in India.",
      "Mumbai is the financial capital of India.",
      "Ajanta and Ellora caves are UNESCO World Heritage Sites."
    ],
    concepts: [
      "Industrial and economic powerhouse.",
      "Center of Bollywood film industry.",
      "Diverse geography and culture."
    ]
  },

  "Bihar": {
    facts: [
      "Bihar is one of the oldest inhabited regions in the world.",
      "Nalanda University was a major ancient center of learning.",
      "The Ganges flows through the state."
    ],
    concepts: [
      "Birthplace of Buddhism and Jainism.",
      "Agriculture-based economy.",
      "Rich ancient history."
    ]
  },

  "West Bengal": {
    facts: [
      "Kolkata was the capital of British India till 1911.",
      "The Sundarbans is the largest mangrove forest in the world.",
      "The Hooghly River flows through the state."
    ],
    concepts: [
      "Strong literary and artistic traditions.",
      "Cultural hub of eastern India.",
      "Major center for education and research."
    ]
  },

  "Tamil Nadu": {
    facts: [
      "Tamil Nadu has one of the oldest classical languages, Tamil.",
      "Chennai is a major IT and automobile hub.",
      "The state has many Dravidian-style temples."
    ],
    concepts: [
      "Ancient temple architecture.",
      "Strong classical music and dance traditions.",
      "Leading manufacturing state."
    ]
  },

  "Karnataka": {
    facts: [
      "Bengaluru is known as the Silicon Valley of India.",
      "The state has the second-highest number of protected monuments.",
      "Jog Falls is one of the highest waterfalls in India."
    ],
    concepts: [
      "Major IT and startup ecosystem.",
      "Blend of modern tech and heritage.",
      "Diverse climatic regions."
    ]
  },

  "Kerala": {
    facts: [
      "Kerala has the highest literacy rate in India.",
      "The state is famous for its backwaters.",
      "It has the highest life expectancy in India."
    ],
    concepts: [
      "Strong human development indicators.",
      "Tourism-driven economy.",
      "Unique healthcare and education model."
    ]
  },

  "Rajasthan": {
    facts: [
      "Rajasthan is the largest state by area.",
      "The Thar Desert is located here.",
      "Jaipur is known as the Pink City."
    ],
    concepts: [
      "Rich royal and warrior history.",
      "Distinct folk art and music.",
      "Tourism-based economy."
    ]
  },

  "Gujarat": {
    facts: [
      "Gujarat has the longest coastline in India.",
      "The Statue of Unity is located here.",
      "It is the birthplace of Mahatma Gandhi."
    ],
    concepts: [
      "Strong entrepreneurial culture.",
      "Rapid industrial growth.",
      "Major port and trade state."
    ]
  },

  "Punjab": {
    facts: [
      "Punjab is known as the Granary of India.",
      "Amritsar houses the Golden Temple.",
      "The state has fertile alluvial soil."
    ],
    concepts: [
      "Agriculture-driven economy.",
      "Vibrant culture and festivals.",
      "Strong military tradition."
    ]
  },

  "Haryana": {
    facts: [
      "Haryana surrounds Delhi on three sides.",
      "It is a major automobile manufacturing hub.",
      "Kurukshetra is a key historical site."
    ],
    concepts: [
      "Rapid urbanization.",
      "Strong sports culture.",
      "Agriculture and industry mix."
    ]
  },

  "Madhya Pradesh": {
    facts: [
      "Madhya Pradesh is known as the Heart of India.",
      "Kanha and Bandhavgarh are famous national parks.",
      "The Narmada River flows through the state."
    ],
    concepts: [
      "Rich wildlife biodiversity.",
      "Tribal cultural heritage.",
      "Agriculture-based economy."
    ]
  },

  "Chhattisgarh": {
    facts: [
      "Chhattisgarh has dense forests.",
      "It is rich in mineral resources.",
      "The state was formed in 2000."
    ],
    concepts: [
      "Tribal-dominated population.",
      "Mining-based economy.",
      "Rapid industrial development."
    ]
  },

  "Jharkhand": {
    facts: [
      "Jharkhand is rich in coal and iron ore.",
      "The state was formed in 2000.",
      "Betla National Park is located here."
    ],
    concepts: [
      "Mineral-driven economy.",
      "Strong tribal heritage.",
      "Industrial growth potential."
    ]
  },

  "Odisha": {
    facts: [
      "Odisha has the Konark Sun Temple.",
      "It has a long coastline along the Bay of Bengal.",
      "The state is prone to cyclones."
    ],
    concepts: [
      "Ancient temple architecture.",
      "Mineral-rich economy.",
      "Strong disaster management systems."
    ]
  },

  "Assam": {
    facts: [
      "Assam is famous for its tea gardens.",
      "The Brahmaputra River flows through the state.",
      "Kaziranga National Park is located here."
    ],
    concepts: [
      "Biodiversity hotspot.",
      "Tea-based economy.",
      "Cultural diversity."
    ]
  },

  "Arunachal Pradesh": {
    facts: [
      "It is the easternmost state of India.",
      "Tawang Monastery is located here.",
      "It shares borders with China, Bhutan, and Myanmar."
    ],
    concepts: [
      "Strategic importance.",
      "Tribal cultural diversity.",
      "Rich natural landscapes."
    ]
  },

  "Manipur": {
    facts: [
      "Manipur is known as the Jewel of India.",
      "Loktak Lake is the largest freshwater lake in the Northeast.",
      "It is the birthplace of modern polo."
    ],
    concepts: [
      "Distinct dance and martial arts.",
      "Strategic border state.",
      "Rich indigenous culture."
    ]
  },

  "Meghalaya": {
    facts: [
      "Meghalaya is one of the wettest places on Earth.",
      "Shillong is known as the Scotland of the East.",
      "Living root bridges are found here."
    ],
    concepts: [
      "Eco-tourism hub.",
      "Unique tribal traditions.",
      "Rainforest biodiversity."
    ]
  },

  "Mizoram": {
    facts: [
      "Mizoram has a high literacy rate.",
      "It shares an international border with Myanmar.",
      "The state has rolling hills."
    ],
    concepts: [
      "Peaceful social structure.",
      "Strong community values.",
      "Forest-based economy."
    ]
  },

  "Nagaland": {
    facts: [
      "Nagaland is known for the Hornbill Festival.",
      "It has many indigenous tribes.",
      "Kohima was a major WWII battle site."
    ],
    concepts: [
      "Strong tribal identity.",
      "Cultural festivals.",
      "Traditional governance systems."
    ]
  },

  "Tripura": {
    facts: [
      "Tripura shares a long border with Bangladesh.",
      "Ujjayanta Palace is a major landmark.",
      "It has a rich royal history."
    ],
    concepts: [
      "Cultural blend of tribes and Bengalis.",
      "Agriculture and bamboo-based economy.",
      "Strategic connectivity role."
    ]
  },

  "Sikkim": {
    facts: [
      "Sikkim is the least populous state in India.",
      "Kanchenjunga, the third-highest peak, is located here.",
      "It became an Indian state in 1975."
    ],
    concepts: [
      "Eco-friendly policies.",
      "Organic farming leader.",
      "Himalayan biodiversity."
    ]
  },

  "Andhra Pradesh": {
    facts: [
      "Visakhapatnam is a major port city.",
      "The state has a long eastern coastline.",
      "Tirupati is a major pilgrimage center."
    ],
    concepts: [
      "Strong maritime economy.",
      "Agriculture and aquaculture hub.",
      "Rapid infrastructure growth."
    ]
  },

  "Telangana": {
    facts: [
      "Telangana was formed in 2014.",
      "Hyderabad is a major IT hub.",
      "The Golconda Fort is located here."
    ],
    concepts: [
      "Tech-driven economy.",
      "Historical Deccan heritage.",
      "Startup-friendly ecosystem."
    ]
  },

  "Himachal Pradesh": {
    facts: [
      "Himachal Pradesh is a Himalayan state.",
      "Shimla was the summer capital of British India.",
      "The state has abundant hydroelectric power."
    ],
    concepts: [
      "Tourism-driven economy.",
      "Clean and green governance.",
      "Mountain agriculture."
    ]
  },

  "Uttarakhand": {
    facts: [
      "Uttarakhand is known as Devbhoomi.",
      "The Ganges originates here.",
      "It has many pilgrimage sites."
    ],
    concepts: [
      "Spiritual tourism.",
      "Himalayan ecology.",
      "Disaster-prone mountainous terrain."
    ]
  },

  "Goa": {
    facts: [
      "Goa is India's smallest state by area.",
      "It was a Portuguese colony till 1961.",
      "The state is famous for its beaches."
    ],
    concepts: [
      "Tourism-based economy.",
      "Indo-Portuguese culture.",
      "High per capita income."
    ]
  }
};

