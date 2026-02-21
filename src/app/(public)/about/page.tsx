import type { Metadata } from 'next';
import { Building2, Users, Heart, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about TempleHubUSA and our mission to connect Hindu temple communities across the United States.',
};

const values = [
  {
    icon: Building2,
    title: 'Preserve Tradition',
    description:
      'We are dedicated to preserving and promoting Hindu traditions, rituals, and cultural heritage through modern technology.',
  },
  {
    icon: Users,
    title: 'Build Community',
    description:
      'We believe in fostering strong community bonds by making it easy for devotees to connect, participate, and contribute.',
  },
  {
    icon: Heart,
    title: 'Empower Temples',
    description:
      'We empower temples with digital tools to manage operations, engage devotees, and grow their community outreach.',
  },
  {
    icon: Globe,
    title: 'Bridge Generations',
    description:
      'We bridge the gap between generations by making temple services and spiritual resources accessible to all ages.',
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Hero */}
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          About TempleHubUSA
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          TempleHubUSA is a platform dedicated to connecting Hindu temple
          communities across the United States. We make it simple for devotees to
          find temples, attend events, book pujas, volunteer, and support their
          spiritual community.
        </p>
      </div>

      {/* Mission Section */}
      <div className="mx-auto mt-20 max-w-3xl">
        <h2 className="text-center text-2xl font-bold tracking-tight md:text-3xl">
          Our Mission
        </h2>
        <p className="mt-6 text-center text-lg leading-relaxed text-muted-foreground">
          Our mission is to strengthen Hindu temple communities in America by
          providing a unified digital platform that brings devotees, temples, and
          services together. We envision a future where every Hindu temple in the
          United States is digitally connected, making spiritual services and
          community engagement accessible to all.
        </p>
      </div>

      {/* Values Grid */}
      <div className="mx-auto mt-20 max-w-4xl">
        <h2 className="mb-10 text-center text-2xl font-bold tracking-tight md:text-3xl">
          What We Stand For
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div key={value.title} className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{value.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Story Section */}
      <div className="mx-auto mt-20 max-w-3xl">
        <h2 className="text-center text-2xl font-bold tracking-tight md:text-3xl">
          Our Story
        </h2>
        <div className="mt-6 space-y-4 text-muted-foreground">
          <p className="leading-relaxed">
            TempleHubUSA was born out of a simple observation: Hindu temples
            across America serve as vital community hubs, yet many lack the
            digital tools to effectively connect with their devotees and
            streamline their services.
          </p>
          <p className="leading-relaxed">
            From managing puja bookings and event RSVPs to coordinating
            volunteers and processing donations, temples often rely on
            fragmented systems. Devotees, especially those new to an area,
            struggle to discover temples and participate in community
            activities.
          </p>
          <p className="leading-relaxed">
            We set out to change that by building a comprehensive platform that
            serves both temples and devotees. For temples, TempleHubUSA
            provides modern management tools. For devotees, it offers a single
            destination to find temples, explore events, and engage with their
            spiritual community.
          </p>
          <p className="leading-relaxed">
            Today, TempleHubUSA connects dozens of temples and thousands of
            devotees across the country, and we are just getting started.
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mx-auto mt-20 max-w-2xl rounded-2xl bg-muted/50 p-8 text-center md:p-12">
        <h2 className="text-2xl font-bold">Want to Partner with Us?</h2>
        <p className="mt-3 text-muted-foreground">
          If you represent a temple and would like to join the TempleHubUSA
          network, we would love to hear from you. Together, we can build a
          stronger, more connected community.
        </p>
        <div className="mt-6">
          <a
            href="/contact"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
