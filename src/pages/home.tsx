import "firebase/firestore";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import Circle from "../components/circle";
import Firebase from "../components/firebase";

function HomePage(props: { firebase: Firebase }) {
  let [users, setUsers] = useState([""]);
  let [currentUser, setCurrentUser] = useState("");
  let [currentEm, setCurrentEm] = useState<
    | { color: string; hex: string; question: string; textHex: string }
    | undefined
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
  ): { color: string; hex: string; question: string; textHex: string } {
    return {
      color: data?.color,
      hex: data?.hex,
      question: data?.question,
      textHex: data?.textHex || "#FFFFFF",
    };
  }

  function onNextUserPressed() {
    nextUser();
    nextRandomColor();
  }

  function nextUser() {
    let newUserIndex = users.findIndex((user) => user === currentUser) + 1;
    if (newUserIndex === users.length) {
      newUserIndex = 0;
    }
    const newUser = users[newUserIndex];

    return props.firebase.currentUser().set({ username: newUser });
  }

  function nextRandomColor() {
    props.firebase.ems().onSnapshot((snapshot) => {
      let ems = snapshot.docs.map((document) => convertEms(document.data()));
      setNewColor(ems);
    });
  }

  function setNewColor(ems: any[]) {
    const randomNumber = getRandomInt(1, ems.length + 1) - 1;

    if (randomNumber === ems.findIndex((em) => currentEm?.color === em.color)) {
      setNewColor(ems);
      return;
    }
    const newColor = ems[randomNumber];

    props.firebase
      .currentEm()
      .set(newColor)
      .then((result) => {});
  }

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  return (
    <Container fluid="lg">
      <Row className="mx-0">
        <Accordion>
          <Accordion.Toggle as={Button} eventKey="0">
            Users
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Col
              xs={12}
              className="all-users m-2 p-2 bg-white border-white rounded"
            >
              {users.map((user) => {
                return (
                  <Row className="m-2" key={user}>
                    <Card
                      style={{ width: "100%" }}
                      className={
                        user === currentUser ? "bg-primary" : "bg-secondary"
                      }
                    >
                      <Card.Header className="text-white">{user}</Card.Header>
                    </Card>
                  </Row>
                );
              })}
            </Col>
          </Accordion.Collapse>
        </Accordion>
        <Col className="em d-flex justify-content-center">
          <Circle
            bgColor={currentEm?.hex || "#090909"}
            header={currentUser}
            textColor={currentEm?.textHex || "#FF00FFF"}
            question={currentEm?.question || ""}
          ></Circle>
        </Col>
        <div className="next mr-5 mt-5">
          <Button size="lg" className="mr-1 mb-2" onClick={onNextUserPressed}>
            Volgende gozer
          </Button>
          <Button
            size="lg"
            className="mb-2 btn-danger"
            onClick={nextRandomColor}
          >
            Gozer, Geef me een andere vraag.
          </Button>
        </div>
      </Row>
    </Container>
  );
}

export default HomePage;
