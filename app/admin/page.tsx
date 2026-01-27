"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { knowledgeService } from "../utils/knowledgeService";

const CATEGORIES = [
  { value: "history", label: "History" },
  { value: "geography", label: "Geography" },
  { value: "polity", label: "Polity & Constitution" },
  { value: "economy", label: "Economy" },
  { value: "science", label: "Science & Technology" },
  { value: "environment", label: "Environment & Wildlife" },
  { value: "defense", label: "Defense & Military" },
  { value: "culture", label: "Art & Culture" },
  { value: "sports", label: "Sports" },
  { value: "current_affairs", label: "Current Affairs" },
  { value: "international", label: "International Relations" },
  { value: "miscellaneous", label: "Miscellaneous" },
];

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminPage() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category || !formData.description) {
      setNotification({ type: "error", message: "Please fill in all fields" });
      return;
    }

    setIsSubmitting(true);
    
    try {

      const response = await fetch(`${API_BASE_URL}/api/knowledge/validate-add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          category: formData.category,
        }),
      });
      console.log(response);
      if (response.status === 200) {
        // Clear cache so next fetch gets fresh data including new entry
        knowledgeService.clearCache();
        
        setNotification({ type: "success", message: "Knowledge entry added successfully!" });
        setFormData({ title: "", category: "", description: "" });
      } else if (response.status === 205) {
        setNotification({ type: "error", message: "Invalid data provided. Your provided data is faulty." });
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to add knowledge entry");
      }
    } catch (error: any) {
      setNotification({ type: "error", message: error.message || "Failed to connect to server. Is the API running?" });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800/50 backdrop-blur-md bg-zinc-900/50 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm text-zinc-400">Back to Home</span>
          </Link>
          <h1 className="text-lg font-semibold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Admin Panel
          </h1>
        </div>
      </header>

      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-2xl ${
              notification.type === "success"
                ? "bg-green-500/90 text-white"
                : "bg-red-500/90 text-white"
            }`}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Title Section */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Add Knowledge Entry
            </h2>
            <p className="text-zinc-400">
              Share your knowledge with the community
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800/50 rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-300">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Himalayan Mountain Ranges"
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl 
                           text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50 
                           focus:ring-2 focus:ring-amber-500/20 transition-all duration-200"
                />
              </div>

              {/* Category Dropdown */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-300">
                  Category <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl 
                             text-white appearance-none cursor-pointer focus:outline-none 
                             focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all duration-200"
                  >
                    <option value="" disabled className="bg-zinc-900">
                      Select a category
                    </option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value} className="bg-zinc-900">
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Description Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-300">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter detailed information about this topic. You can use markdown formatting..."
                  rows={6}
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl 
                           text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50 
                           focus:ring-2 focus:ring-amber-500/20 transition-all duration-200 resize-none"
                />
                <p className="text-xs text-zinc-500">
                  Supports markdown: **bold**, *italic*, - bullet points
                </p>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 
                          flex items-center justify-center gap-3 ${
                            isSubmitting
                              ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                              : "bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:shadow-lg hover:shadow-amber-500/25"
                          }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Knowledge Entry
                  </>
                )}
              </motion.button>
            </form>
          </div>

          {/* Info Card */}
          <div className="mt-8 p-6 bg-zinc-900/30 border border-zinc-800/30 rounded-xl">
            <h3 className="text-sm font-semibold text-amber-400 mb-2">💡 Tips</h3>
            <ul className="text-sm text-zinc-400 space-y-1">
              <li>• Be specific and factual in your descriptions</li>
              <li>• Use bullet points for lists of related facts</li>
              <li>• Include source references when possible</li>
            </ul>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
