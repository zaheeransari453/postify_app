import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./EditPost.module.css";
// import { notificationSliceAction } from "../../store/Slices/notificationSlice";

const EditPost = ({ setIsEditFormOpen, editingPost, handleEditSubmit }) => {
  const [title, setTitle] = useState(editingPost.title);
  const [body, setBody] = useState(editingPost.body);
//   const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPost = { ...editingPost, title: title, body: body };

    handleEditSubmit(updatedPost);

    setIsEditFormOpen(false);
  };

  return (
    <div className={`${styles.overlay} overlay`}>
      <div className={`${styles.dialog} dialog`}>
        <div className=" container text-center mt-5">
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div
                className={`modal-content border-0 `}
                style={{ background: "#040B09" }}
              >
                <div
                  className={`modal-header text-white border-0 ${styles.CustomDialogBackground}`}
                >
                  <h5 className="modal-title">Edit Post</h5>
                </div>
                <div className={`modal-body text-white ${styles.dialogBox}`}>
                  <label htmlFor="title" className={styles.label}>
                    Post Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="w-100"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  <label htmlFor="body" className="mt-4">
                    Post Body
                  </label>
                  <textarea
                    id="body"
                    className="w-100"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows="5"
                    required
                  ></textarea>
                </div>
                <div
                  className={`modal-footer border-0 ${styles.dialogBox}`}
                  style={{ background: "#030406" }}
                >
                  <button
                    className={`btn btn-secondary`}
                    onClick={() => setIsEditFormOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`${styles.confirmBtn} Btn`}
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
