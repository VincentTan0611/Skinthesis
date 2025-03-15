import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Image } from '@chakra-ui/react';
import { Box, Container, VStack, Text, Heading, Flex } from '@chakra-ui/react';

function Article3() {
  return (
    <Box>
      <Header />
      {/* First Section */}
      <Box bg="#B12E34" color="white" position="relative" pt="150px" pb="150px" zIndex={1}>
        <Container maxW="container.xl" centerContent>
          <VStack spacing={4} py={6}>
            <Text fontSize="xl" mt="-60px" mb="20px">June 28, 2024</Text>
            <Box w="300px" h="2px" bg="white" />
            <Heading as="h1" fontSize="78px" mt="40px" textalign="center">
            How to Prevent
            </Heading>
            <Heading as="h1" fontSize="78px" mt="40px"textalign="center">
            Skin Cancer
            </Heading>
            <Text alignSelf="flex-end" mt="30px" mr="50px" fontSize="xl">
              by uclahealth
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Placeholder Image Section (Separate) */}
      <Box
        position="relative" 
        mt="-150px" 
        display="flex"
        justifyContent="center"
        zIndex={10} 
      >
        <Image
          src="src/images/article 3.png"
          alt="Article Image"
          w="55%"
          h="400px"
          objectFit="cover"
          boxShadow="lg"
        />
      </Box>

      {/* Content Sections */}
      <Box bg="white" position="relative" zIndex={1} pt="50px">
        <Container maxW="container.xl" px="7%">
          <VStack spacing={8} align="stretch">
            {/* Introduction */}
            <Box>
              <Heading as="h2" color="#B12E34" fontSize="32px" mt={3} mb={2}>
              Introduction
              </Heading>
              <Text textAlign="justify" lineHeight="2" >
              By age 70, one in five people in the U.S. will develop skin cancer, making it the most common type of cancer. However, despite these concerning statistics, skin cancer is largely preventable, and when detected early, it is highly treatable. 
              <br /><br />
              Protecting your skin from harmful ultraviolet (UV) rays is key to reducing your risk, whether by using sunscreen, wearing protective clothing, seeking shade, or avoiding tanning beds. Regular skin checks can also help with early detection, allowing for timely treatment and better outcomes. By taking simple yet effective precautions, you can enjoy time in the sun while keeping your skin healthy and safe.
              </Text>
            </Box>

            {/* How Sun Damages Skin*/}
            <Box>
              <Heading as="h2" color="#B12E34" fontSize="32px" textAlign="center" mt={10} >
              How the Sun Damages Skin
              </Heading>
              <Flex gap={16} mt={5}>
                <Box flex={1}>
                  <Text lineHeight="2" textAlign="justify" mt={-2}>
                  Two types of ultraviolet (UV) rays from sunlight—UVA and UVB—affect our skin differently. UVA rays penetrate deep, damaging collagen and elastin, which keep skin smooth and youthful. This accelerates aging and contributes to wrinkles. More importantly, UVA rays also harm skin cells, increasing the risk of cancer.
                  </Text>
                  <Image src="src/images/skin_5.png" alt="UVA" mt={10} borderRadius="md" height="500px" width="100%" objectFit="cover" />
                  <Text fontSize="sm" color="rgba(0, 0, 0, 0.3)" mt={2} as="em" display="block" textAlign="center">
                  Aging caused by UVA rays
                  </Text>
                </Box>
                <Box flex={1}>
                  <Text lineHeight="2" textAlign="justify" mt={-2}>
                    UVB rays, often called tanning or burning rays, affect the skin’s outer layer, causing redness or darkening. They can also damage DNA in skin cells, potentially leading to cancer over time. Beyond sunlight, tanning beds expose the skin to high doses of UV radiation, significantly increasing the risk of skin cancer.
                  </Text>
                  <Image src="src/images/skin_6.png" alt="UVB" mt={10} borderRadius="md" height="500px" width="100%" objectFit="cover" />
                  <Text fontSize="sm" color="rgba(0, 0, 0, 0.3)" mt={2} as="em" display="block" textAlign="center">
                  Burning caused by UVB rays
                  </Text>
                </Box>
              </Flex>
              </Box>

            {/* Sun Protection */}
            <Box>
              <Heading as="h2" color="#B12E34" fontSize="32px" mt={10}>
              Sun Protection
              </Heading>
              <Flex gap={16} mt={5}>
                <Box flex={1}>
                  <Text lineHeight="2" textAlign="justify" mt={-2}>
                  The best way to prevent skin cancer is by protecting your skin from the sun. Up to 90% of skin cancers are directly linked to UV exposure, but staying safe doesn’t mean you have to stay indoors. 
                    <br /><br />
                    Using a broad-spectrum sunscreen with an SPF of 30 or higher every day is a crucial defense. Apply it to exposed skin year-round, regardless of the weather, as up to 80% of UV rays can penetrate light clouds. Sunscreen must be reapplied every two hours when outdoors or immediately after swimming or sweating. 
                  </Text>
                </Box>
                <Box flex={1}>
                  <Text lineHeight="2" textAlign="justify" mt={-2}>
                  Using the right amount is also essential—adults should apply a full ounce (about a shot glass) for the whole body or a teaspoon per exposed area. However, sunscreen alone isn’t enough.
                    <br /><br />
                    <Text border="5px solid #FFEFF0" borderRadius="15px" p="4" mt={2}>Additional protective measures include wearing sun-protective clothing (such as rash guards), seeking shade during peak sun hours (10 AM to 4 PM), and wearing a wide-brimmed hat.
                    </Text>
                  </Text>
                </Box>
              </Flex>
            </Box>

            {/* Regular Skin Check */}
            <Box>
              <Heading as="h2" color="#B12E34" fontSize="32px" textAlign="center" mt={10} >
              Regular Skin Check
              </Heading>
              <Flex gap={16} mt={5} mb={10}>
                <Box flex={1}>
                  <Text textAlign="justify" lineHeight="2" >
                  Most skin cancers are found by people during self-exams. If you know your skin well, you’re more likely to notice new or changing spots that could be cancerous. Perform skin self-exams regularly, looking for any new or changing moles, freckles, or other spots. Use a mirror to check hard-to-see areas, and ask a family member or friend to help with areas you can’t see yourself.
                  <br/><br/>
                  If you notice anything suspicious, see a dermatologist for a professional skin exam. They can use special tools to get a better look at your skin and determine if a biopsy is needed.
                  </Text>
                </Box>
              </Flex>
            </Box>
          </VStack>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}

export default Article3;