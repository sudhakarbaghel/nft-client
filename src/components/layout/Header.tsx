import React from "react";
import {
  Text,
  Flex,
  useColorModeValue,
  Spacer,
  Box,
  Collapse,
  Icon,
  Link,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import SearchComponent from "../Search";
import { useAccount } from "wagmi";

interface Props {
  className?: string;
}

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

export function Header(props: Props) {

  const className = props.className ?? "";
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Flex
      as="header"
      className={className}
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      opacity={1}
      px={4}
      py={2}
      mb={8}
      pos="sticky"
      w="full"
      alignItems="center"
      borderBottom="1px"
      borderBottomWidth="small"
      borderBottomStyle="solid"
      borderBottomColor="white"
    >
      <Flex flex={{ base: 2 }} justify={{ base: "start", md: "start" }} align="center">
        <IconButton
          aria-label="Open Menu"
          icon={<HamburgerIcon />}
          onClick={onToggle}
          variant="outline"
        />
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>
              <DrawerBody>
                <MobileNav onClose={onClose} />
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
        <Flex display={{ base: "none", md: "flex" }} ml={2}>
          <DesktopNav />
        </Flex>
      </Flex>

      <Spacer />

      <Flex alignItems="center" gap={4}>
        <ConnectButton
          accountStatus={{
            smallScreen: "address",
            largeScreen: "full",
          }}
          showBalance={{
            smallScreen: false,
            largeScreen: true,
          }}
        />
        <ThemeSwitcher />
      </Flex>
    </Flex>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const linkHoverBackgroundColor = useColorModeValue("blue.200", "blue.900");

  const displayedNavItems = NAV_ITEMS.slice(0, 3); // Display only the first three items

  return (
    <Stack direction={"row"} spacing={8}>
      {displayedNavItems.map((navItem) => (
        <Box key={navItem.label}>
          <Link
            p={2}
            href={navItem.href ?? "#"}
            fontSize={"md"}
            fontWeight={500}
            color={linkColor}
            rounded={"md"}
            _hover={{
              textDecoration: "none",
              color: linkHoverColor,
              bg: linkHoverBackgroundColor,
            }}
          >
            <Text as="samp">
              <Text as="b">{navItem.label}</Text>
            </Text>
          </Link>
        </Box>
      ))}

      {/* {NAV_ITEMS.length > 3 && <HamburgerIcon />} Display Hamburger Icon if more than three items */}
      <SearchComponent />
    </Stack>
  );
}


const MobileNav = ({ onClose }: { onClose: () => void }) => {
  return (
    <Stack spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} onClose={onClose} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href, onClose }: NavItem & { onClose: () => void }) => {
  const { isOpen, onToggle } = useDisclosure();

  const handleItemClick = () => {
    onToggle();
    onClose();
  };

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Link
        py={2}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        onClick={handleItemClick}
        _hover={{
          textDecoration: "bold",
        }}
      >
        <Text fontWeight={600} color={useColorModeValue("gray.600", "gray.200")}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Link>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href} onClick={onClose}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Create collection",
    href: "/createCollection",
  },
  {
    label: "Explore collections",
    href: "/collections",
  },
  {
    label: "My NFTs",
    href: `/tokens`,
  },
  {
    label: "My Collection",
    href: "/collections?owner=true",
  },
];

export default Header;
