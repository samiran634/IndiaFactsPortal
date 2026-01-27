"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lightbulb, BookOpen, Newspaper, Loader2, Link as LinkIcon, ExternalLink, History, TrendingUp, Globe, Atom, Search } from "lucide-react";
import { parseContentWithLinksSync, LinkedSegment } from "../utils/knowledgeLinker";
import { knowledgeService, KnowledgeEntity } from "../utils/knowledgeService";
import GlobalKnowledgeModal from "./GlobalKnowledgeModal";
import { GlobalEngine } from "../utils/globalEngine";

interface StateData {
    history?: string[];
    economy?: string[];
    geography?: string[];
    science?: string[];
    concepts?: string[];
    facts?: string[]; // Legacy support
}

interface StateSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    stateName: string | null;
    data: StateData | null;
}

// Helper component to render text with clickable links (using pre-fetched data)
const LinkedText: React.FC<{ 
    text: string; 
    onLinkClick: (id: string) => void; 
    knowledgeBase: Record<string, KnowledgeEntity>;
}> = ({ text, onLinkClick, knowledgeBase }) => {
    const segments = parseContentWithLinksSync(text, knowledgeBase);

    return (
        <span>
            {segments.map((segment, i) =>
                segment.linkId ? (
                    <button
                        key={i}
                        onClick={(e) => {
                            e.stopPropagation();
                            onLinkClick(segment.linkId!);
                        }}
                        className="text-indigo-600 font-medium hover:text-indigo-800 hover:underline inline-flex items-center gap-0.5 mx-0.5"
                    >
                        {segment.text}
                        <LinkIcon className="w-3 h-3 opacity-50" />
                    </button>
                ) : (
                    <span key={i}>{segment.text}</span>
                )
            )}
        </span>
    );
};

