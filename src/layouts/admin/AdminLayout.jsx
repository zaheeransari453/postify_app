import { useState } from "react";

import styles from "./AdminLayout.module.css";
import { useNavigate } from "react-router-dom";

import { MdOutlineDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { GiCrossMark, GiCheckMark } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import CustomDeleteDialog from "../../components/dialoges/CustomDeleteDialog";
import { usersSliceActions } from "../../store/reducers/userSlice";
import { notificationSliceAction } from "../../store/reducers/notificationSlice";
import { PostsSliceActions } from "../../store/reducers/postsSlice";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { users } = useSelector((store) => store.users);
  const dispatch = useDispatch();

  const [editingUserId, setEditingUserId] = useState("");
  const [editingEmail, setEditingEmail] = useState("");
  const [editingPassword, setEditingPassword] = useState("");

  const handleEditClick = (id, email, password) => {
    setEditingUserId(id);
    setEditingEmail(email);
    setEditingPassword(password);
    // console.log(id, email, password);
  };
  const handleSaveEdit = () => {
    // console.log(editingUserId, editingEmail, editingPassword);
    dispatch(
      usersSliceActions.updateUser({
        id: editingUserId,
        email: editingEmail,
        password: editingPassword,
      })
    );
    dispatch(
      notificationSliceAction.showNotification({ message: "User Updated!" })
    );
    setEditingEmail("");
    setEditingPassword("");
    setEditingUserId("");
  };

  const handleOnLogoutButton = () => {
    dispatch(usersSliceActions.logoutUser());
    dispatch(
      notificationSliceAction.showNotification({ message: "Admin Loged out!" })
    );
    navigate("/login");
  };

  // Delete Item Dialog handling
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const dialogPayload = {
    title: "Confirm Deletion",
    message: "Are you sure you want to delete this user?",
  };
  const handleOnDeleteButton = (id) => {
    setUserToDelete(id); // Store the ID of the Todo to delete
    setDialogOpen(true); // Open the dialog
  };

  const OnConfirmDelete = () => {
    dispatch(usersSliceActions.deleteUser(userToDelete));
    dispatch(PostsSliceActions.deletePostsByUser(userToDelete));

    setDialogOpen(false); // Close the dialog
    setUserToDelete(null); // Clear the ID
    dispatch(
      notificationSliceAction.showNotification({ message: "User Deleted!" })
    );
  };
  const onCancelDelete = () => {
    setDialogOpen(false); // Close the dialog without deleting
    setUserToDelete(null); // Clear the ID
  };

  const handleMark = (id) => {
    dispatch(usersSliceActions.markUser(id));
  };
  const handleUnmark = (id) => {
    dispatch(usersSliceActions.unMarkUser(id));
  };
  // Show Password Icon Handling
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {dialogOpen && (
        <CustomDeleteDialog
          dialogPayload={dialogPayload}
          onCancelDelete={onCancelDelete}
          OnConfirmDelete={OnConfirmDelete}
        />
      )}
      <div className={`${styles.adminContainer} vh-100`}>
        <div className={`${styles.content}`}>
          <div className=" pt-5 container px-0  d-flex justify-content-end">
            <button className={` px-4  Btn`} onClick={handleOnLogoutButton}>
              Logout
            </button>
          </div>
          <h1 className="mt-4 text-center border-bottom fw-bold">
            Admin Dashboard
          </h1>
          {/* {!users.value && <h1 className="text-center mt-5 pt-5 ">Empty List</h1>} */}
          <div className={`${styles.recordContainer}`}>
            {users.map((user) => (
              <div className="container " key={user.id}>
                <div className="row gap-md-0 gap-1  my-md-4 my-5 ">
                  {editingUserId === user.id ? (
                    <>
                      <div className="col-md-1 text-center ">
                        <p className={`${styles.input}`}>{user.id}</p>
                      </div>
                      <div className="col-md-5">
                        <input
                          type="email"
                          value={editingEmail}
                          onChange={(e) => setEditingEmail(e.target.value)}
                          className={`${styles.input}`}
                        />
                      </div>
                      <div className="col-md-4">
                        <div
                          className="w-100"
                          style={{
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          <input
                            type={showPassword ? "text" : "password"}
                            value={editingPassword}
                            onChange={(e) => setEditingPassword(e.target.value)}
                            className={`${styles.input}`}
                            disabled
                          />
                          <span
                            onClick={togglePasswordVisibility}
                            className="fs-5 "
                            style={{
                              position: "absolute",
                              right: "10px",
                              top: "50%",
                              transform: "translateY(-60%)",
                              cursor: "pointer",
                            }}
                          >
                            {showPassword ? (
                              <IoEyeOutline className="text-white" />
                            ) : (
                              <IoEyeOffOutline className="text-white" />
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <button
                          className={`Btn  w-100 `}
                          onClick={() => handleSaveEdit(user.id)}
                        >
                          Save
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className={`col-md-6 d-flex  text-center ${
                          styles.recordField
                        } ${
                          user.status === "marked"
                            ? styles.marked
                            : styles.default
                        } ${
                          user.status === "unmarked"
                            ? styles.unmarked
                            : styles.default
                        }`}
                        style={{ minHeight: "3rem" }}
                      >
                        <div className="table-cell checkbox-cell d-flex justify-content-center align-items-center">
                          <div
                            className={`${styles.checkbox} ${
                              user.status === "marked"
                                ? styles.marked
                                : styles.default
                            } ${
                              user.status === "unmarked"
                                ? styles.unmarked
                                : styles.default
                            }`}
                          ></div>
                        </div>
                        <p className={`${styles.recordField} w-25  pt-3`}>
                          {user.id}
                        </p>
                        <p
                          className={`${styles.recordField} w-75 overflow-hidden  pt-3`}
                        >
                          {user.email}
                        </p>
                        <p className={` ${styles.recordField} w-25  pt-3`}>
                          {user.maskedPassword}
                        </p>
                      </div>

                      <div
                        className="col-md-6 d-flex gap-md-1 gap-2"
                        style={{ minHeight: "3rem" }}
                      >
                        <button
                          className={` w-25 ${styles.adminBtn}`}
                          onClick={() =>
                            handleEditClick(user.id, user.email, user.password)
                          }
                        >
                          <FaEdit />
                        </button>

                        <button
                          className={` w-25 ${styles.adminBtn}`}
                          onClick={() => handleOnDeleteButton(user.id)}
                        >
                          <MdOutlineDeleteForever />
                        </button>

                        <button
                          className={` w-25 ${styles.adminBtn}`}
                          onClick={() => handleMark(user.id)}
                        >
                          <GiCheckMark />
                        </button>

                        <button
                          className={` w-25 ${styles.adminBtn}`}
                          onClick={() => handleUnmark(user.id)}
                        >
                          <GiCrossMark />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
