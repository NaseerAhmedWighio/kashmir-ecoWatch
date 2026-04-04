'use client';

import React, { useState } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Mail, Phone, MapPin, MessageCircle, ArrowRight,
  Building2, Users, Database, Siren, Binoculars,
  Shield, Eye, FileText, ChevronDown, ChevronUp,
  Send, Paperclip, Clock, AlertTriangle, CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// ─── Contact Pathway Data ────────────────────────────────────────────────────

const CONTACT_PATHWAYS = [
  {
    id: 'general',
    icon: Mail,
    title: 'General Contact',
    email: 'contact@kashmir-ecowatch.com',
    description: 'For general inquiries, institutional direction, media, and platform communication',
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    iconColor: 'text-emerald-400',
  },
  {
    id: 'partnerships',
    icon: Building2,
    title: 'Partnerships & Institutional Onboarding',
    email: 'partners@kashmir-ecowatch.com',
    description: 'For departments, universities, labs, NGOs, strategic and formal collaboration',
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    iconColor: 'text-blue-400',
  },
  {
    id: 'experts',
    icon: Users,
    title: 'Individual Experts & Advisors',
    email: 'experts@kashmir-ecowatch.com',
    description: 'For affiliated professionals, retired experts, specialist reviewers, and independent experts',
    color: 'from-violet-500 to-purple-600',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/20',
    iconColor: 'text-violet-400',
  },
  {
    id: 'data',
    icon: Database,
    title: 'Data Contributions',
    email: 'data@kashmir-ecowatch.com',
    description: 'For datasets, metadata, monitoring records, GIS files, and technical submissions',
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    iconColor: 'text-amber-400',
  },
  {
    id: 'reports',
    icon: Siren,
    title: 'Environmental Incident Reports',
    email: 'reports@kashmir-ecowatch.com',
    description: 'For issue escalation, field incident follow-up, and reporting support',
    color: 'from-red-500 to-rose-600',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
    iconColor: 'text-red-400',
  },
  {
    id: 'citizenscience',
    icon: Binoculars,
    title: 'Citizen Science & Sightings',
    email: 'citizenscience@kashmir-ecowatch.com',
    description: 'For sightings, contributor support, public participation, and community science queries',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
    iconColor: 'text-green-400',
  },
  {
    id: 'verification',
    icon: Eye,
    title: 'Verification & Methodology',
    email: 'verify@kashmir-ecowatch.com',
    description: 'For review logic, confidence model, verification questions',
    color: 'from-indigo-500 to-blue-600',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20',
    iconColor: 'text-indigo-400',
  },
  {
    id: 'privacy',
    icon: Shield,
    title: 'Privacy & Sensitivity',
    email: 'privacy@kashmir-ecowatch.com',
    description: 'For restricted ecological information, data sensitivity, and privacy concerns',
    color: 'from-slate-400 to-slate-600',
    bgColor: 'bg-slate-500/10',
    borderColor: 'border-slate-500/20',
    iconColor: 'text-slate-400',
  },
];

const INQUIRY_TYPES = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'partnership', label: 'Institutional Partnership' },
  { value: 'expert', label: 'Individual Expert Participation' },
  { value: 'data', label: 'Data Submission' },
  { value: 'report', label: 'Report an Environmental Issue' },
  { value: 'sighting', label: 'Submit Sighting Follow-up' },
  { value: 'citizen-science', label: 'Citizen Science Participation' },
  { value: 'verification', label: 'Verification / Trust Question' },
  { value: 'privacy', label: 'Privacy / Sensitivity Request' },
  { value: 'media', label: 'Media / External Inquiry' },
];

