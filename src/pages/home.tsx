import "firebase/firestore";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Circle from "../components/circle";
import Firebase from "../components/firebase";

function HomePage(props: { firebase: Firebase }) {
  let [self, setSelf] = useState("");

  let [users, setUsers] = useState([""]);
  let [currentUser, setCurrentUser] = useState("");

  let [ems, setEms] = useState<
    { color: string; hex: string; question: string }[] | undefined
  >(undefined);
  let [currentEm, setCurrentEm] = useState<
    { color: string; hex: string; question: string } | undefined
  >(undefined);

  useEffect(() => {
    getUsers();
    getCurrentUser();
    getCurrentEm();
  }, []);

  function getSelf() {
    let uid = props.firebase.auth?.currentUser?.uid;

    props.firebase.user(uid).onSnapshot((snapshot) => {
      setSelf(snapshot.ref.id);
    });
  }

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

  function getEms() {}

  function getCurrentEm() {
    props.firebase.ems().onSnapshot((snapshot) => {
      let ems = snapshot.docs.map((document) => convertEms(document.data()));

      props.firebase.currentEm().onSnapshot((snapshot) => {
        let colorName = snapshot.data()?.color;
        console.log(ems);
        let currentEmData = ems?.find((color) => {
          console.log(color, colorName);
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
    <div>
      <Col xs={8} md={6} sm={4} className="all-users m-2 p-2 bg-white">
        {users.map((user) => {
          return (
            <Row className="m-2">
              <Card
                style={{ width: "100%" }}
                className={user === currentUser ? "bg-primary" : "bg-secondary"}
              >
                <Card.Header className="text-white">
                  {user}
                  {self === user && " (you)"}
                </Card.Header>
              </Card>
            </Row>
          );
        })}
      </Col>
      <div className="em">
        <Circle
          bgColor={currentEm?.hex || "#090909"}
          header={currentUser}
          question={
            currentEm?.question ||
            "question is loading or something went horribly wrong!"
          }
        ></Circle>
      </div>
      <div className="next float-right mr-5">
        {self === self && <Button size="lg">Next</Button>}
      </div>
    </div>
  );
}

export default HomePage;
