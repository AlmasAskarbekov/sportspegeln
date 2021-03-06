import React, {useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { editTournament } from '../../reducers/editTournament';
import { selectStoreToken } from '../../reducers/storeToken';
import { selectUserData } from '../../reducers/getUserData';
import styles from '../../css/SubmitModal.module.css';
import Pencil from '../../images/pencil-fill.svg';

export default function EditTournament(props) {

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const token = useSelector(selectStoreToken);
  const user = useSelector(selectUserData);
  const tournament = props.tournament;

  const handleClose = () => setShow(false);

  const submitTournament = (values) => {
    if (values.start_date > values.end_date) {
      alert("Start date must be before end date!");
      return;
    }
    dispatch(editTournament(tournament.id, values.start_date, values.end_date, user.email, token));
    handleClose();
  };

  return (
    <div>
      <img src={Pencil} alt="Redigera" onClick={() => setShow(true)}/>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Redigera datum för: {tournament.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={tournament}
            onSubmit={submitTournament}
          >
            {({
              handleChange,
              handleSubmit,
              values
            }) => (
              <Form id="edit-tournament-form" onSubmit={handleSubmit}>
                <Form.Group controlId="edit-tournament-start-date">
                  <Form.Label>Startdatum:</Form.Label>
                  <Form.Control name="start_date" type="date" value={values.start_date || ""}
                                onChange={handleChange} required/>
                </Form.Group>

                <Form.Group controlId="edit-tournament-end-date">
                  <Form.Label>Slutdatum (kan anges senare):</Form.Label>
                  <Form.Control name="end_date" type="date" value={values.end_date || ""}
                                onChange={handleChange} />
                </Form.Group>

                <Form.Row id="form-submit">
                  <Form.Group className={styles.submitArea}>
                    <Button variant="primary" type="submit">
                      Spara
                    </Button>
                  </Form.Group>

                  <Form.Group className={styles.submitButtons}>
                    <Button variant="secondary" onClick={handleClose}>
                      Avbryt
                    </Button>
                  </Form.Group>
                </Form.Row>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
}
