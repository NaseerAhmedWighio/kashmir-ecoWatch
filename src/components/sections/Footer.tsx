'use client';

import React from 'react';
import { 
  Map, 
  Leaf, 
  Droplet, 
  Shield, 
  Book, 
  Mail, 
  Phone, 
  MapPin,
  Github,
  Twitter,
  Linkedin,
  Youtube,
  Heart,
  Database,
  FileText,
  Users
} from 'lucide-react';

const footerLinks = {
  platform: [
    { label: 'Ecological Atlas', href: '/atlas', icon: Map },
    { label: 'Biodiversity', href: '/biodiversity', icon: Leaf },
    { label: 'Water Systems', href: '/water-systems', icon: Droplet },
    { label: 'Protected Areas', href: '/protected-network', icon: Shield },
    { label: 'Research Library', href: '/library', icon: Book },
  ],
  monitoring: [
    { label: 'Dashboards', href: '/dashboards' },
    { label: 'Alerts', href: '/alerts' },
    { label: 'District Scorecards', href: '/districts' },
    { label: 'Field Reports', href: '/field-reports' },
    { label: 'Risk Updates', href: '/risk-updates' },
  ],
  resources: [
    { label: 'Data Sources', href: '/about/data-sources', icon: Database },
    { label: 'Methodology', href: '/about/methodology', icon: FileText },
    { label: 'Verification Model', href: '/about/verification' },
    { label: 'Partners', href: '/about/partners', icon: Users },
    { label: 'Monitoring Overview', href: '/monitoring-overview' },
  ],
  contribute: [
    { label: 'Report an Issue', href: '/report-issue' },
    { label: 'Submit Sighting', href: '/submit-sighting' },
    { label: 'Contribute Data', href: '/contribute-data' },
    { label: 'Citizen Science', href: '/citizen-science' },
    { label: 'Volunteer', href: '/about/contact' },
  ],
};

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com', icon: Github },
  { label: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { label: 'YouTube', href: 'https://youtube.com', icon: Youtube },
];

export function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300">
      {/* Main footer */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand column - spans 2 columns */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-forest-500 to-glacier-600 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Kashmir Environmental
                </h3>
                <p className="text-xs text-slate-400">
                  Intelligence Platform
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              A unified scientific platform for ecological systems, biodiversity, 
              environmental monitoring, and conservation intelligence across Kashmir.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-forest-400" />
                <span>contact@kashmir-ecowatch.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-forest-400" />
                <span>+91 194 2XXX XXX</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-forest-400" />
                <span>Srinagar, Jammu & Kashmir</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-forest-600 flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Platform
            </h4>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-forest-400 transition-colors flex items-center gap-2"
                  >
                    {link.icon && <link.icon className="w-4 h-4" />}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Monitoring links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Monitoring
            </h4>
            <ul className="space-y-2">
              {footerLinks.monitoring.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-forest-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-forest-400 transition-colors flex items-center gap-2"
                  >
                    {link.icon && <link.icon className="w-4 h-4" />}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contribute links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contribute
            </h4>
            <ul className="space-y-2">
              {footerLinks.contribute.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-forest-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-sm text-slate-500">
              © {new Date().getFullYear()} Kashmir Environmental Intelligence Platform. 
              All rights reserved.
            </div>

            {/* Legal links */}
            <div className="flex items-center gap-6 text-sm">
              <a href="/privacy" className="text-slate-400 hover:text-forest-400 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-slate-400 hover:text-forest-400 transition-colors">
                Terms of Service
              </a>
              <a href="/accessibility" className="text-slate-400 hover:text-forest-400 transition-colors">
                Accessibility
              </a>
            </div>

            {/* Made with */}
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>for Kashmir</span>
            </div>
          </div>
        </div>
      </div>

      {/* Data attribution */}
      <div className="bg-slate-950 py-4">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-xs text-slate-500 text-center">
            Evidence Intelligence Library: Institutional records, peer-reviewed research, monitoring outputs,
            geospatial analysis, and reviewed community-supported evidence.
            All items undergo source classification, methodology documentation, and confidence assessment.
            <a href="/about/data-sources" className="text-indigo-400 hover:text-indigo-300 ml-1">Data Sources</a>
            <a href="/about/methodology" className="text-indigo-400 hover:text-indigo-300 ml-1">Methodology</a>
            <a href="/about/verification" className="text-indigo-400 hover:text-indigo-300 ml-1">Verification</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
