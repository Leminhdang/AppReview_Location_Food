/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
// core components
import React, { useState } from "react";
import UserHeader from "components/Headers/UserHeader.js";
import { useLocation, useHistory } from "react-router-dom";

import axios from "axios";

const Details = () => {
  const history = useHistory();
  const [modalOpen, setModalOpen] = React.useState(false);
  const location = useLocation();
  const data = location?.state?.data;
  const dateCreate = new Date(data?.create_at);

  const deleteItem = (id) => {
    axios({
      method: "POST",
      url: "http://localhost:8080/post/deletePosts",
      data: { id },
      timeout: 5000,
    }).catch((err) => console.log(err));
    history.goBack();
  };

  console.log(data);

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={data?.avatar}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between"></div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      {/* <div>
                                                <span className="heading">200</span>
                                                <span className="description">Coins</span>
                                            </div>
                                            <div>
                                                <span className="heading">2</span>
                                                <span className="description">Levels</span>
                                            </div>
                                            <div>
                                                <span className="heading">50</span>
                                                <span className="description">Exp</span>
                                            </div> */}
                    </div>
                  </div>
                </Row>
                <div>
                  <h3>Người báo cáo: {data?.fullname}</h3>
                  <h3>Lý do báo cáo: {data?.cause}</h3>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Chi tiết bài đăng</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="danger"
                      onClick={() => setModalOpen(!modalOpen)}
                      size="sm"
                    >
                      Delete
                    </Button>
                    <div>
                      <Modal
                        toggle={() => setModalOpen(!modalOpen)}
                        isOpen={modalOpen}
                      >
                        <div className=" modal-header">
                          <h5 className=" modal-title" id="exampleModalLabel">
                            Xóa bài viết báo cáo
                          </h5>
                          <button
                            aria-label="Close"
                            className=" close"
                            type="button"
                            onClick={() => setModalOpen(!modalOpen)}
                          >
                            <span aria-hidden={true}>×</span>
                          </button>
                        </div>
                        <ModalBody>Bạn có muốn xóa không ?</ModalBody>
                        <ModalFooter>
                          <Button
                            color="secondary"
                            type="button"
                            onClick={() => setModalOpen(!modalOpen)}
                          >
                            Không
                          </Button>
                          <Button
                            color="primary"
                            onClick={() => deleteItem(data?.postId)}
                          >
                            Có
                          </Button>
                        </ModalFooter>
                      </Modal>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={data?.image_url}
                          style={{
                            width: 100,
                            height: 100,
                            marginRight: 8,
                            borderRadius: 90,
                          }}
                        />
                      </a>
                    </div>
                    <div className="text-center">
                      <h3>{data?.title}</h3>
                    </div>

                    <Table className="align-items-center" responsive>
                      <thead className="light">
                        <tr>
                          <th scope="col">Người bị báo cáo</th>
                          <th scope="col">{data?.peoplePost}</th>
                          <th scope="col" />
                          <th scope="col" />
                        </tr>
                        <tr>
                          <th scope="col">Vị trí</th>
                          <th scope="col">{data?.address}</th>
                          <th scope="col" />
                          <th scope="col" />
                        </tr>

                        <tr>
                          <th scope="col">Nội Dung</th>
                          <th scope="col">{data?.content_post}</th>
                          <th scope="col" />
                          <th scope="col" />
                        </tr>
                        <tr>
                          <th scope="col">Lượt thích</th>
                          <th scope="col">{data?.TotalLikes}</th>
                          <th scope="col" />
                          <th scope="col" />
                        </tr>
                        <tr>
                          <th scope="col">Ngày đăng</th>
                          <th scope="col">{dateCreate.toLocaleDateString()}</th>
                          <th scope="col" />
                          <th scope="col" />
                        </tr>
                      </thead>
                    </Table>
                  </div>
                </Row>
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Details;
