import React, { useState } from "react";
import { useDispatch } from "react-redux";

// Api
import { post } from "../../../../api/api";

//actions
import { uploadFileRequest, uploadFileSuccess, uploadFileFailure } from "ducks/uploadFiles";
import { transcribeRequest, transcribeSuccess, transcribeFailure } from "ducks/transcribeAudio";

// Components
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";

// Assets
import { MdUpload } from "react-icons/md";
import Dropzone from "views/admin/results/components/Dropzone";

export default function Upload(props) {

  const dispatch = useDispatch();

  const { used, total, ...rest } = props;
  const [file, setFile] = useState();
  console.log("🚀 ~ file: Upload.js:28 ~ Upload ~ file:", file)

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const textColorSecondary = "gray.400";

  const handleTranscribeAudio = async () => {
    try {
      dispatch(transcribeRequest());
      const result = await post('/transcribe', { filename : file.path });
      dispatch(transcribeSuccess(result));
    }
    catch (error) {
      console.log("🚀 ~ file: Upload.js:47 ~ handleTranscribeAudio ~ error:", error.response)
      const errorCode = error.response?.data?.error || "UnexpectedError";
      const errorMessage = error.response?.data?.message || "Un error inesperado ocurrió.";
      dispatch(transcribeFailure(errorCode, errorMessage));
    }
}

  const handleFileUpload = async () => {

    dispatch(uploadFileRequest());

    const formData = new FormData();
    formData.append('file', file);

    try {
      const result = await post('/upload', formData);
      dispatch(uploadFileSuccess(result));
      handleTranscribeAudio(result.file);
    } catch (error) {
      console.log("🚀 ~ file: Upload.js:46 ~ handleFileUpload ~ error:", error)
      dispatch(uploadFileFailure(error.message));
    }
  };



  return (
    <Card {...rest} mb='20px' align='center' p='20px'>
      <Flex h='100%' direction={{ base: "column", "2xl": "row" }}>
        <Dropzone
          onFileSelected={(selectedFile) => setFile(selectedFile)}
          w={{ base: "100%", "2xl": "268px" }}
          me='36px'
          maxH={{ base: "60%", lg: "50%", "2xl": "100%" }}
          minH={{ base: "60%", lg: "50%", "2xl": "100%" }}
          content={
            <Box>
              <Icon as={MdUpload} w='80px' h='80px' color={brandColor} />
              <Flex justify='center' mx='auto'mb='12px'>
                <Text fontSize='xl' fontWeight='700' color={brandColor} textAlign='center'>
                  Haz Click Aquí
                </Text>
              </Flex>
              <Text fontSize='sm' fontWeight='500' color='secondaryGray.500'>
                Formato del archivo: MP3, WAV
              </Text>
            </Box>
          }
        />
        <Flex direction='column' pe='44px'>
          <Text
            color={textColorPrimary}
            fontWeight='bold'
            textAlign='start'
            fontSize='2xl'
            mt={{ base: "20px", "2xl": "50px" }}>
            Subir Archivo para Analizar
          </Text>
          <Text
            color={textColorSecondary}
            fontSize='md'
            my={{ base: "auto", "2xl": "10px" }}
            mx='auto'
            textAlign='start'>
              El resultado del análisis lo puedes ver en el menú "Resultados".
          </Text>
          <Flex w='100%'>
            <Button
              onClick={handleFileUpload}
              me='100%'
              mb='50px'
              w='140px'
              minW='140px'
              mt={{ base: "20px", "2xl": "auto" }}
              variant='brand'
              fontWeight='500'>
              Enviar Audio
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
