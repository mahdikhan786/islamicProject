import { useState, useEffect } from "react";
import styles from "./editprofile.module.css";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";


export default function EditPeople({ data, language, getData }) {
  const [appLang, setAppLang] = useState("eng");
  const [modalState, setModalState] = useState(false);
  const [profileData, setProfileData] = useState(false);
  const [waiting,setWaiting] = useState(false);
  const [systemResponse, setSystemResponse] = useState(null);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [occupation, setOccupation] = useState("");
  const [address, setAddress] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const prefillData = () => {
    setName(data.name);
    setBio(data.bio);
    setPhone(data.phone);
    setOccupation(data.occupation);
    setAddress(data.address);
  }
  useEffect(() => {
  prefillData()
  }, []);
  useEffect(() => {
    setAppLang(language);
  }, [language]);
  useEffect(() => {
    if (profileData) {
      const updateProfileData = async () => {
        setWaiting(true);
        try {
          const response = await axios({
            method: "post",
            url: `http://localhost:5000/profile/update/${data._id}`,  //`http://islamicprojectbackend.herokuapp.com/profile/update/${data._id}`
            data: profileData,
          });
          setWaiting(false)
          setSystemResponse({ response: response.data, colorCode: "#30ca09" });
          getData();
          setTimeout(() => {
            setModalState(false);
            clearModalData();
          }, 1000);
        } catch (error) {
          setWaiting(false);
          console.log(error);
          setSystemResponse({response:error.response.data,colorCode : '#f83a3d'})
        }
      };
      updateProfileData();
    }
  }, [profileData]);
  let nameElem = document.querySelector("#profilename");
  let bioElem = document.querySelector("#profilebio");
  let phoneNoElem = document.querySelector("#profilephone");
  let occupationElem = document.querySelector("#profileoccupation");
  let addressElem = document.querySelector("#profileaddress");
  let currentPasswordElem = document.querySelector("#profileCurrentpassword");
  const inputElements = [
    nameElem,
    bioElem,
    phoneNoElem,
    occupationElem,
    addressElem,
    currentPasswordElem,
  ];

  const handleSubmit = () => {
    let emptyInputBox = inputElements.filter((elem) => {
      if (elem.value.length < 1) {
        return elem;
      }
    });
    if (emptyInputBox.length > 0) {
      setSystemResponse({
        response: `${emptyInputBox[0].placeholder} ${
          appLang == "eng" ? "is mandatory" : "لازمی ہے"
        }`,
        colorCode: "#f83a3d",
      });
    } else if (phoneNoElem.value.length != 10) {
      setSystemResponse({response:`${appLang == 'eng' ? 'Phone no. must be 10 digits':'فون نمبر 10 نمبر کا ہونا ضروری ہے'}`,colorCode:'#f83a3d'});

    }else if(phoneNoElem.value.match(/[^0-9]/g)){
      setSystemResponse({response:`${appLang == 'eng' ? 'Phone no. must be only numerical':'فون نمبر صرف عددی ہونا چاہئے'}`,colorCode:'#f83a3d'});

    } else {
      setSystemResponse(null);
      setProfileData({
        name,
        bio,
        phone,
        occupation,
        address,
        newPassword,
        currentPassword,
      });
    }
  };

  const clearModalData = () => {
    setName("");
    setBio("");
    setPhone("");
    setAddress("");
    setOccupation("");
    setNewPassword("");
setCurrentPassword("")
    setSystemResponse("");

  };
  return (
    <div>
      {!modalState ? (
        <button
          onClick={() => {
            setModalState(true);
            prefillData();
          }}
          className={`${styles.modaltogglerbtn}  ${styles.rmovebtnstyle}`}
        >
          <img
            className={styles.editIcon}
            src="/editProfile.svg"
            alt="edit icon"
          />
        </button>
      ) : (
        <div className={styles.modalcontainer}>
          <div className={styles.modal}>
            <button
              onClick={() => {
                setModalState(false);
                clearModalData();
              }}
              className={`${styles.rmovebtnstyle}  ${styles.closebtn}`}
            >
              X
            </button>
            <h4 className={styles.heading}>
              {appLang == "eng" ? "Edit profile" : "اصلاح کریںں"}
            </h4>

            <div
              className={`${styles.inputOption} ${
                appLang == "eng" ? "" : styles.inputOptionUrdu
              }`}
            >
              <label htmlFor="profilename" className={styles.label}>
                {appLang == "eng" ? "Name:" : ":نام"}
              </label>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                name={"name"}
                value={name}
                id="profilename"
                className={`${styles.input} ${
                  appLang == "eng" ? "" : styles.inputUrdu
                }`}
                type="text"
                placeholder={appLang == "eng" ? "Name" : "نام"}
                maxLength="20"
              />
            </div>

            <div
              className={`${styles.inputOption} ${
                appLang == "eng" ? "" : styles.inputOptionUrdu
              }`}
            >
              <label htmlFor="profilebio" className={styles.label}>
                {appLang == "eng" ? "Bio:" : ":سیرت"}
              </label>
              <input
                onChange={(e) => {
                  setBio(e.target.value);
                }}
                name={"bio"}
                value={bio}
                id="profilebio"
                className={`${styles.input} ${
                  appLang == "eng" ? "" : styles.inputUrdu
                }`}
                type="text"
                placeholder={appLang == "eng" ? "Bio" : "سیرت"}
                maxLength="100"
              />
            </div>

            <div
              className={`${styles.inputOption} ${
                appLang == "eng" ? "" : styles.inputOptionUrdu
              }`}
            >
              <label htmlFor="profilephone" className={styles.label}>
                {appLang == "eng" ? "Phone no.:" : ":فون نمبر"}
              </label>
              <input
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                name={"phone No."}
                value={phone}
                id="profilephone"
                className={`${styles.input} ${
                  appLang == "eng" ? "" : styles.inputUrdu
                }`}
                type="tel"
                placeholder={appLang == "eng" ? "Phone no." : "فون نمبر"}
                maxLength="10"
              />
            </div>

            <div
              className={`${styles.inputOption} ${
                appLang == "eng" ? "" : styles.inputOptionUrdu
              }`}
            >
              <label htmlFor="profileoccupation" className={styles.label}>
                {appLang == "eng" ? "Occupation:" : ":عنوان"}
              </label>
              <select
                defaultValue={occupation}
                onChange={(e) => {
                  setOccupation(e.target.value);
                }}
                name={"occupation"}
                id="profileoccupation"
                className={`${styles.input} ${
                  appLang == "eng" ? "" : styles.inputUrdu
                }`}
              >
                <option value="molana">
                  {appLang == "eng" ? "Molana" : "مولا نا"}
                </option>
                <option value="Naoha-khwan">
                  {appLang == "eng" ? "Naoha Khwan" : "نوحہ خوان"}
                </option>
                <option value="soz-khwan">
                  {appLang == "eng" ? "Soz Khwan" : "سوز خوان"}
                </option>
              </select>
            </div>

            <div
              className={`${styles.inputOption} ${
                appLang == "eng" ? "" : styles.inputOptionUrdu
              }`}
            >
              <label htmlFor="profileaddress" className={styles.label}>
                {appLang == "eng" ? "Address:" : ":پتہ"}
              </label>
              <input
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                name={"address"}
                value={address}
                id="profileaddress"
                className={`${styles.input} ${
                  appLang == "eng" ? "" : styles.inputUrdu
                }`}
                type="text"
                placeholder={appLang == "eng" ? "Address" : "پتہ"}
                maxLength="50"
              />
            </div>
            <div
              className={`${styles.inputOption} ${
                appLang == "eng" ? "" : styles.inputOptionUrdu
              }`}
            >
              <label htmlFor="updateProfilepassword" className={styles.label}>
                {appLang == "eng" ? "New password:" : ": نیا پاس ورڈ"}
              </label>
              <input
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                name={"updateProfilepassword"}
                value={newPassword}
                id="updateProfilepassword"
                className={`${styles.input} ${
                  appLang == "eng" ? "" : styles.inputUrdu
                }`}
                type="password"
                placeholder={
                  appLang == "eng" ? "new password (optional)" : " (نیا پاس ورڈ (اختیاری"
                }
                maxLength="15"
              />
            </div>
            <div>
              <p className={styles.verificationHeading}>
                {appLang === "eng"
                  ? "Enter your current password to update this profile"
                  : "اس پروفائل کو اپ ڈیٹ کرنے کے لئے اپنا موجودہ پاس ورڈ درج کریں"}
              </p>
            </div>

            <div
              className={`${styles.inputOption} ${
                appLang == "eng" ? "" : styles.inputOptionUrdu
              }`}
            >
              <input
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                }}
                name={"password"}
                value={currentPassword}
                id="profileCurrentpassword"
                className={`${styles.input} ${
                  appLang == "eng" ? "" : styles.inputUrdu
                }`}
                type="password"
                placeholder={
                  appLang == "eng" ? "Current password" : " موجودہ پاس ورڈ "
                }
                maxLength="15"
              />
            </div>
{waiting ? <CircularProgress /> : ""}
            {systemResponse ? (
              <p
                style={{
                  color: `${systemResponse.colorCode}`,
                  fontSize: " 0.7rem",
                }}
              >{`${systemResponse.response}`}</p>
            ) : (
              ""
            )}
            <div className={`${styles.submit} ${styles.inputOption}`}>
              <button
                onClick={() => handleSubmit()}
                className={`${styles.rmovebtnstyle} ${styles.submitbtn}`}
              >
                {appLang == "eng" ? "Submit" : "جمع کرائیں"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
