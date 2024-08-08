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
        bg: "#000000", // Surge black background
        color: "#FFFFFF", // White text
        fontFamily: "Gotham, sans-serif", // Use Gotham font
      },
    }),
  },
  components: {
    Modal: {
      baseStyle: {
        dialog: {
          bg: "#000000", // Surge black background
          color: "#FFFFFF", // White text
          fontFamily: "Gotham, sans-serif", // Use Gotham font
        },
      },
    },
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
