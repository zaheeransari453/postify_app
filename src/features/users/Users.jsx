import { useSelector } from 'react-redux';

import { useEffect, useRef, useState } from 'react';
import UserCard from './UserCard';
import UserProfile from './components/UserProfile';

const Users = () => {
  const { loading, error } = useSelector((store) => store.users);
  const topRef = useRef(null);
  useEffect(() => {
    topRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  }, []);

  const [openUserProfile, setOpenUserProfile] = useState(false);
  const [cardUserId, setCardUserId] = useState(null);
  const onCardClick = (id) => {
    setOpenUserProfile(true);
    setCardUserId(id);
  };

  // Loading state
  if (loading) {
    return (
      <div className='text-center my-5 pt-5'>
        <div className='spinner-border text-white' role='status'></div>
        <p className='text-dark fw-bold fs-2'>Loading Users...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return <div className='alert alert-danger mt-5'>Error: {error}</div>;
  }

  return (
    <>
      <div ref={topRef} className='' />
      {openUserProfile ? (
        <UserProfile
          setOpenUserProfile={setOpenUserProfile}
          cardUserId={cardUserId}
        />
      ) : (
        <UserCard onCardClick={onCardClick} />
      )}
    </>
  );
};
export default Users;
