import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import {
  Flex,
  Text,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Icon,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  FiUser,
  FiLogOut,
  FiList,
  FiShoppingCart,
  FiCalendar,
} from "react-icons/fi";

export const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Contact",
    href: "/contact",
  },
  {
    title: "All Events",
    href: "/dashboard/all-events",
  },
  {
    title: "Rule Book",
    href: "https://docs.google.com/document/d/1EhKOktx51yRpVABZCCIf8BIiZR-GEgwt1bRIvwpYj9g/edit?usp=sharing",
  },
  {
    title: "Brochure",
    href: "https://drive.google.com/file/d/1EdlqJ12xGgYFZq5stVGuJGyVmPNpmKQ_/view?usp=sharing",
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
    <Link
      href={href}
      target={
        title === "Rule Book" || title === "Brouchure" ? "_blank" : undefined
      }
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
    </Link>
  );
}

function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Flex  as="nav" justifyContent="space-between" alignItems="center" p={4}>
      <Flex gap={12}>
        {" "}
        {/* Increased gap between navbar items and buttons */}
        {navItems.map(({ title, href }, i) => (
          <NavbarItem key={i} {...{ title, href }} />
        ))}
      </Flex>
      <Flex ml="30px" alignItems="center" gap={2}>
        {" "}
        {/* Reduced gap between buttons */}
        {!session ? (
          <>
            <Link href="/login">
              <Button
                variant="outline"
                colorScheme="yellow"
                borderColor="#F4AC18"
                color="#F4AC18"
                size="sm"
              >
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button bg="#F4AC18" color="white" size="sm">
                Sign Up
              </Button>
            </Link>
          </>
        ) : (
          <Menu placement="bottom-end">
            <MenuButton
              as={Button}
              ml="20px"
              rounded="full"
              variant="link"
              cursor="pointer"
            >
              <Avatar
                size="sm"
                name={session.user?.name ?? "User"}
                src={session.user?.image ?? ""}
              />
            </MenuButton>
            <MenuList minW="150px" transform="translateX(-75%)">
              <MenuItem
                onClick={() => router.push("/dashboard")}
                icon={<Icon as={FiUser} />}
              >
                Dashboard
              </MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={() => router.push("/dashboard/all-events")}
                icon={<Icon as={FiCalendar} />}
              >
                All Events
              </MenuItem>
              <MenuItem
                onClick={() => router.push("/dashboard/my-events")}
                icon={<Icon as={FiList} />}
              >
                My Events
              </MenuItem>
              <MenuItem
                onClick={() => router.push("/dashboard/cart")}
                icon={<Icon as={FiShoppingCart} />}
              >
                Cart
              </MenuItem>
              <MenuDivider />
              <MenuItem icon={<Icon as={FiLogOut} />} onClick={() => signOut()}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
    </Flex>
  );
}

export default Navbar;
