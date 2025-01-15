import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postUserRegistration } from '../redux/auth/action';
import toast, { Toaster } from 'react-hot-toast';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Spinner,
  Text,
} from '@chakra-ui/react';

export const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [newUserdata, setNewUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePostUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    const status = await dispatch(postUserRegistration(newUserdata));
    setLoading(false);

    if (status === 201) {
      toast.error('Use a different email address.', {
        style: {
          borderRadius: '10px',
          background: 'whitesmoke',
          color: 'black',
        },
      });
    } else if (status === 200) {
      toast.success('You have successfully registered!', {
        icon: '🎉',
        style: {
          borderRadius: '10px',
          background: 'whitesmoke',
          color: 'black',
        },
      });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div>
        <Toaster />
      </div>
      <Box
        w={{ base: '90%', md: '70%', lg: '50%', xl: '30%' }}
        m="3rem auto"
        bg="white"
        color="black"
        p="2rem"
        borderRadius="10px"
        boxShadow="0 5px 15px rgba(0, 0, 0, 0.35)"
        transition="transform 0.2s, box-shadow 0.2s"
        _hover={{
          transform: 'scale(1.02)',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.35)',
        }}
      >
        <Heading fontSize="2rem" textAlign="center" mb="1rem">
          Please Enter Your Credentials to Sign Up ✌️
        </Heading>
        <Flex
          alignItems="center"
          justifyContent="center"
          mt="15px"
          fontSize="1.3rem"
          visibility={loading ? 'unset' : 'hidden'}
        >
          <span style={{ marginRight: '5px' }}>Processing</span>
          <Spinner color="black" />
        </Flex>
        <form onSubmit={handlePostUser}>
          
            <label mt="10px">Enter Your Email</label>
            <Input
              onChange={handleInputChange}
              name="email"
              type="email"
              value={newUserdata.email}
              _hover={{ borderColor: 'blue' }}
            />
        
         
            <label mt="10px">Enter Your Password</label>
      
              <Input
                onChange={handleInputChange}
                name="password"
                type="password"
                value={newUserdata.password}
              />
          
        
          <Button type="submit" w="100%" my="10px" colorScheme="blue" isLoading={loading}>
            Submit
          </Button>
          <Flex w="100%" justifyContent="center" alignItems="center">
            <Text mr="10px">Already a user?</Text>
            <Link
              to="/auth/signup"
              style={{
                fontSize: '14px',
                textDecoration: 'underline',
                fontWeight: 'bold',
              }}
            >
              Sign Up
            </Link>
          </Flex>
        </form>
      </Box>
    </div>
  );
};
