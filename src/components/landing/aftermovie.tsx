import { Flex } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

function AftermovieSection() {
  return (
    <Flex
      mt={{ base: "1rem", sm: "1rem", md: "2rem", lg: "3rem", xl: "4rem" }}
      flexDir="column"
      alignItems="center"
      mx="auto"
    >
      <Link href="https://youtu.be/QUaermO5Qd4?feature=shared" target="_blank">
        <Image
          width={1010}
          height={1}
          alt=""
          src="/images/landing/aftermovie/aftermovie_macbook.png"
          style={{ marginTop: "0rem", "objectFit": "fill" }}
        />
      </Link>
    </Flex>
  );
}

export default AftermovieSection;
