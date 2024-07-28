import { useState } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  HStack,
  Link,
  Divider,
  Icon,
  useDisclosure,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import { navItems } from "./navbar";
import { socialLinks } from "../footer";

function MobileNavbarOverlay() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isCross, setIsCross] = useState(false);

  const handleToggle = () => {
    onOpen();
    setIsCross(!isCross);
  };

  return (
    <>
      <IconButton
        aria-label="Open Menu"
        icon={<HamburgerIcon />}
        onClick={handleToggle}
        size="lg"
        variant="ghost"
      />
      <Drawer isOpen={isOpen} placement="top" onClose={onClose} size="full">
        <DrawerOverlay bg="#121212" backdropBlur="5px" />
        <DrawerContent bg="#F4AC18" p={16}>
          <DrawerCloseButton mt={6} mr={5} color="white" />
          <VStack spacing={4} align="start">
            {navItems.map((item, index) => (
              <div key={index}>
                <Text
                  as={Link}
                  href={item.href}
                  color="#fff"
                  fontSize="lg"
                  fontWeight={600}
                >
                  {item.title}
                </Text>
                <Divider my={4} />
              </div>
            ))}

            <HStack alignItems="center" spacing={4}>
              {socialLinks.map((link, i) => (
                <Link key={i} href={link.href} isExternal>
                  <Icon as={link.Icon} boxSize={6} color="white" />
                </Link>
              ))}
            </HStack>
          </VStack>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default MobileNavbarOverlay;
