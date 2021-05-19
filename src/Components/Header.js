import React, { useContext, useState } from "react";
import Context from "../context";
import {
  Button,
  Container,
  Navbar,
  Nav,
  Form,
  Col,
  ButtonGroup,
  Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { isLogin, setIsLogin } = useContext(Context);

  return (
    <>
      <Modal
        size={"lg"}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Аутентификация</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mt-2">
            <Form.Label>Логин</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              // onChange={(event) => setName(event.target.value)}
              placeholder="Введите логин"
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              // onChange={(event) => setName(event.target.value)}
              placeholder="Введите пароль"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отменить
          </Button>
          <Button variant="primary">Войти</Button>
        </Modal.Footer>
      </Modal>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand style={{ marginLeft: 20 }}>Курсовой проект</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link exact href="/users">
              Пользователи
            </Nav.Link>
            <Nav.Link href="/courses">Курсы</Nav.Link>
            <Nav.Link href="/organizations">Организации</Nav.Link>
            <Nav.Link className="mr-sm-2"></Nav.Link>
          </Nav>
          <Nav className="justify-content-end mx-4" style={{ width: "100%" }}>
            <ButtonGroup aria-label="Basic example">
              <Button variant="outline-success" onClick={() => setShow(true)}>
                Аутентификация
              </Button>
              <Button variant="outline-success">Выход</Button>
            </ButtonGroup>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
