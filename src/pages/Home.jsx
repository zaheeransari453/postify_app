import { useNavigate } from "react-router-dom";
import css from "./Home.module.css";
import { FaLink } from "react-icons/fa";
import { fetchUsers } from "../services/apis";
import { usersSliceActions } from "../store/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((store) => store.users);

  useEffect(() => {
    const fetchUsersHandle = async () => {
      dispatch(usersSliceActions.fetchUsersStart());
      try {
        const users = await fetchUsers();
        // console.log(users);
        dispatch(usersSliceActions.fetchUsersSuccess(users));
      } catch (error) {
        console.error("Error fetching users:", error);
        dispatch(usersSliceActions.fetchUsersFailed(error.message));
      }
    };

    if (users.length === 0) {
      fetchUsersHandle();
    } // Fetch users only if usersList is empty
  }, [dispatch]);

  // page naviagation
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegistration = () => {
    navigate("/registration");
  };

  return (
    <>
      <div className={`${css.homeContainer}`}>
        <div className={`container-fluid h-100 p-0`}>
          <div className="row g-0 h-100">
            {/* <!-- Left Column with Video --> */}
            <div className="col-md-6 ">
              <div className={`${css.companyName} `}>
                <FaLink className="fs-1 me-2" style={{ color: "#3E9025" }} />
                Postify Media
              </div>
              <div className={`${css.videoContainer} d-none d-md-block`}>
                <video autoPlay muted loop>
                  <source src="assets/backgroundVideo3.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            <div
              className={`col-md-6 d-flex flex-column justify-content-center align-items-center gap-3 text-center px-5 ${css.rightHome}`}
            >
              <FaLink className="display-1 " style={{ color: "#3E9025" }} />
              <blockquote className="fs-3 w-100">
                <p className="mb-4">
                  Welcome to Postify: Your Story, Your Stage
                </p>
              </blockquote>

              <button
                className="btn btn-black btn-outline-light btn-lg w-100 mx-5 "
                onClick={handleRegistration}
              >
                Start
              </button>
              <button
                className="btn btn-light btn-lg w-100 mx-5"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>
        </div>

        {/* <!-- Background Image for Small Screens --> */}
        {/* <div className={`${css.backgroundImage}`}></div> */}
      </div>
    </>
  );
};

export default Home;
