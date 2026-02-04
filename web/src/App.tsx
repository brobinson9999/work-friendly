import { Routes, Route, HashRouter, Navigate, Link } from "react-router-dom";
import { reactRoutes } from "./routes";
import { themes } from "./models/themes";
import { useState } from "react";
import { SurfaceContainer } from "./components/surface-container";

function App() {
  const themeNames = themes.map((theme) => theme.name);

  const [selectedTheme, setSelectedTheme] = useState(themeNames[0]);

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTheme(event.target.value);
  };

  const theme = themes.find((t) => t.name === selectedTheme)!;

  return (
    <>
      {theme.inlineCss && <style>{theme.inlineCss}</style>}
      {theme.cssFiles.map((cssFile) => (
        <link key={cssFile} rel="stylesheet" href={cssFile} />
      ))}
      <HashRouter>
        <header>
          <SurfaceContainer>
            <nav className="top-left-nav">
              <Link to="/">
                <div className="logo"></div>
                <span>Back to Home</span>
              </Link>
            </nav>
            <nav className="top-right-nav">
              <select value={selectedTheme} onChange={handleThemeChange}>
                {themeNames.map((themeName) => (
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
          <SurfaceContainer>
            Copyright &copy; {new Date().getFullYear()} Brendon Robinson. All
            rights reserved.
          </SurfaceContainer>
        </footer>
      </HashRouter>
    </>
  );
}

export default App;
