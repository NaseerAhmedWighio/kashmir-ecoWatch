'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Map, Leaf, BarChart3, ArrowRight, Radar, Satellite, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export function ImmersiveHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Animated terrain background */}
      <div className="absolute inset-0 bg-terrain" />
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-topo" />
      
      {/* Floating gradient orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-forest-500/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-glacier-500/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.3, 0.4]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-800/20 rounded-full blur-3xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />

      {/* Map-like grid overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="heroGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)" />
        </svg>
      </div>

      {/* Animated signal lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-forest-500/30 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: 0,
              right: 0,
            }}
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ 
              duration: 3 + i * 0.5, 
              repeat: Infinity, 
              delay: i * 0.3,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      {/* Floating intelligence markers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-emerald-400 rounded-full marker-pulse"
            style={{
              top: `${10 + (i * 7) % 80}%`,
              left: `${10 + (i * 13) % 80}%`,
            }}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2 + (i % 3), 
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0 scan-line pointer-events-none opacity-20" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32">
        <div className="max-w-6xl mx-auto">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-light border border-white/10 mb-8"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-slate-300 tracking-wide uppercase">
              Live Environmental Intelligence System Active
            </span>
            <Radar className="w-4 h-4 text-emerald-400" />
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight tracking-tight"
          >
            Kashmir{' '}
            <span className="gradient-text text-glow">Environmental</span>{' '}
            Intelligence Platform
          </motion.h1>

          {/* Positioning statement */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-400 mb-12 max-w-3xl leading-relaxed text-balance"
          >
            A scientific, spatial, and real-time ecological intelligence system for biodiversity, 
            water, pollution, seasonal ecology, and disaster monitoring across Kashmir
          </motion.p>

          {/* Primary actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Button
              size="lg"
              icon={<Map className="w-5 h-5" />}
              className="group relative overflow-hidden bg-gradient-to-r from-forest-600 to-forest-500 hover:from-forest-500 hover:to-forest-400 text-white shadow-2xl glow-forest"
            >
              <span className="relative z-10">Open Atlas</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-forest-400 to-forest-300 opacity-0 group-hover:opacity-20 transition-opacity" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              icon={<Leaf className="w-5 h-5" />}
              className="border-white/20 text-white hover:border-forest-400 hover:text-forest-300 glass-light backdrop-blur-xl"
            >
              Explore Intelligence
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              icon={<BarChart3 className="w-5 h-5" />}
              className="border-white/20 text-white hover:border-glacier-400 hover:text-glacier-300 glass-light backdrop-blur-xl"
            >
              Live Dashboards
            </Button>
          </motion.div>

          {/* Quick stats with live indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl"
          >
            {[
              { value: '2,847', label: 'Species Indexed', icon: Leaf, trend: '+156' },
              { value: '47', label: 'Protected Areas', icon: Map, trend: '+2' },
              { value: '1,253', label: 'Water Bodies', icon: Activity, trend: 'Active' },
              { value: '234', label: 'Monitoring Stations', icon: Satellite, trend: 'Online' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                className="glass-light rounded-xl p-5 border border-white/10 hover:border-forest-500/30 transition-all duration-300 card-intelligence"
              >
                <div className="flex items-start justify-between mb-3">
                  <stat.icon className="w-5 h-5 text-slate-500" />
                  <span className="text-xs text-emerald-400 font-mono">{stat.trend}</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1 metric-live">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-slate-500">Explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-gradient-to-b from-forest-400 to-glacier-400 rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  );
}
