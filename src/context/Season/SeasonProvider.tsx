import React from "react";
import { Provider } from "./SeasonContext";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Seasons } from "../../generated/Seasons";

interface Props {
  children: React.ReactNode;
}

const SEASONS = gql`
  query Seasons {
    seasons {
      id
      year
    }
  }
`;

const SeasonProvider: React.FC<Props> = ({ children }) => {
  const { loading, error, data } = useQuery<Seasons>(SEASONS);

  if (loading) return <div>loading...</div>;
  if (error || !data || !data.seasons) return <div>error</div>;

  const latestSeason = data.seasons.reduce((latestSeason, season) =>
    latestSeason.year > season.year ? latestSeason : season
  );

  return (
    <Provider value={{ currentSeason: latestSeason }}>{children}</Provider>
  );
};

export default SeasonProvider;
