import { useState, useEffect } from "react";
import styles from "./addpeople.module.css";
import axios from 'axios';

export default function AddPeople({getData}) {
  const [modalState, setModalState] = useState(false);
  const [profileData, setProfileData] = useState(false);
  const [systemResponse, setSystemResponse] = useState(null);
  const [serverResponse,setServerResponse] = useState(false);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [occupation, setOccupation] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  useEffect(() => {
    console.log(profileData);
    if(profileData){
      const postProfileData = async () => {
        try{
          const response = await axios({
            method:'post',
            url:'https://islamicprojectbackend.herokuapp.com/profile/add',
            data:profileData,
          })
          setServerResponse(response)
          setSystemResponse({response:response.data,colorCode:'#30ca09'})
          getData()
          setTimeout(() => {
            setModalState(false);
            clearModalData();
          },1000);
          console.log(response);
        } catch (error) {
          console.log(error)
        }
      }
      postProfileData();
    }

  }, [profileData]);

  const handleSubmit = () => {
    let nameElem = document.querySelector("#profilename");
    let bioElem = document.querySelector("#profilebio");
    let phoneNoElem = document.querySelector("#profilephone");
    let occupationElem = document.querySelector("#profileoccupation");
    let addressElem = document.querySelector("#profileaddress");
    let password1Elem = document.querySelector("#profilepassword");
    let password2Elem = document.querySelector("#confirmprofilepassword");
    let emptyInputBox = [
      nameElem,
      bioElem,
      phoneNoElem,
      occupationElem,
      addressElem,
      password1Elem,
    ].filter((elem) => {
      if (elem.value.length < 1) {
        return elem;
      }
    });
    console.log(emptyInputBox);
    if (emptyInputBox.length > 0) {
      setSystemResponse({response:`${emptyInputBox[0].name} cannot be empty.`,colorCode:'#f83a3d'});
    } else if (phoneNoElem.value.length != 10) {
      console.log("phonelength", phoneNoElem.value.length);
      setSystemResponse({response:"Phone No. must be 10 digits",colorCode:'#f83a3d'});
    } else if (password1Elem.value !== password2Elem.value) {
      setSystemResponse({response:"Passwords did not match !",colorCode:'#f83a3d'});
    } else {
      setSystemResponse(null);
      setProfileData({
        name,
        bio,
        phone,
        occupation,
        address,
        password,
      });

    }
  };

  const clearModalData = () => {
    setName('');
    setBio('');
    setPhone('');
    setAddress('');
    setOccupation('');
    setPassword('')
    setConfirmPassword('')
    setSystemResponse('')
    document.getElementsByTagName("body")[0].style.overflow =
      "visible";
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
          Add People
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
            <h4 className={styles.heading}>Add People</h4>

            <div className={styles.inputOption}>
              <label htmlFor="profilename" className={styles.label}>
                Name:{" "}
              </label>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                name={"name"}
                value={name}
                id="profilename"
                className={styles.input}
                type="text"
                placeholder="Name"
                maxLength="20"
              />
            </div>

            <div className={styles.inputOption}>
              <label htmlFor="profilebio" className={styles.label}>
                Bio:{" "}
              </label>
              <input
                onChange={(e) => {
                  setBio(e.target.value);
                }}
                name={"bio"}
                value={bio}
                id="profilebio"
                className={styles.input}
                type="text"
                placeholder="Bio (max 100 characters)"
                maxLength="100"
              />
            </div>

            <div className={styles.inputOption}>
              <label htmlFor="profilephone" className={styles.label}>
                Phone No.:{" "}
              </label>
              <input
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                name={"phone No."}
                value={phone}
                id="profilephone"
                className={styles.input}
                type="tel"
                placeholder="Phone No."
                maxLength="10"
              />
            </div>

            <div className={styles.inputOption}>
              <label htmlFor="profileoccupation" className={styles.label}>
                Occupation:{" "}
              </label>
              <select
              defaultValue={''}
                onChange={(e) => {
                  setOccupation(e.target.value);
                }}
                name={"occupation"}
                id="profileoccupation"
                className={styles.input}
              >
                <option value="molana">Molana</option>
                <option value="Naoha-khwan">Naoha Khwan</option>
                <option value="soz-khwan">Soz Khwan</option>
                <option value="" disabled>
                  {" "}
                </option>
              </select>
            </div>

            <div className={styles.inputOption}>
              <label htmlFor="profileaddress" className={styles.label}>
                Address:{" "}
              </label>
              <input
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                name={"address"}
                value={address}
                id="profileaddress"
                className={styles.input}
                type="text"
                placeholder="Address"
                maxLength="50"
              />
            </div>

            <div className={styles.inputOption}>
              <label htmlFor="profilepassword" className={styles.label}>
                Password:{" "}
              </label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                name={"password"}
                value={password}
                id="profilepassword"
                className={styles.input}
                type="password"
                placeholder="Password"
                maxLength="15"
              />
            </div>

            <div className={styles.inputOption}>
              <label htmlFor="confirmprofilepassword" className={styles.label}>
                Confirm password:{" "}
              </label>
              <input
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              value={confirmPassword}
                name={"Confirm password"}
                id="confirmprofilepassword"
                className={styles.input}
                type="password"
                placeholder="Confirm Password"
                maxLength="15"
              />
            </div>
            {systemResponse ? (
              <p style={{color:`${systemResponse.colorCode}`,fontSize:' 0.7rem'}}>{`*${systemResponse.response}`}</p>
            ) : (
              ""
            )}
            <div className={`${styles.submit} ${styles.inputOption}`}>
              <button
                onClick={() => handleSubmit()}
                className={`${styles.rmovebtnstyle} ${styles.submitbtn}`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
