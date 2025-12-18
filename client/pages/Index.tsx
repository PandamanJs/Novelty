import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Feather, BarChart3, Users, Zap, BookOpen } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-white text-black pt-16">
      <Header />
      {/* Hero Section - Apple Style */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 relative">
        <div className="max-w-3xl">
          {/* Subtle badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6 fade-in-up">
            ✨ The elegant way to write
          </div>
          
          {/* Hero heading - clean and simple */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black leading-tight mb-6 fade-in-up" style={{ animationDelay: '0.1s' }}>
            Write with purpose
          </h1>
          
          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-600 font-normal leading-relaxed mb-12 max-w-2xl fade-in-up" style={{ animationDelay: '0.2s' }}>
            A distraction-free writing platform built for authors, bloggers, and storytellers. Beautiful, simple, and free.
          </p>

          {/* CTA Buttons - Apple style */}
          <div className="flex flex-col sm:flex-row gap-4 fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Button
              asChild
              className="btn-apple px-8 py-3 text-base font-medium rounded-full"
            >
              <Link to="/write">Get Started</Link>
            </Button>
            
            <Button
              asChild
              className="btn-secondary px-8 py-3 text-base font-medium rounded-full"
            >
              <Link to="/projects">Explore</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gray-200" />
      </div>

      {/* Features Section - Simple Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Everything you need</h2>
          <p className="text-lg text-gray-600">Thoughtfully designed features to help you write better</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Feature 1 */}
          <div className="fade-in-up stagger-1">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-blue-50 flex-shrink-0">
                <Feather className="w-6 h-6 text-blue-600" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black mb-2">Distraction-free</h3>
                <p className="text-gray-600">Clean, minimal interface. Focus on what matters—your words.</p>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="fade-in-up stagger-2">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-green-50 flex-shrink-0">
                <BarChart3 className="w-6 h-6 text-green-600" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black mb-2">Smart insights</h3>
                <p className="text-gray-600">Word counts, reading time, and readability scores in real-time.</p>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="fade-in-up stagger-3">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-orange-50 flex-shrink-0">
                <Zap className="w-6 h-6 text-orange-600" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black mb-2">Powerful tools</h3>
                <p className="text-gray-600">Character arcs, plot tracking, and writing prompts included.</p>
              </div>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="fade-in-up stagger-4">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-purple-50 flex-shrink-0">
                <BookOpen className="w-6 h-6 text-purple-600" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black mb-2">Export anywhere</h3>
                <p className="text-gray-600">Download as PDF, Markdown, or HTML. Share with the world.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gray-200" />
      </div>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Stat 1 */}
          <div className="text-center fade-in-up stagger-1">
            <p className="text-4xl sm:text-5xl font-bold text-black mb-2">50K+</p>
            <p className="text-gray-600">Writers worldwide</p>
          </div>

          {/* Stat 2 */}
          <div className="text-center fade-in-up stagger-2">
            <p className="text-4xl sm:text-5xl font-bold text-black mb-2">2B+</p>
            <p className="text-gray-600">Words written</p>
          </div>

          {/* Stat 3 */}
          <div className="text-center fade-in-up stagger-3">
            <p className="text-4xl sm:text-5xl font-bold text-black mb-2">98%</p>
            <p className="text-gray-600">User satisfaction</p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gray-200" />
      </div>

      {/* CTA Section - Apple style */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6">Always free</h2>
        <p className="text-xl text-gray-600 font-normal mb-12 max-w-2xl mx-auto">
          No subscriptions. No paywalls. No hidden fees. Novelty is completely free for everyone, forever.
        </p>

        <Button
          asChild
          className="btn-apple px-8 py-3 text-base font-medium rounded-full"
        >
          <Link to="/write">Start Writing Now</Link>
        </Button>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gray-200" />
      </div>

      {/* Footer - Apple minimal */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <p className="font-semibold text-gray-900 mb-6 text-sm uppercase tracking-wide opacity-70">Product</p>
            <ul className="space-y-3 text-sm">
              <li><Link to="/write" className="text-gray-600 hover:text-black transition-colors">Write</Link></li>
              <li><Link to="/projects" className="text-gray-600 hover:text-black transition-colors">Projects</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-6 text-sm uppercase tracking-wide opacity-70">Company</p>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="text-gray-600 hover:text-black transition-colors">About</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-black transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-6 text-sm uppercase tracking-wide opacity-70">Legal</p>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="text-gray-600 hover:text-black transition-colors">Privacy</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-black transition-colors">Terms</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-6 text-sm uppercase tracking-wide opacity-70">Connect</p>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Twitter</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-12">
          <p className="text-sm text-gray-600 text-center">© 2024 Novelty. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
