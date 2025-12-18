import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Feather, BarChart3, Users, Zap } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-40">
        <div className="max-w-3xl">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-foreground leading-tight mb-8 tracking-tight">
            Write your story
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground font-light leading-relaxed mb-8 max-w-2xl">
            A beautiful, distraction-free platform for writers. Whether it's a novel, blog, poem, or short story—Wordcraft gives you everything you need.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8 py-6 rounded-full font-semibold"
            >
              <Link to="/write">Start Writing</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-foreground/20 text-foreground hover:bg-secondary text-base px-8 py-6 rounded-full font-semibold"
            >
              <Link to="/projects">See Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-border" />
      </div>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-40">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <Feather className="w-12 h-12 text-foreground mb-6" />
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Distraction-free
              </h3>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                A minimal interface that gets out of your way. Focus on what matters—your words.
              </p>
            </div>

            <div>
              <BarChart3 className="w-12 h-12 text-foreground mb-6" />
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Track progress
              </h3>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Word counts, reading time, writing streaks. See your progress grow.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <Zap className="w-12 h-12 text-foreground mb-6" />
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Powerful editing
              </h3>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Rich text formatting, export options, and everything a writer needs.
              </p>
            </div>

            <div>
              <Users className="w-12 h-12 text-foreground mb-6" />
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Share & collaborate
              </h3>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Share your work with readers. Collaborate with other writers in real time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-border" />
      </div>

      {/* Social Proof */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-40">
        <div className="grid md:grid-cols-3 gap-16">
          <div className="text-center">
            <p className="text-5xl sm:text-6xl font-bold text-foreground mb-2">
              50K+
            </p>
            <p className="text-lg text-muted-foreground font-light">
              Writers using Wordcraft
            </p>
          </div>
          <div className="text-center">
            <p className="text-5xl sm:text-6xl font-bold text-foreground mb-2">
              2B+
            </p>
            <p className="text-lg text-muted-foreground font-light">
              Words written
            </p>
          </div>
          <div className="text-center">
            <p className="text-5xl sm:text-6xl font-bold text-foreground mb-2">
              98%
            </p>
            <p className="text-lg text-muted-foreground font-light">
              User satisfaction
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-border" />
      </div>

      {/* Always Free */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-40">
        <div className="text-center">
          <h2 className="text-5xl sm:text-6xl font-bold text-foreground mb-6">
            Always free
          </h2>
          <p className="text-xl text-muted-foreground font-light mb-8 max-w-2xl mx-auto leading-relaxed">
            No hidden fees. No premium tiers. No paywalls. Wordcraft is free forever, with all features available to everyone.
          </p>

          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8 py-6 rounded-full font-semibold"
          >
            <Link to="/write">Get Started</Link>
          </Button>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-border" />
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <p className="font-semibold text-foreground mb-6 text-sm uppercase tracking-wide opacity-70">
              Product
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/write" className="text-muted-foreground hover:text-foreground transition-colors">
                  Writing
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
                  Projects
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-6 text-sm uppercase tracking-wide opacity-70">
              Company
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-6 text-sm uppercase tracking-wide opacity-70">
              Legal
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-6 text-sm uppercase tracking-wide opacity-70">
              Social
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-12">
          <p className="text-sm text-muted-foreground text-center">
            &copy; 2024 Wordcraft. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
