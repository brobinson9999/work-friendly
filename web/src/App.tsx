import { Routes, Route, HashRouter, Navigate, Link } from "react-router-dom";
import { reactRoutes } from "./routes";
import { themes } from "./models/themes";
import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { invalidateLogCache } from "./models/logs";
import { div } from "./components/tags";
import {
  connectWebsockets,
  disconnectWebsockets,
} from "./models/websocket-connection";

function App() {
  useEffect(() => {
    connectWebsockets();
    return disconnectWebsockets;
  }, []);

  const themeNames = themes.map((theme) => theme.name);

  const [selectedTheme, setSelectedTheme] = useState(() => {
    const savedTheme = localStorage.getItem("selectedTheme");
    return savedTheme || themeNames[0];
  });

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = event.target.value;
    setSelectedTheme(newTheme);
    localStorage.setItem("selectedTheme", newTheme);
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
          <nav className="top-left-nav">
            <Link to="/">
              {div(["logo"])}
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
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/routes" replace />} />
            {reactRoutes.map(({ href, element }) => (
              <Route key={href} path={href} element={element} />
            ))}
          </Routes>
        </main>
        <footer>
          Copyright &copy; {new Date().getFullYear()} Brendon Robinson. All
          rights reserved.
        </footer>
      </HashRouter>
    </>
  );
}

export default App;
