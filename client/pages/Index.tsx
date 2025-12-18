import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import {
  BookOpen,
  Feather,
  BarChart3,
  Settings,
  Zap,
  Users,
  ArrowRight,
  Check,
} from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: Feather,
      title: "Distraction-Free Writing",
      description: "Focus on what matters - your words. Minimal interface, maximum creativity.",
    },
    {
      icon: BookOpen,
      title: "Organize Your Ideas",
      description: "Manage books, short stories, blog posts, and poems all in one place.",
    },
    {
      icon: BarChart3,
      title: "Writing Stats",
      description: "Track your progress with word counts, reading time, and writing streaks.",
    },
    {
      icon: Zap,
      title: "Rich Editing",
      description: "Format your text with bold, italics, and more to bring your writing to life.",
    },
    {
      icon: Users,
      title: "Share & Collaborate",
      description: "Share your work with readers and collaborate with other writers.",
    },
    {
      icon: Settings,
      title: "Customizable Workspace",
      description: "Adjust fonts, themes, and layout to match your writing style.",
    },
  ];

  const testimonials = [
    {
      quote: "The cleanest writing tool I've ever used. Finally, a platform built for writers.",
      author: "Sarah Chen",
      role: "Romance Novelist",
    },
    {
      quote: "My blogging productivity increased 40% since I started using Wordcraft.",
      author: "Marcus Rodriguez",
      role: "Tech Blogger",
    },
    {
      quote: "Perfect for poetry. The distraction-free interface helped me focus on my craft.",
      author: "Elena Volkov",
      role: "Poet",
    },
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: [
        "Up to 3 projects",
        "Basic editing tools",
        "Word count tracking",
        "Cloud sync",
      ],
      cta: "Get Started",
      variant: "outline" as const,
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "/month",
      description: "Everything you need to write",
      features: [
        "Unlimited projects",
        "Rich text formatting",
        "Advanced analytics",
        "Collaboration tools",
        "Export to multiple formats",
        "Priority support",
      ],
      cta: "Start Free Trial",
      variant: "default" as const,
      highlighted: true,
    },
    {
      name: "Publisher",
      price: "$24.99",
      period: "/month",
      description: "For serious authors",
      features: [
        "Everything in Pro",
        "Professional templates",
        "Formatting assistance",
        "Publishing guides",
        "Dedicated account manager",
        "API access",
      ],
      cta: "Contact Sales",
      variant: "outline" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4">
                Write Your Story
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                A beautiful, distraction-free platform for writers. Whether you're working on a novel, blog, poem, or short story, Wordcraft gives you the tools you need to write beautifully.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                <Link to="/write">Start Writing Free</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8"
              >
                <Link to="/projects">
                  View Demo <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-bold text-foreground">50K+</p>
                <p className="text-sm text-muted-foreground">Active Writers</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-bold text-foreground">2B+</p>
                <p className="text-sm text-muted-foreground">Words Written</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-bold text-foreground">98%</p>
                <p className="text-sm text-muted-foreground">Happy Users</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="hidden md:block">
            <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Feather className="w-24 h-24 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Your Writing, Beautifully Displayed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything Writers Need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Thoughtfully designed features that support your creative process from idea to publication.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-8 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors"
                >
                  <div className="mb-4 inline-block p-3 rounded-lg bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Loved by Writers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what writers around the world are saying about Wordcraft.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="p-8 rounded-xl bg-card border border-border hover:border-accent/30 transition-colors"
            >
              <p className="text-muted-foreground mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="font-semibold text-foreground">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that's right for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl p-8 border transition-all ${
                  plan.highlighted
                    ? "border-primary bg-primary/5 ring-2 ring-primary md:scale-105 md:-my-4"
                    : "border-border hover:border-primary/30"
                }`}
              >
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>

                <Button asChild className="w-full mb-8" variant={plan.variant}>
                  <Link to="/write">{plan.cta}</Link>
                </Button>

                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-12 sm:p-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Start Writing?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of writers who have found their creative home on Wordcraft.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-8"
          >
            <Link to="/write">Start Free Today</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <p className="font-bold text-foreground mb-4">Wordcraft</p>
              <p className="text-sm text-muted-foreground">
                A beautiful writing platform for modern creators.
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-4">Product</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/write" className="hover:text-primary transition-colors">
                    Writing
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="hover:text-primary transition-colors">
                    Projects
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-4">Company</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/" className="hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-4">Legal</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/" className="hover:text-primary transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-primary transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Wordcraft. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
