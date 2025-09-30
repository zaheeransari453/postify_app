import styles from './SideBar.module.css';

import { FaCheck } from 'react-icons/fa6';
import { FaChevronLeft, FaChevronRight, FaEdit } from 'react-icons/fa';
import { RxCrossCircled } from 'react-icons/rx';
import { RxCross2 } from 'react-icons/rx';

import { MdBookmarks } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { handleDecrypt } from '../../../services/Encryption';
import { usersSliceActions } from '../../../store/reducers/userSlice';
import { notificationSliceAction } from '../../../store/reducers/notificationSlice';
import { logoutUserThunk } from '../../../store/thunks/usersThunks';
import CustomDeleteDialog from '../../../components/dialoges/CustomDeleteDialog';

const SideBar = ({ collapsed, setCollapsed, isVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((store) => store.users);
  const [originalPassword, setOrignalPassword] = useState('');
  const [userRecord, setUserRecord] = useState('');

  // const DEFAULT_PROFILE_AVATAR =
  //   "https://365webresources.com/wp-content/uploads/2016/09/FREE-PROFILE-AVATARS.png";

  const [profileEditMode, setProfileEditMode] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState();

  useEffect(() => {
    if (currentUser) {
      setProfilePhoto(currentUser.profilePhoto);
      setUserRecord(currentUser);
      const decryptedPassword = handleDecrypt(currentUser.password);
      setOrignalPassword(decryptedPassword);
    }
  }, []);

  const [imageError, setImageError] = useState('');
  const handleEditClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const MAX_FILE_SIZE = 1 * 1024 * 1024; // Maximum file size in bytes (1MB)

    event.target.value = '';

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setImageError('Image is too large. Upload image smaller than 1MB.');
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const image = reader.result; // Base64 string of the image
        setProfilePhoto(image);
      };
      setProfileEditMode(true);
      reader.readAsDataURL(file); // Convert file to Base64
    }
    setImageError('');
  };

  const handleCancelProfile = () => {
    setProfilePhoto(currentUser.profilePhoto);
    setImageError('');
    setProfileEditMode(false);
  };

  const handleSaveProfile = () => {
    dispatch(
      usersSliceActions.updateProfilePhoto({
        userId: userRecord.id,
        newPhoto: profilePhoto,
      })
    );

    const updatedUserRecord = {
      ...userRecord,
      profilePhoto: profilePhoto,
    };
    setUserRecord(updatedUserRecord);
    setProfileEditMode(false);
    dispatch(
      notificationSliceAction.showNotification({
        message: 'Profile Changed!',
      })
    );
  };

  //.......................Edit Info............................

  const [userEmail, setUserEmail] = useState(currentUser.email);
  const [userPassword, setUserPassword] = useState(currentUser.password);
  const [userPhone, setUserPhone] = useState(currentUser.phone);
  //.....................Logout User...........................
  const handleOnLogout = () => {
    dispatch(logoutUserThunk());
    navigate('/login');
  };

  // ...................Delete User Dialog handling.....................
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const dialogPayload = {
    title: 'Confirm Deletion',
    message: 'Are you sure you want to delete Account?',
  };
  const handleOnDeleteAccount = (id) => {
    setUserToDelete(id);
    setDialogOpen(true); // Open the dialog
  };

  const OnConfirmDelete = () => {
    dispatch(usersSliceActions.deleteUser(userToDelete));
    //dispatch(PostsSliceActions.deletePostsByUser(userToDelete));

    setDialogOpen(false); // Close the dialog
    setUserToDelete(null); // Clear the ID
    navigate('/login');
    dispatch(
      notificationSliceAction.showNotification({ message: 'Account Deleted!' })
    );
  };
  const onCancelDelete = () => {
    setDialogOpen(false); // Close the dialog without deleting
    setUserToDelete(null); // Clear the ID
  };

  // to prevent default rendering before updating the value of isVisible
  const [readyToRender, setReadyToRender] = useState(false);
  useEffect(() => {
    setReadyToRender(true);
  }, []);

  return (
    <>
      {dialogOpen && (
        <CustomDeleteDialog
          dialogPayload={dialogPayload}
          onCancelDelete={onCancelDelete}
          OnConfirmDelete={OnConfirmDelete}
        />
      )}{' '}
      <div className={`${collapsed ? styles.collapsed : ''} `}>
        <div className={`${styles.dashboardCard} h-100  `}>
          {imageError && (
            <small className='align-self-center mt-3'>
              {imageError}
              <RxCrossCircled
                className={styles.imageErrorCancelIcon}
                onClick={() => setImageError('')}
              />
            </small>
          )}
          <section>
            <div className=' d-flex flex-column  align-items-center text-center position-relative'>
              {profilePhoto === null ? (
                <p>Loading...</p>
              ) : (
                <img
                  src={profilePhoto}
                  className={`${styles.profilePhoto}`}
                  alt='User Avatar'
                />
              )}
              {!profileEditMode ? (
                <FaEdit
                  className={styles.profileEditIcon}
                  onClick={handleEditClick}
                />
              ) : (
                <>
                  <FaCheck
                    className={styles.profileEditIcon}
                    style={{ background: '#3E9025' }}
                    onClick={handleSaveProfile}
                  />
                  <RxCross2
                    className={`${styles.profileEditIcon} ms-5`}
                    onClick={handleCancelProfile}
                  />
                </>
              )}

              <input
                id='fileInput' // File input element with id to trigger via JavaScript
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                className='d-none' // Hide the input field
              />
              {/* <span className="d-block mt-2">{userRecord.name || "N/A"}</span> */}
            </div>
            <div className='nameSection d-flex flex-column'>
              <span
                className={`align-self-center fw-bold text-white ${styles.profileName}`}
              >
                {userRecord.name || 'N/A'}
              </span>
              <span
                className={`align-self-center rounded px-2 ${styles.profileUserName}`}
              >
                {userRecord.username || 'N/A'}
              </span>
            </div>
          </section>

          {readyToRender && !collapsed && (
            <div className='justify-content-start' style={{ fontSize: '12px' }}>
              <div className=''>
                <h5 style={{ color: ' #3e9025', fontWeight: 'bold' }}>
                  Account Information
                </h5>
              </div>
              <span>
                <label htmlFor='email'>Email:</label>
                <input
                  id='email'
                  className='w-100'
                  value={userEmail || 'N/A'}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </span>
              <span>
                <label htmlFor='email'>Password:</label>
                <input
                  id='password'
                  className='w-100'
                  value={userPassword || 'N/A'}
                  onChange={(e) => setUserPassword(e.target.value)}
                />
              </span>
              <span>
                <label htmlFor='phone'>Phone:</label>
                <input
                  id='phone'
                  className='w-100'
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                />
              </span>
            </div>
          )}

          <section className={styles.accountSetting}>
            <h5>Account Settings</h5>
            <div className={`${styles.buttons} `}>
              <button type='button' className='Btn ' onClick={handleOnLogout}>
                Logout
              </button>
              <button
                type='button'
                className='Btn bg-secondary'
                onClick={() => handleOnDeleteAccount(currentUser.id)}
                // style={{ background: "gray" }}
              >
                Delete
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default SideBar;
