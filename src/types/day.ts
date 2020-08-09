export type AddPastoralVisitHandler = (data: {
  priest: string | null;
  acolytes: string[];
  hour: string;
}) => void;
