import React, { useState, useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import Context from "../context";

import OrganizationRow from "../Components/OrganizationRow";

const Organization = () => {
  const [organization, setOrganization] = useState([]);

  const fetchOrganizations = () => {};

  const updateOrganization = () => {};

  const deleteOrganization = () => {};

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Описание</th>
          <th>Сайт</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <OrganizationRow />
      </tbody>
    </Table>
  );
};

export default Organization;
