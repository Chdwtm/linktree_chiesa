import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./App.css";
import cesaPhoto from "./cesa.png";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("App Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <h1>Something went wrong!</h1>
          <p>Please refresh the page to try again.</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              background: "rgba(255,255,255,0.2)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "10px",
              color: "white",
              cursor: "pointer",
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  // Initialize state with localStorage fallback
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [clickCount, setClickCount] = useState(() => {
    try {
      const saved = localStorage.getItem("linktree-click-count");
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });
  const [lastClicked, setLastClicked] = useState(() => {
    try {
      return localStorage.getItem("linktree-last-clicked") || "";
    } catch {
      return "";
    }
  });
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Save state to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem("linktree-click-count", clickCount.toString());
    } catch (error) {
      console.warn("Failed to save click count:", error);
    }
  }, [clickCount]);

  useEffect(() => {
    try {
      if (lastClicked) {
        localStorage.setItem("linktree-last-clicked", lastClicked);
      }
    } catch (error) {
      console.warn("Failed to save last clicked:", error);
    }
  }, [lastClicked]);

  // Memoize stars to prevent re-rendering on every refresh
  const stars = useMemo(() => {
    return [...Array(50)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
    }));
  }, []);

  useEffect(() => {
    // Initialize loading state
    const timer = setTimeout(() => setIsLoaded(true), 100);

    // Mouse tracking with throttle
    let rafId;
    const handleMouseMove = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        rafId = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const socialLinks = useMemo(
    () => [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/chiesadwtm/",
        icon: (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        ),
        color: "#0077B5",
        description: "Let's connect professionally",
      },
      {
        name: "GitHub",
        url: "https://github.com/Chdwtm",
        icon: (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        ),
        color: "#181717",
        description: "Explore my repositories",
      },
      {
        name: "YouTube",
        url: "https://www.youtube.com/@chiesaanugrah640",
        icon: (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        ),
        color: "#FF0000",
        description: "Subscribe to my channel",
      },
      {
        name: "TikTok",
        url: "https://www.tiktok.com/@chdwtm",
        icon: (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
          </svg>
        ),
        color: "#000000",
        description: "Follow for fun content",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/chiesadwtm/",
        icon: (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        ),
        color: "#E4405F",
        description: "See my visual journey",
      },
    ],
    []
  );

  const handleLinkClick = useCallback(
    (url, name) => {
      try {
        // Update click count and last clicked
        setClickCount((prev) => prev + 1);
        setLastClicked(name);

        // Add visual feedback with haptic if available
        if (navigator.vibrate) {
          navigator.vibrate(50);
        }

        // Analytics event (if you want to add later)
        if (typeof window !== "undefined") {
          const clickEvent = new CustomEvent("linkClick", {
            detail: { name, url, timestamp: new Date().toISOString() },
          });
          window.dispatchEvent(clickEvent);
        }

        // Always open in new tab/window - no fallback to current tab
        const newWindow = window.open(url, "_blank", "noopener,noreferrer");

        // If popup is blocked, show user notification instead of redirecting current tab
        if (
          !newWindow ||
          newWindow.closed ||
          typeof newWindow.closed === "undefined"
        ) {
          // Create and show notification for blocked popup
          showPopupNotification(name, url);
          console.log(`Popup blocked. Please manually visit: ${url}`);
        }
      } catch (error) {
        console.error("Error opening link:", error);
        // Show error notification
        showErrorNotification(name, url);
      }
    },
    [socialLinks]
  );

  // Helper function to show popup notification
  const showPopupNotification = useCallback(
    (name, url) => {
      const linkColor =
        socialLinks.find((link) => link.name === name)?.color || "#667eea";

      const notification = document.createElement("div");
      notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(255, 255, 255, 0.95);
      color: #333;
      padding: 15px 20px;
      border-radius: 10px;
      border-left: 4px solid ${linkColor};
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      font-family: inherit;
      font-size: 14px;
      max-width: 300px;
      backdrop-filter: blur(10px);
      animation: slideInFromRight 0.3s ease;
    `;

      notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="font-size: 18px;">🔗</div>
        <div>
          <div style="font-weight: 600; margin-bottom: 4px;">Popup blocked!</div>
          <div style="font-size: 12px; opacity: 0.8;">
            Please allow popups or 
            <a href="${url}" target="_blank" rel="noopener noreferrer" 
               style="color: ${linkColor}; text-decoration: none; font-weight: 600;">
              click here to open ${name}
            </a>
          </div>
        </div>
      </div>
    `;

      document.body.appendChild(notification);

      // Add CSS animation if not already present
      if (!document.getElementById("notification-styles")) {
        const style = document.createElement("style");
        style.id = "notification-styles";
        style.textContent = `
        @keyframes slideInFromRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `;
        document.head.appendChild(style);
      }

      // Remove notification after 5 seconds
      setTimeout(() => {
        if (notification.parentNode) {
          notification.style.animation = "slideInFromRight 0.3s ease reverse";
          setTimeout(() => {
            if (notification.parentNode) {
              document.body.removeChild(notification);
            }
          }, 300);
        }
      }, 5000);
    },
    [socialLinks]
  );

  // Helper function to show error notification
  const showErrorNotification = useCallback((name, url) => {
    const errorNotification = document.createElement("div");
    errorNotification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(255, 59, 48, 0.95);
      color: white;
      padding: 15px 20px;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      font-family: inherit;
      font-size: 14px;
      max-width: 300px;
      backdrop-filter: blur(10px);
    `;

    errorNotification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="font-size: 18px;">⚠️</div>
        <div>
          <div style="font-weight: 600; margin-bottom: 4px;">Error opening link</div>
          <div style="font-size: 12px; opacity: 0.9;">
            <a href="${url}" target="_blank" rel="noopener noreferrer" 
               style="color: white; text-decoration: underline;">
              Click here to open ${name}
            </a>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(errorNotification);

    setTimeout(() => {
      if (errorNotification.parentNode) {
        document.body.removeChild(errorNotification);
      }
    }, 5000);
  }, []);

  const getGreeting = useCallback(() => {
    const hour = currentTime.getHours();
    const dayOfWeek = currentTime.toLocaleDateString("en-US", {
      weekday: "long",
    });

    if (hour < 6) return "🌙 Late night, early bird?";
    if (hour < 12) return `🌅 Good Morning! Happy ${dayOfWeek}`;
    if (hour < 17) return `☀️ Good Afternoon! Enjoying your ${dayOfWeek}?`;
    if (hour < 21) return `🌆 Good Evening! Hope your ${dayOfWeek} was great`;
    return "🌙 Good Night! Sweet dreams";
  }, [currentTime]);

  const getTimeBasedEmoji = useCallback(() => {
    const hour = currentTime.getHours();
    if (hour < 6) return "🦉";
    if (hour < 12) return "☀️";
    if (hour < 17) return "🌞";
    if (hour < 21) return "🌅";
    return "🌙";
  }, [currentTime]);

  return (
    <div className="App">
      <div
        className="background-gradient"
        style={{
          "--mouse-x": `${mousePosition.x}px`,
          "--mouse-y": `${mousePosition.y}px`,
        }}
      />

      <div className="stars">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      <div className={`container ${isLoaded ? "loaded" : ""}`}>
        <header className="profile-section">
          <div className="photo-placeholder">
            <div className="photo-frame">
              <img
                src={cesaPhoto}
                alt="Chiesa Anugrah Dwitama"
                className="profile-photo"
              />
            </div>
          </div>
          <h1 className="name">Chiesa Anugrah Dwitama</h1>
          <p className="greeting">{getGreeting()}</p>
          <p className="subtitle">Welcome to my digital universe! 🌟</p>
          <p className="subtitle">Connect with me across all platforms</p>
        </header>

        <main
          className="links-section"
          role="main"
          aria-label="Social media links"
        >
          {socialLinks.map((link, index) => (
            <button
              key={link.name}
              className="link-item"
              style={{
                animationDelay: `${0.1 * (index + 1)}s`,
                "--link-color": link.color,
              }}
              onClick={() => handleLinkClick(link.url, link.name)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleLinkClick(link.url, link.name);
                }
              }}
              aria-label={`Visit ${link.name}: ${link.description}`}
              title={`Open ${link.name} in new tab`}
            >
              <div className="link-content">
                <span className="link-icon" aria-hidden="true">
                  {link.icon}
                </span>
                <div className="link-text">
                  <span className="link-name">{link.name}</span>
                  <span className="link-description">{link.description}</span>
                </div>
                <span className="link-arrow" aria-hidden="true">
                  →
                </span>
              </div>
              <div className="link-background"></div>
            </button>
          ))}
        </main>

        <footer className="footer" role="contentinfo">
          <p className="footer-text">
            Made with ❤️ using React • Last updated {currentTime.getFullYear()}
          </p>
          <div className="social-counter" aria-live="polite">
            <span className="counter-text">Links clicked: </span>
            <span
              className={`counter-number ${clickCount > 0 ? "updated" : ""}`}
              aria-label={`${clickCount} links clicked`}
            >
              {clickCount}
            </span>
          </div>
          {lastClicked && (
            <p className="last-clicked" aria-live="polite">
              Last visited: <strong>{lastClicked}</strong> ✨
            </p>
          )}
          <div className="status-indicator">
            <span className="status-dot"></span>
            <span className="status-text">All systems operational</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

// Wrapped App component with Error Boundary
const AppWithErrorBoundary = () => {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
};

export default AppWithErrorBoundary;
