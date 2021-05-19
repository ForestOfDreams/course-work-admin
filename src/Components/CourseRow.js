import "bootstrap/dist/css/bootstrap.min.css";

import ActionRow from "./ActionContainer";

const CourseRow = (props) => {
  return (
    <tr>
      <td>{props.internship_id}</td>
      <td>{props.name}</td>
      <td>{props.description}</td>
      <td>{props.startDate}</td>
      <td>{props.finishDate}</td>
      <td>{props.country}</td>
      <td>{props.subject}</td>
      <td>{props.language}</td>
      <td>{props.price}</td>
      <td>{props.checked ? "Да" : "Нет"}</td>
      <ActionRow
        onDelete={props.onDelete}
        onEdit={props.onEdit}
        id={props.internship_id}
      />
    </tr>
  );
};

export default CourseRow;
