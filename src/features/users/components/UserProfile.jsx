import { MdBookmarks, MdEmail, MdMessage } from 'react-icons/md';
import { FaHeart, FaPhoneAlt } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './UserProfile.module.css';
import { useSelector } from 'react-redux';
import { BiSolidUserPin } from 'react-icons/bi';
import UserPosts from './UserPosts';
import UserSavedPosts from './UserSavedPosts';
import { IoIosArrowBack } from 'react-icons/io';
import UserLikedPosts from './UserLikedPosts';
import Chat from './Chat';

const UserProfile = ({ setOpenUserProfile, cardUserId }) => {
  const { users, currentUser } = useSelector((store) => store.users);

  const [showUserPosts, setShowUserPosts] = useState(false);
  const [showUserSaved, setShowUserSaved] = useState(false);
  const [showUserLiked, setShowUserLiked] = useState(false);
  const [showChat, setShowChat] = useState(false);

  return (
    <div className={`container-fluid pt-3 vh-100 ${styles.userProfilePage}`}>
      <div className='row justify-content-center h-100'>
        {currentUser !== null &&
          users.map(
            (user) =>
              user.id === cardUserId && (
                <div className=' col-sm-10 col-12  mb-3 h-100' key={user.id}>
                  <div className={`card p-3 pt-0 ${styles.profileCard}`}>
                    {showUserPosts && (
                      <UserPosts
                        setShowUserPosts={setShowUserPosts}
                        userId={cardUserId}
                      />
                    )}
                    {showUserSaved && (
                      <UserSavedPosts
                        setShowUserSaved={setShowUserSaved}
                        userId={cardUserId}
                      />
                    )}
                    {showUserLiked && (
                      <UserLikedPosts
                        setShowUserLiked={setShowUserLiked}
                        userId={cardUserId}
                      />
                    )}
                    {showChat && (
                      <Chat setShowChat={setShowChat} userId={cardUserId} />
                    )}

                    {!showUserPosts &&
                      !showUserSaved &&
                      !showUserLiked &&
                      !showChat && (
                        <>
                          <div className={styles.closeIcon}>
                            <span onClick={() => setOpenUserProfile(false)}>
                              <IoIosArrowBack />
                              <span>Back</span>
                            </span>
                          </div>
                          <div className={styles.body}>
                            <div className='row justify-content-between align-items-center gap-1 gap-sm-0'>
                              <div className='col-12 text-center '>
                                <div className={styles.profileImage}>
                                  <img
                                    src={
                                      user.profilePhoto ||
                                      'https://bootdey.com/img/Content/avatar/avatar7.png'
                                    }
                                    alt='User Avatar'
                                  />
                                </div>
                              </div>
                              <div className='col-12 mt-3 '>
                                <h3
                                  className={`text-center m-0 ${styles.name}`}
                                >
                                  {user.name}
                                </h3>
                                <p
                                  className={`text-center m-0 ${styles.userName}`}
                                >
                                  {user.username || 'NA'}
                                </p>
                                <p className={` mt-5 ${styles.userEmail}`}>
                                  <MdEmail className='fs-3 me-2' /> {user.email}
                                </p>
                                <p className={` ${styles.userPhone}`}>
                                  <FaPhoneAlt className='fs-3 me-2' />{' '}
                                  {user.phone || 'NA'}
                                </p>
                              </div>
                            </div>
                            <div className='row justify-content-center align-items-center gap-1 gap-sm-0 mt-4'>
                              <div
                                className={`col-2 ${styles.userPosts}`}
                                onClick={() => setShowUserPosts(true)}
                              >
                                <BiSolidUserPin />
                                <small style={{ fontSize: '10px' }}>
                                  Posts
                                </small>
                              </div>
                              <div
                                className={`col-2 ${styles.userPosts}`}
                                onClick={() => setShowUserSaved(true)}
                              >
                                <MdBookmarks />
                                <small style={{ fontSize: '10px' }}>
                                  saved
                                </small>
                              </div>
                              <div
                                className={`col-2 ${styles.userPosts}`}
                                onClick={() => setShowUserLiked(true)}
                              >
                                <FaHeart />
                                <small style={{ fontSize: '10px' }}>
                                  Liked
                                </small>
                              </div>
                              <div
                                className={`col-2 ${styles.userPosts}`}
                                onClick={() => setShowChat(true)}
                              >
                                <MdMessage />
                                <small style={{ fontSize: '10px' }}>Chat</small>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                  </div>
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default UserProfile;
