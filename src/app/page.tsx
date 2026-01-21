import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Compass,
  Target,
  Map,
  Building2,
  ChevronRight,
  CheckCircle2,
  Zap,
  Brain,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-glow opacity-50" />

        {/* Navigation */}
        <nav className="relative z-10 border-b border-border/50 bg-background/50 backdrop-blur-xl">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <Compass className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">PlacementPro</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/onboarding">
                <Button variant="hero" size="lg">
                  Get Started
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-24 text-center">
          <Badge variant="outline" className="mb-6 animate-fade-in">
            <Zap className="h-3 w-3 mr-1" />
            AI-Powered Career Guidance
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            Land Your Dream
            <span className="text-gradient block">Tech Career</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in">
            Deterministic, data-driven career guidance. Not another chatbot.
            <br />
            Get a personalized roadmap based on your skills, goals, and
            timeline.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link href="/onboarding">
              <Button variant="hero" size="xl">
                Start Your Journey
                <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button variant="outline" size="xl">
                See How It Works
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16">
            {[
              { value: '10+', label: 'Companies Analyzed' },
              { value: '4', label: 'Skill Dimensions' },
              { value: '∞', label: 'Personalized Paths' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl font-bold text-gradient">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Features
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Built Different. <span className="text-gradient">By Design.</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              No hallucinations. No generic advice. Just structured, actionable
              guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: 'Skill-Based Scoring',
                description:
                  'Your profile is converted into normalized scores across DSA, CS Fundamentals, Projects & Experience.',
                features: [
                  'Deterministic scoring',
                  'Reproducible results',
                  '0-5 scale',
                ],
              },
              {
                icon: Building2,
                title: 'Company Matching',
                description:
                  'Match against real company requirements. Know exactly where you stand and what gaps to fill.',
                features: ['Fit percentage', 'Hard reject rules', 'Gap analysis'],
              },
              {
                icon: Map,
                title: 'Smart Roadmaps',
                description:
                  'Week-by-week preparation plan that prioritizes high-ROI topics and tells you what NOT to learn.',
                features: [
                  'Time-bound tasks',
                  'Progress tracking',
                  'Negative advice',
                ],
              },
            ].map((feature, idx) => (
              <Card key={idx} variant="interactive" className="p-6">
                <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {feature.description}
                </p>
                <div className="space-y-2">
                  {feature.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {f}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Process
            </Badge>
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {[
              {
                step: '01',
                title: 'Complete Your Profile',
                description:
                  'Fill out a structured form about your education, skills, projects, and goals. No vague chat required.',
              },
              {
                step: '02',
                title: 'Get Skill Scores',
                description:
                  'Your inputs are converted into normalized scores. Same input always gives same output.',
              },
              {
                step: '03',
                title: 'Match Against Companies',
                description:
                  'See which companies you can apply to now, which need prep, and which to avoid for now.',
              },
              {
                step: '04',
                title: 'Follow Your Roadmap',
                description:
                  'Get a personalized, time-bound preparation plan. Track progress and watch your readiness grow.',
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6 mb-8 last:mb-0">
                <div className="text-5xl font-bold text-gradient opacity-50">
                  {item.step}
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of students preparing smarter, not harder.
          </p>
          <Link href="/onboarding">
            <Button variant="glow" size="xl">
              Start Free Assessment
              <ChevronRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">PlacementPro</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Built with ❤️ for placement season
          </div>
        </div>
      </footer>
    </div>
  );
}
