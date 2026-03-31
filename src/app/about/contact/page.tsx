'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Mail, Phone, MapPin, MessageCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function ContactPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      <section className="relative pt-20 md:pt-48 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-teal-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Get In Touch</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Us</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Reach out to us for inquiries, collaborations, data requests,
              or to report environmental concerns
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Mail, title: 'Email', value: 'contact@kashmir-environment.org', href: 'mailto:contact@kashmir-environment.org' },
              { icon: Phone, title: 'Phone', value: '+91 194 2XXX XXX', href: 'tel:+911942000000' },
              { icon: MapPin, title: 'Location', value: 'Srinagar, Jammu & Kashmir', href: '#' },
              { icon: MessageCircle, title: 'Support', value: 'Report Issues Online', href: '/report-issue' },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-intense border-white/10 p-6 text-center">
                  <item.icon className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400 mb-4">{item.value}</p>
                  <Button size="sm" variant="outline" className="border-white/20 text-white h-9 w-full">
                    {item.title === 'Support' ? 'Report Now' : 'Contact'}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
