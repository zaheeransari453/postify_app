import styles from "./Registration.module.css";

import { SiGnuprivacyguard } from "react-icons/si";
import RegistrationForm from "../features/Auth/RegistrationForm";

const Registration = () => {
  return (
    <div className={` ${styles.registrationBackground} vh-100`}>
      <div className="row  d-flex  h-100 align-items-center justify-content-center">
        <div
          className={`col-md-6 d-flex flex-column align-items-center  justify-content-center gap-md-4 gap-3 ${styles.leftRegistration}`}
        >
          <SiGnuprivacyguard className="display-1 " />

          <h1 className="text-center">Registration Form</h1>
        </div>
        <div
          className={`col-md-6 d-flex align-items-center  justify-content-center px-5  ${styles.rightRegistration}`}
        >
          <RegistrationForm></RegistrationForm>
        </div>
      </div>
    </div>
  );
};

export default Registration;
