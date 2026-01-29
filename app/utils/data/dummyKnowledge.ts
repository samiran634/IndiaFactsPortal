import { KnowledgeEntity } from "../knowledgeService";

export const DUMMY_KNOWLEDGE: Record<string, KnowledgeEntity> = {
  "ui-active-map": {
    id: "ui-active-map",
    title: "Interactive State Map",
    shortDescription: "A dynamic visualization tool for exploring geopolitical and historical data across different states.",
    fullContent: "The Active Map allows users to interact with individual states to reveal localized facts, historical events, and current developments. Click on any state to open the sidebar for detailed information. Use the layer toggles to switch between different data visualizations such as 'Resources', 'History', and 'Strategic Points'.",
    tags: ["UI", "Map", "Navigation", "technology"],
    primaryView: "map",
    metadata: { category: "Interface Help" }
  },
  "ui-tech-section": {
    id: "ui-tech-section",
    title: "Tech & Equipment Vault",
    shortDescription: "Detailed technical specifications and capabilities of specialized hardware and software assets.",
    fullContent: "The Tech section provides a deep dive into the technical aspects of the CDS framework. Information is presented in high-fidelity modals that can be triggered by clicking on specific asset icons. Each entry includes performance metrics, operational history, and compatibility data.",
    tags: ["UI", "technology", "science", "Specifications"],
    primaryView: "vault",
    metadata: { category: "Interface Help" }
  },
  "ui-freedom-scroll": {
    id: "ui-freedom-scroll",
    title: "Freedom Scroll Timeline",
    shortDescription: "An immersive, continuous scroll experience documenting historical milestones and cultural shifts.",
    fullContent: "The Freedom Scroll uses advanced sticky-positioning and parallax effects to tell a chronological story. As you scroll, the background dynamically reflects the era and event being described. It automatically anchors to significant entries based on URL parameters or user selection.",
    tags: ["UI", "Timeline", "history", "technology"],
    primaryView: "timeline",
    metadata: { category: "Interface Help" }
  },
  "ui-terminal": {
    id: "ui-terminal",
    title: "Command Terminal Interface",
    shortDescription: "A low-level access point for direct system interaction and data querying.",
    fullContent: "The Terminal provides a command-line interface for power users. It supports specialized queries for filtering the knowledge base, accessing system logs, and triggering secondary UI transitions. Type 'help' in the terminal to see available commands.",
    tags: ["UI", "Terminal", "technology", "science"],
    metadata: { category: "Interface Help" }
  },
  "ui-fallback-notice": {
    id: "ui-fallback-notice",
    title: "System Status: Fallback Mode",
    shortDescription: "The system is currently operating in offline/fallback mode due to a backend connection failure.",
    fullContent: "We've loaded a limited set of interface-related knowledge to help you navigate the application while we attempt to reconnect to the primary knowledge servers. Some features, like live state updates and global search, may be temporarily restricted.",
    tags: ["System", "Alert", "technology"],
    metadata: { category: "System Notification", priority: "high" }
  },
  "polity-overview": {
    id: "polity-overview",
    title: "The CDS Governance Framework",
    shortDescription: "An overview of the constitutional and political structure governing the CDS system.",
    fullContent: "The Polity section details the administrative hierarchies, legislative protocols, and constitutional safeguards built into the system. It covers the delegation of authority, the role of central oversight, and the decentralized execution of regional policies. This ensures transparent governance and adherence to established legal standards.",
    tags: ["polity", "constitution", "governance"],
    primaryView: "vault",
    metadata: { category: "Polity" }
  },
  "economy-infrastructure": {
    id: "economy-infrastructure",
    title: "Regional Resource Economy",
    shortDescription: "Analysis of industrial output and resource distribution across states.",
    fullContent: "The Economy module tracks the flow of resources, industrial productivity, and financial stability within the network. It provides insights into trade agreements, energy distribution, and logistics optimization. Understanding the economic landscape is crucial for strategic planning and resource allocation.",
    tags: ["economy", "industry", "resources"],
    primaryView: "vault",
    metadata: { category: "Economy" }
  },
  "current-affairs-brief": {
    id: "current-affairs-brief",
    title: "Daily Intelligence Briefing",
    shortDescription: "A summary of recent events and their impact on the CDS operation.",
    fullContent: "Current Affairs provides real-time updates on global and regional events. From geopolitical shifts to local developments, this section ensures that all users are informed of the latest news that might affect operational status. This dummy feed represents a sample of the data normally fetched via the live backend.",
    tags: ["current_affairs", "misc", "news"],
    primaryView: "vault",
    metadata: { category: "Miscellaneous" }
  },
  "culture-and-heritage": {
    id: "culture-and-heritage",
    title: "Cultural Preservation Protocol",
    shortDescription: "Documenting the diverse heritage and cultural significance of regional entities.",
    fullContent: "The Culture section explores the rich tapestry of traditions, languages, and historical legacies that define the different states. It serves as a digital archive for preserving intangible heritage and understanding the social fabric of the regions under study.",
    tags: ["culture", "geography", "history"],
    primaryView: "vault",
    metadata: { category: "Miscellaneous" }
  },
  "defense-assets": {
    id: "defense-assets",
    title: "Strategic Defense Inventory",
    shortDescription: "Overview of defense capabilities and strategic posturing.",
    fullContent: "This module provides a comprehensive catalog of defense assets, including surveillance systems, rapid response units, and strategic fortifications. It details the operational readiness and deployment status of various defense-related technologies.",
    tags: ["defense", "tech", "security"],
    primaryView: "vault",
    metadata: { category: "Miscellaneous" }
  }
};
