import "bootstrap/dist/css/bootstrap.min.css";

import ActionRow from "./ActionContainer";

const OrganizationRow = (props) => {
  return (
    <tr>
      <td>{props.organization_id}</td>
      <td>{props.name}</td>
      <td>{props.description}</td>
      <td>{props.reference}</td>
      <ActionRow />
    </tr>
  );
};

export default OrganizationRow;
