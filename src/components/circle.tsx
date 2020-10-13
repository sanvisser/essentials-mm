import React, { useEffect, useRef } from "react";
import Col from "react-bootstrap/Col";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

type Props = {
  bgColor: string;
  header?: string;
  question: string;
  textColor: string;
  currentUser?: string;
};

function Circle(props: Props) {
  const dragInstance = useRef<any>(null);
  const dragTarget = useRef(null);

  useEffect(() => {
    dragInstance.current = Draggable.create(dragTarget.current, {
      type: "rotation",
      onDragEnd() {},
    });
  }, []);

  var circleStyle = {
    padding: 10,
    margin: 20,
    display: "inline-block",
    background: `radial-gradient(circle at 100px 100px, ${props.bgColor}, #000)`,
    transition: "background 2s",
    borderRadius: "50%",
  };
  return (
    <div
      style={circleStyle}
      className={
        "draggable circle d-flex align-items-center justify-content-center shadow-lg-ultra"
      }
    >
      <Col style={{ color: props.textColor }} ref={dragTarget}>
        <div className="question text-center">{props.header}</div>
        <div className="question text-center">{props.question}</div>
      </Col>
    </div>
  );
}

export default Circle;
