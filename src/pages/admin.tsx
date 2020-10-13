import React, { useState } from "react";

import { useForm } from "react-hook-form";

import PageStructure from "../components/page-structure";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

let startColors = [
  { color: "Green", hex: "#54AA45", question: "What is love?" },
  { color: "Red", hex: "#AA123", question: "Baby don't hurt me?" },
  { color: "Blue", hex: "#9234FF", question: "Don\t hurt me" },
];

let currentEditable = { color: "White", hex: "#FFFFEE", question: "" };

function AdminPage() {
  const [colors, setColor] = useState(startColors);
  const { register, handleSubmit } = useForm();

  function onSubmit(data: any) {
    setColor([
      ...colors,
      { color: "Brown", hex: "#87F4A5", question: "No more" },
    ]);
  }

  return (
    <PageStructure>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formColor">
          <Card
            style={{ width: "18rem", backgroundColor: currentEditable.hex }}
            className="mb-2 text-dark"
          >
            <Card.Header>
              <Form.Row>
                <Col>
                  <Form.Control
                    name="color"
                    type="text"
                    placeholder="Enter color"
                    ref={register}
                  />
                </Col>
                <Col>
                  <Button>pick</Button>
                </Col>
              </Form.Row>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <Form.Control
                  name="question"
                  type="text"
                  placeholder="Enter question"
                  ref={register}
                />
              </Card.Text>
            </Card.Body>
          </Card>
        </Form.Group>
        <Button>"Add M&amp;M"</Button>
      </Form>
      <h2>Current colors</h2>
      //TODO add grid
      {colors.map((value, index) => {
        return (
          <Card
            key={value.hex}
            style={{ width: "18rem", backgroundColor: value.hex }}
            className="mb-2 text-dark"
          >
            <Card.Header>{value.color}</Card.Header>
            <Card.Body>
              <Card.Text>{value.question}</Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </PageStructure>
  );
}

export default AdminPage;
