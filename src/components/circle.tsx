import React from "react";
import Col from "react-bootstrap/Col";

type Props = {
  bgColor: string;
  header?: string;
  question: string;
  currentUser?: string;
};

function Circle(props: Props) {
  var circleStyle = {
    padding: 10,
    margin: 20,
    display: "inline-block",
    backgroundColor: props.bgColor,
    borderRadius: "50%",
    width: 500,
    height: 500,
  };
  return (
    <div
      style={circleStyle}
      className={" d-flex align-items-center justify-content-center"}
    >
      <Col>
        <div className="question text-center">{props.header}</div>
        <div className="question text-center">{props.question}</div>
      </Col>
    </div>
  );
}

export default Circle;
