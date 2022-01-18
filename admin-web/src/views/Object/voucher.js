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
import axios from "axios";
import React, { useState } from "react";
import EditVoucher from "../Object/EditVoucher.js";

const deleteItem = (id) => {
  axios({
    method: "POST",
    url: "http://localhost:8080/voucher/deleteVoucher",
    data: { id },
    timeout: 5000,
  }).catch((err) => console.log(err));
  window.location.reload();
};

const Render = (data) => {
  // Modal open state
  const [modal, setModal] = React.useState(false);
  var str = data.detail;

  // Toggle for Modal
  const toggle = () => setModal(!modal);
  let expiry_date = new Date(data.expiry_date);
  let create_at = new Date(data.create_at);

  const [show, setShow] = useState(false);

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
            src={data.voucher_image}
            style={{ width: 48, height: 48, marginRight: 8, borderRadius: 8 }}
          />
          {/* </a> */}
          <Media>
            <span className="mb-0 text-sm">{data.title}</span>
          </Media>
        </Media>
      </th>
      <td style={{ wordBreak: "break-all", width: "40%" }}>
        <a>
          {str.slice(0, 40)}
          {"..."}
        </a>
      </td>
      <td>{data.TotalVoucher}</td>
      <td>{data.code}</td>

      <td>{create_at.toLocaleDateString()}</td>
      <td>{expiry_date.toLocaleDateString()}</td>
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
              <span className="text-red">Xóa voucher</span>
            </DropdownItem>
            {/* <DropdownItem href="#pablo" onClick={() => setShow(true)}>
              <span className="text-green">Cập nhật</span>
              {show && <EditVoucher classInfo={data} closeModal={setShow} />}
            </DropdownItem> */}
          </DropdownMenu>
        </UncontrolledDropdown>
        <div>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Xóa vouvher</ModalHeader>
            <ModalBody>Bạn có chắc muốn xóa voucher này không?</ModalBody>
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
