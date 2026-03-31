'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Camera, MapPin, Calendar, Eye, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const speciesCategories = [
  { id: 'mammal', label: 'Mammal' },
  { id: 'bird', label: 'Bird' },
  { id: 'reptile', label: 'Reptile/Amphibian' },
  { id: 'fish', label: 'Fish' },
  { id: 'plant', label: 'Plant' },
  { id: 'other', label: 'Other' },
];

export default function SubmitSightingPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-950">
        <Navigation />
        <section className="relative pt-20 md:pt-48 pb-16 md:pb-20 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto text-center">
              <CheckCircle className="w-20 h-20 text-emerald-400 mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-white mb-4">Sighting Submitted</h1>
              <p className="text-slate-400 mb-8">Thank you for contributing to Kashmir's biodiversity database.</p>
              <Button onClick={() => router.push('/submit-sighting')}>Submit Another Sighting</Button>
            </motion.div>
          </div>
        </section>
        <AdvancedFooter />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      <section className="relative pt-20 md:pt-48 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-teal-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <Badge variant="success" size="lg">Citizen Science</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Submit a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Sighting</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Contribute wildlife observations to build Kashmir's most comprehensive
              biodiversity database for conservation and research
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <Card className="glass-intense border-white/10 p-8">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-white mb-3">Species Category</label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {speciesCategories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        className="p-3 rounded-xl border border-white/10 hover:border-emerald-500/50 transition-all text-xs font-medium text-white hover:bg-emerald-500/10"
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-white mb-2">Species Name</label>
                  <input
                    type="text"
                    placeholder="Common or scientific name"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Date Observed</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Location</label>
                    <input
                      type="text"
                      placeholder="District or area"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-white mb-2">Description</label>
                  <textarea
                    placeholder="Describe the sighting (behavior, count, habitat, etc.)"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-white mb-2">Photo Upload (Optional)</label>
                  <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center">
                    <Camera className="w-10 h-10 text-slate-500 mx-auto mb-3" />
                    <p className="text-sm text-slate-400">Drag and drop or click to upload</p>
                    <p className="text-xs text-slate-500 mt-1">JPG, PNG up to 10MB</p>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-white mb-2">Your Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="How you'd like to be credited"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-emerald-500 to-teal-600">
                  <Camera className="w-5 h-5 mr-2" />
                  Submit Sighting
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
