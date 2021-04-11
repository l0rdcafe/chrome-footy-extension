import * as React from "react";
import "./App.css";
import { Leagues } from "./types";

interface League {
  name: string;
  code: Leagues;
}

const App = () => {
  const leagues: League[] = [
    { name: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 English Premier League", code: Leagues.EPL },
    { name: "🇪🇸 La Liga", code: Leagues.LALIGA },
    { name: "🇮🇹 Serie A", code: Leagues.SERIEA },
  ];
  return (
    <div className="App">
      <header className="App-header">
        <h2>Select your favorite league to read the latest news</h2>
        {leagues.map((league: League) => (
          <button
            className="league-btn"
            onClick={() => {
              chrome.runtime.sendMessage({ request: league.code });
            }}
          >
            {league.name}
          </button>
        ))}
      </header>
    </div>
  );
};

export default App;
