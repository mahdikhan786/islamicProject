import { useState, useEffect } from "react";
import styles from "./deleteprofile.module.css";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function DeleteProfile({ language, getData, id }) {
  const [appLang, setAppLang] = useState("eng");
  const [modalState, setModalState] = useState(false);
  const [systemResponse, setSystemResponse] = useState(null);
const [waiting,setWating] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    setAppLang(language);
  }, [language]);



  const handleSubmit = () => {
    let password1Elem = document.querySelector("#profilepassword");

    if (password1Elem.value.length < 1) {
      setSystemResponse({
        response: `${password1Elem.placeholder} ${
          appLang == "eng" ? "is mandatory" : "لازمی ہے"
        }`,
        colorCode: "#f83a3d",
      });
    } else {
      setSystemResponse(null);
      const deleteProfile = async () => {
        try {
      setWating(true);
          const response = await axios({
            method: "delete",
            url: `https://islamicprojectbackend.herokuapp.com/profile/${id}`,
            data: {"password":`${password}`},
          });
          setWating(false);
          if(response.data === 'wrong password'){
            setSystemResponse({ response: response.data, colorCode: "#f83a3d" });

          } else{
            setSystemResponse({ response: response.data, colorCode: "#30ca09" });
            getData();
            setTimeout(() => {
              setModalState(false);
              clearModalData();
            }, 1000);
          }
        } catch (error) {
          console.log(error);
        }
      };
      deleteProfile();
    }
  };
  const clearModalData = () => {
    setPassword("");

    setSystemResponse("");
    document.getElementsByTagName("body")[0].style.overflow = "visible";
  };
  return (
    <div>
      {!modalState ? (
        <button
          onClick={() => {
            setModalState(true);
            document.getElementsByTagName("body")[0].style.overflow = "hidden";
          }}
          className={`${styles.modaltogglerbtn}  ${styles.rmovebtnstyle}`}
        >
           <img className={styles.deleteIcon} src='/delete.svg' alt='edit icon' />
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
              {appLang == "eng" ? "Verify Password" : "نیا شخص شامل کریں"}
            </h4>

            <div
              className={`${styles.inputOption} ${
                appLang == "eng" ? "" : styles.inputOptionUrdu
              }`}
            >
              <label htmlFor="profilepassword" className={styles.label}>
                {appLang == "eng" ? "Password:" : ":پاس ورڈ"}
              </label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                name={"password"}
                value={password}
                id="profilepassword"
                className={`${styles.input} ${
                  appLang == "eng" ? "" : styles.inputUrdu
                }`}
                type="password"
                placeholder={appLang == "eng" ? "Password" : "پاس ورڈ"}
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
