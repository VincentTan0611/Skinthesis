import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Image } from '@chakra-ui/react';
import { Box, Container, VStack, Text, Heading, Flex } from '@chakra-ui/react';

function Article4() {
  return (
    <Box>
      <Header />
      {/* First Section */}
      <Box bg="#B12E34" color="white" position="relative" pt="150px" pb="150px" zIndex={1}>
        <Container maxW="container.xl" centerContent>
          <VStack spacing={4} py={6}>
            <Text fontSize="xl" mt="-60px" mb="20px">Novemeber 16, 2023</Text>
            <Box w="300px" h="2px" bg="white" />
            <Heading as="h1" fontSize="78px" mt="40px">
              What are the different
            </Heading>
            <Heading as="h1" fontSize="78px" mt="40px">
              types of tumor?
            </Heading>
            <Text alignSelf="flex-end" mt="30px" mr="100px" fontSize="xl">
              by Yvette Brazier
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
          src="src/images/article 4.png"
          alt="Article Image"
          w="55%"
          h="400px"
          objectFit="cover"
          boxShadow="lg"
        />
      </Box>

      {/* Content Section */}
      <Box bg="white" position="relative" zIndex={1} pt="50px">
        <Container maxW="container.xl" px="7%">
          <VStack spacing={8} align="stretch">
            {/* Tumor */}
            <Box>
              <Heading as="h2" color="#B12E34" fontSize="32px" mt={3} mb={2}>
                What is a tumor?
              </Heading>
              <Text textAlign="justify" lineHeight="2" >
              A tumor forms when cells grow and divide uncontrollably, creating an abnormal mass of tissue. According to the National Cancer Institute, tumors develop when cells multiply excessively or fail to die as they should. They can range in size from small nodules to large masses and may appear in various parts of the body.
              </Text>
              <Heading as="h2" color="#B12E34" fontSize="32px" textAlign="center" mt={10} mb={5}>
                Types of Tumors
              </Heading>
              <Heading as="h3" color="#B12E34" fontSize="28px" textAlign="left" mt={10} mb={2}>
                1. Benign Tumors
              </Heading>
              <Text textAlign="justify" lineHeight="2" >
                Benign tumors are non-cancerous, meaning they do not invade nearby tissues or spread to other parts of the body. Once removed, they typically do not return. Most benign tumors do not cause harm or spread to other areas. However, they can create discomfort or complications if they press against nerves, blood vessels, or organs. Some may also lead to hormone overproduction, especially in endocrine-related cases.
              </Text>
            </Box>

            {/* Types of Benign Tumors Section */}
            <Box>
              <Heading as="h3" color="#B12E34" fontSize="28px" textAlign="left" mt={5} >
                Common Types of Benign Tumors
              </Heading>
              <Flex gap="5%" mt={5}>
                <Box flex={1}>
                  <Heading as="h4" color="#B12E34" fontSize="24px" textAlign="left" mt={5} >
                    a. Adenomas
                  </Heading>
                  <Text textAlign="justify" lineHeight="2" >
                    Develop in glandular epithelial tissue, including colon polyps, fibroadenomas (benign breast tumors), and hepatic adenomas (liver). Though generally harmless, some adenomas may turn into cancerous adenocarcinomas.
                  </Text>
                  <Heading as="h4" color="#B12E34" fontSize="24px" textAlign="left" mt={10} >
                    b. Fibroids (Fibromas)
                  </Heading>
                  <Text textAlign="justify" lineHeight="2" >
                    Grow in connective tissue, commonly in the uterus. They can cause symptoms such as pelvic pain, vaginal bleeding, and urinary issues. Most remain benign, but rare cases may develop into fibrosarcomas (cancerous).
                  </Text>
                  <Heading as="h4" color="#B12E34" fontSize="24px" textAlign="left" mt={10} >
                    c. Hemangiomas
                  </Heading>
                  <Text textAlign="justify" lineHeight="2" >
                    Result from excessive blood vessel growth, appearing as red skin marks or internal masses. Most disappear over time, requiring treatment only if they persist or cause complications.
                  </Text>
                  <Heading as="h4" color="#B12E34" fontSize="24px" textAlign="left" mt={10} >
                    d. Lipomas
                  </Heading>
                  <Text textAlign="justify" lineHeight="2" >
                    Soft tissue tumors composed of fat cells, often found on the back, shoulders, arms, or legs. They are usually small, painless, and non-cancerous, though doctors monitor them for any unusual changes.
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Box>
              <Heading as="h2" color="#B12E34" fontSize="32px" mt={10} mb={5}>
                Risk and Diagnosis
              </Heading>
              <Flex gap="5%" mt={10}>
                <Box flex={1}>
                  <Text lineHeight="2" textAlign="justify" pr="7%">
                    <Heading as="h3" color="#B12E34" fontSize="22px" fontWeight="bold" mb={2}>Risk Factors</Heading>
                    Benign tumors arise from genetic, hormonal, and environmental factors. Family history, hormonal imbalances, toxins, infections, and chronic inflammation can trigger abnormal growth. Poor diet, obesity, and stress may also contribute. While non-cancerous, large tumors can press on organs or nerves, causing discomfort.
                  </Text>
                </Box>
                {/* Vertical Stroke */}
                <Box width="4px" bg="#FFEFF0" minHeight="100%" />
                <Box flex={1}>
                  <Text lineHeight="2" pl="7%" textAlign="justify">
                    <Heading as="h3" color="#B12E34" fontSize="22px" fontWeight="bold" mb={2}>Benign Detection</Heading>
                    Doctors use exams, imaging (X-ray, MRI), and biopsies for diagnosis. Small, harmless tumors need monitoring, while larger ones causing issues may require removal. Though benign, some may grow or rarely turn malignant, making early detection key.
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Box>
            <Heading as="h3" color="#B12E34" fontSize="28px" textAlign="left" mt={10} mb={2}>
                2. Premaglinant Turmors
              </Heading>
              <Flex gap={16} mt={5}>
                <Box flex={1}>
                <Text textAlign="justify" lineHeight="2" >
                This type of tumor is not cancerous, but doctors will monitor them closely for changes.
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Box>
              <Heading as="h3" color="#B12E34" fontSize="28px" textAlign="left" mt={5} >
                Examples of Premaglinant Tumors
              </Heading>
              <Flex gap="5%" mt={5}>
                <Box flex={1}>
                  <Heading as="h4" color="#B12E34" fontSize="24px" textAlign="left" mt={5} >
                    a. Actinic keratosis
                  </Heading>
                  <Text textAlign="justify" lineHeight="2" >
                  Also called solar keratosis, this condition causes rough, scaly skin patches, often due to sun exposure. Fair-skinned individuals are more susceptible, and in some cases, it may develop into squamous cell carcinoma.
                  </Text>
                  <Heading as="h4" color="#B12E34" fontSize="24px" textAlign="left" mt={10} >
                    b. Cervical dysplasia
                  </Heading>
                  <Text textAlign="justify" lineHeight="2" >
                  Cervical dysplasia involves abnormal cell changes in the cervix, often detected during a Pap smear. It is commonly caused by human papillomavirus (HPV) and, while not cancerous, may develop into cervical cancer over 10–30 years. Treatment options include freezing techniques or removing a cone of tissue from the cervix.
                  </Text>
                  <Heading as="h4" color="#B12E34" fontSize="24px" textAlign="left" mt={10} >
                    c. Metaplasia of the lung
                  </Heading>
                  <Text textAlign="justify" lineHeight="2" >
                  These growths develop in the bronchi, the airways leading to the lungs. In some cases, especially among smokers, glandular cells in the bronchial lining may transform into squamous cells or become cancerous.
                  </Text>
                  <Heading as="h4" color="#B12E34" fontSize="24px" textAlign="left" mt={10} >
                    d. Leukoplakia
                  </Heading>
                  <Text textAlign="justify" lineHeight="2" >
                  Leukoplakia causes thick, white patches in the mouth that are painless, irregularly shaped, have raised edges, and cannot be scraped off. Anyone with this type of patch should see a doctor if the patches persist. Quitting smoking or chewing tobacco can also help in reduce the risking of having leukoplakia.
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Box>
            <Heading as="h3" color="#B12E34" fontSize="28px" textAlign="left" mt={10} mb={2}>
                3. Maglinant Turmors
              </Heading>
              <Flex gap={16} mt={5}>
                <Box flex={1}>
                <Text textAlign="justify" lineHeight="2" >
                Malignant tumors are cancerous growths caused by uncontrolled cell division. They can spread to other parts of the body through metastasis, though some grow more slowly than others. When cancer cells spread, they retain the characteristics of the original tumor. For example, if lung cancer spreads to the liver, the cancer cells in the liver remain lung cancer cells. If left untreated, malignant tumors can become life-threatening.
                  </Text>
                </Box>
              </Flex>
            </Box>
 
            {/* Types of Maglinant Tumors*/}
            <Box>
              <Heading as="h3" color="#B12E34" fontSize="28px" textAlign="left" mt={5} >
                Types of Maglinant Tumors
              </Heading>
              <Flex gap="5%" mt={5}>
                <Box flex={1}>
                  <Heading as="h4" color="#B12E34" fontSize="24px" textAlign="left" mt={5} >
                    a. Carcinoma
                  </Heading>
                  <Text textAlign="justify" lineHeight="2" >
                  Carcinomas originate from epithelial cells found in the skin and the lining of organs. They are among the most common malignant tumors and can develop in the stomach, prostate, pancreas, lung, liver, colon, or breast.
                  </Text>
                  <Heading as="h4" color="#B12E34" fontSize="24px" textAlign="left" mt={10} >
                    b. Sarcoma
                  </Heading>
                  <Text textAlign="justify" lineHeight="2" >
                  Sarcomas develop in connective tissues like cartilage, bones, fat, and nerves, originating from cells outside the bone marrow. Most are malignant and can spread to other parts of the body.
                  </Text>
                  <Heading as="h4" color="#B12E34" fontSize="24px" textAlign="left" mt={10} >
                    c. Germ cell tumor
                  </Heading>
                  <Text textAlign="justify" lineHeight="2" >
                  Germ cell tumors originate in the cells that produce sperm and eggs, typically forming in the ovaries or testicles but sometimes appearing in the brain, abdomen, or chest.
                  </Text>
                  <Heading as="h4" color="#B12E34" fontSize="24px" textAlign="left" mt={10} >
                    d. Blastoma
                  </Heading>
                  <Text textAlign="justify" lineHeight="2" >
                  Blastomas develop from embryonic tissue or immature cells and are more common in children than adults. They can cause tumors in the brain, eyes, or nervous system.
                  </Text>
                  <Heading as="h4" color="#B12E34" fontSize="24px" textAlign="left" mt={10} >
                    e. Meningiomas
                  </Heading>
                  <Text textAlign="justify" lineHeight="2" >
                  These are some of the most common brain tumors and may require removal or treatment if they are causing symptoms.
                  </Text>
                </Box>
              </Flex>
            </Box>

            {/* Risk & Diagnosis*/}
            <Box>
              <Heading as="h2" color="#B12E34" fontSize="32px" mt={10} mb={5}>
                Risk and Diagnosis
              </Heading>
              <Flex gap="5%" mt={10} mb={10}>
                <Box flex={1}>
                  <Text lineHeight="2" textAlign="justify" pr="7%">
                    <Heading as="h3" color="#B12E34" fontSize="22px" fontWeight="bold" mb={2}>Risk Factors</Heading>
                    The exact causes of tumor growth are often unclear, but several factors can increase the risk. Malignant tumors are linked to smoking, alcohol use, family history of cancer, tumor type, exposure to carcinogens, genetics, HPV, obesity, and being overweight, though risk levels vary by individual and cancer type. Benign tumors may develop due to frequent exposure to toxins and radiation, stress, diet, family history of tumors, and recurrent infections.
                  </Text>
                </Box>
                {/* Vertical Stroke */}
                <Box width="4px" bg="#FFEFF0" minHeight="100%" />
                <Box flex={1}>
                  <Text lineHeight="2" pl="7%" textAlign="justify">
                    <Heading as="h3" color="#B12E34" fontSize="22px" fontWeight="bold" mb={2}>Malignant Detection</Heading>
                    Malignant tumors often require imaging tests or screenings for detection. A biopsy confirms the diagnosis, with samples taken via needle or surgery if the tumor is suspected to be cancerous. Early detection is crucial, as malignant tumors can spread and become harder to treat. Regular health checkups help ensure timely diagnosis and improve treatment outcomes.
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

export default Article4;