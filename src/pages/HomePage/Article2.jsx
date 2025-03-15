import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Image } from '@chakra-ui/react';
import { Box, Container, VStack, Text, Heading, Flex } from '@chakra-ui/react';

function Article2() {
  return (
    <Box>
      <Header />
      {/* First Section */}
      <Box bg="#B12E34" color="white" position="relative" pt="150px" pb="150px" zIndex={1}>
        <Container maxW="container.xl" centerContent>
          <VStack spacing={4} py={6}>
            <Text fontSize="xl" mt="-60px" mb="20px">November 16, 2019</Text>
            <Box w="300px" h="2px" bg="white" />
            <Heading as="h1" fontSize="78px" mt="40px" textalign="center">
              Recognising Skin Cancer
            </Heading>
            <Heading as="h1" fontSize="78px" textalign="center" mt="40px">
              in Primary Care
            </Heading>
            <Text alignSelf="flex-end" mt="30px" mr="200px" fontSize="xl">
              by Owain T Jones
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
          src="src/images/article 2.png"
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
            {/* Background */}
            <Box>
              <Heading as="h2" color="#B12E34" fontSize="32px" mt={3} mb={2}>
                Background
              </Heading>
              <Text textAlign="justify" lineHeight="2" >
                Skin cancer, including melanoma, basal cell carcinoma (BCC), and cutaneous squamous cell carcinoma (SCC), is among the most common cancers worldwide. Melanoma, the fifth most common cancer in the UK, had around 16,000 diagnoses in 2016, with early detection improving 5-year survival rates to 95%. However, melanoma is highly metastatic and accounts for up to 90% of skin cancer deaths. Its incidence has quadrupled among Caucasian populations in the UK over the last 30 years and is projected to rise by 7% over the next two decades. Non-melanoma skin cancers (NMSC), also known as keratinocyte carcinomas (KCs), are prevalent, with over 142,000 UK cases in 2015, comprising 80% BCC and 20% SCC. Their incidence has surged by 61% in the past decade.
                <br /><br />
                Most skin cancer cases in the UK first present in primary care, where clinicians must differentiate between malignant and benign lesions. The National Cancer Diagnosis Audit in England found that the median primary care interval for melanoma referrals was 0 days, indicating timely recognition. However, prolonged delays occurred in some cases, and only 3% of patients referred via the urgent suspected cancer ‘2-week-wait’ (2WW) system were diagnosed with melanoma. This suggests that improved triage in primary care could reduce patient anxiety and specialist workload.
              </Text>
            </Box>

            {/* Symptoms */}
            <Box>
              <Heading as="h2" color="#B12E34" fontSize="32px" textAlign="center" mt={10} mb={5}>
                Risk Factors & Prevention
              </Heading>
              <Flex gap="5%" mt={5}>
                <Box flex={1}>
                  <Text lineHeight="2" textAlign="justify" pr="7%">
                    <Heading as="h3" color="#B12E34" fontSize="22px" fontWeight="bold" mb={2}>Risk Factors</Heading>
                    Risk Factors that may cause skin cancer:
                    <Box as="ul" pl={5} listStyleType="disc">
                      <Box as="li">
                        Skin cancer incidence increases with age, peaking in those over 75.
                      </Box>
                      <Box as="li">
                        25% of melanomas occur in individuals aged 50 and under.
                      </Box>
                      <Box as="li">
                        UV radiation exposure is the primary risk factor, responsible for 80%+ of melanomas.
                      </Box>
                      <Box as="li">
                        Both long-term and intense short-term UV exposure (e.g., sunburns, sunbeds) increase risk.
                      </Box>
                      <Box as="li">
                        SCC which is mainly caused by cumulative UV exposure & BCC is Primarily linked to intermittent UV exposure.
                      </Box>
                    </Box>
                  </Text>
                </Box>
                {/* Vertical Stroke */}
                <Box width="4px" bg="#FFEFF0" minHeight="100%" />
                <Box flex={1}>
                  <Text lineHeight="2" pl="7%" textAlign="justify">
                    <Heading as="h3" color="#B12E34" fontSize="22px" fontWeight="bold" mb={2}>Prevention</Heading>
                    Prevention to take to avoid skin cancer:
                    <Box as="ul" pl={5} listStyleType="disc">
                      <Box as="li">
                        Educate patients on sun exposure risks and benefits.
                      </Box>
                      <Box as="li">
                        Provide personalized prevention advice based on individual risk.
                      </Box>
                      <Box as="li">
                        Use tailored messages to improve awareness.
                      </Box>
                      <Box as="li">
                        Highlight the appearance-damaging effects of UV exposure to encourage prevention.
                      </Box>
                    </Box>
                  </Text>
                </Box>
              </Flex>
            </Box>

            {/* Types of Skin Cancer*/}
            <Box>
              <Heading as="h2" color="#B12E34" fontSize="32px" mt={10}>
                Screening
              </Heading>
              <Flex gap={16} mt={5}>
                <Box flex={1}>
                  <Text textAlign="justify" lineHeight="2" >
                    There is no evidence worldwide to support the use of screening programs at a population level, although there is recent research interest in using risk assessment models to identify people at higher risk of melanoma, for personalized approaches to surveillance. Guidelines in the USA recommend screening for patients at high risk of melanoma due to a strong family or personal history of skin cancer, and the Royal Australian College of General Practitioners’ guidance suggests a 6-monthly full-skin examination for patients at high risk of melanoma and annually for those at high risk of KC. Interestingly, a recent systematic review assessing BCC screening against the World Health Organisation screening criteria concluded that it may be beneficial for lesions on the face.
                  </Text>
                </Box>
              </Flex>
            </Box>

            {/* Detecting Skin Cancer */}
            <Box>
              <Heading as="h2" color="#B12E34" fontSize="32px" textAlign="center" mt={10} >
                Detecting Skin Cancer in Primary Care
              </Heading>
              <Heading as="h3" color="#B12E34" fontSize="28px" textAlign="left" mt={10} >
                1. Melanoma
              </Heading>
              <Heading as="h4" color="#B12E34" fontSize="24px" textAlign="left" mt={10} >
                Signs and Symptoms
              </Heading>
              <Text mt={5} mb={5}>
                There are five types of melanoma that can be present on the skin. These include the superficial spreading melanoma presents as a changing pigmented skin lesion. Nodular melanomas occur on the head and neck of older people, they tend to grow quickly and are usually firm. Lentigo maligna develops as a slow-growing pigmented macule. Acral lentiginous melanomas occur on palms, soles, and under nails. Amelanotic melanomas can appear as non-pigmented lesions.
              </Text>
              <Heading as="h4" color="#B12E34" fontSize="24px" textAlign="left" mt={10} >
                Management
              </Heading>
              <Text mt={5} mb={5}>
                Use the weighted Glasgow 7-point checklist to assess suspicious lesions. Refer lesions scoring 3 or more via an urgent suspected cancer pathway. Do not excise suspected melanoma in primary care. Consider routine referral for those at high risk of developing melanoma.
              </Text>

              <Heading as="h3" color="#B12E34" fontSize="28px" textAlign="left" mt={10} >
                2. Squamous Cell Carcinoma (SCC)
              </Heading>
              <Heading as="h4" color="#B12E34" fontSize="24px" textAlign="left" mt={10} >
                Signs and Symptoms
              </Heading>
              <Text mt={5} mb={5}>
                SCCs typically appear on sun-exposed areas as indurated, nodular, crusted lesions or ulcers. In situ SCC (Bowen’s disease) appears as erythematous, scaly plaques. A variant of SCC is known as keratoacanthomas, which are fast-growing nodules with a central hyperkeratotic region. High-risk SCCs include those on the lips, ears, non-sun-exposed sites, in areas of previous injury, those that are larger than 2 cm in diameter, are in immunocompromised patients, or are a recurrence of a previously treated lesion.
              </Text>
              <Heading as="h4" color="#B12E34" fontSize="24px" textAlign="left" mt={10} >
                Management
              </Heading>
              <Text mt={5} mb={5}>
                Like melanoma, SCC diagnosis requires excision and histopathological examination. Suspected cases should be urgently referred to secondary care via the suspected cancer pathway.
              </Text>

              <Heading as="h3" color="#B12E34" fontSize="28px" textAlign="left" mt={10} >
                3. Basal Cell Carcinoma (BCC)
              </Heading>
              <Heading as="h4" color="#B12E34" fontSize="24px" textAlign="left" mt={10} >
                Signs and Symptoms
              </Heading>
              <Text mt={5} mb={5}>
                BCCs can occured in different types and one of them is nodular and micro-nodular BCCs which present as pearly pink or white papules or nodules. Superficial BCCs can be seen as erythematous and scaly plaques. Morphoeic BCCs can be easily identified by their scar-like lesions characteristic. Pigmented BCCs are brown, blue, or greyish while basosquamous BCCs have mixed characteristics and can be more aggressive.
              </Text>
              <Heading as="h4" color="#B12E34" fontSize="24px" textAlign="left" mt={10} >
                Management
              </Heading>
              <Text mt={5} mb={5}>
                The 2010 NICE guidelines allow trained primary care clinicians to excise low-risk BCCs, subject to local policies. Other cases require specialist referral, with urgent referral recommended if delay may significantly impact outcomes.
              </Text>
            </Box>

            {/* Evaluation of Skin Lesion */}
            <Box>
              <Heading as="h2" color="#B12E34" fontSize="32px" textAlign="center" mt={6} >
                Evaluate Skin Lesions in Primary Care
              </Heading>
              <Flex gap="5%" mt={5} mb={10}>
                <Box flex={1}>
                  <Text lineHeight="2" textAlign="justify" pr="7%">
                    <Heading as="h3" color="#B12E34" fontSize="22px" fontWeight="bold" mb={2}>Dermoscopy</Heading>
                    Dermoscopy can help assess skin lesions by visualizing subsurface structures. However, there is insufficient evidence to support routine use of dermoscopy by primary care clinicians. Further evidence is needed on patient acceptability, training requirements, and cost-effectiveness.
                  </Text>
                  <Image src="src/images/skin_3.png" alt="Dermoscopy" mt={10} borderRadius="md" height="300px" width="100%" objectFit="cover" pr="7%" />
                  <Text fontSize="sm" color="rgba(0, 0, 0, 0.3)" mt={2} as="em" display="block" textAlign="center" pr="7%" >
                    Visualizing the structure of skin lesion using dermascopy
                  </Text>
                </Box>
                {/* Vertical Stroke */}
                <Box width="4px" bg="#FFEFF0" minHeight="100%" />
                <Box flex={1}>
                  <Text lineHeight="2" pl="7%" textAlign="justify">
                    <Heading as="h3" color="#B12E34" fontSize="22px" fontWeight="bold" mb={2}>Teledermatology</Heading>
                    Teledermatology uses information technology to share digital images of lesions with dermatology specialists. It is accurate for identifying the majority of malignant lesions, but further research is needed to determine its diagnostic accuracy, feasibility, and cost-effectiveness as a triaging tool.
                  </Text>
                  <Image src="src/images/skin_4.png" alt="Teledermatology" mt={10} borderRadius="md" height="300px" width="100%" objectFit="cover" pl="7%"  />
                  <Text fontSize="sm" color="rgba(0, 0, 0, 0.3)" mt={2} as="em" display="block" textAlign="center" pl="7%" >
                    Idenitfying malignant on skin using teledermatology
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

export default Article2;