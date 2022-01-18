import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
} from "reactstrap";
import axios from "axios";
import ReObj from "./Object/post_report.js";
import Header from "components/Headers/Header.js";
import { useState } from "react/cjs/react.development";
import { useEffect } from "react";

const Index = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = () => {
      axios({
        method: "POST",
        url: "http://localhost:8080/admin/getPostReport",
        timeout: 5000,
      })
        .then((response) => setData(response.data.data))
        .catch((err) => console.log(err));
    };
    getData();
  }, []);
  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Bài viết bị báo cáo</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Bài viết</th>
                    <th scope="col">Nội dung báo cáo</th>
                    <th scope="col">Nguyên nhân</th>
                    <th scope="col">Ngày báo cáo</th>
                    <th scope="col">Người báo cáo</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? data.map((e) => <ReObj {...e} />) : <></>}
                </tbody>
              </Table>
              {/* <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter> */}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Index;
