
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link as ChakraLink,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../Redux/Auth/actions';



const NavLink = ({ children }) => (
    <ChakraLink
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={'#'}>
        {children}
    </ChakraLink>
);

export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(loginSuccess(null));
    }

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>
                            <img style={{ width: "70px" }} src="https://www.renewbuy.com/sites/default/files/2022-12/Term-Calculator.png" alt="" />
                        </Box>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            <Link to="/"><NavLink>Policy Calculation</NavLink></Link>
                            <Link to="/illustration"><NavLink>Illustration</NavLink></Link>
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar
                                    size={'sm'}
                                    src={
                                        'https://static.thenounproject.com/png/4035892-200.png'
                                    }
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Profile</MenuItem>
                                <MenuDivider />
                                <MenuItem onClick={logout}>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>

                            <Link to="/"><NavLink>Policy Calculation</NavLink></Link>
                            <Link to="/illustration"><NavLink>Illustration</NavLink></Link>

                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}