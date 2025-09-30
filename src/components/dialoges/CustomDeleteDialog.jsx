import React, { useContext } from "react";
import styles from "./CustomDeleteDialog.module.css";

const CustomDeleteDialog = ({
  dialogPayload,
  OnConfirmDelete,
  onCancelDelete,
}) => {
  return (
    <>
      <div className={`${styles.overlay}`}>
        <div className={`${styles.dialog}`}>
          <div className=" container text-center mt-5">
            <div className="modal show d-block" tabIndex="-1" role="dialog">
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div
                  className={`modal-content border-0 `}
                  style={{ background: "#040B09" }}
                >
                  <div
                    className={`modal-header text-white border-0 ${styles.CustomDialogBackground}`}
                  >
                    <h5 className="modal-title">{dialogPayload.title}</h5>
                  </div>
                  <div className={`modal-body text-white ${styles.dialogBox}`}>
                    <p>{dialogPayload.message}</p>
                  </div>
                  <div className={`modal-footer border-0 ${styles.dialogBox}`}>
                    <button
                      className={`btn btn-secondary`}
                      onClick={onCancelDelete}
                    >
                      Cancel
                    </button>
                    <button
                      className={`${styles.confirmBtn} Btn`}
                      onClick={OnConfirmDelete}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="overlay">
        <div className="dialog">
          <div className="diaLogButtons"></div>
        </div>
      </div> */}
    </>
  );
};

export default CustomDeleteDialog;
