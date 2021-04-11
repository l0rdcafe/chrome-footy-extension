// This file is ran as a background script
import { Leagues, Message } from "./types";
console.log("Hello from background script!");

const HIGHLIGHTS_BASE_URL = "https://highlightsfootball.net/video/category";

function getCurrentSeason(league: Leagues): string {
  const today = new Date();

  // jan-aug, season start year is last year
  const startYear =
    today.getMonth() < 7 ? today.getFullYear() - 1 : today.getFullYear();
  const endYear = startYear + 1;

  if (league === Leagues.EPL) {
    return `${startYear}-${endYear}`;
  }

  return `${startYear.toString().slice(-2)}-${endYear.toString().slice(-2)}`;
}

chrome.runtime.onMessage.addListener(
  (
    message: Message
  ) => {
    switch (message.request) {
      case Leagues.EPL:
        chrome.tabs.create({
          url: `${HIGHLIGHTS_BASE_URL}/premier-league/premier-league-${getCurrentSeason(
            Leagues.EPL
          )}`,
        });
        break;
      case Leagues.SERIEA:
        chrome.tabs.create({
          url: `${HIGHLIGHTS_BASE_URL}/serie-a/serie-a-${getCurrentSeason(
            Leagues.SERIEA
          )}`,
        });
        break;
      case Leagues.LALIGA:
        chrome.tabs.create({
          url: `${HIGHLIGHTS_BASE_URL}/la-liga/la-liga-${getCurrentSeason(
            Leagues.LALIGA
          )}`,
        });
      default:
        break;
    }
  }
);
