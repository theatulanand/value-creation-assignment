import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../Redux/Auth/actions';
import { useNavigate, Navigate } from 'react-router-dom';
import React from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
} from '@chakra-ui/react';
import axios from 'axios';

function Login() {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleLogin = () => {

        //console.log(user)

        if (!username || !password) {
            alert("All Fields Are Required");
            return;
        }

        let data = {
            username,
            password
        }

        axios.post('http://localhost:8080/login', data).then((res) => {
            console.log(res.data);
            dispatch(loginSuccess(res.data));
            alert("Login Success");
            //navigate('/policy-calculation')
        }).catch((err) => {
            console.log(err.response.data.Message);
            alert(err.response.data.Message)
        })

    }

    if (user) {
        return <Navigate to='/' />
    }


    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={"#f2f2f2"}>
            <Stack spacing={2} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Box
                    rounded={'lg'}
                    bg={'white'}
                    boxShadow={'lg'}
                    p={0}>
                    <img style={{ borderRadius: "10px", width: "400px" }} src="https://media.istockphoto.com/id/1368328656/vector/rocket-launch-start-up-symbol-vector-illustration.jpg?b=1&s=170667a&w=0&k=20&c=t-3TkrEE4IxdtEbe44dAQzvTr-HNpwfMwbkOmlLCN3Y=" alt="img" />
                    <Stack align={'center'}>
                        <Heading fontSize={'3xl'}>Login</Heading>
                    </Stack>
                    <Stack spacing={2} p={8}>
                        <FormControl id="username">
                            <FormLabel>Username</FormLabel>
                            <Input value={username} onChange={(e) => { setUserName(e.target.value) }} type="username" />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" />
                        </FormControl>
                        <Stack spacing={2}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                            </Stack>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                onClick={handleLogin}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign in
                            </Button>
                            <Button
                                bg={'green.400'}
                                color={'white'}
                                onClick={() => {
                                    navigate("/register")
                                }}
                                _hover={{
                                    bg: 'green.500',
                                }}>
                                Create New Account
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
export default Login;