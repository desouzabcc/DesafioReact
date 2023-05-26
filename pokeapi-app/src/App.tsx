import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Grid,
  Image,
  Text,
} from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import Navbar from './components/Navbar';

const theme = extendTheme({
  fonts: {
    heading: 'Poppins, sans-serif',
    body: 'Poppins, sans-serif',
  },
});

interface Pokemon {
  name: string;
  image: string;
  types: string[];
  abilities: string[];
}

const App: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchPokemonList = async () => {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offset}`,
      );

      const results = await Promise.all(
        response.data.results.map(async (result: any) => {
          const pokemonResponse = await axios.get(result.url);
          const pokemon: Pokemon = {
            name: result.name,
            image: pokemonResponse.data.sprites.front_default,
            types: pokemonResponse.data.types.map(
              (type: any) => type.type.name,
            ),
            abilities: pokemonResponse.data.abilities.map(
              (ability: any) => ability.ability.name,
            ),
          };
          return pokemon;
        }),
      );

      setPokemonList((prevList) => [...prevList, ...results]);
    };

    fetchPokemonList();
  }, [offset]);

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + 12);
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex
        flexDirection="column"
        alignItems="center"
        padding={2}
        backgroundColor="Black"
      >
        <Navbar />
        <Grid
          templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
          gap={6}
          width="100%"
          maxWidth="900px"
          padding={1.5}
          marginTop={50}
        >
          {pokemonList.map((pokemon) => (
            <Box
              key={pokemon.name}
              borderWidth="3px"
              borderColor="#3D82C9"
              borderRadius="md"
              padding={4}
              display="flex"
              flexDirection="column"
              alignItems="justify"
              justifyContent="justify"
              backgroundColor="#E1CF97"
            >
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                width="120px"
                height="120px"
                marginBottom={2}
              />
              <Text fontWeight="bold" marginBottom={4}>
                {pokemon.name}
              </Text>
              <Text>
                <strong>Types: </strong>
                {pokemon.types.join(', ')}
              </Text>
              <Text>
                <strong>Abilities: </strong>
                {pokemon.abilities.join(', ')}
              </Text>
            </Box>
          ))}
        </Grid>
        <Button marginTop={4} onClick={handleLoadMore}>
          Ver Mais
        </Button>
      </Flex>
    </ChakraProvider>
  );
};

export default App;
