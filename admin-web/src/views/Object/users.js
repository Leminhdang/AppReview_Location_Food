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
import React from "react";
import axios from "axios";

const updateStatus = (id) => {
  axios({
    method: "POST",
    url: "http://localhost:8080/account/updateStatus",
    data: { id },
    timeout: 5000,
  }).catch((err) => console.log(err));
  window.location.reload();
};





const Render = (data) => {
  console.log(data);
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
            src={data.avatar}
            style={{ width: 48, height: 48, marginRight: 8, borderRadius: 90 }}
          />
          {/* </a> */}
          <Media>
            <span className="mb-0 text-sm">{data.fullname}</span>
          </Media>
        </Media>
      </th>
      <td>
        <a style={{ width: 100 }}>{data.information}</a>
      </td>
      <td>{data.level}</td>
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
              Vô hiệu hóa
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <div>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Vô hiệu hóa người dùng</ModalHeader>
            <ModalBody>Bạn có muốn vô hiệu hóa người dùng <h3>{data.fullname}</h3></ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => updateStatus(data.identity_id)}>
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