// Component to display details of a selected knowledge entity
const KnowledgeCard: React.FC<{ entityId: string; onClose: () => void }> = ({ entityId, onClose }) => {
    const [entity, setEntity] = useState<KnowledgeEntity | null>(null);
    const [actions, setActions] = useState<any[]>([]);
    const [relatedEntities, setRelatedEntities] = useState<KnowledgeEntity[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const entityData = await knowledgeService.getKnowledgeById(entityId);
            setEntity(entityData);
            
            if (entityData) {
                const entityActions = await GlobalEngine.getActions(entityId);
                setActions(entityActions);
                
                // Load related entities
                if (entityData.relatedIds && entityData.relatedIds.length > 0) {
                    const related = await Promise.all(
                        entityData.relatedIds.map(id => knowledgeService.getKnowledgeById(id))
                    );
                    setRelatedEntities(related.filter((e): e is KnowledgeEntity => e !== null));
                }
            }
        };
        loadData();
    }, [entityId]);

    if (!entity) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 z-50 flex items-center justify-center"
            >
                <div className="bg-white rounded-xl p-8">
                    <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
        >
             {/* Backdrop for the card itself */}
             <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] pointer-events-auto" onClick={onClose} />
             
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-lg max-h-[80vh] overflow-y-auto pointer-events-auto relative z-10 flex flex-col">
                <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50/50 sticky top-0 backdrop-blur-md">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider">
                                {entity.tags?.[0] || "Knowledge"}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{entity.title}</h3>
                    </div>
                    <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-200 transition-colors text-gray-500">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="p-6 space-y-4">
                    {/* Actions Bar */}
                    {actions.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                            {actions.map((action, idx) => (
                                action && (
                                    <a 
                                        key={idx}
                                        href={action.url}
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                                            action.type === 'navigate_map' ? 'bg-sky-100 text-sky-700 hover:bg-sky-200' :
                                            action.type === 'navigate_timeline' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' :
                                            'bg-violet-100 text-violet-700 hover:bg-violet-200'
                                        }`}
                                    >
                                        {action.type === 'navigate_map' && <Globe className="w-3.5 h-3.5" />}
                                        {action.type === 'navigate_timeline' && <History className="w-3.5 h-3.5" />}
                                        {action.type === 'navigate_vault' && <BookOpen className="w-3.5 h-3.5" />}
                                        {action.label}
                                    </a>
                                )
                            ))}
                        </div>
                    )}

                    {entity.shortDescription && (
                        <div className="text-sm font-medium text-gray-500 italic border-l-4 border-indigo-200 pl-3">
                            {entity.shortDescription}
                        </div>
                    )}
                    
                    {entity.fullContent && (
                        <div className="prose prose-sm prose-indigo text-gray-700">
                            {entity.fullContent.split('\n').map((line, i) => (
                                <p key={i} className="mb-2">{line}</p>
                            ))}
                        </div>
                    )}

                    {relatedEntities.length > 0 && (
                        <div className="pt-4 border-t border-gray-100">
                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Related Topics</h4>
                            <div className="flex flex-wrap gap-2">
                                {relatedEntities.map(related => (
                                    <span key={related.id} className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-xs border border-gray-200">
                                        <ExternalLink className="w-3 h-3" />
                                        {related.title}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const StateSidebar: React.FC<StateSidebarProps> = ({ isOpen, onClose, stateName, data }) => {
    const [news, setNews] = useState<string[]>([]);
    const [loadingNews, setLoadingNews] = useState(false);
    const [isHamburgurVisible, setIsHamburgurVisible] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [knowledgeBase, setKnowledgeBase] = useState<Record<string, KnowledgeEntity>>({});
    const [relatedKBEntities, setRelatedKBEntities] = useState<KnowledgeEntity[]>([]);

    // Tab state
    type TabType = 'knowledge' | 'history' | 'economy' | 'geography' | 'science';
    const [activeTab, setActiveTab] = useState<TabType>('knowledge');

    // Track selected entity for the Knowledge Graph popup
    const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);

    // Load knowledge base on mount
    useEffect(() => {
        const loadKnowledge = async () => {
            const data = await knowledgeService.getAllKnowledge();
            setKnowledgeBase(data);
        };
        loadKnowledge();
    }, []);

    // Get KB entities related to this state
    useEffect(() => {
        if (!stateName || stateName === 'India' || Object.keys(knowledgeBase).length === 0) {
            setRelatedKBEntities([]);
            return;
        }
        
        // Filter entities that mention this state
        const related = Object.values(knowledgeBase).filter(entity => {
            const contentToScan = [
                entity.title || '',
                entity.shortDescription || '',
                entity.fullContent || ''
            ].join(' ').toLowerCase();
            
            // Check if state name or its common cities are mentioned
            const detectedStates = GlobalEngine.detectStates(contentToScan);
            return detectedStates.includes(stateName);
        });
        
        setRelatedKBEntities(related);
    }, [stateName, knowledgeBase]);

    useEffect(() => {
        if (isOpen && stateName) {
            setLoadingNews(true);
            setNews([]);
            setActiveTab('knowledge');

            setTimeout(() => {
                setNews([
                    `${stateName} achieves record agricultural output this season.`,
                    `New tech park inaugurated in the capital region of ${stateName}.`,
                    `tourism department launches new heritage walk initiative for visitors.`
                ]);
                setLoadingNews(false);
            }, 800);
        }
    }, [isOpen, stateName]);

    useEffect(() => {
        if (!isOpen) {
            setIsHamburgurVisible(false);
            setSelectedEntityId(null);
        }
    }, [isOpen]);

    const handleLinkClick = (id: string) => {
        setSelectedEntityId(id);
    };

    // Helper to get tab content
    const getTabContent = () => {
        if (!data) return [];
        switch (activeTab) {
            case 'history': return data.history || data.facts || [];
            case 'economy': return data.economy || [];
            case 'geography': return data.geography || [];
            case 'science': return data.science || [];
            default: return [];
        }
    };

    const activeContent = getTabContent();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Hamburger Button */}
                    {isHamburgurVisible ? (
                        <div className="fixed top-4 right-4 z-50">
                            <button
                                onClick={() => setIsHamburgurVisible(false)}
                                className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={onClose}
                                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                            />

                            {/* Sidebar */}
                            <motion.div
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="fixed top-0 right-0 h-full w-full md:w-112.5 bg-white shadow-2xl z-50 overflow-y-auto border-l border-gray-100"
                            >
                                <div className="p-6 pb-20"> 
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-bold text-gray-800">{stateName}</h2>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setIsSearchOpen(true)}
                                                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-indigo-600"
                                                title="Search Knowledge Base"
                                            >
                                                <Search className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => setIsHamburgurVisible(true)}
                                                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                            >
                                                <X className="w-6 h-6 text-gray-500" />
                                            </button>
                                        </div>
                                    </div>

                                    {data ? (
                                        <div className="space-y-6">
                                            {/* Tabs Navigation */}
                                            <div className="flex gap-2 overflow-x-auto pb-2 noscrollbar">
                                                <button
                                                    onClick={() => setActiveTab('knowledge')}
                                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                                        activeTab === 'knowledge' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                                    }`}
                                                >
                                                    <Lightbulb className="w-4 h-4" /> Knowledge
                                                    {relatedKBEntities.length > 0 && (
                                                        <span className="bg-indigo-500 text-white text-xs px-1.5 rounded-full">{relatedKBEntities.length}</span>
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => setActiveTab('history')}
                                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                                        activeTab === 'history' ? 'bg-amber-100 text-amber-700' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                                    }`}
                                                >
                                                    <History className="w-4 h-4" /> History
                                                </button>
                                                <button
                                                    onClick={() => setActiveTab('economy')}
                                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                                        activeTab === 'economy' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                                    }`}
                                                >
                                                    <TrendingUp className="w-4 h-4" /> Economy
                                                </button>
                                                <button
                                                    onClick={() => setActiveTab('geography')}
                                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                                        activeTab === 'geography' ? 'bg-sky-100 text-sky-700' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                                    }`}
                                                >
                                                    <Globe className="w-4 h-4" /> Geography
                                                </button>
                                                <button
                                                    onClick={() => setActiveTab('science')}
                                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                                        activeTab === 'science' ? 'bg-violet-100 text-violet-700' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                                    }`}
                                                >
                                                    <Atom className="w-4 h-4" /> Science
                                                </button>
                                            </div>

                                            {/* Tab Content Area */}
                                            <div className="min-h-[200px] bg-gray-50/50 rounded-xl p-5 border border-gray-100">
                                                {/* Knowledge Base Tab Content */}
                                                {activeTab === 'knowledge' ? (
                                                    <motion.div
                                                        key="knowledge"
                                                        initial={{ opacity: 0, x: 10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        className="space-y-3"
                                                    >
                                                        {relatedKBEntities.length > 0 ? (
                                                            relatedKBEntities.map((entity) => (
                                                                <div 
                                                                    key={entity.id}
                                                                    onClick={() => handleLinkClick(entity.id)}
                                                                    className="bg-white rounded-lg p-4 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group"
                                                                >
                                                                    <div className="flex items-start justify-between gap-3">
                                                                        <div className="flex-1">
                                                                            <div className="flex flex-wrap gap-1 mb-2">
                                                                                {entity.tags?.slice(0, 3).map(tag => (
                                                                                    <span key={tag} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs rounded-full uppercase">
                                                                                        {tag}
                                                                                    </span>
                                                                                ))}
                                                                            </div>
                                                                            <h4 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                                                                                {entity.title}
                                                                            </h4>
                                                                            {entity.shortDescription && (
                                                                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                                                                    {entity.shortDescription}
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors shrink-0 mt-1" />
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="flex flex-col items-center justify-center h-40 text-gray-400 text-sm italic">
                                                                <Lightbulb className="w-8 h-8 opacity-20 mb-2" />
                                                                <p>No knowledge base entries found for {stateName}.</p>
                                                                <p className="text-xs mt-1">Try searching the global knowledge base.</p>
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                ) : activeContent.length > 0 ? (
                                                    <motion.ul 
                                                        key={activeTab}
                                                        initial={{ opacity: 0, x: 10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -10 }}
                                                        className="space-y-3"
                                                    >
                                                        {activeContent.map((item, index) => (
                                                            <li key={index} className="flex gap-3 text-gray-700 leading-relaxed group">
                                                                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                                                                    activeTab === 'history' ? 'bg-amber-400' :
                                                                    activeTab === 'economy' ? 'bg-emerald-400' :
                                                                    activeTab === 'geography' ? 'bg-sky-400' : 'bg-violet-400'
                                                                }`} />
                                                                <LinkedText text={item} onLinkClick={handleLinkClick} knowledgeBase={knowledgeBase} />
                                                            </li>
                                                        ))}
                                                    </motion.ul>
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center h-40 text-gray-400 text-sm italic">
                                                        <BookOpen className="w-8 h-8 opacity-20 mb-2" />
                                                        <p>No specific data for {activeTab}.</p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Important Concepts Section */}
                                            {data.concepts && data.concepts.length > 0 && (
                                                <div className="bg-blue-50 rounded-xl p-5 border border-blue-100 mt-6">
                                                    <div className="flex items-center gap-2 mb-4 text-blue-600">
                                                        <BookOpen className="w-5 h-5" />
                                                        <h3 className="font-semibold text-lg">Key Concepts</h3>
                                                    </div>
                                                    <ul className="space-y-3">
                                                        {data.concepts.map((concept, index) => (
                                                            <li key={index} className="flex gap-3 text-gray-700 leading-relaxed text-sm">
                                                                <span className="text-blue-400 mt-1.5">•</span>
                                                                <LinkedText text={concept} onLinkClick={handleLinkClick} knowledgeBase={knowledgeBase} />
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {/* News Section */}
                                            <div className="bg-linear-to-br from-indigo-50 to-violet-50 rounded-xl p-5 border border-indigo-100">
                                                <div className="flex items-center gap-2 mb-4 text-indigo-700">
                                                    <Newspaper className="w-5 h-5" />
                                                    <h3 className="font-semibold text-lg">Headlines</h3>
                                                </div>

                                                {loadingNews ? (
                                                    <div className="flex items-center justify-center py-6 text-indigo-400 gap-2">
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        <span className="text-sm">Fetching news...</span>
                                                    </div>
                                                ) : news.length > 0 ? (
                                                    <ul className="space-y-3">
                                                        {news.map((item, index) => (
                                                            <li key={index} className="flex gap-3 text-gray-700 leading-relaxed text-sm">
                                                                <span className="text-indigo-400 mt-1">•</span>
                                                                <LinkedText text={item} onLinkClick={handleLinkClick} knowledgeBase={knowledgeBase} />
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p className="text-sm text-gray-500 italic text-center">No recent news found.</p>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                                            <p>Select a region to view details.</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                            {/* Linked Entity Modal/Popup */}
                            <AnimatePresence>
                                {selectedEntityId && (
                                    <KnowledgeCard 
                                        entityId={selectedEntityId} 
                                        onClose={() => setSelectedEntityId(null)} 
                                    />
                                )}
                            </AnimatePresence>

                            {/* Global Knowledge Search Modal */}
                            <AnimatePresence>
                                {isSearchOpen && (
                                    <GlobalKnowledgeModal 
                                        onClose={() => setIsSearchOpen(false)}
                                        onSelectEntity={(id) => {
                                            setSelectedEntityId(id);
                                            setIsSearchOpen(false);
                                        }}
                                    />
                                )}
                            </AnimatePresence>
                        </>
                    )}
                </>
            )}
        </AnimatePresence>
    );
};

export default StateSidebar;
