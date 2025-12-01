import { useEffect, useState } from "react";

interface LoaderProps {
  loading: boolean;
  message?: string;
  time?: number;
}

export const Loader = ({loading, message = "Cargando...",time=1500}: LoaderProps) => {

  const [waiting, setWaiting] = useState(true);

   useEffect(() => {
    const timer = setTimeout(() => {
      setWaiting(false);
    }, time);

    return () => clearTimeout(timer);
  }, [time]);

  if (loading || waiting) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Loader container with glow effect */}
          <div className="relative w-24 h-24">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl animate-pulse"></div>
            
            {/* Outer rotating ring */}
            <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
            
            {/* Main spinning gradient ring */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary/80 animate-spin" style={{ animationDuration: '1s' }}></div>
            
            {/* Secondary counter-spinning ring */}
            <div className="absolute inset-3 rounded-full border-4 border-transparent border-b-accent border-l-accent/60" style={{ animation: 'spin 1.5s linear infinite reverse' }}></div>
            
            {/* Inner pulsing circle with gradient */}
            <div className="absolute inset-6 rounded-full gradient-primary opacity-40 animate-pulse"></div>
            
            {/* Center glowing core */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-primary shadow-[0_0_20px_rgba(42,56,255,0.8)] animate-glow"></div>
            </div>
          </div>
          
          {/* Message with fade-in animation */}
          {message && (
            <div className="text-center space-y-2 animate-fade-in">
              <p className="text-lg font-semibold text-foreground">
                {message}
              </p>
              <div className="flex gap-1 justify-center">
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};
