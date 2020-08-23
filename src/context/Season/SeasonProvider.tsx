import React from "react";
import { Provider } from "./SeasonContext";
import { useQuery } from "@apollo/react-hooks";
import { Seasons } from "../../generated/Seasons";
import { gql } from "@apollo/client";

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
