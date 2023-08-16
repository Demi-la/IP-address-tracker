import {
  Box,
  Image,
  Text,
  Input,
  InputGroup,
  Flex,
  Divider,
  Center,
  Button,
  Link,
} from '@chakra-ui/react';
import React from 'react';
import backgroundimage from '../component/assets/images/pattern-bg-desktop.png';
import { IoIosArrowForward } from 'react-icons/io';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import Markerposition from './marker';

import '../index.css';



function Tracker() {
  const [address, setAddress] = useState(null);
  const [ipAddress, setIpAddress] = useState('');
  const checkIpAddress =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
  const checkDomain =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;

  useEffect(() => {
    try {
      const getInitialData = async () => {
        const res = await fetch(
          `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}&ipAddress=8.8.8.8`
        );
        const data = await res.json();
        setAddress(data);
      };

      getInitialData();
    } catch (error) {
      console.trace(error);
    }
  }, []);

  async function getEnteredAddress() {
    const res = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${
        process.env.REACT_APP_API_KEY
      }&${
        checkIpAddress.test(ipAddress)
          ? `&ipAddress=${ipAddress}`
          : checkDomain.test(ipAddress)
          ? `&domain=${ipAddress}`
          : ''
      }`
    );
    const data = await res.json();
    setAddress(data);
  }

  function handleSubmit(e) {
    e.preventDefault();
    getEnteredAddress();
    setIpAddress('');
  }
  return (
    <>
      <Box overflow={'hidden'}>
        <Box>
          <Image
            src={backgroundimage}
            width={'100%'}
            h={'400px'}
            position={'absolute'}
            zIndex={'-10'}
          />
        </Box>
        <Box>
          <Text
            fontSize={'20px'}
            color={'white'}
            fontWeight={'600'}
            textAlign={'center'}
            p={'2rem'}
          >
            IP Address Tracker
          </Text>
          <Box
            mx={'auto'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <form
              onSubmit={handleSubmit}
              autoComplete="off"
              style={{  display: 'flex' }}
              width={{ base: '90%', lg: '30%' }}
            

            >
              <InputGroup w={'100%'}>
                <Input
                  type="text"
                  name="ipaddress"
                  id="ipaddress"
                  placeholder="Search for any IP Address or domain"
                  required
                  value={ipAddress}
                  onChange={e => setIpAddress(e.target.value)}
                  bg={'white'}
                  borderRightRadius={'none'}
                />
              </InputGroup>
              <Button
                bg={'black'}
                border={'none'}
                type="submit"
                borderLeftRadius={'none'}
              >
                <IoIosArrowForward color="white" />
              </Button>
            </form>
          </Box>
        </Box>

        {address &&
          address.location &&
          address.location.lat &&
          address.location.lng && (
            <>
              <Flex
                bg={'white'}
                flexDir={{ base: 'column', md: 'row', lg: 'row' }}
                width={{ base: '70%', md: '60%', lg: '60%' }}
                h={{ base: '300px', md: '100px', lg: '100px' }}
                borderRadius={{ base: '10px', md: '5px', lg: '5px' }}
                mx={'auto'}
                p={'1rem'}
                zIndex={10000}
                position={'relative'}
                top={{base: "3rem", md: "2rem", lg: "2rem"}}
                mb={{base: "-4rem", md: "0", lg: "0"}}
              >
                <Box mt={'1rem'}>
                  <Text
                    color={'hsl(0, 0%, 59%)'}
                    fontSize={'10px'}
                    fontWeight={'500'}
                    textAlign={{ base: 'center', md: 'left', lg: 'left' }}
                  >
                    IP ADDRESS
                  </Text>
                  <Text
                    color={'hsl(0, 0%, 17%)'}
                    fontSize={'18px'}
                    fontWeight={'500'}
                    textAlign={{ base: 'center', md: 'left', lg: 'left' }}
                  >
                    {address.ip}
                  </Text>
                </Box>
                <Center
                  h={'5rem'}
                  px="4"
                  ml={'1rem'}
                  display={{ base: 'none', md: 'flex', lg: 'flex' }}
                >
                  <Divider orientation="vertical" />
                </Center>
                <Box mt={'1rem'}>
                  <Text
                    color={'hsl(0, 0%, 59%)'}
                    fontSize={'10px'}
                    fontWeight={'500'}
                    textAlign={{ base: 'center', md: 'left', lg: 'left' }}
                  >
                    LOCATION
                  </Text>
                  <Text
                    color={'hsl(0, 0%, 17%)'}
                    fontSize={'18px'}
                    fontWeight={'500'}
                    textAlign={{ base: 'center', md: 'left', lg: 'left' }}
                  >
                    {address.location.city}, {address.location.region}
                  </Text>
                </Box>
                <Center
                  h={'5rem'}
                  px="4"
                  ml={'2rem'}
                  display={{ base: 'none', md: 'flex', lg: 'flex' }}
                >
                  <Divider orientation="vertical" />
                </Center>
                <Box mt={'1rem'}>
                  <Text
                    color={'hsl(0, 0%, 59%)'}
                    fontSize={'10px'}
                    fontWeight={'500'}
                    textAlign={{ base: 'center', md: 'left', lg: 'left' }}
                  >
                    TIME ZONE
                  </Text>
                  <Text
                    color={'hsl(0, 0%, 17%)'}
                    fontSize={'18px'}
                    fontWeight={'500'}
                    textAlign={{ base: 'center', md: 'left', lg: 'left' }}
                  >
                    UTC {address.location.timezone}
                  </Text>
                </Box>
                <Center
                  h={'5rem'}
                  px="4"
                  ml={'2rem'}
                  display={{ base: 'none', md: 'flex', lg: 'flex' }}
                >
                  <Divider orientation="vertical" />
                </Center>
                <Box mt={'1rem'}>
                  <Text
                    color={'hsl(0, 0%, 59%)'}
                    fontSize={'10px'}
                    fontWeight={'500'}
                    textAlign={{ base: 'center', md: 'left', lg: 'left' }}
                  >
                    ISP
                  </Text>
                  <Text
                    color={'hsl(0, 0%, 17%)'}
                    fontSize={'18px'}
                    fontWeight={'500'}
                    textAlign={{ base: 'center', md: 'left', lg: 'left' }}
                  >
                    {address.isp}
                  </Text>
                </Box>
              </Flex>

              <MapContainer
                center={[address.location.lat, address.location.lng]}
                zoom={13}
                scrollWheelZoom={true}
                style={{ height: '400px', width: '100vw' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Markerposition address={address} />
              </MapContainer>
            </>
          )}
        <Text textAlign={'center'}>
          Challenge by{' '}
          <Link
            color="teal.500"
            href="https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0"
          >
            <Text as={'span'}>Frontend Mentor</Text>
          </Link>
          . Coded by Adebiyi Oluwaseun.
        </Text>
      </Box>
    </>
  );
}
export default Tracker;
