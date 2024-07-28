import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: () => ({
      body: {
        bg: "",
        color: "#ffffff",
        fontFamily: "Gotham",
      },
    }),
  },
  components: {
    SideVideo: {
      baseStyle: {
        transition: "transform 0.2s ease-out",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      },
    },
  },
});

export default theme;
