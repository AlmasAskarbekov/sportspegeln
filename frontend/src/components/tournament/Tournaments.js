import React from 'react';
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import '../../css/Tournaments.module.css';
import styles from '../../css/Tournaments.module.css';
import { useDispatch } from "react-redux";
import { updateTournament } from "../../reducers/tournament";
import { GetTournaments } from "../../api/GetTournaments";
import { useSelector } from "react-redux";
import { selectTournaments } from "../../reducers/getTournaments";

export function Tournaments() {
	const dispatch = useDispatch();
	const tournaments = useSelector(selectTournaments);

	const listTournaments = tournaments.map((tournament) =>
	  <tr key={tournament.id}>
	    <td><Link onClick={() => dispatch(updateTournament(tournament))} to="/tournament" className={styles.tournamentLink}>{tournament.name}</Link></td>
      <td>{tournament.start_date}</td>
	    <td>{tournament.owner_name}</td>
    </tr>
	);

	return (
		<div>
			<GetTournaments />
			<Table striped bordered hover size="sm" className="tournamentTable">
			  <thead>
			    <tr>
			      <th>Turnering</th>
				    <th>Startdatum</th>
			      <th>Ägare</th>
			    </tr>
			  </thead>
			  <tbody>
			  { listTournaments }
			  </tbody>
			</Table>
		</div>
	);
}
