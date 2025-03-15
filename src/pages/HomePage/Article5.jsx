import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Image } from '@chakra-ui/react';
import { Box, Container, VStack, Text, Heading, Flex } from '@chakra-ui/react';

function Article5() {
  return (
    <Box>
      <Header />
      {/* First Section */}
      <Box bg="#B12E34" color="white" position="relative" pt="150px" pb="150px" zIndex={1}>
        <Container maxW="container.xl" centerContent>
          <VStack spacing={4} py={6}>
            <Text fontSize="xl" mt="-60px" mb="20px">October 17, 2022</Text>
            <Box w="300px" h="2px" bg="white" />
            <Heading as="h1" fontSize="78px" mt="40px">
              Skin Lesions
            </Heading>
            <Text alignSelf="flex-end" mt="30px" mr="-50px" fontSize="xl">
              by Cleveland Clinic
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
          src="src/images/article 5.png"
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
            {/* What are Skin Lesions Section */}
            <Box>
              <Heading as="h2" color="#B12E34" fontSize="32px" mt={3} mb={2}>
              Skin Lesions
              </Heading>
              <Text textAlign="justify" lineHeight="2" >
                Skin lesions are areas of skin that differ from the surrounding skin. They can result from injury, infections, or underlying conditions such as autoimmune diseases. While most are benign and harmless, some may indicate serious conditions like skin cancer. Skin sores, such as ulcers, are a type of skin lesion.
              </Text>
            </Box>

            {/* Acne Section */}
            <Box>
              <Heading as="h2" color="#B12E34" fontSize="32px" textAlign="center" mt={10} mb={5}>
                Is acne a skin lesion on my face?
              </Heading>
              <Flex gap={16} mt={5}>
                <Box flex={1}>
                  <Text lineHeight="2" textAlign="justify" mt={-2}>
                    Acne is a common type of skin lesion that can present as pimples, whiteheads, blackheads, papules, or cysts. While it is often considered a cosmetic concern, acne can also cause discomfort, inflammation, and, in some cases, long-term scarring. It typically appears on areas of the body with high oil production, such as the face, chest, and back.
                    <br /><br />
                    Acne develops when hair follicles become clogged with oil, dead skin cells, and bacteria, leading to the formation of lesions. Several factors contribute to acne, including hormonal fluctuations, genetics, diet, stress, and the use of certain skincare or cosmetic products. Environmental factors, such as pollution and humidity, can also worsen breakouts by increasing oil production and trapping bacteria on the skin. Additionally, frequent touching of the face, using dirty makeup brushes, or wearing tight-fitting clothing can contribute to clogged pores and irritation.
                  </Text>
                </Box>
                <Box flex={1}>
                  <Text lineHeight="2" textAlign="justify" mt={-2}>
                    There are various treatment options available, including over-the-counter cleansers, creams, and lotions, as well as prescription medications like retinoids, antibiotics, and oral treatments for more severe cases. It is important to use non-comedogenic products that won’t clog pores and to maintain a consistent skincare routine. For persistent or severe acne, consulting a dermatologist can help create a personalized treatment plan tailored to individual skin needs.
                  </Text>
                  <Image src="src/images/skin_7.png" alt="Acne" mt={10} borderRadius="md" height="300px" width="100%" objectFit="cover" />
                  <Text fontSize="sm" color="rgba(0, 0, 0, 0.3)" mt={2} as="em" display="block" textAlign="center">
                    Acne present on the skin
                  </Text>
                </Box>
              </Flex>
            </Box>

            {/* Types of Skin Lesions*/}
            <Box>
              <Heading as="h2" color="#B12E34" fontSize="32px" textAlign="center" mt={10} mb={5}>
                Types of Skin Lesions
              </Heading>
              <Flex gap="5%" mt={5}>
                <Box flex={1}>
                  <Text lineHeight="2" textAlign="justify" pr="7%">
                    <Heading as="h3" color="#B12E34" fontSize="22px" fontWeight="bold" mb={2}>Malignant (Cancerous)</Heading>
                    <Box as="ul" pl={5} listStyleType="disc">
                      <Box as="li">
                        The most common type of cancer in the U.S.
                      </Box>
                      <Box as="li">
                        Signs include changes in moles or new, unusual growths.
                      </Box>
                      <Box as="li">
                        Treatment is personalized based on the type and severity.
                      </Box>
                    </Box>
                  </Text>
                </Box>
                {/* Vertical Stroke */}
                <Box width="4px" bg="#FFEFF0" minHeight="100%" />
                <Box flex={1}>
                  <Text lineHeight="2" pl="7%" textAlign="justify">
                    <Heading as="h3" color="#B12E34" fontSize="22px" fontWeight="bold" mb={2}>Benign (Noncancerous)</Heading>
                    <Box as="ul" pl={5} listStyleType="disc">
                      <Box as="li">
                        Harmless and often require no treatment unless for cosmetic reasons.
                      </Box>
                      <Box as="li">
                        Examples: Skin tags, cherry hemangiomas.
                      </Box>
                      <Box as="li">
                        Can be removed in a healthcare provider’s office or via an outpatient procedure.
                      </Box>
                    </Box>
                  </Text>
                </Box>
              </Flex>
            </Box>

            {/* Classify skin lesions*/}
            <Box>
              <Heading as="h2" color="#B12E34" fontSize="32px" textAlign="center" mt={10} mb={5}>
                Who is Affected and How Are They Classified?
              </Heading>
              <Flex gap={16} mt={5}>
                <Box flex={1}>
                  <Text lineHeight="2" textAlign="justify" mt={-2}>
                    Skin lesions can affect anyone, with some appearing at birth (e.g., freckles, moles) and others developing due to allergies, chronic conditions like psoriasis, or environmental factors.
                    <br /><br />
                    Skin lesions are classified as primary or secondary:
                    <Box as="ul" pl={5} listStyleType="disc">
                      <Box as="li">
                        Primary lesions: Develop on their own (e.g., acne, birthmarks, insect bites, sunburn)
                      </Box>
                      <Box as="li">
                        Secondary lesions: Result from changes in primary lesions due to itching, injury, or conditions like psoriasis (e.g., scabs, cuts, dry skin).
                      </Box>
                    </Box>
                  </Text>
                </Box>
                <Box flex={1}>
                  <Text lineHeight="2" textAlign="justify" mt={-2}>
                    Skin lesions can appear anywhere on the body, with some conditions showing distinct patterns, such as acne or eczema.
                    <br /><br />
                    Noncancerous (benign) skin lesions, such as sunburn or acne, are very common and usually harmless. While they may cause discomfort or cosmetic concerns, they typically do not pose serious health risks.
                    <br /><br />
                    In contrast, cancerous skin lesions (skin cancer) are the most common type of cancer in the United States. Approximately 1 in 5 people will develop skin cancer in their lifetime, with an estimated 9,500 new cases diagnosed daily. Early detection and treatment are crucial for better outcomes.
                  </Text>
                </Box>
              </Flex>
            </Box>

            {/* Symptoms of skin lesions */}
            <Box>
              <Heading as="h2" color="#B12E34" fontSize="32px" textAlign="center" mt={10}>
                What are the symptoms and causes of skin lesions?
              </Heading>
              <Flex gap={16} mt={5}>
                <Box flex={1}>
                  <Text lineHeight="2" textAlign="justify" mt={-2}>
                    Symptoms of a skin lesion vary depending on the type, but general signs include abnormal growth, itchiness, swelling, pain, and color changes in the affected area (such as red, brown, black, or blue discoloration).
                    <br /><br />
                    If a skin lesion increases in size or shape, causes severe pain, bleeds, leaks pus, or fails to heal as expected, it is important that you seek for medical attention immediately.
                  </Text>
                  <Image src="src/images/skin_8.png" alt="Symptoms" mt={10} borderRadius="md" height="300px" width="100%" objectFit="cover" />
                  <Text fontSize="sm" color="rgba(0, 0, 0, 0.3)" mt={2} as="em" display="block" textAlign="center">
                    Example of a symptoms of skin lesion
                  </Text>
                </Box>
                <Box flex={1}>
                  <Text lineHeight="2" textAlign="justify" mt={-2}>
                    Since there are many types of skin lesions, their causes vary widely. They may be present at birth (e.g., moles, birthmarks) or result from infections (viral: HIV, HPV; bacterial: herpes, staphylococcus). Other causes include allergic reactions (bug bites, poison ivy), medication side effects (chemotherapy), injuries (sunburn, wounds), and underlying medical conditions (poor circulation, autoimmune diseases, cancer, liver or kidney disease).
                    <br /><br />
                    <Text border="5px solid #FFEFF0" borderRadius="15px" p="4" mt={2}>If a skin lesion appears suddenly, worsens over time, or develops unusual features, seek medical attention. Additionally, if it is accompanied by symptoms like persistent pain, bleeding, or signs of infection, consult a healthcare provider immediately.
                    </Text>
                  </Text>
                </Box>
              </Flex>
            </Box>

            {/* Diagnosis and Tests */}
            <Box>
              <Heading as="h2" color="#B12E34" fontSize="32px" textAlign="center" mt={10} mb={5}>
                Diagnosis and Tests
              </Heading>
              <Flex gap="5%" mt={5}>
                <Box flex={1}>
                  <Text lineHeight="2" textAlign="justify" pr="7%">
                    <Heading as="h3" color="#B12E34" fontSize="22px" fontWeight="bold" mb={2}>How Are Skin Lesions Diagnosed?</Heading>
                    A healthcare provider will examine the skin visually, to assess characteristics such as:
                    <Box as="ul" pl={5} listStyleType="disc">
                      <Box as="li">
                        Size
                      </Box>
                      <Box as="li">
                        Shape
                      </Box>
                      <Box as="li">
                        Texture
                      </Box>
                      <Box as="li">
                        Color
                      </Box>
                      <Box as="li">
                        Quality
                      </Box>
                      <Box as="li">
                        Depth
                      </Box>
                    </Box>
                  </Text>
                </Box>
                {/* Vertical Stroke */}
                <Box width="4px" bg="#FFEFF0" minHeight="100%" />
                <Box flex={1}>
                  <Text lineHeight="2" pl="7%" textAlign="justify">
                    <Heading as="h3" color="#B12E34" fontSize="22px" fontWeight="bold" mb={2}>Diagnostic Tests for Skin Lesions</Heading>
                    While many skin lesions do not require testing, some cases may involve:
                    <Box as="ul" pl={5} listStyleType="disc">
                      <Box as="li">
                        Allergy tests
                      </Box>
                      <Box as="li">
                        Blood tests
                      </Box>
                      <Box as="li">
                        Microbial swabs
                      </Box>
                      <Box as="li">
                        Imaging tests (X-ray)
                      </Box>
                      <Box as="li">
                        Biopsies
                      </Box>
                    </Box>
                  </Text>
                </Box>
              </Flex>
            </Box>

            {/* Treatment Section */}
            <Box>
              <Heading as="h2" color="#B12E34" fontSize="32px" textAlign="center" mt={10} mb={5}>
                Treatment for Skin Lesions
              </Heading>
              <Flex gap="5%" mt={5}>
                <Box flex={1}>
                  <Text lineHeight="2" textAlign="justify" pr="7%">
                    Treatment is given based on the type of lesion diagnosed:
                    <Box as="ul" pl={5} listStyleType="disc">
                      <Box as="li">
                        <strong>Primary lesions: </strong>Often treated with topical creams, oral medications, or, in some cases, surgical removal.
                      </Box>
                      <Box as="li">
                        <strong>Secondary lesions (due to medical conditions): </strong>Managed by treating the underlying condition.
                      </Box>
                      <Box as="li">
                        <strong>Malignant lesions (skin cancer): </strong>Typically require surgical removal and may involve additional treatments.
                      </Box>
                    </Box>
                  </Text>
                </Box>
                {/* Vertical Stroke */}
                <Box width="4px" bg="#FFEFF0" minHeight="100%" />
                <Box flex={1}>
                  <Text lineHeight="2" pl="7%" textAlign="justify">
                    Skin lesions can be removed but depends on the type of skin lesions being diagnosed.
                    Benign lesions, such as skin tags or cherry hemangiomas, can be removed for cosmetic reasons, often through minor in-office procedures. Malignant lesions require a personalized treatment plan, which may include surgery and other therapies.</Text>
                </Box>
              </Flex>
            </Box>

            {/* Risk Reduction */}
            <Box>
              <Heading as="h2" color="#B12E34" fontSize="32px" textAlign="center" mt={14} mb={2}>
                How can I reduce my risk of skin lesions?
              </Heading>
              <Text textAlign="justify" lineHeight="2" >
                While not all benign skin conditions can be prevented, you can reduce your risk by:
                <Box as="ul" pl={5} listStyleType="disc">
                  <Box as="li">
                    Using non-comedogenic skincare products. (Eg. Topical creams, oral medications, or  surgical removal)
                  </Box>
                  <Box as="li">
                    Taking precautions during physical activities to avoid injury.
                  </Box>
                  <Box as="li">
                    Avoiding known allergens.
                  </Box>
                  <Box as="li">
                    Practicing good hygiene.
                  </Box>
                </Box>  
              </Text>
              <br/>
              <Text textAlign="justify" lineHeight="2" >
              To help prevent malignant skin lesions, such as skin cancer:
                <Box as="ul" pl={5} listStyleType="disc">
                  <Box as="li">
                  Wear sunscreen regularly.
                  </Box>
                  <Box as="li">
                  Limit sun exposure.
                  </Box>
                  <Box as="li">
                  Avoid tanning beds.
                  </Box>
                </Box>  
              </Text>
            </Box>

            {/* Prognosis */}
            <Box>
              <Heading as="h2" color="#B12E34" fontSize="32px" mt={14} mb={2}>
              Prognosis
              </Heading>
              <Text textAlign="justify" lineHeight="2" >
              Benign skin lesions pose no threat to your overall health and primarily affect your skin’s appearance. If desired, a healthcare provider can offer treatment options or remove certain types of lesions for cosmetic reasons.
              In contrast, early detection of skin cancer significantly improves outcomes and may lead to a cure through removal. However, once melanoma spreads to the lymph nodes, survival rates drop considerably. If you notice any abnormal lesions, it’s crucial to have them checked by a doctor as soon as possible.
              </Text>
            </Box>

            {/* Healthcare Provider */}
            <Box>
              <Heading as="h2" color="#B12E34" fontSize="32px" textAlign="center" mt={14} >
              When Should I See My Healthcare Provider?
              </Heading>
              <Text lineHeight="2" textAlign="justify" mt={4} mb={10}>
              You should consult your healthcare provider if your skin lesion causes pain or discomfort, changes in size, shape, or color, or appears as an open wound that won’t heal. Prompt evaluation can help determine if further treatment is necessary. When discussing your skin lesion with your doctor, you may want to ask if it could be skin cancer, whether it can be removed, and if it might be part of a more complex disease. Understanding the nature of your lesion can help you make informed decisions about treatment and management.
              </Text>
            </Box>
          </VStack>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}

export default Article5;