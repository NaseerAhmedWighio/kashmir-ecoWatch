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
    { label: 'Atlas', href: '/atlas', icon: Map },
    { label: 'Dashboards', href: '/risk-monitoring/dashboards', icon: BarChart3 },
    { label: 'Library', href: '/library', icon: Book },
    { label: 'District Profiles', href: '/districts', icon: MapPin },
    { label: 'Module Directory', href: '/module-directory', icon: Grid3x3 },
    { label: 'Entity Explorer', href: '/entity-explorer', icon: Search },
  ],
  monitoring: [
    { label: 'Alerts & Advisories', href: '/alerts', icon: Bell },
    { label: 'Monitoring Overview', href: '/monitoring-overview', icon: Activity },
    { label: 'Field Reports', href: '/field-reports', icon: FileText },
    { label: 'Risk Updates', href: '/risk-updates', icon: Clock },
    { label: 'Live Incident Map', href: '/live-incident-map', icon: Globe },
    { label: 'Alert Archive', href: '/alert-archive', icon: Archive },
  ],
  dataTrust: [
    { label: 'Data Sources', href: '/about/data-sources', icon: Database },
    { label: 'Methodology', href: '/about/methodology', icon: FileText },
    { label: 'Verification Model', href: '/about/verification', icon: Shield },
    { label: 'Sensitivity & Privacy', href: '/about/privacy', icon: Lock },
    { label: 'Terms of Use', href: '/terms', icon: Scale },
    { label: 'Accessibility', href: '/accessibility', icon: Accessibility },
  ],
  contribute: [
    { label: 'Report an Issue', href: '/report-issue' },
    { label: 'Submit Sighting', href: '/submit-sighting' },
    { label: 'Contribute Data', href: '/contribute-data' },
    { label: 'Citizen Science', href: '/citizen-science' },
    { label: 'Contribute Hub', href: '/contribute' },
    { label: 'Contribution Guidelines', href: '/contribute-guidelines' },
  ],
  institution: [
    { label: 'About', href: '/about' },
    { label: 'Mission', href: '/about/mission' },
    { label: 'Contact', href: '/about/contact' },
    { label: 'Partners', href: '/about/partners' },
    { label: 'Governance', href: '/about/governance' },
    { label: 'Support & Sponsorship', href: '/about/support-sponsorship' },
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
              © {new Date().getFullYear()} Kashmir EcoWatch.
              All rights reserved.{' '}
              <a href="/copyright" className="text-slate-400 hover:text-forest-400 transition-colors underline decoration-transparent hover:decoration-current">
                Copyright & IP
              </a>
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
            <a href="/made-with-love" className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-400 transition-colors group">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500 group-hover:scale-110 transition-transform" />
              <span>for Kashmir</span>
            </a>
          </div>
        </div>
      </div>

      {/* Data attribution + legal notice */}
      <div className="bg-slate-950 py-4 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-xs text-slate-500 text-center leading-relaxed max-w-4xl mx-auto">
            Kashmir EcoWatch, including its platform architecture, environmental intelligence systems, content organization, dashboards, workflows, geospatial integrations, evidence structures, and associated digital assets, is protected under applicable copyright, intellectual property, database, and related laws. Certain platform elements may include proprietary, patentable, or otherwise legally protectable systems, methods, designs, or frameworks. Unauthorized copying, extraction, redistribution, reverse engineering, imitation, or commercial exploitation is prohibited without prior written authorization.
            {' '}<a href="/copyright" className="text-indigo-400 hover:text-indigo-300">Copyright & IP</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
