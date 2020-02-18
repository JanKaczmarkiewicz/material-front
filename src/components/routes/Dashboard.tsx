import React, { useEffect, useState } from "react";

const Dashboard: React.FC = () => {
  const [data, setData] = useState<
    Array<{
      id: string;
      name: string;
    }>
  >([]);
  useEffect(() => {
    fetch(`http://localhost:3001/api/street`)
      .then(res => res.json())
      .then(res => setData(res.data));
  }, []);
  return null;
};

export default Dashboard;
