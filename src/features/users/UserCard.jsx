import React from "react";
import styles from "./UserCard.module.css";
import { useSelector } from "react-redux";

const UserCard = ({ onCardClick }) => {
  const { users, currentUser } = useSelector((store) => store.users);

  const handleOnCardClick = (userId) => {
    onCardClick(userId);
  };
  // console.log(users);
  return (
    <div className={`container-fluid pt-3 ${styles.userProfilePage}`}>
      <div className="row justify-content-center">
        {currentUser !== null &&
          users.map(
            (user) =>
              user.id !== currentUser.id && (
                <div className=" col-md-9 col-sm-10 col-12  mb-3" key={user.id}>
                  <div
                    className={`card p-3 ${styles.profileCard}`}
                    onClick={() => handleOnCardClick(user.id)}
                  >
                    <div className={styles.body}>
                      <div className="row justify-content-between align-items-center gap-1 gap-sm-0">
                        <div className="col-xl-4 col-md-5 col-4 text-center ">
                          <div className={styles.profileImage}>
                            <img
                              src={
                                user.profilePhoto ||
                                "https://bootdey.com/img/Content/avatar/avatar7.png"
                              }
                              alt="User Avatar"
                            />
                          </div>
                        </div>
                        <div className="ms-0 col-xl-8 col-md-7 col-7 ">
                          <h3 className={`mb-0 mt-md-1 mt-3 ${styles.name}`}>
                            {user.name}
                          </h3>
                          <p className={` ${styles.userName}`}>
                            {user.username || "NA"}
                          </p>
                          {/* <p className={`mb-1 ${styles.userEmail}`}>
                            <i className="fa fa-envelope"></i> {user.email}
                          </p>
                          <p className={styles.userPhone}>
                            <i className="fa fa-phone"></i> {user.phone || "NA"}
                          </p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default UserCard;
