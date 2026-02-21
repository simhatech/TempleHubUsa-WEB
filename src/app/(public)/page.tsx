'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Building2,
  Calendar,
  BookOpen,
  HandHelping,
  UtensilsCrossed,
  Heart,
  Search,
  Users,
  Sparkles,
  ArrowRight,
  MapPin,
  PartyPopper,
  UserPlus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const stats = [
  { label: 'Temples', value: '50+', icon: Building2 },
  { label: 'Events Monthly', value: '100+', icon: Calendar },
  { label: 'Devotees', value: '1,000+', icon: Users },
  { label: 'Cities Covered', value: '30+', icon: MapPin },
];

const features = [
  {
    icon: Building2,
    title: 'Temple Directory',
    description:
      'Find and connect with Hindu temples across the United States. Browse by location, tradition, and services offered.',
  },
  {
    icon: Calendar,
    title: 'Events & Festivals',
    description:
      'Discover upcoming festivals, cultural programs, and spiritual events. RSVP and never miss a celebration.',
  },
  {
    icon: BookOpen,
    title: 'Puja Booking',
    description:
      'Book pujas and special ceremonies online. Choose from daily rituals to personalized spiritual services.',
  },
  {
    icon: HandHelping,
    title: 'Seva / Volunteering',
    description:
      'Give back to your community by volunteering at temples. Find seva opportunities that match your skills.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Prasadam',
    description:
      'Order sacred temple food and prasadam for delivery. Enjoy authentic temple cuisine from the comfort of home.',
  },
  {
    icon: Heart,
    title: 'Donations',
    description:
      'Support your temple with secure online donations. Contribute to construction, festivals, education, and more.',
  },
];

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Find Your Temple',
    description:
      'Search our directory to discover Hindu temples in your area. View details, services, and upcoming events.',
  },
  {
    number: '02',
    icon: UserPlus,
    title: 'Join & Participate',
    description:
      'Create your account to RSVP for events, book pujas, volunteer for seva, and become part of the community.',
  },
  {
    number: '03',
    icon: PartyPopper,
    title: 'Stay Connected',
    description:
      'Stay engaged with your temple community. Track your donations, manage bookings, and never miss an event.',
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-800 via-navy-700 to-temple-600 px-4 py-24 text-white md:py-32 lg:py-40">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-saffron-500/10 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-temple-500/10 blur-3xl" />
        </div>

        <div className="container relative mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mx-auto max-w-4xl"
          >
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4" />
              <span>Connecting Hindu Temple Communities Nationwide</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl"
            >
              Connect with Hindu Temples{' '}
              <span className="bg-gradient-to-r from-orange-300 to-yellow-200 bg-clip-text text-transparent">
                Across America
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="mx-auto mb-10 max-w-2xl text-lg text-navy-100 md:text-xl"
            >
              Discover temples, attend events, book pujas, volunteer for seva, and
              strengthen your spiritual community -- all in one place.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button
                size="lg"
                asChild
                className="h-12 bg-white px-8 text-base font-semibold text-navy-800 hover:bg-white/90"
              >
                <Link href="/temples">
                  <Building2 className="mr-2 h-5 w-5" />
                  Explore Temples
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-12 border-white/30 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
              >
                <Link href="/register">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b bg-background">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-3xl font-bold tracking-tight">{stat.value}</span>
                  <span className="mt-1 text-sm text-muted-foreground">{stat.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-muted/30 px-4 py-20 md:py-28">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="mb-16 text-center"
          >
            <motion.h2
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold tracking-tight md:text-4xl"
            >
              Everything Your Temple Community Needs
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
            >
              From finding a temple to booking pujas and volunteering, TempleHubUSA brings
              your entire spiritual journey online.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={fadeInUp}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="h-full transition-shadow hover:shadow-md">
                    <CardContent className="pt-0">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-20 md:py-28">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="mb-16 text-center"
          >
            <motion.h2
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold tracking-tight md:text-4xl"
            >
              How It Works
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
            >
              Getting started with TempleHubUSA is simple. Three easy steps to connect
              with your temple community.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  variants={fadeInUp}
                  transition={{ duration: 0.5 }}
                  className="relative text-center"
                >
                  {/* Connector line between steps on desktop */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-[calc(50%+3rem)] right-[calc(-50%+3rem)] top-8 hidden border-t-2 border-dashed border-muted-foreground/20 md:block" />
                  )}

                  <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {step.number.replace('0', '')}
                    </span>
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
                  <p className="mx-auto max-w-sm text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-navy-800 to-temple-600 px-4 py-20 text-white md:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="container relative mx-auto text-center"
        >
          <motion.h2
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="mb-4 text-3xl font-bold tracking-tight md:text-4xl"
          >
            Ready to Connect with Your Temple Community?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-10 max-w-2xl text-lg text-navy-100"
          >
            Join thousands of devotees who use TempleHubUSA to stay connected with their
            spiritual community. Sign up today -- it is free.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              asChild
              className="h-12 bg-white px-8 text-base font-semibold text-navy-800 hover:bg-white/90"
            >
              <Link href="/register">
                Create Free Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-12 border-white/30 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
            >
              <Link href="/temples">Browse Temples</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
