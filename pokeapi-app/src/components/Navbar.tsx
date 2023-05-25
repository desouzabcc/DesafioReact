import React from "react";
import { Flex, Box, Image } from "@chakra-ui/react";

const Navbar: React.FC = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding={2}
      backgroundColor="gray.600"
      color="white"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={999}
    >
      <Box>
        <Image src="/pokeapi-logo.png" alt="PokeAPI" height={10} />
      </Box>
    </Flex>
  );
};

export default Navbar;
