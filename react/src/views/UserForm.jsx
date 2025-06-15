import React, { useContext, useEffect, useState } from 'react';
import { Form, Link, useNavigate, useParams } from 'react-router-dom';
import { GlobalContext } from '../context/ContextProvider';
import axiosClient from '../axios-client';

const UserForm = () => {
  const { id } = useParams();
  const { loading, setLoading } = useContext(GlobalContext);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: ""

  });
  const getUser = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get(`/users/${id}`);

      setUser({
        ...res.data.data,
        password: '',
        password_confirmation: ''
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);
    try {
      let response;
      let userData = { ...user };
      if (user.id) {
        if (!userData.password || userData.password.trim() === '') {
          delete userData.password;
          delete userData.password_confirmation;
        }
        response = await axiosClient.put(`/users/${user.id}`, userData);
        setTimeout(() => {
          navigate('/users');
        }, 3000);
      } else {
        response = await axiosClient.post('/users', userData);
        navigate("/users");
      }
    } catch (error) {
      console.log('Error response:', error.response);
      if (error.response && error.response.data && error.response.data) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: ['An error occured while saving the user'] });
      }
    } finally {
      setLoading(false);
    }

  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));


  };
  const getError = (field) => {
    if (!errors || !errors[field]) return null;
    return Array.isArray(errors[field]) ? errors[field][0] : errors[field];
  };
  return (
    <div>
      <div className='mb-10'>
        {
          user.id && <h1 className='font-bold text-3xl '>Update User: {user.name}</h1>}
        {!user.id && <h1 className='font-bold text-3xl '>New User</h1>}
      </div>

      <div className='fade-in'>
        {
          loading && (
            <div className='text-center'>Loading...</div>
          )
        }
      </div>
      {
        !loading &&
        <form action="" onSubmit={handleSubmit} className='space-y-4 bg-gray-300/20 p-4 rounded-xl w-[90%] mx-auto h-auto'>
          {
            getError('general') && (
              <p className='bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded'>{getError('general')}</p>
            )
          }
          <div>
            <label htmlFor="name" className='block text-sm font-medium'>Name</label>
            <input type="text"
              name='name'
              value={user.name}
              onChange={handleInputChange}
              className='w-full block mt-1 rounded-md border border-gray-300 shadow-xl px-3 py-2 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500'
              placeholder='Name' />
            {
              getError('name') && (
                <p className='text-red-500 mt-1 ml-1 '>{getError('name')}</p>
              )
            }
          </div>
          <div>
            <label htmlFor="email" className='block text-sm font-medium'>Email</label>
            <input type="email"
              name='email'
              value={user.email}
              onChange={handleInputChange}
              className='w-full block mt-1 rounded-md border border-gray-300 shadow-xl px-3 py-2 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500'
              placeholder='Email' />
            {
              getError('email') && (
                <p className='text-red-500 mt-1 ml-1 '>{getError('email')}</p>
              )
            }
          </div>
          <div>
            <label htmlFor="password" className='block text-sm font-medium'>Password  {user.id && <span className='text-gray-500 text-xs'>(leave blank to keep current password)</span>}</label>
            <input type="password"
              name='password'
              value={user.password || ''}
              onChange={handleInputChange}
              className='w-full block mt-1 rounded-md border border-gray-300 shadow-xl px-3 py-2 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500'
              placeholder='Password' />
            {
              getError('password') && (
                <p className='text-red-500 mt-1 ml-1 '>{getError('password')}</p>
              )
            }
          </div>

          <div>
            <label htmlFor="password_confirmation" className='block text-sm font-medium'>Passwor Confimration</label>
            <input type="password"
              value={user.password_confirmation || ''}
              name='password_confirmation'
              onChange={handleInputChange}
              className='w-full block mt-1 rounded-md border border-gray-300 shadow-xl px-3 py-2 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500'
              placeholder='Password Confirmation' />
            {
              getError('password_confirmation') && (
                <p className='text-red-500 mt-1 ml-1 '>{getError('password_confirmation')}</p>
              )
            }

          </div>
          <div className='mt-2 space-x-2'>
            <button type='submit ' className='bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-950 transition-colors duration-300 text-sm'>
              Save
            </button>
            <Link to={'/users'} className='bg-gray-300 text-black font-medium px-3 py-1 rounded-md hover:bg-gray-400 transition-colors duration-300 text-sm inline-block'>
              Cancel
            </Link>
          </div>

        </form>
      }

    </div>
  );
};

export default UserForm;