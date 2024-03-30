import { NavLink } from "react-router-dom";
import { Flex, Box, Avatar, HStack, Spacer, Button } from "@chakra-ui/react";
import { ArweaveWebWallet } from "arweave-wallet-connector";
import { Icon } from "@chakra-ui/react";
import { FaWallet } from "react-icons/fa6";
import { TbLoader3 } from "react-icons/tb";

export default function Navbar() {
  const connect_wallet = async () => {
    try {
      const wallet = new ArweaveWebWallet({
        name: "Certify",
        logo: "https://i.pinimg.com/564x/ed/64/96/ed64960142ea3db49cefad283f9f33c2.jpg",
      });

      wallet.setUrl("https://arweave.app");
      const no = await wallet.connect();
      console.log("dawdawdawdawd :::: " + no);
    } catch (err) {
      console.log("Wallet Disconnected without sign");
    }
  };

  return (
    <Flex bg="orange" p="25px" gap="80px" pl="100px" alignItems="center">
      <Avatar src="../../contract//eye.jpeg" size="lg"></Avatar>
      <HStack spacing="100px">
        <Box fontSize="22px" fontWeight="bold">
          <NavLink to="/">Home</NavLink>
        </Box>
        <Box fontSize="22px" fontWeight="bold">
          <NavLink to="/upload">Upload</NavLink>
        </Box>
        <Box fontSize="22px" fontWeight="bold">
          <NavLink to="/about">About</NavLink>
        </Box>
      </HStack>
      <Spacer />
      <Button
        size="lg"
        gap="15px"
        alignItems="center"
        leftIcon={<Icon as={FaWallet} />}
        spinner={<TbLoader3 size={8} color="teal" />}
        colorScheme="teal"
        variant="outline"
        onClick={connect_wallet}
      >
        Connect Wallet
      </Button>
    </Flex>
  );
}
