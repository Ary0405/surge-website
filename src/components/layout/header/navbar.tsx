import Link from "next/link";
import { useRouter } from "next/router";

import {
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Gallery",
    href: "/gallery",
  },
  {
    title: "Events",
    href: "/events",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

interface NavbarItemProps {
  title: string;
  href: string;
  dropdownItems?: {
    title: string;
    href: string;
  }[];
}

function NavbarItem({ title, href, dropdownItems }: NavbarItemProps) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Menu isOpen={isOpen}>
      <MenuButton
        as={Link}
        href={href}
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        role="group"
        // onClick={() => router.push(href)}
      >
        <Flex
          alignItems="center"
          transition="all .1s ease-in"
          _groupHover={{
            color: "#DAB785",
          }}
          _focus={{ outline: "none" }}
        >
          <Text fontSize={14} fontWeight={500}>
            {title}
          </Text>
          {dropdownItems ? <ChevronDownIcon /> : null}
        </Flex>
      </MenuButton>

      {dropdownItems ? (
        <MenuList
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
          bgColor="#002929"
        >
          {dropdownItems.map(({ title, href }, i) => (
            <MenuItem
              key={i}
              as={Link}
              href={href}
              fontSize="14px"
              bgColor="#002929"
              _hover={{ bgColor: "#00191A" }}
            >
              {title}
            </MenuItem>
          ))}
        </MenuList>
      ) : null}
    </Menu>
  );
}

function Navbar() {
  return (
    <Flex as="nav" gap={10}>
      {navItems.map(({ title, href }, i) => (
        <NavbarItem key={i} {...{ title, href }} />
      ))}
    </Flex>
  );
}

export default Navbar;
