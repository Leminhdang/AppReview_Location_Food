import React, { useState } from "react";
import { FormGroup, Input } from "reactstrap";

const UploadImage = () => {
  const [image, setImage] = useState("");
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0].name);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <FormGroup>
      <Input
        type="file"
        name={image}
        accept=".jpg,.png,.jpeg"
        onChange={(e) => {
          onChangePicture(e);
        }}
      ></Input>
      {imgData ? (
        <img
          src={imgData}
          style={{ width: 100, height: 100, borderRadius: 10, marginTop: 5 }}
        />
      ) : (
        <></>
      )}
    </FormGroup>
  );
};

export default UploadImage;
