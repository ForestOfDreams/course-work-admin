import "bootstrap/dist/css/bootstrap.min.css";
import ActionRow from "./ActionContainer";

const UserRow = (props) => {
  return (
    <tr>
      <td>{props.user_id}</td>
      <td>{props.username}</td>
      <td>{props.role}</td>
      <td>{props.name}</td>
      <td>{props.surname}</td>
      <td>{props.patronymic}</td>
      <td>{props.dayOfBirth}</td>
      <td>{props.email}</td>
      <td>{props.phone}</td>
      <ActionRow
        onDelete={props.onDelete}
        onEdit={props.onEdit}
        id={props.user_id}
      />
    </tr>
  );
};

export default UserRow;
