
import { useNavigate } from 'react-router-dom';
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

function Register() {


    const navigate = useNavigate();
    const [username, setUserName] = React.useState("");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [date, setDate] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleRegister = () => {

        //console.log(user)

        if (!username || !name || !email || !phone || !date || !password) {
            alert("All Fields Are Required");
            return;
        }


        const dateArray = date.trim().split("-").map(Number);

        const currentYear = new Date().getFullYear();

        const age = currentYear - dateArray[0];

        let data = {
            username,
            name,
            email,
            phone,
            date,
            age,
            password
        }

        console.log(age);

        axios.post('http://localhost:8080/register', data).then((res) => {
            console.log(res.data);
            alert("Registration Success")
            navigate('/login')
        }).catch((err) => {
            console.log(err.response.data);
            alert(err.response.data)
        })

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
                        <Heading fontSize={'3xl'}>Register</Heading>
                    </Stack>
                    <Stack spacing={2} p={8}>
                        <FormControl id="username">
                            <FormLabel>Username</FormLabel>
                            <Input value={username} onChange={(e) => { setUserName(e.target.value) }} type="username" />
                        </FormControl>
                        <FormControl id="name">
                            <FormLabel>Name</FormLabel>
                            <Input value={name} onChange={(e) => { setName(e.target.value) }} type="name" />
                        </FormControl>
                        <FormControl id="email">
                            <FormLabel>Email</FormLabel>
                            <Input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" />
                        </FormControl>
                        <FormControl id="phone">
                            <FormLabel>Phone</FormLabel>
                            <Input value={phone} onChange={(e) => { setPhone(e.target.value) }} type="number" />
                        </FormControl>
                        <FormControl id="age">
                            <FormLabel>Date Of Birth</FormLabel>
                            <Input value={date} onChange={(e) => { setDate(e.target.value) }} type="date" />
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
                                onClick={handleRegister}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Register
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
export default Register;