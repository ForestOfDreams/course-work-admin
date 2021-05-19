import { Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ActionRow = (props) => {
  return (
    <ButtonGroup aria-label="Basic example" vertical>
      <Button variant="success" onClick={() => props.onEdit(props.id)}>
        Изменить
      </Button>
      <Button variant="danger" onClick={() => props.onDelete(props.id)}>
        Удалить
      </Button>
    </ButtonGroup>
  );
};

export default ActionRow;