const INQUIRY_MICROCOPY: Record<string, { email: string; guidance: string; cta?: { label: string; href: string } }> = {
  general: {
    email: 'contact@kashmir-ecowatch.com',
    guidance: 'Use this route for general inquiries about the platform, media requests, or questions about Kashmir EcoWatch\'s mission and operations.',
  },
  partnership: {
    email: 'partners@kashmir-ecowatch.com',
    guidance: 'For departments, research bodies, universities, NGOs, and technical networks seeking structured collaboration with Kashmir EcoWatch.',
    cta: { label: 'View Partnership Information', href: '/about/partners' },
  },
  expert: {
    email: 'experts@kashmir-ecowatch.com',
    guidance: 'For affiliated professionals, retired experts, specialist reviewers, and independent experts who wish to contribute their knowledge to environmental monitoring in Kashmir.',
  },
  data: {
    email: 'data@kashmir-ecowatch.com',
    guidance: 'For datasets, metadata, monitoring records, GIS files, and technical submissions. Please describe the data format, scope, and any access requirements.',
    cta: { label: 'Contribute Data Directly', href: '/contribute-data' },
  },
  report: {
    email: 'reports@kashmir-ecowatch.com',
    guidance: 'Use the reporting workflow for structured incident intake. Email support is available for follow-up and escalation only.',
    cta: { label: 'File an Environmental Report', href: '/report-issue' },
  },
  sighting: {
    email: 'citizenscience@kashmir-ecowatch.com',
    guidance: 'For wildlife sighting follow-ups, contributor support, and questions about citizen science participation in Kashmir EcoWatch.',
    cta: { label: 'Submit a Sighting', href: '/submit-sighting' },
  },
  'citizen-science': {
    email: 'citizenscience@kashmir-ecowatch.com',
    guidance: 'For public participation, community science programs, educational outreach, and volunteer opportunities.',
  },
  verification: {
    email: 'verify@kashmir-ecowatch.com',
    guidance: 'For questions about our review logic, confidence scoring model, data verification processes, or methodology concerns.',
    cta: { label: 'Learn About Verification', href: '/about/verification' },
  },
  privacy: {
    email: 'privacy@kashmir-ecowatch.com',
    guidance: 'For sensitive ecological information, data handling concerns, species protection queries, and privacy-related requests.',
    cta: { label: 'View Privacy Policy', href: '/privacy' },
  },
  media: {
    email: 'contact@kashmir-ecowatch.com',
    guidance: 'For journalists, media organizations, and external communications regarding Kashmir EcoWatch\'s work and findings.',
  },
};

const ACTION_SHORTCUTS = [
  { label: 'Report an Issue', href: '/report-issue', icon: Siren, color: 'from-red-500 to-rose-600', description: 'File a structured environmental incident report' },
  { label: 'Submit Sighting', href: '/submit-sighting', icon: Binoculars, color: 'from-green-500 to-emerald-600', description: 'Log a wildlife or plant species observation' },
  { label: 'Contribute Data', href: '/contribute-data', icon: Database, color: 'from-amber-500 to-orange-600', description: 'Share datasets, monitoring records, or research' },
  { label: 'Institutional Onboarding', href: '/about/partners', icon: Building2, color: 'from-blue-500 to-cyan-600', description: 'Begin structured partnership engagement' },
  { label: 'Expert Participation', href: '/about/partners', icon: Users, color: 'from-violet-500 to-purple-600', description: 'Join as an affiliated expert or reviewer' },
  { label: 'Trusted Network', href: '/about/partners', icon: Shield, color: 'from-indigo-500 to-blue-600', description: 'View our institutional partners directory' },
];

const FAQS = [
  {
    question: 'How do I contact the platform for institutional collaboration?',
    answer: 'Reach out to partners@kashmir-ecowatch.com with details about your organization, areas of interest, and proposed collaboration scope. Our institutional coordination team reviews inquiries and responds with an onboarding pathway. You can also use the inquiry form below and select "Institutional Partnership."',
  },
  {
    question: 'Where do I submit datasets or technical data?',
    answer: 'For structured data contributions, use our data submission workflow or email data@kashmir-ecowatch.com. Include information about the data format, geographic scope, time range, and any access restrictions. We acknowledge all data submissions within our standard review window.',
  },
  {
    question: 'I am a retired expert. Which contact should I use?',
    answer: 'Contact experts@kashmir-ecowatch.com. We actively engage retired professionals, specialist reviewers, and independent experts who wish to contribute their knowledge to environmental monitoring in Kashmir. Describe your area of expertise and how you would like to participate.',
  },
  {
    question: 'I need to report an ecological issue urgently. Should I email or use the reporting form?',
    answer: 'Use the reporting form at /report-issue for structured incident intake. It captures location, severity, evidence, and categorization needed for effective response. Email reports@kashmir-ecowatch.com only for follow-up on existing reports or escalation of urgent matters that cannot wait for the standard workflow.',
  },
  {
    question: 'How do I ask about verification or privacy?',
    answer: 'For verification methodology, confidence scoring, or data review questions, contact verify@kashmir-ecowatch.com. For privacy concerns, sensitive species information, or data handling requests, contact privacy@kashmir-ecowatch.com. Both routes are handled by specialized teams within the platform.',
  },
  {
    question: 'What is the expected response time for inquiries?',
    answer: 'General inquiries typically receive acknowledgment within 2-3 business days. Institutional partnership and expert participation requests may take 5-7 business days for initial review. Data submissions are acknowledged within the standard review window. Urgent environmental reports filed through the reporting workflow are prioritized separately.',
  },
];

