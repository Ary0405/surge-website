import { Flex, Box, Text, Grid, GridItem } from "@chakra-ui/react";

export const textBorder = (color: string) => ({
  textShadow: `1px 1px 0 ${color}, -1px 1px 0 ${color}, -1px -1px 0 ${color}, 1px -1px 0 ${color}`,
});

function StatsSection() {
  return (
    <Flex mt="6rem" flexDir="column" alignItems="center" mx="auto">
      <Flex
        gap={6}
        fontSize={60}
        whiteSpace="nowrap"
        textTransform="uppercase"
        fontFamily="Migra"
        fontWeight={800}
        fontStyle="italic"
        color="#F4AC17"
      >
        <Text color="#121212" {...textBorder("#F4AC17")}>
          Scene in the game
        </Text>
        <Text>Scene in the game</Text>
        <Text color="#121212" {...textBorder("#F4AC17")}>
          Scene in the game
        </Text>
      </Flex>

      <Grid
        mt="4rem"
        gap={16}
        templateColumns="repeat(5, 1fr)"
        templateRows="1fr"
      >
        {[
          { title: "Teams", count: "10" },
          { title: "Events", count: "1" },
          { title: "Players", count: "100" },
          { title: "Footfall", count: "1k" },
          { title: "Sweat", count: "∞" },
        ].map(({ title, count }, i) => (
          <Flex
            key={i}
            flexDir="column"
            alignItems="center"
            fontSize={45}
            textTransform="uppercase"
            fontFamily="Migra"
            fontWeight={800}
            fontStyle="italic"
            color="#ffffff"
          >
            <Text>{count}</Text>
            <Box>
              <Text>{title}</Text>
              {["#F4AC17", "#F4AC1750", "#F4AC1725"].map((color, j) => (
                <Text
                  key={j}
                  color="#121212"
                  {...textBorder(color)}
                  mt="-1.4rem"
                >
                  {title}
                </Text>
              ))}
            </Box>
          </Flex>
        ))}
      </Grid>
    </Flex>
  );
}

export default StatsSection;
