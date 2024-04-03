import {
  Flex,
  Box,
  Container,
  Text,
  Heading,
  VStack,
  Image,
} from "@chakra-ui/react";
import certificate from "../assets/home1.jpeg";
import { addrs } from "./Navbar";

export default function Home() {
  return (
    <Box>
      <Container maxWidth="8xl" mt="30px">
        <Flex gap="100px" alignItems="center" justifyContent="center">
          <VStack
            alignItems="center"
            justifyContent="center"
            height="50vh"
            gap="20px"
          >
            ""
            <Box
              maxWidth="4xl"
              textAlign="center"
              alignItems="center"
              justifyContent="center"
              borderStyle="solid"
              borderColor="black"
            >
              <Heading fontSize="100px">Certify Chain</Heading>
              <Text fontSize="30px">
                Decentralized Documents and Certification Minting and Verifying
                Platform
              </Text>
            </Box>
            <Text>Address : {addrs}</Text>
          </VStack>
          <Image src={certificate} width="500px" borderRadius="20px"></Image>
        </Flex>
      </Container>
    </Box>
  );
}
