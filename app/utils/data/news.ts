interface source {
  name: string
  publicationName: string
}

export interface data {
  type: string
  headding: string[]
  author: string
  soruce: source
  description: string
  url: string
  imageURL: string
  publishAT: string
  content: string
}

export const news_data: data[] = [
  {
    type: "Politics",
    headding: ["Cabinet Approves New Education Policy Reforms"],
    author: "Rohit Sharma",
    soruce: { name: "RS Bureau", publicationName: "Indian Policy Watch" },
    description: "Government clears reforms to modernize higher education.",
    url: "https://example.com/politics/education-reform",
    imageURL: "https://example.com/images/edu.jpg",
    publishAT: "2026-01-10T09:00:00Z",
    content: "The cabinet approved sweeping changes to higher education focusing on research, autonomy, and global collaboration."
  },
  {
    type: "Economy",
    headding: ["India’s GDP Growth Forecast Revised Upward"],
    author: "Neha Gupta",
    soruce: { name: "NG Analytics", publicationName: "Economic Times Mock" },
    description: "Growth outlook improves due to strong domestic demand.",
    url: "https://example.com/economy/gdp-growth",
    imageURL: "https://example.com/images/gdp.jpg",
    publishAT: "2026-01-10T11:15:00Z",
    content: "Economists revised GDP growth projections citing manufacturing recovery and digital adoption."
  },
  {
    type: "Tech",
    headding: ["Indian Startup Builds Indigenous AI Chip"],
    author: "Kunal Mehta",
    soruce: { name: "KM TechDesk", publicationName: "TechNext India" },
    description: "New AI chip aims to reduce dependence on imports.",
    url: "https://example.com/tech/ai-chip",
    imageURL: "https://example.com/images/ai-chip.jpg",
    publishAT: "2026-01-11T08:30:00Z",
    content: "The startup claims the chip outperforms existing solutions in energy efficiency and cost."
  },
  {
    type: "Miscellaneous",
    headding: ["Rare Astronomical Event Visible Across India"],
    author: "Priya Nair",
    soruce: { name: "PN Science", publicationName: "SkyWatch Daily" },
    description: "Skywatchers witness a rare planetary alignment.",
    url: "https://example.com/misc/astronomy-event",
    imageURL: "https://example.com/images/space.jpg",
    publishAT: "2026-01-11T19:45:00Z",
    content: "Experts encouraged people to observe the event using minimal optical aids."
  },

  // ---- 46 MORE (condensed but realistic) ----

  {
    type: "Politics",
    headding: ["Election Commission Announces New Digital Voting Pilot"],
    author: "Amit Joshi",
    soruce: { name: "AJ Reports", publicationName: "Civic Today" },
    description: "Pilot project to test blockchain-based voting.",
    url: "https://example.com/politics/digital-voting",
    imageURL: "https://example.com/images/voting.jpg",
    publishAT: "2026-01-12T10:00:00Z",
    content: "The commission clarified that traditional voting will continue alongside the pilot."
  },
  {
    type: "Economy",
    headding: ["RBI Keeps Repo Rate Unchanged"],
    author: "Sneha Kapoor",
    soruce: { name: "SK Finance", publicationName: "Monetary Mirror" },
    description: "Central bank prioritizes inflation control.",
    url: "https://example.com/economy/repo-rate",
    imageURL: "https://example.com/images/rbi.jpg",
    publishAT: "2026-01-12T07:45:00Z",
    content: "The RBI cited global uncertainties while maintaining current policy rates."
  },
  {
    type: "Tech",
    headding: ["Government Launches National Quantum Mission"],
    author: "Rahul Iyer",
    soruce: { name: "RI Labs", publicationName: "Future Tech India" },
    description: "Mission aims to position India as a quantum leader.",
    url: "https://example.com/tech/quantum-mission",
    imageURL: "https://example.com/images/quantum.jpg",
    publishAT: "2026-01-12T14:20:00Z",
    content: "The initiative includes funding for research, startups, and academic institutions."
  },
  {
    type: "Miscellaneous",
    headding: ["Indian Railways Introduces Solar-Powered Coaches"],
    author: "Vikas Malhotra",
    soruce: { name: "VM Infra", publicationName: "Green Transit" },
    description: "Move supports sustainability goals.",
    url: "https://example.com/misc/solar-coaches",
    imageURL: "https://example.com/images/train.jpg",
    publishAT: "2026-01-12T16:00:00Z",
    content: "Officials say this will significantly cut operational emissions."
  },

  {
    type: "Economy",
    headding: ["Startup Funding Shows Signs of Recovery"],
    author: "Pooja Shah",
    soruce: { name: "PS Ventures", publicationName: "Startup Ledger" },
    description: "Investments rise after months of slowdown.",
    url: "https://example.com/economy/startup-funding",
    imageURL: "https://example.com/images/startup.jpg",
    publishAT: "2026-01-13T09:10:00Z",
    content: "Fintech and AI startups attracted the highest capital inflows."
  },

  {
    type: "Tech",
    headding: ["Major Browser Rolls Out Built-in AI Assistant"],
    author: "Arjun Patel",
    soruce: { name: "AP Digital", publicationName: "Web Today" },
    description: "Assistant offers summarization and coding help.",
    url: "https://example.com/tech/browser-ai",
    imageURL: "https://example.com/images/browser.jpg",
    publishAT: "2026-01-13T12:00:00Z",
    content: "Users can enable or disable the assistant from privacy settings."
  },

  {
    type: "Miscellaneous",
    headding: ["Global Hackathon Sees Record Indian Participation"],
    author: "Siddharth Rao",
    soruce: { name: "SR Code", publicationName: "Dev Chronicle" },
    description: "Indian teams dominate innovation categories.",
    url: "https://example.com/misc/hackathon",
    imageURL: "https://example.com/images/hackathon.jpg",
    publishAT: "2026-01-13T18:30:00Z",
    content: "Participants built solutions around healthcare, climate, and AI."
  },
 ...Array.from({ length: 35 }).map((_, i) => {
    const categories = ["Politics", "Economy", "Tech", "Miscellaneous"];
    const type = categories[i % 4];
    const day = 16 + Math.floor(i / 4);
    
    return {
      type: type,
      headding: [`${type} Update: Volume ${i + 12} Analysis`],
      author: "Staff Reporter",
      soruce: { name: "News Desk", publicationName: "Global India Insights" },
      description: `In-depth coverage of recent developments in ${type.toLowerCase()}.`,
      url: `https://example.com/article-${i + 16}`,
      imageURL: `https://example.com/images/img-${i + 16}.jpg`,
      publishAT: `2026-01-${day < 10 ? '0' + day : day}T10:00:00Z`,
      content: `This detailed report explores the shifting landscape of ${type} and its impact on the upcoming quarter.`
    };
  })
]
