import type { Metadata } from 'next';
import { Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the TempleHubUSA team. We are here to help temples and devotees connect.',
};

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Send us an email and we will get back to you within 24 hours.',
    detail: 'support@templehubusa.com',
    href: 'mailto:support@templehubusa.com',
  },
  {
    icon: MessageSquare,
    title: 'General Inquiries',
    description: 'Questions about the platform, partnerships, or temple onboarding.',
    detail: 'info@templehubusa.com',
    href: 'mailto:info@templehubusa.com',
  },
];

const faqs = [
  {
    question: 'How do I list my temple on TempleHubUSA?',
    answer:
      'Contact us at info@templehubusa.com with your temple details. Our team will guide you through the onboarding process, which includes verifying your temple information and setting up your digital profile.',
  },
  {
    question: 'Is TempleHubUSA free for devotees?',
    answer:
      'Yes, creating an account and browsing the temple directory is completely free. You can view temple information, explore events, and connect with your community at no cost.',
  },
  {
    question: 'How can I volunteer at a temple?',
    answer:
      'Once you create an account, visit any temple page and look for available seva (volunteering) opportunities. You can register for volunteer slots directly through the platform.',
  },
  {
    question: 'Are online donations secure?',
    answer:
      'Absolutely. All financial transactions on TempleHubUSA are processed through secure, PCI-compliant payment gateways. Your payment information is encrypted and never stored on our servers.',
  },
  {
    question: 'Can I book pujas online?',
    answer:
      'Yes, participating temples offer online puja booking. Visit the temple page, go to the Pujas section, and choose from available ceremonies. You can select dates, add special instructions, and pay securely online.',
  },
];

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Hero */}
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Contact Us
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Have a question, suggestion, or want to partner with us? We would love
          to hear from you. Reach out and our team will respond promptly.
        </p>
      </div>

      {/* Contact Methods */}
      <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
        {contactMethods.map((method) => {
          const Icon = method.icon;
          return (
            <Card key={method.title} className="transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-base">{method.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-sm text-muted-foreground">
                  {method.description}
                </p>
                <a
                  href={method.href}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {method.detail}
                </a>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="mx-auto mt-12 max-w-3xl">
        <Card>
          <CardContent className="flex flex-col gap-6 py-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">
                  Serving temples across the United States
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Response Time</p>
                <p className="text-sm text-muted-foreground">
                  Within 24 hours on business days
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="mx-auto mt-20 max-w-3xl">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight md:text-3xl">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-lg border p-6">
              <h3 className="font-semibold">{faq.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Temple Partnership CTA */}
      <div className="mx-auto mt-20 max-w-2xl rounded-2xl bg-muted/50 p-8 text-center md:p-12">
        <h2 className="text-2xl font-bold">Temple Administrators</h2>
        <p className="mt-3 text-muted-foreground">
          Looking to bring your temple online? TempleHubUSA provides free tools
          for temple management, event coordination, and community engagement.
          Let us help you serve your devotees better.
        </p>
        <div className="mt-6">
          <a
            href="mailto:info@templehubusa.com"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Partner With Us
          </a>
        </div>
      </div>
    </div>
  );
}
