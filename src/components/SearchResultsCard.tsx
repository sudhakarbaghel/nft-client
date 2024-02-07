import { Box, Flex, Text, VStack, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

type Props = {};

const image = {
  contract:
    '<svg width="64px" height="64px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 44V4H31L40 14.5V44H8Z" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M24 15L27.0841 21.7551L34.4616 22.6008L28.9902 27.6214L30.4656 34.8992L24 31.247L17.5344 34.8992L19.0098 27.6214L13.5384 22.6008L20.9159 21.7551L24 15Z" fill="#2F88FF" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>',
  token:
    '<svg width="64px" height="64px" viewBox="0 0 80 80" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs> <style>.cls-1{fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-width:4px;}</style> </defs> <title></title> <g id="bat"> <ellipse class="cls-1" cx="40" cy="34.988" rx="35" ry="23"></ellipse> <path class="cls-1" d="M25.441,20.366a41.623,41.623,0,0,1,6.517-1.685"></path> <path class="cls-1" d="M11,34.988c0-4.846,3.673-9.3,9.442-12.428"></path> <path class="cls-1" d="M5,34.988V47.835a13,13,0,0,0,4.778,10.08c7.637,6.225,18.353,10.1,30.222,10.1s22.585-3.873,30.222-10.1A13,13,0,0,0,75,47.835V34.988"></path> <line class="cls-1" x1="40" x2="40" y1="67.874" y2="58.395"></line> <line class="cls-1" x1="51.667" x2="51.667" y1="66.375" y2="56.896"></line> <line class="cls-1" x1="63.333" x2="63.333" y1="62.146" y2="57.988"></line> <line class="cls-1" x1="28.333" x2="28.333" y1="66.375" y2="57"></line> <line class="cls-1" x1="16.667" x2="16.667" y1="62.031" y2="52.412"></line> <path d="M57.1,43.5H22.9c-1.125,0-1.825-.8-1.254-1.44l17.1-19.089a1.905,1.905,0,0,1,2.508,0l17.1,19.089C58.921,42.7,58.222,43.5,57.1,43.5ZM31.555,39.682h16.89c.45,0,.73-.321.5-.576L40.5,29.676a.762.762,0,0,0-1,0l-8.445,9.43C30.825,39.361,31.1,39.682,31.555,39.682Z"></path> </g> </g></svg>',
  owner:
    '<svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>',
};

function SearchResultsCard({ result }: Props) {
  console.log("result", result);
  const router = useRouter();

  const handleCardClick = () => {
    if (result.type === "contract") {
      router.push(`/collections/${result.contractAddress}`);
    } else if (result.type === "token") {
      router.push(`/tokens/${result.tokenId}?collectionAddress=${result.contractAddress}`);
    }
}

  return (
    <Flex
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      mb={4}
      boxShadow="md"
      width={350}
      cursor="pointer"
      bg="white"
      onClick={handleCardClick}
    >
      <Image
        src={
          result.type in image
            ? `data:image/svg+xml;utf8,${encodeURIComponent(
                image[result.type]
              )}`
            : ""
        }
        alt={result.type}
        boxSize="64px"
        objectFit="cover"
        mr={4}
      />
      <VStack align="start" spacing={2}>

        <Text fontWeight="bold">{result.type=='token' ? '#'+result.tokenId: result.name}</Text>
        <Text>{result.description}</Text>
      </VStack>
    </Flex>
  );
}

export default SearchResultsCard;
