import React, { useState, useContext, useEffect } from "react";
import { Table, Modal, Button, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import Context from "../context";
import CourseRow from "../Components/CourseRow";

const Courses = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [courses, setCourse] = useState([]);

  const fetchCourses = () => {
    axios
      .get("https://internships-hse.herokuapp.com/internships", {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        // console.log(response);
        setCourse(response.data);
      });
  };

  const updateCourse = () => {};

  const deleteCourse = (id) => {
    axios
      .delete(`https://internships-hse.herokuapp.com/internships/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        // console.log(response);
        fetchCourses();
      });
  };

  const [editableCourse, setEditableCourse] = useState({});

  const editHandlerButton = (id) => {
    console.log(id);
    const editCourse = courses.find((course) => {
      return course.internship_id === id;
    });
    setEditableCourse(editCourse);
    setDescription(editCourse.description);
    setName(editCourse.name);
    setStartDate(editCourse.startDate);
    setFinishDate(editCourse.finishDate);
    setCountry(editCourse.country);
    setSubject(editCourse.subject);
    setLanguage(editCourse.language);
    setPrice(editCourse.price);
    handleShow();
  };

  const changeConfirmHandler = () => {
    axios
      .put(
        `https://internships-hse.herokuapp.com/internships/${editableCourse.internship_id}`,
        {
          name: name,
          description: description,
          startDate: startDate,
          finishDate: finishDate,
          country: country,
          subject: subject,
          language: language,
          price: price,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        fetchCourses();
      });
    handleClose();
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogin(true);
    }
    fetchCourses();
  }, []);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [country, setCountry] = useState("");
  const [subject, setSubject] = useState("");
  const [language, setLanguage] = useState("");
  const [price, setPrice] = useState("");

  const [isEdit, setIsEdit] = useState(false);

  const { isLogin, setIsLogin } = useContext(Context);
  const [organization, setOrganization] = useState({});
  const [internships, setInternships] = useState([]);

  console.log(isLogin);

  if (!isLogin) {
    return (
      <Alert variant="warning">
        <Alert.Heading>Неавторизован!</Alert.Heading>
        <p>
          Необходимо авторизоваться. Нажмите на кнопку "Аутентификация" в
          верхнем меню
        </p>
        <div className="d-flex justify-content-end"></div>
      </Alert>
    );
  }

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
          <Modal.Title>Редактирование</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mt-2">
            <Form.Label>Название</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Введите новое название"
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Введите новое описание"
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Дата начала</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              placeholder="Введите новую дату начала"
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Дата окончания</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              value={finishDate}
              onChange={(event) => setFinishDate(event.target.value)}
              placeholder="Введите новую дату окончания"
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Страна</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              placeholder="Введите новую страну"
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Направление</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              placeholder="Введите новое направление"
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Язык</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              placeholder="Введите новый язык"
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Цена</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="Введите новую цену"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отменить изменения
          </Button>
          <Button onClick={changeConfirmHandler} variant="primary">
            Применить изменения
          </Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Описание</th>
            <th>Дата начала</th>
            <th>Дата окончания</th>
            <th>Страна</th>
            <th>Область</th>
            <th>Язык</th>
            <th>Стоимость</th>
            <th>Проверено</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => {
            return (
              <CourseRow
                internship_id={course.internship_id}
                name={course.name}
                description={course.description}
                startDate={course.startDate}
                finishDate={course.finishDate}
                country={course.country}
                subject={course.subject}
                language={course.language}
                price={course.price}
                checked={course.checked}
                onDelete={deleteCourse}
                onEdit={editHandlerButton}
              />
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default Courses;
