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

// const deleteItem = (id) => {
//   axios({
//     method: "POST",
//     url: "http://localhost:8080/post/deletePosts",
//     data: { id },
//     timeout: 5000,
//   }).catch((err) => console.log(err));
//   window.location.reload();
// };

const Render = (data) => {
  // Modal open state
  const [modal, setModal] = React.useState(false);
  var str = data.content;
  var title = data.title;
  console.log(data);
  // Toggle for Modal
  const toggle = () => setModal(!modal);
  let create_at = new Date(data.create_at);
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
            <span className="mb-0 text-sm">
              {title.slice(0, 30)}
              {"..."}
            </span>
          </Media>
        </Media>
      </th>
      <td style={{ wordBreak: "break-all", width: "40%" }}>
        <a>
          {str.slice(0, 40)}
          {"..."}
        </a>
      </td>
      <td>{create_at.toLocaleDateString()}</td>
      <td>{data.TotalLikes}</td>
      <td>
        <img
          alt="..."
          className="rounded-circle"
          src={data.avatar}
          style={{ width: 40, height: 40, marginRight: 6 }}
        />
        <a>{data.fullname}</a>
      </td>
      {/* <td className="text-right">
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
              Xóa bài viết
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <div>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Xóa bài viết</ModalHeader>
            <ModalBody>Bạn có chắc muốn xóa bài viết này không?</ModalBody>
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
      </td> */}
    </tr>
  );
};
export default Render;
