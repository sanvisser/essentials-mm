import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Firebase from "../components/firebase";

function LoginPage(props: { firebase: Firebase }) {
  let [email, setEmail] = useState("");
  const history = useHistory();

  function onChange(event: any) {
    setEmail(event.target.value);
  }

  function addUser(event: any) {
    event.preventDefault();

    let username = email.split("@")[0];
    props.firebase
      .doCreateUserWithEmailAndPassword(email, "admin123")
      .then((user) => {
        return props.firebase.users().add({
          id: user?.user?.uid,
          username,
          email,
        });
      })
      .then((result: any) => {
        history.push("/");
        return;
      });
  }

  return (
    <form
      className="mt-5 centered  d-flex justify-content-center text-white"
      onSubmit={(event) => addUser(event)}
    >
      <Col xs={8}>
        <h3>Sign In</h3>
        <div className="mt-5 form-group">
          <input
            value={email}
            onChange={onChange}
            type="text"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Continue
        </button>
      </Col>
    </form>
  );
}

export default LoginPage;
