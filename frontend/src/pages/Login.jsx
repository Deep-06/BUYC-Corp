import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { postUserLogin } from '../redux/auth/action';
import { useNavigate } from "react-router-dom"
import { Box, Flex, Heading, Input, Spinner, Text , FormControl, Button,InputGroup} from '@chakra-ui/react';

export const Login = () => {
    const [loginData, setLoginData] = useState({ email: "", password: "" })
    const { token, isLoading } = useSelector((store) => store.authReducer);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    console.log(token)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => {
            return { ...prev, [name]: value }
        })
    }

    const handleLoginPost = async (e) => {
        e.preventDefault();

        const status = await dispatch(postUserLogin(loginData))
        if (status === 201) {
            toast.error("Wrong credential.", {
                style: {
                    borderRadius: '10px',
                    background: 'whitesmoke',
                    color: 'black',
                },
            })
        } else if (status === 200) {
            toast.success("you have logged in successfully!", {
                icon: "🎉",
                style: {
                    borderRadius: '10px',
                    background: 'whitesmoke',
                    backdropFilter: "blur(2px)",
                    color: 'black',
                },
            })
        } else {
            toast.error("Somthing went wrong!", {
                style: {
                    borderRadius: '10px',
                    background: 'whitesmoke',
                    backdropFilter: "blur(2px)",
                    color: 'black',
                },
            })
        }

    }
    if (token) {
        setTimeout(() => {
            navigate("/")
        }, 1000)
    }
    return (
        <div>
            <div>
                <Toaster />
            </div>
            <Box
                w={{ base: "90%", md: "70%", lg: "50%", xl: "30%" }}
                m="3rem auto"
                bg="white"
                color="black"
                p="2rem"
                borderRadius="10px"
                boxShadow="0 5px 15px rgba(0, 0, 0, 0.35)"
                transition="transform 0.2s, box-shadow 0.2s"
                _hover={{
                    transform: "scale(1.02)",
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.35)",
                }}
            >
                <Heading fontSize="2rem" textAlign="center" mb="1rem">
                    Please Enter Your Credentials to Login✌️
                </Heading>
                <Flex
                    alignItems="center"
                    justifyContent="center"
                    mt="15px"
                    fontSize="1.3rem"
                    visibility={isLoading ? "unset" : "hidden"}
                >
                    <span style={{ marginRight: "5px" }}>Processing</span>
                    <Spinner color="black" />
                </Flex>
                <form onSubmit={handleLoginPost}>
                    <FormControl w="100%" flexDir="column">
                        <Text fontSize="18px" textAlign="left" mt="10px">
                            Enter Your Email <span style={{ color: "red" }}>**</span>
                        </Text>
                        <Input
                            onChange={handleInputChange}
                            isRequired
                            my="10px"
                            name="email"
                            type="email"
                            value={loginData.email}
                            _hover={{ borderColor: "blue" }}
                        />
                        <Text fontSize="18px" textAlign="left" mt="10px">
                            Enter Your Password <span style={{ color: "red" }}>**</span>
                        </Text>
                        <InputGroup
                            onChange={handleInputChange}
                            value={loginData.password}
                            isRequired
                            my="10px"
                            type="password"
                        >
                            <Input name="password" type={showPassword ? "text" : "password"} />
                        </InputGroup>
                        <Button type="submit" w="100%" my="10px" colorScheme="blue">
                            Submit
                        </Button>
                        <Flex w="100%" justifyContent="center" alignItems="center">
                            <Text mr="10px" display="inline">
                                Not a User Yet?
                            </Text>
                            <Box color="black" display="inline">
                                <Link
                                    to="/auth/signup"
                                    style={{
                                        fontSize: "14px",
                                        textDecoration: "underline",
                                        fontWeight: "bold",
                                    }}
                                >
                                    SignUp
                                </Link>
                            </Box>
                        </Flex>
                    </FormControl>
                </form>
            </Box>
        </div>
    )
}
