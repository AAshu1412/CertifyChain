import { NavLink } from "react-router-dom";
import { Flex, Box, Avatar, HStack, Spacer } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Flex bg="orange" p="25px">
      <Avatar src="../../contract//eye.jpeg"></Avatar>
      <HStack>
        <Box>
          <NavLink to="/">Home</NavLink>
        </Box>
        <Box>
          <NavLink to="/upload">Upload</NavLink>
        </Box>
        <Box>
          <NavLink to="/about">About</NavLink>
        </Box>
      </HStack>
      <Box></Box>
      <Spacer />
    </Flex>
  );
}
