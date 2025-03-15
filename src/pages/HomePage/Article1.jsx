import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Image } from '@chakra-ui/react';
import { Box, Container, VStack, Text, Heading, Flex } from '@chakra-ui/react';

function Article1() {
  return (
    <Box>
      <Header />
      {/* First Section */}
      <Box bg="#B12E34" color="white" position="relative" pt="150px" pb="150px" zIndex={1}>
        <Container maxW="container.xl" centerContent>
          <VStack spacing={4} py={6}>
            <Text fontSize="md" mt="-60px" mb="5px">February 18, 2024</Text>
            <Box w="300px" h="2px" bg="white" />
            <Heading as="h1" fontSize="60px" mt="40px">
              Skin Cancer
            </Heading>
            <Text alignSelf="flex-end" mt="30px" mr="-100px" fontSize="md">
              by Mallika Marshall, MD
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Placeholder Image Section (Separate) */}
      <Box
        position="relative" // Keep it relative so it doesn't interfere with other sections
        mt="-150px" // Move it up to overlap the first section
        display="flex"
        justifyContent="center"
        zIndex={10} // Ensure it's above the first section
      >
        <Image
          src="src/images/article 1.png"
          alt="Article Image"
          w="55%"
          h="400px"
          objectFit="cover"
          boxShadow="lg"
        />
      </Box>

      {/* Content Sections */}
      <Box bg="white" position="relative" zIndex={1} pt="50px">
        <Container maxW="container.xl" px="6%">
          <VStack spacing={8} align="stretch">
            {/* What is Skin Cancer Section */}
            <Box>
              <Heading as="h2" color="#B12E34" fontSize="28px" mt={3} mb={2}>
                What is Skin Cancer
              </Heading>
              <Text textAlign="justify" lineHeight="2" >
                Skin cancer develops when skin cells are damaged by UV rays from the sun or tanning beds. The most common types are basal cell carcinoma (BCC) and squamous cell carcinoma (SCC), both slow-growing and treatable but potentially disfiguring. Melanoma, though less common, is the most dangerous and responsible for most skin cancer deaths. Skin cancer typically forms on sun-exposed areas like the face, neck, and arms, but can also appear on areas like palms, nails, and genitals. Risk factors for skin cancer include fair skin, blond or red hair, blue/green/gray eyes, easy sunburn, family history, large or abnormal moles, past sunburns, and older age. To reduce risk, protect your skin from UV rays by using sunscreen, wearing protective clothing, sunglasses, and a wide-brim hat.
              </Text>
            </Box>

            {/* Symptoms Section */}
            <Box>
              <Heading as="h2" color="#B12E34" fontSize="28px" textAlign="center" mt={10} mb={5}>
                What are the symptoms of skin cancer?
              </Heading>
              <Flex gap="5%" mt={5}>
                <Box flex={1}>
                  <Text lineHeight="2" textAlign="justify">
                    Skin cancers often appear on sun-exposed areas like the face, ears, neck, lips, and hands, but can also develop in scars or rashes. Basal cell carcinoma (BCC) typically appears as small, painless bumps with a pink, pearly surface. As it grows, the center may become sore, bleed, crust, or form a scab. BCC is most common on the face but can also appear on the ears, back, or neck.
                    <br /><br />
                    Squamous cell carcinoma (SCC) starts as a small, red, painless lump or patch that may become a non-healing sore, typically on the head, ears, or hands. Melanoma appears as a dark spot, often on the back, chest, or legs, and can develop from normal skin or an existing mole.
                  </Text>
                </Box>
                {/* Vertical Stroke */}
                <Box width="2px" bg="#b12e34" minHeight="100%" />
                <Box flex={1}>
                  <Text lineHeight="2" textAlign="justify">
                    <Heading as="h3" color="#B12E34" fontWeight="bold" mb={2}>ABCDE Guidelines</Heading>
                    The ABCDE guideline helps identify possible melanoma signs:
                    <Box as="ul" pl={5} listStyleType="disc">
                      <Box as="li">
                        <strong>Asymmetry (A): </strong>One half doesn't match the other.
                      </Box>
                      <Box as="li">
                        <strong>Border (B): </strong>Irregularity – Edges are ragged or blurry.
                      </Box>
                      <Box as="li">
                        <strong>Color (C): </strong>Uneven pigmentation, including tan, brown, black, red, white, or blue.
                      </Box>
                      <Box as="li">
                        <strong>Diameter (D): </strong>Larger than 1/4 inch, though melanomas can be smaller.
                      </Box>
                      <Box as="li">
                        <strong>Evolving (E): </strong>Changes in size, shape, color, or texture, or if it itches, hurts, or bleeds.
                      </Box>
                    </Box>
                  </Text>
                </Box>
              </Flex>
            </Box>

            {/* Types of Skin Cancer*/}
            <Box>
              <Heading as="h2" color="#B12E34" fontSize="28px" mt={10}>
                Types of Skin Cancer
              </Heading>
              <Flex gap={16} mt={5}>
                <Box flex={1}>
                  <Text lineHeight="2" textAlign="justify" mt={-2}>
                    hiBasal cell carcinoma (BCC) is the most common skin cancer, making up about 80% of cases. It begins in basal cells deep in the epidermis and grows slowly, rarely spreading to other parts of the body. However, if untreated, BCC can invade nearby areas, damaging bone and tissue. BCCs can recur if not completely removed and people with BCC are at a higher risk of developing new ones.
                    <br /><br />
                    The two most common skin cancers are basal cell carcinoma (BCC) and squamous cell carcinoma (SCC). Melanoma and the rare Merkel cell carcinoma are less common but are leading causes of death from skin cancer due to their aggressive nature and potential to spread rapidly. Most skin cancers begin in the epidermis, and the primary difference between them lies in the type of cell from which they originate.
                    <br /><br />
                    Melanoma is a deadly form of skin cancer that develops from melanocytes in the bottom layer of the epidermis, the cells responsible for producing pigment. Although it accounts for only about 1% of all skin cancers, it is the most aggressive type because melanoma cells can rapidly multiply, invade nearby tissues, and spread to other parts of the body through the bloodstream and lymphatic system. Early detection and prompt treatment are crucial in improving survival rates and preventing severe complications.
                  </Text>
                </Box>
                <Box flex={1}>
                  <Text lineHeight="2" textAlign="justify" mt={-2}>
                    Squamous cell carcinoma (SCC) makes up about 20% of skin cancers and starts in the squamous cells in the outer layers of the epidermis. SCCs can develop from precancerous actinic keratosis, which is common in older adults with a history of prolonged sun exposure. While SCCs are generally slow-growing, they are more aggressive than basal cell carcinomas (BCCs) and have a higher likelihood of invading deeper layers of the skin.
                    <br /><br />
                    Merkel cell carcinoma is extremely rare, 40 times less common than melanoma, and originates in Merkel cells within the basal cell layer. This type of skin cancer grows and spreads rapidly and is the second most common cause of skin cancer-related death after melanoma.
                  </Text>
                  <Image src="src/images/skin_2.png" alt="Melanoma Symptoms" mt={10} borderRadius="md" height="300px" width="100%" objectFit="cover" />
                  <Text fontSize="sm" color="rgba(0, 0, 0, 0.3)" mt={2} as="em" display="block" textAlign="center">
                    Merkel cell carcinoma present on the skin
                  </Text>
                </Box>
              </Flex>
            </Box>

            {/* What is Melanoma */}
            <Box>
              <Heading as="h2" color="#B12E34" fontSize="28px" mt={10}>
                What is melanoma?
              </Heading>
              <Flex gap={16} mt={5}>
                <Box flex={1}>
                  <Text lineHeight="2" textAlign="justify" mt={-2}>
                    Melanoma is the deadliest form of skin cancer, occurring when melanocytes, the cells that give skin its color, begin to grow uncontrollably. It can develop quickly and spread to other parts of the body. Melanoma often appears as a dark spot, usually larger than 6 mm (about the size of a pencil eraser), but it can be smaller. It may form from an existing mole or develop on normal skin. Risk factors include a new mole after age 30, a mole in an area rarely exposed to the sun, changes in an existing mole, atypical moles, or having 20 or more moles larger than 2 mm.
                    <br /><br />
                    The most common sites for melanoma are the face (especially in older adults), upper trunk (mainly in men), and legs (primarily in women). It can also develop in less typical areas, such as under the fingernails or toenails, on the genitals, or inside the eye.
                  </Text>
                  <Image src="src/images/skin_1.png" alt="Melanoma Symptoms" mt={4} borderRadius="md" height="300px" width="100%" objectFit="cover" />
                  <Text fontSize="sm" color="rgba(0, 0, 0, 0.3)" mt={2} as="em" display="block" textAlign="center">
                    Dark spot shown on the skin
                  </Text>
                </Box>
                <Box flex={1}>
                  <Text lineHeight="2" textAlign="justify" mt={-2}>
                    People at increased risk for melanoma should have regular checkups with their doctor or dermatologist to monitor any skin changes. Since some melanomas can develop from existing moles, atypical or irregularly shaped moles may be removed, as they have a higher likelihood of becoming cancerous over time. To diagnose melanoma, a doctor typically performs a biopsy, removing a small sample of the mole and surrounding tissue for examination under a microscope. Early detection and prompt treatment significantly improve outcomes.
                    <br /><br />
                    <Text border="2px solid #b12e34" borderRadius="0px" px="5" py="2" mt={2}>Melanoma is classified into five stages, from 0 to 4, based on thickness, depth, and spread. Higher stages indicate more severe disease and a worse prognosis. Tumors confined to the skin's surface are often curable, while deeper ones require aggressive treatment. When treated early, with tumors under 0.75 mm deep, over 95% of people remain cancer-free for up to eight years. However, survival rates drop significantly for deeper melanomas, especially if they spread beyond the skin, making early detection crucial.
                    </Text>
                  </Text>
                </Box>
              </Flex>
            </Box>

            {/* Prevention Section */}
            <Box>
              <Heading as="h2" color="#B12E34" fontSize="28px" textAlign="center" mt={10} >
                How can you prevent skin cancer?
              </Heading>
              <Text mt={5} mb={5}>
                To help prevent skin cancer, follow standard sun protection guidelines. For example:
              </Text>
              <Heading as="h3" color="#B12E34" mt={6} mb={4}>
                Sunscreen
              </Heading>
              <Text lineHeight="2" textAlign="justify" mt={-2}>
                The key to sunscreen is to apply it early and often. Apply 15–20 minutes before going outside, then reapply every two hours. Use at least two tablespoons to cover exposed areas, with a nickel-sized amount for the face. Don't forget areas like the ears, tops of the feet, and backs of the legs. Choose a sunscreen with broad-spectrum coverage, an SPF of 30–50, and water resistance. Broad-spectrum protects against both UVB rays (causing sunburn) and UVA rays (contributing to skin aging and cancer risk). SPF 30 blocks 97% of UVB rays, and SPF 50 blocks 98%, with minimal extra protection above SPF 70. Water-resistant sunscreen should be reapplied after swimming or sweating.
              </Text>
              <Heading as="h3" color="#B12E34" mt={6} mb={4}>
                Attire
              </Heading>
              <Text lineHeight="2" textAlign="justify" mt={-2}>
                Wear a hat with a four-inch brim and sunglasses that block sunlight from the sides. Choose clothing made from synthetic fibers like polyester, Lycra, nylon, and acrylic, as they block more UV rays. Darker colors offer better protection than lighter ones. Some brands offer sun-protective clothing labeled with a UPF (ultraviolet protection factor) number, indicating how much UV radiation can penetrate. For example, a shirt with a UPF of 50 lets only 1/50th of UV rays through.
              </Text>
              <Heading as="h3" color="#B12E34" mt={6} mb={4}>
                Time
              </Heading>
              <Text lineHeight="2" textAlign="justify" mt={-2}>
                Avoid the sun from 10 a.m. to 2 p.m., when UV radiation is strongest. Get a professional skin check every 1-2 years, or more often if you have a history of skin cancer or a strong family history. Regularly examine your skin for unusual spots or moles, and ask a partner to check areas you can't see. See your doctor or dermatologist if you notice any suspicious changes, such as growth, darkening, or shape shifts in moles.
              </Text>
            </Box>

            {/* Treatment Section */}
            <Box>
              <Heading as="h2" color="#B12E34" fontSize="28px" textAlign="center" mt={6} >
                How is skin cancer treated?
              </Heading>
              <Text lineHeight="2" textAlign="justify" mt={4}>
                Early detection makes most skin cancers treatable. Treatment depends on type, size, location, and spread. Mohs surgery, where layers are removed and examined, helps preserve healthy skin while ensuring all cancer is excised. If melanoma is over 1mm deep, doctors check nearby lymph nodes. If cancer is found, nodes may be removed, though this doesn’t guarantee better survival. For limited spread, surgery can improve survival chances.
                <br /><br />
                Surgery is the main treatment for localized melanoma, removing the tumor with 0.5 to 2 cm of surrounding skin to reduce recurrence. For deeper or metastatic cases, immunotherapy or targeted drugs are often used. Radiation and chemotherapy are less effective but may be options if other treatments fail.
              </Text>
              <Text lineHeight="2" textAlign="justify" mt={4} mb={10}>
                Basal cell carcinoma (BCC) and squamous cell carcinoma (SCC) share similar treatments, including:
                <Box as="ul" pl={5} listStyleType="disc" paddingLeft="20px">
                  <Box as="li">Removing cancer and surrounding tissue, sometimes with a skin graft</Box>
                  <Box as="li">Scraping and using an electric probe to remove remaining cells</Box>
                  <Box as="li">Freezing cancer cells with liquid nitrogen</Box>
                  <Box as="li">Destroying the tumor with radiation</Box>
                  <Box as="li">Mohs surgery</Box>
                  <Box as="li">Injecting or applying drugs to the tumor</Box>
                  <Box as="li">Using a laser to destroy cancer cells</Box>
                </Box>
              </Text>
            </Box>
          </VStack>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}

export default Article1;