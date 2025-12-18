import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col overflow-hidden pt-16">
      <Header />
      
      <div className="flex-1 flex items-center justify-center relative z-10 px-4">
        <div className="text-center max-w-lg">
          {/* 404 Apple minimal */}
          <div className="mb-8">
            <span className="text-9xl sm:text-[150px] font-bold text-black opacity-10">
              404
            </span>
          </div>
          
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4 tracking-tight">
            Page not found
          </h1>
          
          {/* Description */}
          <p className="text-lg text-gray-600 mb-8 font-normal leading-relaxed">
            The page you're looking for doesn't exist or has moved. Let's get you back on track.
          </p>
          
          {/* CTA Button */}
          <Button
            asChild
            className="btn-apple px-8 py-2.5 rounded-full font-medium text-base inline-flex items-center gap-2"
          >
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </Button>
          
          {/* Secondary navigation */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
            <Link to="/" className="text-gray-600 hover:text-black transition-colors duration-300">
              Home
            </Link>
            <span className="text-gray-300 hidden sm:inline">•</span>
            <Link to="/write" className="text-gray-600 hover:text-black transition-colors duration-300">
              Write
            </Link>
            <span className="text-gray-300 hidden sm:inline">•</span>
            <Link to="/projects" className="text-gray-600 hover:text-black transition-colors duration-300">
              Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
