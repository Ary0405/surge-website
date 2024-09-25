import { Box, Text, Grid, Link } from "@chakra-ui/react";
import { Layout } from "~/components/layout";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const socialLinks = [
  {
    title: "Facebook",
    href: "#",
    Icon: FaFacebookF,
  },
  {
    title: "LinkedIn",
    href: "#",
    Icon: FaLinkedinIn,
  },
  {
    title: "Instagram",
    href: "#",
    Icon: FaInstagram,
  },
  {
    title: "YouTube",
    href: "#",
    Icon: FaYoutube,
  },
];

const people = [
  { name: "Ashwin Ravi", role: "Chair Person", image: "/images/landing/contact/ashwin.jpeg", number: "tel:+919566742732" },
  { name: "Yathansh", role: "Vice Chairperson", image: "/images/landing/contact/yathansh.jpeg", number: "tel:+918368131392"  },
  { name: "Krishna", role: "Vice Chairperson", image: "/images/landing/contact/krishna.jpeg", number: "tel:+919940347380"  },
  { name: "Snehali", role: "Administrator", image: "/images/landing/contact/snehali.jpeg", number: "tel:+919740746511"  },
  { name: "Aryan", role: "Administrator", image: "/images/landing/contact/aryan.jpeg", number: "tel:+917738180710"  },

];

function ContactPage() {
  return (
    <Layout title="Contact Us">
      <Box maxW="100%" mx="auto" py={0} px={6}>
      <Text
        mt={{
          base: "0.5rem",   // Reduced margin for smaller devices
          sm: "2.5rem",
          md: "5rem",
          lg: "7.5rem",
          xl: "10rem",
        }}
        fontFamily="Alfa Slab One"
        fontWeight={400}
        fontSize={{
          base: "24px",   // Smaller for very small devices
          sm: "30px",     // Slightly larger for small phones
          md: "40px",     // Default for mid-size tablets
          lg: "50px",     // Standard desktop size
          xl: "60px",     // Larger desktops and displays
        }}
        textTransform="uppercase"
        textAlign="center"
        lineHeight={{
          base: "1.2",    
          sm: "1.1",
          md: "1.1",
          lg: "1.1",
          xl: "1.1",
        }}
        width="100%"
        maxW={{
          base: "90%",   
          md: "100%",    
        }}
        mx="auto"        
      >
        <Box as="span" display="inline">
          Get in
        </Box>
        <Box as="span" color="#F4AC17" display="inline">
          {"\u00A0"}Touch
        </Box>
        <Box as="span" display="inline">
          {"\u00A0"}with us
        </Box>

        <Box as="span" display="block">
          For
          <Box as="span" color="#F4AC17">
            {"\u00A0"}more
          </Box>
          {"\u00A0"}Information
        </Box>
      </Text>
        {/* <Text fontSize="lg" fontFamily="poppins" width={"100%"} textAlign={"center"} mt={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text> */}
      </Box>

      <Box textAlign="center" mt={8}>
        <Box
          as="button"
          padding="1rem"
          width="20rem"
          borderRadius="50rem"
          background="#222"
          border={"2px"}
          borderColor="#FFFFFF"
          color="#F4AC17"
          fontFamily="poppins"
          fontSize="2rem"
          fontWeight={700}
          mt={"5rem"}
          mb={"5rem"}
        >
          Core
        </Box>
      </Box>

      <Grid
          templateColumns={{
            base: "1fr",          // 1 column for small screens
            md: "repeat(2, 1fr)", // 2 columns for medium screens
            lg: "repeat(3, 1fr)", // 3 columns for large screens
          }}
          gap={10}               
          mt={10}                
          width="80%"          
          mx="auto" 
          mb={"5rem"}            
        >
          {people.map((person, index) => (
            <Box
              key={index}
              width="100%"              
              height="400px"            
              display="flex"
              flexDirection="column"
              alignItems="left"
              justifyContent="left"
              borderRadius="3rem"
              boxShadow="md"
              textAlign="center"
              padding="1.5rem"
              border={"1px"}
              background=" linear-gradient(0deg, rgba(0,36,0,0.5992254273504274) 0%, rgba(20,6,6,1) 57%, rgba(99,0,0,1) 100%)" // Gradient background;

            >
              
              <Box
                width="70px"
                height="70px"
                borderRadius="50%"
                backgroundImage={person.image}
                backgroundSize="cover"   
                backgroundPosition="center"  
                backgroundRepeat="no-repeat"   
                justifyContent={"left"}
                alignItems={"left"}
              />


              <Text fontWeight={700} fontSize="3xl" color="#FFFFFF" textAlign={"left"}>
                {person.name}
              </Text>

              <Text fontSize="md" fontFamily="poppins" color="#CCCCCC" mb={6} textAlign={"left"}>
                {person.role}
              </Text>

              <Box 
              
              display={"flex"}
              flex={1}
              flexDirection={"column"}
              marginTop={"4rem"}>
                <Link href={person.number}
                  background="#F4AC17"
                  color="#000000"
                  fontWeight={400}
                  fontSize="md"
                  borderRadius="30px"
                  padding="0.75rem 2rem"
                  mb={4}              
                  _hover={{ background: "#e39b0e" }}  
                >
                  Place a call &rarr;
                </Link>

                <Link href="mailto:surge@snu.edu.in" 
                      background="#333333"
                      color="#FFFFFF"
                      fontWeight={400}
                      fontSize="md"
                      borderRadius="30px"
                      padding="0.75rem 2rem"
                      _hover={{ background: "#444444" }}>
                      Mail &rarr;
                </Link>
              </Box>
            </Box>
          ))}
      </Grid>
    </Layout>
  );
}

export default ContactPage;