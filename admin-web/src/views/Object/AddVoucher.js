import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import UploadImage from "./components/UploadImage";

// reactstrap components
import { Button, FormGroup, Form, Input, Modal, Label } from "reactstrap";
import { storage } from "./components/firebase";

const Modals = () => {
  const [state, setState] = useState(false);
  const [progress, setProgess] = useState("");
  const [date, setDate] = useState("");
  // const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState([]);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [coins, setCoins] = useState("");
  const [code, setCode] = useState("");
  const [amount, setAmount] = useState("");
  const [picture, setPicture] = useState([]);
  const [imgData, setImgData] = useState([]);
  const onChangePicture = (e) => {
    // for (let i = 0; i < e.target.files.length; i++) {
    //   const newImage = e.target.files[i];
    //   newImage["id"] = Math.random();
    //   setPicture((prevState) => [...prevState, newImage]);
    if (e.target.files[0]) {
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const upload = async () => {
    // const promises = [];
    // picture.map((image) => {
    if (!picture) return;
    const storageRef = ref(storage, `Images/${picture.name}`);
    const uploadTask = uploadBytesResumable(storageRef, picture);
    // promises.push(uploadTask);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.bytesTransferred) * 100
        );
        setProgess(prog);
      },
      (err) => console.log(err),
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((imageUrl) => {
          // setImageUrl((prevState) => [...prevState, imageUrl]);
          addVoucher(imageUrl);
          // console.log(imageUrl);
        });
      }
    );
    // });
  };

  const addVoucher = async (imageUrl) => {
    const data = {
      title: title,
      detail: detail,
      amount: coins,
      amount_used: amount,
      code: code,
      expiry_date: date,
      store_image: imageUrl,
      voucher_image: imageUrl,
    };
    await axios({
      method: "POST",
      url: "http://localhost:8080/voucher/createVoucher",
      data: data,
      timeout: 5000,
    })
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
    window.location.reload();
  };

  return (
    <>
      {/* Button trigger modal */}
      <Button
        color="primary"
        type="button"
        className="float-right"
        onClick={() => setState(!state)}
      >
        Thêm Voucher
      </Button>

      {/* Modal */}
      <Modal
        className="modal-dialog-centered"
        isOpen={state}
        toggle={() => setState(!state)}
      >
        <div className="modal-header">
          <h1 className="modal-title" id="exampleModalLabel">
            Thêm Voucher
          </h1>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setState(!state)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <Form>
            <FormGroup>
              <Label for="className">Tên Voucher</Label>
              <Input
                type="text"
                name="className"
                id="className"
                placeholder="Tên voucher"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="gender">Chi tiết voucher</Label>
              <Input
                type="text"
                name="gender"
                id="gender"
                placeholder="Chi tiết voucher"
                onChange={(e) => {
                  setDetail(e.target.value);
                }}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="gender">Hạn</Label>
              <Input
                type="date"
                name="date"
                id="gender"
                placeholder="Hạn"
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="gender">Mã code</Label>
              <Input
                type="text"
                name="gender"
                id="gender"
                placeholder="Mã code"
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="gender">Số lượng sử dụng</Label>
              <Input
                type="number"
                name="gender"
                id="gender"
                placeholder="Số lượng"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="gender">Số xu</Label>
              <Input
                type="number"
                name="gender"
                id="gender"
                placeholder="Số coins"
                onChange={(e) => {
                  setCoins(e.target.value);
                }}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="gender">Hình voucher</Label>
              <Input
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={onChangePicture}
              ></Input>
              {imgData ? (
                <img
                  src={imgData}
                  style={{ width: 100, height: 100, borderRadius: 8 }}
                />
              ) : (
                <></>
              )}
            </FormGroup>
          </Form>
        </div>
        <div className="modal-footer">
          <Button color="primary" type="button" onClick={upload}>
            Thêm
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Modals;
