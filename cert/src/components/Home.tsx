import { Flex, Box, Avatar, HStack, Spacer, Button, Container,Text, Heading, VStack, SimpleGrid } from "@chakra-ui/react";


export default function Home(){
    return(
        <VStack alignItems="center" justifyContent="center" height="50vh" bg="green">

<Container bg="red" maxWidth="4xl" textAlign="center" alignItems="center" justifyContent="center">
            <Heading fontSize="100px">Certify Chain</Heading>
            <Text fontSize="30px" >Decentralized Documents and Certification Minting and Verifying Platform</Text>
        </Container>
        </VStack>
        
    )
}