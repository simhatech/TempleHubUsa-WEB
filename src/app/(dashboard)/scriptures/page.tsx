'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { BookOpen, ChevronRight } from 'lucide-react';

interface Scripture {
  emoji: string;
  title: string;
  description: string;
  sampleVerse: string;
  sampleReference: string;
  chapters: { title: string; verses: string }[];
}

const scriptures: Scripture[] = [
  {
    emoji: '📖',
    title: 'Bhagavad Gita',
    description: '700 verses of spiritual wisdom from the Mahabharata',
    sampleVerse:
      'You have the right to perform your actions, but you are not entitled to the fruits of action.',
    sampleReference: 'Chapter 2, Verse 47',
    chapters: [
      { title: 'Chapter 1: Arjuna Vishada Yoga', verses: '47 verses - The Yoga of Arjuna\'s Dejection' },
      { title: 'Chapter 2: Sankhya Yoga', verses: '72 verses - The Yoga of Knowledge' },
      { title: 'Chapter 3: Karma Yoga', verses: '43 verses - The Yoga of Action' },
      { title: 'Chapter 4: Jnana Karma Sanyasa Yoga', verses: '42 verses - The Yoga of Renunciation of Action through Knowledge' },
      { title: 'Chapter 5: Karma Sanyasa Yoga', verses: '29 verses - The Yoga of Renunciation' },
      { title: 'Chapter 6: Dhyana Yoga', verses: '47 verses - The Yoga of Meditation' },
      { title: 'Chapter 7: Jnana Vijnana Yoga', verses: '30 verses - The Yoga of Knowledge and Wisdom' },
      { title: 'Chapter 8: Aksara Brahma Yoga', verses: '28 verses - The Yoga of the Imperishable Brahman' },
      { title: 'Chapter 9: Raja Vidya Raja Guhya Yoga', verses: '34 verses - The Yoga of Royal Knowledge' },
      { title: 'Chapter 10: Vibhuti Yoga', verses: '42 verses - The Yoga of Divine Manifestations' },
      { title: 'Chapter 11: Vishvarupa Darshana Yoga', verses: '55 verses - The Yoga of the Vision of the Universal Form' },
      { title: 'Chapter 12: Bhakti Yoga', verses: '20 verses - The Yoga of Devotion' },
      { title: 'Chapter 13: Kshetra Kshetragna Vibhaga Yoga', verses: '35 verses - The Yoga of the Field and the Knower' },
      { title: 'Chapter 14: Gunatraya Vibhaga Yoga', verses: '27 verses - The Yoga of the Three Gunas' },
      { title: 'Chapter 15: Purushottama Yoga', verses: '20 verses - The Yoga of the Supreme Person' },
      { title: 'Chapter 16: Daivasura Sampad Vibhaga Yoga', verses: '24 verses - The Yoga of Divine and Demonic Qualities' },
      { title: 'Chapter 17: Shraddhatraya Vibhaga Yoga', verses: '28 verses - The Yoga of the Three Divisions of Faith' },
      { title: 'Chapter 18: Moksha Sanyasa Yoga', verses: '78 verses - The Yoga of Liberation through Renunciation' },
    ],
  },
  {
    emoji: '📚',
    title: 'Ramayana',
    description: 'Epic tale of Prince Rama\'s journey and dharma',
    sampleVerse:
      'There is no greater dharma than truth, no greater sin than falsehood.',
    sampleReference: 'Ayodhya Kanda',
    chapters: [
      { title: 'Bala Kanda', verses: 'The Book of Youth - Birth and early life of Rama' },
      { title: 'Ayodhya Kanda', verses: 'The Book of Ayodhya - Rama\'s exile from Ayodhya' },
      { title: 'Aranya Kanda', verses: 'The Book of the Forest - Life in Dandaka forest' },
      { title: 'Kishkindha Kanda', verses: 'The Book of Kishkindha - Alliance with the Vanaras' },
      { title: 'Sundara Kanda', verses: 'The Book of Beauty - Hanuman\'s journey to Lanka' },
      { title: 'Yuddha Kanda', verses: 'The Book of War - The great battle in Lanka' },
      { title: 'Uttara Kanda', verses: 'The Book of Answers - Rama\'s reign and later life' },
    ],
  },
  {
    emoji: '⚔️',
    title: 'Mahabharata',
    description: 'The great epic of the Bharata dynasty',
    sampleVerse:
      'Dharma exists for the welfare of all beings. Hence, that by which the welfare of all living beings is sustained, that is dharma.',
    sampleReference: 'Shanti Parva',
    chapters: [
      { title: 'Adi Parva', verses: 'The Book of the Beginning' },
      { title: 'Sabha Parva', verses: 'The Book of the Assembly Hall' },
      { title: 'Vana Parva', verses: 'The Book of the Forest' },
      { title: 'Virata Parva', verses: 'The Book of Virata' },
      { title: 'Udyoga Parva', verses: 'The Book of Effort' },
      { title: 'Bhishma Parva', verses: 'The Book of Bhishma' },
      { title: 'Drona Parva', verses: 'The Book of Drona' },
      { title: 'Karna Parva', verses: 'The Book of Karna' },
      { title: 'Shalya Parva', verses: 'The Book of Shalya' },
      { title: 'Sauptika Parva', verses: 'The Book of the Sleeping Warriors' },
      { title: 'Stri Parva', verses: 'The Book of the Women' },
      { title: 'Shanti Parva', verses: 'The Book of Peace' },
      { title: 'Anushasana Parva', verses: 'The Book of Instructions' },
      { title: 'Ashvamedhika Parva', verses: 'The Book of the Horse Sacrifice' },
      { title: 'Ashramvasika Parva', verses: 'The Book of the Hermitage' },
      { title: 'Mausala Parva', verses: 'The Book of the Clubs' },
      { title: 'Mahaprasthanika Parva', verses: 'The Book of the Great Journey' },
      { title: 'Svargarohana Parva', verses: 'The Book of the Ascent to Heaven' },
    ],
  },
  {
    emoji: '🕉️',
    title: 'Vedas',
    description: 'The oldest scriptures of Hinduism',
    sampleVerse:
      'Truth alone triumphs, not falsehood. Through truth the divine path is spread out.',
    sampleReference: 'Mundaka Upanishad 3.1.6',
    chapters: [
      { title: 'Rigveda', verses: '1,028 hymns - The Veda of Praise' },
      { title: 'Yajurveda', verses: 'Prose mantras for rituals - The Veda of Ritual' },
      { title: 'Samaveda', verses: '1,875 verses - The Veda of Melodies' },
      { title: 'Atharvaveda', verses: '730 hymns - The Veda of Knowledge' },
    ],
  },
  {
    emoji: '🧘',
    title: 'Upanishads',
    description: 'Philosophical texts exploring the nature of reality',
    sampleVerse:
      'Tat Tvam Asi - Thou art That. The individual self is identical with the universal Self.',
    sampleReference: 'Chandogya Upanishad 6.8.7',
    chapters: [
      { title: 'Isha Upanishad', verses: '18 verses - The Inner Ruler' },
      { title: 'Kena Upanishad', verses: '35 verses - By Whom?' },
      { title: 'Katha Upanishad', verses: '119 verses - Death as Teacher' },
      { title: 'Prashna Upanishad', verses: '67 verses - The Questions' },
      { title: 'Mundaka Upanishad', verses: '64 verses - The Shaving of Ignorance' },
      { title: 'Mandukya Upanishad', verses: '12 verses - The Frog' },
      { title: 'Taittiriya Upanishad', verses: '31 verses - From the Taittiriya school' },
      { title: 'Aitareya Upanishad', verses: '33 verses - From the Aitareya school' },
      { title: 'Chandogya Upanishad', verses: '154 verses - The Chandas Singers' },
      { title: 'Brihadaranyaka Upanishad', verses: '435 verses - The Great Forest Teaching' },
    ],
  },
];

