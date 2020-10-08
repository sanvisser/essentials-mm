import "firebase/firestore";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Circle from "../components/circle";
import Firebase from "../components/firebase";

function HomePage(props: { firebase: Firebase }) {
  let [users, setUsers] = useState([""]);
  let [currentUser, setCurrentUser] = useState("");
  let [currentEm, setCurrentEm] = useState<
    { color: string; hex: string; question: string } | undefined
  >(undefined);

  useEffect(
    () => {
      getUsers();
      getCurrentUser();
      getCurrentEm();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  function getUsers() {
    console.log(" getting user");
    props.firebase.users().onSnapshot((snapshot) => {
      setUsers(snapshot.docs.map((document) => document.data().username));
    });
  }

  function getCurrentUser() {
    props.firebase.currentUser().onSnapshot((snapshot) => {
      setCurrentUser(snapshot?.data()?.username);
    });
  }

  function getCurrentEm() {
    props.firebase.ems().onSnapshot((snapshot) => {
      let ems = snapshot.docs.map((document) => convertEms(document.data()));

      props.firebase.currentEm().onSnapshot((snapshot) => {
        let colorName = snapshot.data()?.color;
        let currentEmData = ems?.find((color) => {
          return color.color === colorName;
        });

        setCurrentEm(currentEmData);
      });
    });
  }

  function convertEms(
    data: firebase.firestore.DocumentData | undefined
  ): { color: string; hex: string; question: string } {
    return {
      color: data?.color,
      hex: data?.hex,
      question: data?.question,
    };
  }

  function nextUser() {
    //TODO call backend for next us
  }

  return (
    <Row className="mx-0">
      <Col
        xl={3}
        xs={8}
        sm={4}
        md={6}
        className="all-users m-2 p-2 bg-white border-white rounded"
      >
        {users.map((user) => {
          return (
            <Row className="m-2">
              <Card
                style={{ width: "100%" }}
                className={user === currentUser ? "bg-primary" : "bg-secondary"}
              >
                <Card.Header className="text-white">{user}</Card.Header>
              </Card>
            </Row>
          );
        })}
      </Col>
      <Col className="em d-flex justify-content-center">
        <Circle
          bgColor={currentEm?.hex || "#090909"}
          header={currentUser}
          question={
            currentEm?.question ||
            "question is loading or something went horribly wrong!"
          }
        ></Circle>
      </Col>
      <div className="next mr-5 mt-5">
        <Button size="lg" onClick={nextUser}>
          Next
        </Button>
      </div>
    </Row>
  );
}

export default HomePage;
