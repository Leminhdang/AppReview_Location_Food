import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import UploadImage from "./components/UploadImage";

// reactstrap components
import { Button, FormGroup, Form, Input, Modal, Label } from "reactstrap";
import { storage } from "./components/firebase";

const Modals = ({ closeModal, classInfo }) => {
  // const [state, setState] = useState(false);
  let state = closeModal;
  const data = classInfo;

  console.log(data);
  const create = data.expiry_date;

  const [progress, setProgess] = useState("");
  const [date, setDate] = useState(create);
  // const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState([]);
  const [title, setTitle] = useState(data.title);
  const [detail, setDetail] = useState(data.detail);
  const [coins, setCoins] = useState(data.coins);
  const [code, setCode] = useState(data.code);
  const [amount, setAmount] = useState(data.amount_used);
  const [picture, setPicture] = useState(data.voucher_image);
  const [imgData, setImgData] = useState(data.voucher_image);
  const onChangePicture = (e) => {
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
    if (!picture) return;
    const storageRef = ref(storage, `Images/${picture.name}`);
    const uploadTask = uploadBytesResumable(storageRef, picture);

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
          editVoucher(imageUrl);
        });
      }
    );
  };

  const editVoucher = async (imageUrl) => {
    const dat = {
      id: data.id,
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
      url: "http://localhost:8080/voucher/editVoucher",
      data: dat,
      timeout: 5000,
    })
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
    window.location.reload();
  };
  console.log(data);

  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={state}
        toggle={() => closeModal(false)}
      >
        <div className="modal-header">
          <h1 className="modal-title" id="exampleModalLabel">
            Sửa Voucher
          </h1>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => closeModal(false)}
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
                value={title}
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
                value={detail}
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
                defaultValue={formatDate(date)}
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
                value={code}
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
                value={amount}
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
                value={coins}
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
            {/* <FormGroup>
              <Label for="gender">Hình quán</Label>
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
            </FormGroup> */}
          </Form>
        </div>
        <div className="modal-footer">
          <Button color="primary" type="button" onClick={upload}>
            Sửa
          </Button>
        </div>
      </Modal>
    </>
  );
};

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export default Modals;
