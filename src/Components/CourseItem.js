import { Button, Card, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CourseItem = (props) => {
  //   console.log(props);
  const id = props.id;
  return (
    <Card className="w-100 text-center border-dark mb-3">
      <Card.Body className="text-dark">
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        <Card.Text>{props.startDate}</Card.Text>
        <Card.Text>{props.finishDate}</Card.Text>
        <Card.Text>{props.country}</Card.Text>
        <Card.Text>{props.subject}</Card.Text>
        <Card.Text>{props.language}</Card.Text>
        <Card.Text>{props.price}</Card.Text>
        <Card.Text>{props.score}</Card.Text>
        <Row>
          <Col>
            <Button variant="primary" onClick={() => props.toEdit(id)}>
              Изменить
            </Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={() => props.delete(id)}>
              Удалить
            </Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={() => props.delete(id)}>
              Отзывы
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CourseItem;
