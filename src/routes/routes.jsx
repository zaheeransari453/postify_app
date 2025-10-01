import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import UserLayout from '../layouts/user/UserLayout';
import AdminLayout from '../layouts/admin/AdminLayout';
import Posts from '../features/Posts/Posts';
import Users from '../features/users/Users';
import MyPosts from '../features/Posts/MyPosts';
import BookMarkPosts from '../features/Posts/BookMarkPosts';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/user-dashboard' element={<UserLayout />}>
        <Route path='/user-dashboard' element={<Posts />} />
        <Route path='/user-dashboard/my-posts' element={<MyPosts />} />
        <Route
          path='/user-dashboard/bookmark-posts'
          element={<BookMarkPosts />}
        />
        <Route path='/user-dashboard/members' element={<Users />} />
        {/* <Route path="/user-dashboard/user-profile" element={<Users />} /> */}
      </Route>
      <Route path='/admin-dashboard' element={<AdminLayout />} />
      <Route path='/registration' element={<Registration />} />
      <Route path='/login' element={<Login />} />
      <Route
        path='*'
        element={
          <div className='fs-1 fw-bold text-center d-flex flex-column justify-content-center vh-100'>
            Page Not Found
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
