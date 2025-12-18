import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Feather, BarChart3, Users, Zap } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-40 relative overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl opacity-40" />

        <div className="relative max-w-3xl z-10">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-foreground leading-tight mb-8 tracking-tight">
            Write your
            <span className="gradient-text block">story</span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground font-light leading-relaxed mb-8 max-w-2xl">
            A beautiful, distraction-free platform for writers. Whether it's a novel, blog, poem, or short story—Wordcraft gives you everything you need.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50 text-primary-foreground text-lg px-8 py-6 rounded-full font-semibold border-0 transition-all duration-300"
            >
              <Link to="/write">Start Writing</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-muted text-foreground hover:bg-muted/30 hover:border-primary/50 text-lg px-8 py-6 rounded-full font-semibold transition-all duration-300"
            >
              <Link to="/projects">See Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-40">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="group">
              <div className="p-3 w-fit rounded-xl bg-gradient-to-br from-primary/20 to-secondary/10 group-hover:from-primary/30 group-hover:to-secondary/20 transition-all duration-300 mb-4">
                <Feather className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-4 group-hover:gradient-text transition-all">
                Distraction-free
              </h3>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                A minimal interface that gets out of your way. Focus on what matters—your words.
              </p>
            </div>

            <div className="group">
              <div className="p-3 w-fit rounded-xl bg-gradient-to-br from-secondary/20 to-primary/10 group-hover:from-secondary/30 group-hover:to-primary/20 transition-all duration-300 mb-4">
                <BarChart3 className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Track progress
              </h3>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Word counts, reading time, writing streaks. See your progress grow.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="group">
              <div className="p-3 w-fit rounded-xl bg-gradient-to-br from-primary/20 to-secondary/10 group-hover:from-primary/30 group-hover:to-secondary/20 transition-all duration-300 mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Powerful editing
              </h3>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Rich text formatting, export options, and everything a writer needs.
              </p>
            </div>

            <div className="group">
              <div className="p-3 w-fit rounded-xl bg-gradient-to-br from-secondary/20 to-primary/10 group-hover:from-secondary/30 group-hover:to-primary/20 transition-all duration-300 mb-4">
                <Users className="w-6 h-6 text-secondary" />
              </div>
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
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Social Proof */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-40">
        <div className="grid md:grid-cols-3 gap-16">
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/5 border border-border hover:border-primary/30 transition-all duration-300">
            <p className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              50K+
            </p>
            <p className="text-lg text-muted-foreground font-light">
              Writers using Wordcraft
            </p>
          </div>
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-secondary/10 to-primary/5 border border-border hover:border-secondary/30 transition-all duration-300">
            <p className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-2">
              2B+
            </p>
            <p className="text-lg text-muted-foreground font-light">
              Words written
            </p>
          </div>
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/5 border border-border hover:border-primary/30 transition-all duration-300">
            <p className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
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
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Always Free */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-40 relative overflow-hidden">
        {/* Decorative gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-30" />

        <div className="text-center relative z-10">
          <h2 className="text-5xl sm:text-6xl font-bold text-foreground mb-6">
            Always
            <span className="gradient-text block">free</span>
          </h2>
          <p className="text-xl text-muted-foreground font-light mb-8 max-w-2xl mx-auto leading-relaxed">
            No hidden fees. No premium tiers. No paywalls. Wordcraft is free forever, with all features available to everyone.
          </p>

          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50 text-primary-foreground text-lg px-8 py-6 rounded-full font-semibold border-0 transition-all duration-300"
          >
            <Link to="/write">Get Started</Link>
          </Button>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
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
                <Link to="/write" className="text-muted-foreground hover:text-primary transition-colors">
                  Writing
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-muted-foreground hover:text-primary transition-colors">
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
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
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
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
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
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
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
