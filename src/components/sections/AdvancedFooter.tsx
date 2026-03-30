'use client';

import React from 'react';
import { 
  Leaf, Mail, Phone, MapPin, Github, Twitter, Linkedin, Youtube,
  Heart, Database, FileText, Users, Shield, Activity, Globe
} from 'lucide-react';

const footerLinks = {
  platform: [
    { label: 'Atlas', href: '/atlas' },
    { label: 'Dashboards', href: '/risk-monitoring/dashboards' },
    { label: 'Library', href: '/library' },
    { label: 'District Profiles', href: '/districts' },
  ],
  monitoring: [
    { label: 'Alerts & Advisories', href: '/alerts' },
    { label: 'Monitoring Overview', href: '/monitoring-overview' },
    { label: 'Field Reports', href: '/field-reports' },
    { label: 'Risk Updates', href: '/risk-updates' },
  ],
  dataTrust: [
    { label: 'Data Sources', href: '/about/data-sources' },
    { label: 'Methodology', href: '/about/methodology' },
    { label: 'Verification Model', href: '/about/verification' },
    { label: 'Sensitivity & Privacy', href: '/about/privacy' },
  ],
  contribute: [
    { label: 'Report an Issue', href: '/report-issue' },
    { label: 'Submit Sighting', href: '/submit-sighting' },
    { label: 'Contribute Data', href: '/contribute-data' },
    { label: 'Citizen Science', href: '/citizen-science' },
  ],
  institution: [
    { label: 'About', href: '/about' },
    { label: 'Mission', href: '/about/mission' },
    { label: 'Contact', href: '/about/contact' },
    { label: 'Partners', href: '/about/partners' },
  ],
};

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com', icon: Github },
  { label: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { label: 'YouTube', href: 'https://youtube.com', icon: Youtube },
];

export function AdvancedFooter() {
  return (
    <footer className="bg-slate-950 border-t border-white/5">
      {/* Main footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8 lg:gap-6">
          {/* Brand column - spans 2 columns */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-forest-500 to-glacier-600 flex items-center justify-center shadow-lg glow-forest">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-wide">
                  Kashmir EcoWatch
                </h3>
              </div>
            </div>
            <p className="text-sm text-slate-400 mb-2 leading-relaxed">
              A Kashmir Diaspora-Supported Initiative for Environmental Intelligence and Scientific Stewardship
            </p>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Supported and sponsored by Dr. Kumar Foundation USA
            </p>

            {/* Contact info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-forest-400" />
                <span className="text-slate-400">contact@kashmir-environment.org</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-forest-400" />
                <span className="text-slate-400">+91 194 2XXX XXX</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-forest-400" />
                <span className="text-slate-400">Srinagar, Jammu & Kashmir</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg glass-light border border-white/10 hover:border-forest-500/50 flex items-center justify-center transition-all group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">
              Platform
            </h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
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

          {/* Monitoring links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">
              Monitoring
            </h4>
            <ul className="space-y-3">
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

          {/* Data & Trust links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">
              Data & Trust
            </h4>
            <ul className="space-y-3">
              {footerLinks.dataTrust.map((link) => (
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

          {/* Contribute links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">
              Contribute
            </h4>
            <ul className="space-y-3">
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

          {/* Institution links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">
              Institution
            </h4>
            <ul className="space-y-3">
              {footerLinks.institution.map((link) => (
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
      <div className="border-t border-white/5">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-sm text-slate-500">
              © {new Date().getFullYear()} Kashmir EcoWatch.
              All rights reserved.
            </div>

            {/* Legal links */}
            <div className="flex items-center gap-6 text-sm">
              <a href="/privacy" className="text-slate-500 hover:text-forest-400 transition-colors">
                Privacy
              </a>
              <a href="/terms" className="text-slate-500 hover:text-forest-400 transition-colors">
                Terms
              </a>
              <a href="/accessibility" className="text-slate-500 hover:text-forest-400 transition-colors">
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
      <div className="bg-slate-950 py-6 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 text-center md:text-left">
              Data sourced from government agencies, research institutions, and verified community contributions. 
              All environmental data undergoes rigorous verification before publication.
            </p>
            <div className="flex items-center gap-4">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-slate-500">Verified Data Source</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
