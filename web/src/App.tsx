import { Routes, Route, HashRouter, Navigate, Link } from "react-router-dom";
import "./App.css";
import { reactRoutes } from "./routes";
import { getThemeNames, themes } from "./models/themes";
import { useState } from "react";
import { cssDeclarationsToString, type CssDeclaration } from "./utils/css";
import type { Color } from "./models/colors";
import { SurfaceContainer } from "./components/surface-container";

function App() {
  const [selectedTheme, setSelectedTheme] = useState(getThemeNames()[0]);

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTheme(event.target.value);
  };

  const theme = themes.find((t) => t.name === selectedTheme)!;

  const cssDeclarations: CssDeclaration[] = [
    {
      selector: ":root",
      content: {
        "--primary-color": theme.primaryColor.rgbaString,
        "--primary-variant-color": theme.primaryVariantColor.rgbaString,
        "--secondary-color": theme.secondaryColor.rgbaString,
        "--secondary-variant-color": theme.secondaryVariantColor.rgbaString,
        "--background-color": theme.backgroundColor.rgbaString,
        "--surface-color": theme.surfaceColor.rgbaString,
        "--error-color": theme.errorColor.rgbaString,
        "--on-primary-color": theme.onPrimaryColor.rgbaString,
        "--on-secondary-color": theme.onSecondaryColor.rgbaString,
        "--on-background-color": theme.onBackgroundColor.rgbaString,
        "--on-surface-color": theme.onSurfaceColor.rgbaString,
        "--on-error-color": theme.onErrorColor.rgbaString,
        "--warning-color": theme.warningColor.rgbaString,
        "--on-warning-color": theme.onWarningColor.rgbaString,
        "--success-color": theme.successColor.rgbaString,
        "--on-success-color": theme.onSuccessColor.rgbaString,
      } as React.CSSProperties,
    },
    {
      selector: "a",
      content: {
        color: "var(--primary-color)",
      },
    },
    {
      selector: "a:hover",
      content: {
        color: "var(--primary-variant-color)",
      },
    },
    {
      selector: "th",
      content: {
        backgroundColor: "var(--secondary-color)",
        color: "var(--on-secondary-color)",
      },
    },
    {
      selector: "tr",
      content: {
        backgroundColor: "var(--surface-color)",
        color: "var(--on-surface-color)",
      },
    },
    // {
    //   selector: "tr:nth-child(even)",
    //   content: {
    //     backgroundColor: "var(--surface-color)",
    //     color: "var(--on-surface-color)",
    //   },
    // },
  ];

  if (theme.logo) {
    cssDeclarations.push({
      selector: ".logo",
      content: {
        content: `url(${theme.logo})`,
      },
    });
  }

  if (theme.backgroundImage) {
    cssDeclarations.push({
      selector: "body::before",
      content: {
        content: '""',
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundImage: `url(${theme.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        // opacity: "0.1",
        zIndex: "-1",
      },
    });
  }

  return (
    <>
      <style>{cssDeclarationsToString(cssDeclarations)}</style>
      <HashRouter>
        <header>
          <SurfaceContainer style={{ height: "100%", width: "100%" }}>
            <nav className="top-left-nav">
              <Link
                to="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  className="logo"
                  style={{
                    height: "36px",
                    marginRight: "10px",
                  }}
                ></div>
                <span>Back to Home</span>
              </Link>
            </nav>
            <nav className="top-right-nav">
              <select value={selectedTheme} onChange={handleThemeChange}>
                {getThemeNames().map((themeName) => (
                  <option key={themeName} value={themeName}>
                    {themeName}
                  </option>
                ))}
              </select>
            </nav>
          </SurfaceContainer>
        </header>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/routes" replace />} />
            {reactRoutes.map(({ href, element }) => (
              <Route key={href} path={href} element={element} />
            ))}
          </Routes>
        </div>
        <footer>
          <SurfaceContainer style={{ height: "100%", width: "100%" }}>
            Copyright &copy; {new Date().getFullYear()} Brendon Robinson. All rights
            reserved.
          </SurfaceContainer>
        </footer>
      </HashRouter>
    </>
  );
}

export default App;
