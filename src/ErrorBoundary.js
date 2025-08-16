import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            fontFamily: "Arial, sans-serif",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(20px)",
              borderRadius: "20px",
              padding: "40px",
              maxWidth: "500px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
              🚧 Oops! Something went wrong
            </h1>
            <p
              style={{ fontSize: "1.2rem", marginBottom: "30px", opacity: 0.9 }}
            >
              Don't worry, you can still access my social links below:
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <a
                href="https://www.linkedin.com/in/cesa-profile"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  padding: "15px 20px",
                  background: "#0077B5",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "10px",
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.target.style.transform = "translateY(-2px)")
                }
                onMouseOut={(e) => (e.target.style.transform = "translateY(0)")}
              >
                💼 LinkedIn
              </a>
              <a
                href="https://github.com/cesa-username"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  padding: "15px 20px",
                  background: "#181717",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "10px",
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.target.style.transform = "translateY(-2px)")
                }
                onMouseOut={(e) => (e.target.style.transform = "translateY(0)")}
              >
                💻 GitHub
              </a>
              <a
                href="https://www.youtube.com/@cesa-channel"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  padding: "15px 20px",
                  background: "#FF0000",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "10px",
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.target.style.transform = "translateY(-2px)")
                }
                onMouseOut={(e) => (e.target.style.transform = "translateY(0)")}
              >
                📺 YouTube
              </a>
            </div>
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: "30px",
                padding: "12px 24px",
                background: "rgba(255, 255, 255, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "25px",
                color: "white",
                cursor: "pointer",
                fontSize: "16px",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.3)";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.2)";
                e.target.style.transform = "scale(1)";
              }}
            >
              🔄 Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
