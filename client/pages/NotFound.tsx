import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Oops! This page doesn't exist yet.
          </p>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            This page is still being written. Let us know what you'd like to see here by prompting in the chat!
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
