import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import List from "./components/List";
import Form from "./components/Form";
import { Sub, SubsResponseFromApi } from "./types";
import axios from "axios";

interface AppState {
  subs: Array<Sub>;
  newSubsNumber: number;
}

function App() {
  const [subs, setSubs] = useState<AppState["subs"]>([]);
  const [newSubsNumber, setNewSubsNumber] =
    useState<AppState["newSubsNumber"]>(0);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSubs = () => {
      return axios
        .get<SubsResponseFromApi>("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.data);
    };

    const mapFormApiToSubs = (apiResponse: SubsResponseFromApi): Array<Sub> => {
      return apiResponse.map((subsFromApi) => {
        const { name: nick, email: avatar, phone: subMonths } = subsFromApi;

        return {
          nick,
          subMonths,
          avatar,
        };
      });
    };

    fetchSubs().then(mapFormApiToSubs).then(setSubs);
  }, []);

  const handleNewSub = (newSub: Sub) => {
    setSubs((subs) => [...subs, newSub]);
    setNewSubsNumber((n) => n + 1);
  };

  return (
    <div className="App" ref={divRef}>
      <h1>Subs</h1>
      <List subs={subs} />
      New Subs: {newSubsNumber}
      <Form onNewSub={handleNewSub} />
    </div>
  );
}

export default App;
