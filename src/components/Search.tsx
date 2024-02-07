import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Text,
  InputGroup,
  InputRightElement,
  Icon,
  VStack,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { fetchSearchResults } from "../network/lib/search";
import SearchResultsCard from "./SearchResultsCard";



const SearchComponent = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  console.log("🚀 ~ SearchComponent ~ searchResults:", searchResults);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  console.log("🚀 ~ SearchComponent ~ error:", error)

  const handleSearch = (text) => {
    setSearchText(text);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (searchText.trim() === "") {
        setSearchResults([]);
        setIsLoading(false);
        setError(false);
        return;
      }

      setIsLoading(true);

      try {
        const results = await fetchSearchResults(searchText);
        setSearchResults(results?.data?.data);
        setError(false);
      } catch (error) {
        setSearchResults([]);
        setError("An error occurred while fetching search results.");
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimeout = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchText]);

  const clearSearch = () => {
    setSearchText("");
  };

  console.log("🚀 ~ SearchComponent ~ error:", error)
  return (
    <Box position="relative">
      <InputGroup>
        <Input
          type="text"
          placeholder="Enter search text"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          pr="4.5rem"
          width={350}
        />
        <InputRightElement width="4.5rem">
          {searchText ? (
            <Icon
              as={CloseIcon}
              h={5}
              w={5}
              color="teal.500"
              onClick={clearSearch}
            />
          ) : (
            <Icon as={SearchIcon} h={5} w={5} color="teal.500" />
          )}
        </InputRightElement>
      </InputGroup>

      {/* {error && <Text color="red.500" mt={2}>{error}</Text>} */}

      <Box
        position="absolute"
        top="100%"
        left="0"
        mt={2}
        width="350px"
        zIndex="popover"
      >
        {" "}
        {searchResults.length > 0 && (
          <VStack align="start" spacing={4}>
            {searchResults.map((result) => (
              <SearchResultsCard key={result.id} result={result} />
            ))}
          </VStack>
        )}
        {error ? <Text color="red.500" mt={2}>No result found!!</Text>:''}
     
      </Box>

      {isLoading && <Text mt={2}>Loading...</Text>}
    </Box>
  );
};

export default SearchComponent;
