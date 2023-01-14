
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
    Select,
} from '@chakra-ui/react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';

function PolicyCalculation() {

    const { user } = useSelector(store => store.auth);
    //const navigate = useNavigate();
    const [dob, setDob] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [sumAssured, setSumAssured] = React.useState("");
    const [modelPremium, setModelPremium] = React.useState("");
    const [premiumFrequency, setPremiumFrequency] = React.useState("");
    const [pt, setPt] = React.useState("");
    const [ppt, setPpt] = React.useState("");

    const handleSubmit = () => {



        const token = user.token;

        if (!dob || !gender || !sumAssured || !premiumFrequency || !modelPremium || !pt || !ppt) {
            alert("All Fields Are Required");
            return;
        }




        let data = {
            dob,
            gender,
            sumAssured,
            modelPremium,
            premiumFrequency,
            pt,
            ppt,
            token
        }


        axios.post('http://localhost:8080/generateIllustration', data).then((res) => {
            console.log(res.data);
            alert("Data are valid");
        }).catch((err) => {
            console.log(err.response.data);
            alert(err.response.data)
        })

        console.log(data)

    }


    return (
        <>
            <Navbar />
            <Flex
                style={{ overflow: "scroll" }}
                maxH={'90vh'}
                align={'center'}
                justify={'center'}
                bg={"#f2f2f2"}>
                <Stack style={{ marginTop: "350px" }} spacing={2} mx={'auto'} maxW={'lg'} py={12} px={6}>

                    <Box
                        rounded={'lg'}
                        bg={'white'}
                        boxShadow={'lg'}
                        p={0}>
                        <img style={{ borderRadius: "10px", width: "400px" }} src="https://i0.hippopx.com/photos/391/429/184/calculator-calculation-insurance-finance-preview.jpg" alt="img" />
                        <Stack align={'center'}>
                            <Heading fontSize={'3xl'}>Calculate Policy</Heading>
                        </Stack>
                        <Stack spacing={2} p={8}>
                            <FormControl id="dob">
                                <FormLabel>Date of birth</FormLabel>
                                <Input value={dob} onChange={(e) => { setDob(e.target.value) }} type="date" />
                            </FormControl>
                            <FormControl id="gender">
                                <FormLabel>Gender</FormLabel>
                                <Select value={gender} onChange={(e) => { setGender(e.target.value) }} placeholder='Select option'>
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                </Select>
                            </FormControl>
                            <FormControl id="sumAssured">
                                <FormLabel>Sum Assured</FormLabel>
                                <Input value={sumAssured} onChange={(e) => { setSumAssured(e.target.value) }} type="number" />
                            </FormControl>
                            <FormControl id="modelPremium">
                                <FormLabel>Model Premium</FormLabel>
                                <Input value={modelPremium} onChange={(e) => { setModelPremium(e.target.value) }} type="number" />
                            </FormControl>
                            <FormControl id="premiumFrequency">
                                <FormLabel>Premium Frequency</FormLabel>
                                <Select value={premiumFrequency} onChange={(e) => { setPremiumFrequency(e.target.value) }} placeholder='Select option'>
                                    <option value='yearly'>Yearly</option>
                                    <option value='half-yearly'>Half Yearly</option>
                                    <option value='monthly'>Monthly</option>
                                </Select>
                            </FormControl>
                            <FormControl id="pt">
                                <FormLabel>PT</FormLabel>
                                <Input value={pt} onChange={(e) => { setPt(e.target.value) }} type="number" />
                            </FormControl>
                            <FormControl id="ppt">
                                <FormLabel>PPT</FormLabel>
                                <Input value={ppt} onChange={(e) => { setPpt(e.target.value) }} type="number" />
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
                                    onClick={handleSubmit}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Submit
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>
    );
}
export default PolicyCalculation;