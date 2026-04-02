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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6 sm:gap-8">
          {/* Brand column - spans 2 columns */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <a href="/" className="relative flex items-center group">
            <div className="flex items-center gap-4 sm:gap-3 mb-4">
                <img
                  src="/kew_LOGO.png"
                  alt="Kashmir EcoWatch Logo"
                  className="w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem] object-contain"
                />
                
                <div>
                  <h3 className="text-base font-bold text-white tracking-wide">
                    Kashmir EcoWatch
                  </h3>
                </div>
            </div>
            </a>
            <p className="text-xs sm:text-sm text-slate-400 mb-2 leading-relaxed">
              A Kashmir Diaspora-Supported Initiative for Environmental Intelligence and Scientific Stewardship
            </p>
            <p className="text-[10px] sm:text-xs text-slate-500 mb-4 leading-relaxed">
              Supported and sponsored by Dr. Kumar Foundation USA
            </p>

            {/* Contact info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-forest-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-slate-400 truncate">contact@kashmir-environment.org</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-forest-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-slate-400 truncate">+91 194 2XXX XXX</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-forest-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-slate-400 truncate">Srinagar, Jammu & Kashmir</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg glass-light border border-white/10 hover:border-forest-500/50 flex items-center justify-center transition-all group flex-shrink-0"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform links */}
          <div className="col-span-1">
            <h4 className="text-[10px] sm:text-xs font-semibold text-white uppercase tracking-widest mb-3 sm:mb-4">
              Platform
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-slate-400 hover:text-forest-400 transition-colors break-words"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Monitoring links */}
          <div className="col-span-1">
            <h4 className="text-[10px] sm:text-xs font-semibold text-white uppercase tracking-widest mb-3 sm:mb-4">
              Monitoring
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.monitoring.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-slate-400 hover:text-forest-400 transition-colors break-words"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Data & Trust links */}
          <div className="col-span-1">
            <h4 className="text-[10px] sm:text-xs font-semibold text-white uppercase tracking-widest mb-3 sm:mb-4">
              Data & Trust
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.dataTrust.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-slate-400 hover:text-forest-400 transition-colors break-words"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contribute links */}
          <div className="col-span-1">
            <h4 className="text-[10px] sm:text-xs font-semibold text-white uppercase tracking-widest mb-3 sm:mb-4">
              Contribute
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.contribute.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-slate-400 hover:text-forest-400 transition-colors break-words"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Institution links */}
          <div className="col-span-1">
            <h4 className="text-[10px] sm:text-xs font-semibold text-white uppercase tracking-widest mb-3 sm:mb-4">
              Institution
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.institution.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-slate-400 hover:text-forest-400 transition-colors break-words"
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
            {/* Copyright */}
            <div className="text-xs sm:text-sm text-slate-500">
              © {new Date().getFullYear()} Kashmir EcoWatch.
              All rights reserved.
            </div>

            {/* Legal links */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
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
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-500">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 fill-red-500" />
              <span>for Kashmir</span>
            </div>
          </div>
        </div>
      </div>

      {/* Data attribution */}
      <div className="bg-slate-950 py-4 sm:py-6 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
            <p className="text-[10px] sm:text-xs text-slate-500">
              Data sourced from government agencies, research institutions, and verified community contributions.
              All environmental data undergoes rigorous verification before publication.
            </p>
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
              <span className="text-[10px] sm:text-xs text-slate-500 whitespace-nowrap">Verified Data Source</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
