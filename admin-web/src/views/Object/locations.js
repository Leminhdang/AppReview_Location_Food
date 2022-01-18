import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import React, { useState } from "react";
import axios from "axios";

const deleteItem = (id) => {
  axios({
    method: "POST",
    url: "http://localhost:8080/location/deleteLocation",
    data: { id },
    timeout: 5000,
  }).catch((err) => console.log(err));
  window.location.reload();
};

const Render = (data) => {
  const [modal, setModal] = React.useState(false);

  // Toggle for Modal
  const toggle = () => setModal(!modal);
  return (
    <tr>
      <th scope="row">
        <Media className="align-items-center">
          {/* <a
              className="avatar rounded-circle mr-3"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            > */}
          <img
            alt="..."
            src={data.image_url}
            style={{ width: 48, height: 48, marginRight: 8, borderRadius: 8 }}
          />
          {/* </a> */}
          <Media>
            <span className="mb-0 text-sm">{data.name}</span>
          </Media>
        </Media>
      </th>
      <td>
        <a style={{ width: 100 }}>{data.address}</a>
      </td>
      <td>{data.phone}</td>
      <td>{data.rating}⭐</td>
      <td className="text-right">
        <UncontrolledDropdown>
          <DropdownToggle
            className="btn-icon-only text-light"
            href="#pablo"
            role="button"
            size="sm"
            color=""
            onClick={(e) => e.preventDefault()}
          >
            <i className="fas fa-ellipsis-v" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-arrow" right>
            <DropdownItem href="#pablo" onClick={toggle}>
              <span className="text-red">Xóa địa điểm</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <div>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Xóa địa điểm</ModalHeader>
            <ModalBody>Bạn có chắc muốn xóa địa điểm này không?</ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => deleteItem(data.id)}>
                Có
              </Button>
              <Button color="#ddd" onClick={toggle}>
                Không
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </td>
    </tr>
  );
};
export default Render;
