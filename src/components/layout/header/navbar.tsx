import Link from "next/link";
import { useRouter } from "next/router";

import { Flex, Text } from "@chakra-ui/react";
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

  return (
    <Link href="#">
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
    </Link>
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
