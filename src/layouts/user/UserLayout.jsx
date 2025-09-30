import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './UserLayout.module.css';
import SideBar from './components/SideBar';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Header from './components/Header';

import { RxCross2 } from 'react-icons/rx';
import { Outlet, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

const UserLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // sidebar collapsed go false on medium screen to show side bar hide content
  useEffect(() => {
    const handleResize = () => {
      const isMediumScreen = window.matchMedia('(max-width: 768px)').matches;
      if (isMediumScreen) {
        setCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup the listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // hide/ Unhide on medium/large screen
  const [isVisible, setIsVisible] = useState(false); // State to toggle visibility for profile
  const toggleProfileVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={`d-flex ${styles.layout}`}>
      {/* Sidebar */}
      <div
        className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''} ${
          isVisible ? styles.onToggleProfile : 'd-none d-md-block'
        } `}
      >
        <div className={`${styles.backBtn} d-md-none d-block`}>
          <span onClick={() => setIsVisible(!isVisible)}>
            <IoIosArrowBack />
            <span>Back</span>
          </span>
        </div>

        <SideBar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          isVisible={isVisible}
        ></SideBar>

        <div
          className={`${styles.toggleButton} d-md-block d-none`}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </div>
      </div>

      <div className={styles.contentWrapper}>
        {/* ....................Header................... */}
        <header className={`${styles.header} `}>
          <Header
            toggleVisibility={toggleProfileVisibility}
            onNavigate={navigate}
          ></Header>
        </header>
        {/* ..................Main Content................ */}
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