// ─── Page Component ──────────────────────────────────────────────────────────

export default function ContactPage() {
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inquiryType: '',
    subject: '',
    message: '',
    region: '',
  });
  const [attachment, setAttachment] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachment(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const selectedMicrocopy = formData.inquiryType ? INQUIRY_MICROCOPY[formData.inquiryType] : null;

  return (
    <main className="min-h-screen bg-slate-950">
      {/* ─── Hero Section ─────────────────────────────────────────────────── */}
      <section className="relative pt-20 md:pt-48 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-teal-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left: Hero Content */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <Badge variant="info" size="lg">Contact & Coordination</Badge>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                Contact & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Coordination</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-300 mb-6 leading-relaxed max-w-3xl">
                Reach the right Kashmir EcoWatch pathway for partnerships, data contributions, environmental reporting, expert participation, trust and governance questions, or general institutional communication.
              </p>

              <p className="text-sm text-slate-400 max-w-2xl">
                This page routes you to the correct communication channel based on your inquiry type. Select the relevant pathway below, or use the smart contact form to ensure your message reaches the right team.
              </p>
            </motion.div>

            {/* Right: Trust Panel */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Card className="glass-intense border-white/10 p-6 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wide">Platform Trust</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Official Domain</p>
                    <p className="text-sm text-white font-mono">www.kashmir-ecowatch.com</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Regional Coordination</p>
                    <p className="text-sm text-slate-300">Srinagar, Jammu & Kashmir</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Response Handling</p>
                    <p className="text-sm text-slate-300">Inquiries are routed to specialized teams based on type and priority</p>
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                      <p className="text-xs text-amber-300/90 leading-relaxed">
                        Urgent environmental reporting should use the <span className="font-semibold">Report Issue</span> workflow for structured intake, not email.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Contact Pathway Cards ────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <Badge variant="info">Routing Pathways</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-3">
              Contact Pathways
            </h2>
            <p className="text-slate-400 max-w-2xl">
              Each pathway connects to a specialized team. Select the route that matches your inquiry for faster and more relevant responses.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {CONTACT_PATHWAYS.map((pathway, i) => (
              <motion.div
                key={pathway.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className={`glass-intense ${pathway.borderColor} p-6 h-full flex flex-col`}>
                  <div className={`w-12 h-12 rounded-xl ${pathway.bgColor} flex items-center justify-center mb-4`}>
                    <pathway.icon className={`w-6 h-6 ${pathway.iconColor}`} />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2 leading-snug">{pathway.title}</h3>
                  <p className="text-xs text-slate-400 mb-4 flex-grow leading-relaxed">{pathway.description}</p>
                  <a
                    href={`mailto:${pathway.email}`}
                    className={`text-xs font-mono ${pathway.iconColor} hover:underline block mb-3 break-all`}
                  >
                    {pathway.email}
                  </a>
                  <Button
                    size="sm"
                    variant="outline"
                    className={`${pathway.borderColor} ${pathway.iconColor} h-9 w-full text-xs`}
                    onClick={() => window.location.href = `mailto:${pathway.email}`}
                  >
                    Send Email <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Smart Contact Form ───────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <Badge variant="info">Smart Router</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-3">
              Contact Form
            </h2>
            <p className="text-slate-400 max-w-2xl">
              Select your inquiry type to route your message to the right team. The form adapts to show relevant guidance and shortcuts.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="glass-intense border-white/10 p-6 sm:p-8">
                {formSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-3">Message Received</h3>
                    <p className="text-slate-400 mb-6 max-w-md mx-auto">
                      Your inquiry has been routed to the appropriate team. You can expect an acknowledgment within our standard response window.
                    </p>
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                      <Button variant="outline" className="border-white/20 text-white" onClick={() => { setFormSubmitted(false); setFormData({ name: '', email: '', organization: '', inquiryType: '', subject: '', message: '', region: '' }); setAttachment(null); }}>
                        Submit Another
                      </Button>
                      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => router.push('/')}>
                        Return Home
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Your Name <span className="text-red-400">*</span></label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                          placeholder="Full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Email <span className="text-red-400">*</span></label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                          placeholder="you@organization.org"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Organization / Affiliation</label>
                        <input
                          type="text"
                          name="organization"
                          value={formData.organization}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                          placeholder="University, NGO, department, or individual"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Inquiry Type <span className="text-red-400">*</span></label>
                        <select
                          name="inquiryType"
                          required
                          value={formData.inquiryType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500 transition-colors appearance-none"
                          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
                        >
                          <option value="" className="bg-slate-900">Select inquiry type</option>
                          {INQUIRY_TYPES.map((type) => (
                            <option key={type.value} value={type.value} className="bg-slate-900">{type.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Subject <span className="text-red-400">*</span></label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                        placeholder="Brief description of your inquiry"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Message <span className="text-red-400">*</span></label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                        placeholder="Describe your inquiry, request, or concern in detail..."
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Region / District</label>
                        <input
                          type="text"
                          name="region"
                          value={formData.region}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                          placeholder="e.g., Srinagar, Gulmarg, Dachigam"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Attachment (optional)</label>
                        <div className="relative">
                          <input
                            type="file"
                            id="attachment"
                            onChange={handleFileChange}
                            className="hidden"
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png,.gif,.zip"
                          />
                          <label
                            htmlFor="attachment"
                            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 cursor-pointer hover:border-emerald-500/50 hover:text-slate-300 transition-colors"
                          >
                            <Paperclip className="w-4 h-4" />
                            {attachment || 'Upload file (PDF, image, spreadsheet)'}
                          </label>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12 text-base font-semibold"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Submit Inquiry
                    </Button>
                  </form>
                )}
              </Card>
            </div>

            {/* Dynamic Guidance Panel */}
            <div className="lg:col-span-1">
              {selectedMicrocopy ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={formData.inquiryType}
                >
                  <Card className="glass-intense border-emerald-500/20 p-6 sticky top-24">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <h3 className="text-sm font-bold text-white uppercase tracking-wide">Route Guidance</h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Contact Email</p>
                        <a href={`mailto:${selectedMicrocopy.email}`} className="text-sm text-emerald-400 font-mono hover:underline break-all">
                          {selectedMicrocopy.email}
                        </a>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">What Belongs Here</p>
                        <p className="text-sm text-slate-300 leading-relaxed">{selectedMicrocopy.guidance}</p>
                      </div>
                      {selectedMicrocopy.cta && (
                        <div className="pt-3 border-t border-white/10">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-emerald-500/30 text-emerald-400 w-full text-xs"
                            onClick={() => router.push(selectedMicrocopy.cta!.href)}
                          >
                            {selectedMicrocopy.cta.label} <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ) : (
                <Card className="glass-intense border-white/10 p-6 sticky top-24">
                  <div className="flex items-center gap-2 mb-4">
                    <MessageCircle className="w-5 h-5 text-slate-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wide">Select Inquiry Type</h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Choose an inquiry type in the form to see route-specific guidance, the correct contact email, and relevant quick actions.
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Action Shortcuts ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <Badge variant="info">Direct Actions</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-3">
              Quick Actions
            </h2>
            <p className="text-slate-400 max-w-2xl">
              Skip the contact form entirely and go directly to the right workflow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ACTION_SHORTCUTS.map((shortcut, i) => (
              <motion.div
                key={shortcut.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  className="glass-intense border-white/10 p-5 cursor-pointer group"
                  onClick={() => router.push(shortcut.href)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${shortcut.color} flex items-center justify-center shrink-0 shadow-lg`}>
                      <shortcut.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">{shortcut.label}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{shortcut.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Institutional Coordination Block ─────────────────────────────── */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <Badge variant="info">Institutional</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-3">
              Institutional Coordination
            </h2>
            <p className="text-slate-400 mb-8 max-w-2xl leading-relaxed">
              For departments, research bodies, laboratories, universities, NGOs, and technical networks seeking structured collaboration with Kashmir EcoWatch.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { icon: Building2, label: 'Partnerships', email: 'partners@kashmir-ecowatch.com', description: 'Formal collaboration, MOUs, joint programs' },
                { icon: Database, label: 'Data Coordination', email: 'data@kashmir-ecowatch.com', description: 'Datasets, monitoring records, technical exchange' },
                { icon: Users, label: 'Expert & Advisory', email: 'experts@kashmir-ecowatch.com', description: 'Professional affiliation, review participation' },
              ].map((item, i) => (
                <Card key={item.label} className="glass-intense border-white/10 p-6">
                  <div className={`w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3`}>
                    <item.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{item.label}</h3>
                  <a href={`mailto:${item.email}`} className="text-xs font-mono text-blue-400 hover:underline block mb-2 break-all">
                    {item.email}
                  </a>
                  <p className="text-xs text-slate-400">{item.description}</p>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Local Contact Block ──────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <Badge variant="info">Regional</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-3">
              Regional Coordination Base
            </h2>
            <p className="text-slate-400 mb-8">
              Kashmir EcoWatch operates from the Kashmir Valley with regional coordination capabilities.
            </p>

            <Card className="glass-intense border-white/10 p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Location</p>
                    <p className="text-sm text-white">Srinagar, Jammu & Kashmir</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Phone</p>
                    <p className="text-sm text-white font-mono">+91 194 2XXX XXX</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">General Contact</p>
                    <a href="mailto:contact@kashmir-ecowatch.com" className="text-sm text-emerald-400 hover:underline break-all">
                      contact@kashmir-ecowatch.com
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ─── Response Expectations & Before You Contact ───────────────────── */}
      <section className="py-16 md:py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
            {/* Before You Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="glass-intense border-amber-500/20 p-6 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-bold text-white">Before You Contact Us</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    { text: 'Use reporting forms for incidents and field issues', href: '/report-issue' },
                    { text: 'Use contribution workflows for data and sightings', href: '/contribute-data' },
                    { text: 'Use onboarding routes for institutional and expert applications', href: '/about/partners' },
                    { text: 'Use email for escalation, clarification, or coordination', href: 'mailto:contact@kashmir-ecowatch.com' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span className="text-sm text-slate-300">
                        {item.text.includes('reporting') || item.text.includes('contribution') || item.text.includes('onboarding') ? (
                          <button onClick={() => router.push(item.href!)} className="text-emerald-400 hover:underline">
                            {item.text}
                          </button>
                        ) : (
                          item.text
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            {/* Response Expectations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass-intense border-white/10 p-6 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-bold text-white">Response Expectations</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    { label: 'General & institutional inquiries', detail: 'Acknowledgment within 2-3 business days' },
                    { label: 'Reporting follow-up', detail: 'Prioritized through incident workflow' },
                    { label: 'Data review acknowledgment', detail: 'Within standard review window' },
                    { label: 'Sensitive information handling', detail: 'Escalated to privacy team, confidential processing' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm text-white font-medium">{item.label}</p>
                        <p className="text-xs text-slate-400">{item.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FAQ Section ──────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <Badge variant="info">FAQ</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 max-w-2xl">
              Common questions about contacting and coordinating with Kashmir EcoWatch.
            </p>
          </motion.div>

          <div className="max-w-4xl space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  className="glass-intense border-white/10 p-0 overflow-hidden cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="p-5 sm:p-6 flex items-start justify-between gap-4">
                    <h3 className="text-sm font-semibold text-white leading-snug flex-1">{faq.question}</h3>
                    <button className="shrink-0 text-slate-400 hover:text-white transition-colors">
                      {openFaq === i ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                  {openFaq === i && (
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-white/10 pt-4">
                      <p className="text-sm text-slate-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────────────────────────── */}
      <AdvancedFooter />
    </main>
  );
}
