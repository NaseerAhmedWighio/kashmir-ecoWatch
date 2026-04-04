'use client';

import React, { useState } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Users, ArrowLeft, CheckCircle, School, Megaphone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const outreachRoles = [
  { title: 'Community Workshop Facilitator', desc: 'Organize and lead environmental awareness workshops in local communities' },
  { title: 'School Program Volunteer', desc: 'Visit schools to teach students about environmental monitoring and conservation' },
  { title: 'District Campaign Participant', desc: 'Join district-level outreach drives and participation campaigns' },
  { title: 'Awareness Content Creator', desc: 'Create educational materials, social media content, and community resources' },
];

const districtCoordinators = [
  { district: 'Srinagar', coordinator: 'Dr. Ayesha Malik', volunteers: 45, status: 'Active' },
  { district: 'Anantnag', coordinator: 'TBD', volunteers: 28, status: 'Recruiting' },
  { district: 'Baramulla', coordinator: 'Mohammad Ashraf', volunteers: 32, status: 'Active' },
  { district: 'Pulwama', coordinator: 'TBD', volunteers: 18, status: 'Recruiting' },
];

export default function CommunityOutreachPage() {
  const [joined, setJoined] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', district: '', role: '', message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setJoined(true);
  };

  return (
    <main className="min-h-screen bg-slate-950"><section className="relative pt-48 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/50 via-orange-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <Link href="/citizen-science" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6"><ArrowLeft className="w-4 h-4" />Back to Citizen Science</Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-xl"><Users className="w-7 h-7 text-white" /></div>
              <Badge variant="warning" size="lg">Outreach Program</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Outreach</span></h1>
            <p className="text-lg text-slate-400 max-w-2xl">Engage local communities in conservation awareness, environmental monitoring training, and citizen science programs. Build bridges between science and society.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-amber-500/30 p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div><h2 className="text-xl font-bold text-white mb-1">Ready to Join Outreach?</h2><p className="text-sm text-slate-400">Join 145+ volunteers building community awareness</p></div>
              {!joined ? (
                <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600 text-white" onClick={() => document.getElementById('outreach-form')?.scrollIntoView({ behavior: 'smooth' })}>
                  <Megaphone className="w-5 h-5 mr-2" />
                  Register for Outreach
                </Button>
              ) : (
                <Badge variant="success" size="lg"><CheckCircle className="w-4 h-4 mr-1" /> Registered</Badge>
              )}
            </div>
          </Card>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card className="glass-intense border-white/10 p-6">
                <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><Users className="w-5 h-5 text-amber-400" />Local Outreach Roles</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {outreachRoles.map(role => (
                    <div key={role.title} className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <h3 className="text-sm font-bold text-white mb-1">{role.title}</h3>
                      <p className="text-xs text-slate-400">{role.desc}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="glass-intense border-white/10 p-6">
                <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><School className="w-5 h-5 text-amber-400" />School & Community Activities</h2>
                <ul className="space-y-3">
                  {[
                    { title: 'Environmental Education Sessions', desc: 'Interactive sessions in schools covering Kashmir\'s unique ecosystems, endangered species, and conservation challenges' },
                    { title: 'Field Trip Coordination', desc: 'Organize guided field visits to wetlands, forests, and monitoring stations for hands-on learning' },
                    { title: 'Community Awareness Campaigns', desc: 'Door-to-door and community gatherings to share environmental data and encourage participation' },
                    { title: 'Workshop & Training Events', desc: 'Full-day or half-day workshops on species identification, photo documentation, and data contribution' },
                  ].map(act => (
                    <li key={act.title} className="p-3 rounded-lg bg-white/5">
                      <h3 className="text-sm font-bold text-white mb-1">{act.title}</h3>
                      <p className="text-xs text-slate-400">{act.desc}</p>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="glass-intense border-white/10 p-6">
                <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><MapPin className="w-5 h-5 text-amber-400" />District Outreach Campaigns</h2>
                <p className="text-sm text-slate-400 mb-4">Each district has an outreach coordinator who manages local campaigns, volunteer recruitment, and community engagement activities.</p>
                <div className="space-y-2">
                  {districtCoordinators.map(dc => (
                    <div key={dc.district} className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/5 border border-white/5">
                      <div>
                        <p className="text-sm font-medium text-white">{dc.district}</p>
                        <p className="text-xs text-slate-400">Coordinator: {dc.coordinator} • {dc.volunteers} volunteers</p>
                      </div>
                      <Badge variant={dc.status === 'Active' ? 'success' : 'warning'} size="sm">{dc.status}</Badge>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Registration Form */}
              <Card id="outreach-form" className="glass-intense border-white/10 p-6">
                <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><Megaphone className="w-5 h-5 text-amber-400" />Outreach Registration</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-slate-300 mb-1">Full Name *</label><input type="text" required value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))} placeholder="Your name" className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500" /></div>
                    <div><label className="block text-sm font-medium text-slate-300 mb-1">Email *</label><input type="email" required value={formData.email} onChange={e => setFormData(p => ({...p, email: e.target.value}))} placeholder="your@email.com" className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500" /></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-slate-300 mb-1">District *</label><input type="text" required value={formData.district} onChange={e => setFormData(p => ({...p, district: e.target.value}))} placeholder="Your district" className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500" /></div>
                    <div><label className="block text-sm font-medium text-slate-300 mb-1">Preferred Role</label><select value={formData.role} onChange={e => setFormData(p => ({...p, role: e.target.value}))} className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"><option value="">Select role</option>{outreachRoles.map(r => <option key={r.title} value={r.title}>{r.title}</option>)}</select></div>
                  </div>
                  <div><label className="block text-sm font-medium text-slate-300 mb-1">Message / Interests</label><textarea rows={3} value={formData.message} onChange={e => setFormData(p => ({...p, message: e.target.value}))} placeholder="Tell us about your interests in community outreach" className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500" /></div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white">{joined ? <><CheckCircle className="w-5 h-5 mr-2" /> Registered!</> : <><Users className="w-5 h-5 mr-2" />Register for Outreach</>}</Button>
                </form>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="glass-intense border-white/10 p-6">
                <h3 className="text-sm font-bold text-white mb-3">What Happens After Joining</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2"><span className="text-amber-400 font-bold text-sm">1.</span><p className="text-sm text-slate-300">Register for the outreach program</p></div>
                  <div className="flex items-start gap-2"><span className="text-amber-400 font-bold text-sm">2.</span><p className="text-sm text-slate-300">Connect with your district coordinator</p></div>
                  <div className="flex items-start gap-2"><span className="text-amber-400 font-bold text-sm">3.</span><p className="text-sm text-slate-300">Participate in workshops, school visits, and awareness campaigns</p></div>
                  <div className="flex items-start gap-2"><span className="text-amber-400 font-bold text-sm">4.</span><p className="text-sm text-slate-300">Build community engagement hours and earn recognition</p></div>
                </div>
              </Card>
              <Card className="glass-intense border-white/10 p-6">
                <h3 className="text-sm font-bold text-white mb-3">District Coordinator Logic</h3>
                <p className="text-sm text-slate-400 mb-3">Districts with active coordinators have organized campaigns and regular events. Districts marked as &quot;Recruiting&quot; are seeking volunteer coordinators to lead local outreach.</p>
                <p className="text-sm text-white font-medium">Interested in becoming a coordinator? Register and indicate your interest.</p>
              </Card>
              <Card className="glass-intense border-white/10 p-6">
                <h3 className="text-sm font-bold text-white mb-3">Related Links</h3>
                <div className="space-y-2">
                  <Link href="/citizen-science" className="block text-sm text-amber-400 hover:text-amber-300">→ Citizen Science Hub</Link>
                  <Link href="/contribute-data" className="block text-sm text-amber-400 hover:text-amber-300">→ Contribute Data</Link>
                  <Link href="/contribute" className="block text-sm text-amber-400 hover:text-amber-300">→ All Contribution Paths</Link>
                  <Link href="/submit-sighting" className="block text-sm text-amber-400 hover:text-amber-300">→ Submit a Sighting</Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <AdvancedFooter />
    </main>
  );
}
