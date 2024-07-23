import { Flex } from "@chakra-ui/react";
import Image from "next/image";

function AftermovieSection() {
  return (
    <Flex mt="4rem" flexDir="column" alignItems="center" mx="auto">
      <Image
        width={1000}
        height={1}
        alt=""
        src="/images/landing/aftermovie/aftermovie_macbook.png"
        style={{ marginTop: "3rem" }}
      />
    </Flex>
  );
}

export default AftermovieSection;
