import React from 'react';
import { Tournament } from "../tournament/Tournament";
import { Match } from "../match/Match";

export function Home() {

	return (
      <div>
        <h2>Home</h2>
        <Tournament />
      </div>
    );
}

export default Home;
