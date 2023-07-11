import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='bg-[#3d3a38] flex items-center justify-between p-4 z-[100] w-full fixed'>
      <Link to='/'>
      <div className='text-[#f0ebe8] text-4xl font-bold cursor-pointer'>Todo App</div>
      </Link>
      {user?.email ? (
              <button onClick={handleLogout} className='text-[#f0ebe8] pr-4 font-bold'>Log Out</button>
      ) : (
        <div className='flex'>
      <Link to='/login'>
      <div className='text-[#f0ebe8] pr-4 font-bold'>Sign In</div>
      </Link>
      <Link to='/signup'>
      <div className='text-[#f0ebe8] pr-4 font-bold'>Sign Up</div>
      </Link>
      </div>
      )}
    </div>
  )
}

export default Navbar