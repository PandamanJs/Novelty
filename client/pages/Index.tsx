import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Feather, BarChart3, Users, Zap } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <Header />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="max-w-3xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 tracking-tight">
            Write your
            <br />
            story
          </h1>
          <p className="text-xl text-muted-foreground font-light leading-relaxed mb-12 max-w-2xl">
            A beautiful, distraction-free platform for writers. Whether it's a
            novel, blog, poem, or short story—Wordcraft gives you everything you
            need.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-blue-600 text-primary-foreground text-base px-6 py-6 rounded-lg font-semibold border-0 transition-all duration-300"
            >
              <Link to="/write">Start Writing</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border border-border/50 text-foreground hover:glass-effect text-base px-6 py-6 rounded-lg font-semibold transition-all duration-300"
            >
              <Link to="/projects">See Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Feature 1 */}
          <div>
            <div className="p-3 w-fit rounded-lg glass-effect mb-6">
              <Feather className="w-6 h-6 text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Distraction-free
            </h3>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              A minimal interface that gets out of your way. Focus on what
              matters—your words.
            </p>
          </div>

          {/* Feature 2 */}
          <div>
            <div className="p-3 w-fit rounded-lg glass-effect mb-6">
              <BarChart3 className="w-6 h-6 text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Track progress
            </h3>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Word counts, reading time, writing streaks. See your progress
              grow.
            </p>
          </div>

          {/* Feature 3 */}
          <div>
            <div className="p-3 w-fit rounded-lg glass-effect mb-6">
              <Zap className="w-6 h-6 text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Powerful editing
            </h3>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Rich text formatting, export options, and everything a writer
              needs.
            </p>
          </div>

          {/* Feature 4 */}
          <div>
            <div className="p-3 w-fit rounded-lg glass-effect mb-6">
              <Users className="w-6 h-6 text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Share & collaborate
            </h3>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Share your work with readers. Collaborate with other writers in
              real time.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Social Proof Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Stat 1 */}
          <div className="glass-effect p-8 rounded-xl">
            <p className="text-4xl sm:text-5xl font-bold text-primary mb-2">
              50K+
            </p>
            <p className="text-muted-foreground font-light">
              Writers using Wordcraft
            </p>
          </div>

          {/* Stat 2 */}
          <div className="glass-effect p-8 rounded-xl">
            <p className="text-4xl sm:text-5xl font-bold text-primary mb-2">
              2B+
            </p>
            <p className="text-muted-foreground font-light">Words written</p>
          </div>

          {/* Stat 3 */}
          <div className="glass-effect p-8 rounded-xl">
            <p className="text-4xl sm:text-5xl font-bold text-primary mb-2">
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
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
          Always free
        </h2>
        <p className="text-xl text-muted-foreground font-light mb-12 max-w-2xl mx-auto leading-relaxed">
          No hidden fees. No premium tiers. No paywalls. Wordcraft is free
          forever, with all features available to everyone.
        </p>

        <Button
          asChild
          size="lg"
          className="bg-primary hover:bg-blue-600 text-primary-foreground text-base px-8 py-6 rounded-lg font-semibold border-0 transition-all duration-300 mx-auto"
        >
          <Link to="/write">Get Started</Link>
        </Button>
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