export default function ScripturesPage() {
  const [selectedScripture, setSelectedScripture] = useState<Scripture | null>(null);

  return (
    <div>
      <PageHeader title="Sacred Scriptures" description="Explore ancient Hindu texts">
        <Badge variant="secondary">Preview</Badge>
      </PageHeader>

      {/* Verse of the Day */}
      <Card className="mb-8 overflow-hidden border-0">
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="h-5 w-5" />
            <p className="text-sm font-semibold uppercase tracking-wide opacity-90">
              Verse of the Day
            </p>
          </div>
          <blockquote className="text-lg font-medium italic leading-relaxed md:text-xl">
            &ldquo;You have the right to perform your actions, but you are not entitled to the
            fruits of action.&rdquo;
          </blockquote>
          <p className="mt-3 text-sm font-medium opacity-80">— Bhagavad Gita 2.47</p>
        </div>
      </Card>

      {/* Scripture Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {scriptures.map((scripture) => (
          <Card key={scripture.title} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{scripture.emoji}</span>
                  <CardTitle className="text-lg">{scripture.title}</CardTitle>
                </div>
                <Badge variant="outline">Coming Soon</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
              <p className="text-sm text-muted-foreground">{scripture.description}</p>

              {/* Sample Verse */}
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <p className="text-sm italic text-muted-foreground">
                    &ldquo;{scripture.sampleVerse}&rdquo;
                  </p>
                  <p className="mt-2 text-xs font-medium text-muted-foreground">
                    — {scripture.sampleReference}
                  </p>
                </CardContent>
              </Card>

              <div className="mt-auto">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setSelectedScripture(scripture)}
                    >
                      Read More
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3">
                        <span className="text-2xl">{scripture.emoji}</span>
                        {scripture.title}
                      </DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-muted-foreground">{scripture.description}</p>
                    <Separator />
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold">
                        {scripture.title === 'Vedas' ? 'The Four Vedas' : 'Chapters / Sections'}
                      </h4>
                      {scripture.chapters.map((chapter, idx) => (
                        <div
                          key={idx}
                          className="rounded-lg border p-3 transition-colors hover:bg-muted/50"
                        >
                          <p className="text-sm font-medium">{chapter.title}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{chapter.verses}</p>
                        </div>
                      ))}
                    </div>
                    <Separator />
                    <div className="rounded-lg bg-muted/50 p-4">
                      <p className="text-sm font-medium">Sample Verse</p>
                      <p className="mt-2 text-sm italic text-muted-foreground">
                        &ldquo;{scripture.sampleVerse}&rdquo;
                      </p>
                      <p className="mt-1 text-xs font-medium text-muted-foreground">
                        — {scripture.sampleReference}
                      </p>
                    </div>
                    <Badge variant="secondary" className="w-fit">
                      Full reading coming soon
                    </Badge>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
