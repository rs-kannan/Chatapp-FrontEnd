import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../../ContextProvider/Context';

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  const { setUser } = ChatState();

  const handleLogin = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: 'Please Fill all the Feilds',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/user/login',
        { email, password },
        config
      );

      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      navigate('/chats');
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    }
  };

  const handleClick = () => setShow(!show);

  return (
    <VStack spacing='20px'>
      <FormControl id='email' isRequired>
        <FormLabel color='white' className='heading' fontSize='2xl'>
          Email Address
        </FormLabel>
        <Input
          height='3.3rem'
          value={email}
          type='email'
          placeholder='Enter Your Email Address'
          style={{ color: 'white' }}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id='password' isRequired>
        <FormLabel color='white' className='heading' fontSize='2xl'>
          Password
        </FormLabel>
        <InputGroup size='md'>
          <Input
          height='3.3rem'
            value={password}
            color='white'
            onChange={(e) => setPassword(e.target.value)}
            type={show ? 'text' : 'password'}
            style={{ color: 'white' }}
            placeholder='Enter password'
          />
          <InputRightElement width='4.5rem'>
            <Button h='2.2rem' size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme='pink'
        width='100%'
        style={{ marginTop: 15 }}
        onClick={handleLogin}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        color='white'
        className='heading'
        variant='solid'
        colorScheme='red'
        width='100%'
        onClick={() => {
          setEmail('guest@example.com');
          setPassword('123456');
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
