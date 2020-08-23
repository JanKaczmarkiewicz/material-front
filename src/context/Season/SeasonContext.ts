import { createContext } from "shered/dist/context/util";
import { Seasons_seasons as Season } from "../../generated/Seasons";

export type SeasonAPI = {
  currentSeason: Season;
};

const { useContext: useSeasonContext, Provider } = createContext<SeasonAPI>();

export { useSeasonContext, Provider };
