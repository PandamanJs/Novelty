import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Feather, BarChart3, Users, Zap, Sparkles } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-background pt-16 overflow-hidden">
      <Header />

      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-purple-500/20 to-blue-500/10 rounded-full blur-3xl animate-float pulse-glow" />
        <div className="absolute bottom-32 left-10 w-96 h-96 bg-gradient-to-tr from-blue-500/15 to-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-slate-500/10 to-purple-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6 text-sm color-secondary slide-in-left">
            <Sparkles className="w-4 h-4 rotate-slow" />
            <span>Craft beautiful stories</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 tracking-tight bg-gradient-to-r from-purple-300 via-foreground to-cyan-300 bg-clip-text text-transparent fade-in-up glow-pulse">
            Write your
            <br />
            story
          </h1>
          <p className="text-xl text-muted-foreground font-light leading-relaxed mb-12 max-w-2xl">
            A beautiful, distraction-free platform for writers. Whether it's a
            novel, blog, poem, or short story—Wordcraft gives you everything you
            need to create and share.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white text-base px-8 py-6 rounded-2xl font-semibold border-0 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <Link to="/write">Start Writing</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="glass-effect color-secondary text-base px-8 py-6 rounded-2xl font-semibold transition-all duration-300 hover:glass-effect-lg border-cyan-500/20 hover:scale-105 active:scale-95"
            >
              <Link to="/projects">See Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 via-blue-500/30 to-transparent" />
      </div>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Feature 1 - Primary Purple */}
          <div className="group glass-effect p-8 rounded-2xl hover:glass-effect-lg transition-all duration-300 border border-purple-500/10 hover:border-purple-500/30 interactive-card fade-in-up stagger-1">
            <div className="p-4 w-fit rounded-xl glass-effect group-hover:glass-effect-lg mb-6 transition-all duration-300 group-hover:rotate-slow">
              <Feather className="w-6 h-6 color-primary" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">
              Distraction-free
            </h3>
            <p className="text-base text-muted-foreground font-light leading-relaxed">
              A minimal interface that gets out of your way. Focus mode hides everything except your words.
            </p>
          </div>

          {/* Feature 2 - Secondary Cyan */}
          <div className="group glass-effect p-8 rounded-2xl hover:glass-effect-lg transition-all duration-300 border border-cyan-500/10 hover:border-cyan-500/30 interactive-card fade-in-up stagger-2">
            <div className="p-4 w-fit rounded-xl glass-effect group-hover:glass-effect-lg mb-6 transition-all duration-300 group-hover:animate-shimmer">
              <BarChart3 className="w-6 h-6 color-secondary" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">
              Track progress
            </h3>
            <p className="text-base text-muted-foreground font-light leading-relaxed">
              Real-time word counts, reading time estimates, and writing streaks to keep you motivated.
            </p>
          </div>

          {/* Feature 3 - Accent Amber */}
          <div className="group glass-effect p-8 rounded-2xl hover:glass-effect-lg transition-all duration-300 border border-amber-500/10 hover:border-amber-500/30 interactive-card fade-in-up stagger-3">
            <div className="p-4 w-fit rounded-xl glass-effect group-hover:glass-effect-lg mb-6 transition-all duration-300 group-hover:bounce-subtle">
              <Zap className="w-6 h-6 color-accent" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">
              Smart tools
            </h3>
            <p className="text-base text-muted-foreground font-light leading-relaxed">
              Pomodoro timer, writing prompts, and auto-save all your drafts automatically.
            </p>
          </div>

          {/* Feature 4 - Success Green */}
          <div className="group glass-effect p-8 rounded-2xl hover:glass-effect-lg transition-all duration-300 border border-emerald-500/10 hover:border-emerald-500/30 interactive-card fade-in-up stagger-4">
            <div className="p-4 w-fit rounded-xl glass-effect group-hover:glass-effect-lg mb-6 transition-all duration-300">
              <Users className="w-6 h-6 color-success" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">
              Export anywhere
            </h3>
            <p className="text-base text-muted-foreground font-light leading-relaxed">
              Download as TXT, Markdown, or HTML. Share your stories with the world.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Social Proof Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Stat 1 - Primary Purple */}
          <div className="glass-effect p-8 rounded-2xl hover:glass-effect-lg transition-all duration-300 group border border-purple-500/10 interactive-card fade-in-up stagger-1">
            <p className="text-4xl sm:text-5xl font-bold color-primary mb-2 group-hover:glow-pulse">
              50K+
            </p>
            <p className="text-muted-foreground font-light">
              Writers using Wordcraft
            </p>
          </div>

          {/* Stat 2 - Secondary Cyan */}
          <div className="glass-effect p-8 rounded-2xl hover:glass-effect-lg transition-all duration-300 group border border-cyan-500/10 interactive-card fade-in-up stagger-2">
            <p className="text-4xl sm:text-5xl font-bold color-secondary mb-2 group-hover:glow-pulse">
              2B+
            </p>
            <p className="text-muted-foreground font-light">Words written</p>
          </div>

          {/* Stat 3 - Accent Amber */}
          <div className="glass-effect p-8 rounded-2xl hover:glass-effect-lg transition-all duration-300 group border border-amber-500/10 interactive-card fade-in-up stagger-3">
            <p className="text-4xl sm:text-5xl font-bold color-accent mb-2 group-hover:glow-pulse">
              98%
            </p>
            <p className="text-muted-foreground font-light">
              User satisfaction
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Always Free Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center relative z-10">
        <div className="glass-effect p-12 rounded-3xl interactive-card fade-in-up pulse-glow">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 glow-pulse">
            Always free
          </h2>
          <p className="text-xl text-muted-foreground font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            No hidden fees. No premium tiers. No paywalls. Wordcraft is free
            forever, with all features available to everyone.
          </p>

          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white text-base px-8 py-6 rounded-2xl font-semibold border-0 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            <Link to="/write">Get Started</Link>
          </Button>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <p className="font-semibold text-foreground mb-6 text-sm uppercase tracking-wide opacity-70">
              Product
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/write"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  Writing
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
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
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
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
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
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
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-12">
          <p className="text-sm text-muted-foreground text-center">
            &copy; 2024 Wordcraft. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
