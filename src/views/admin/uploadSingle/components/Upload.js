import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Api
import { post } from "../../../../api/api";

//actions
import {
  uploadFileRequest,
  uploadFileSuccess,
  uploadFileFailure,
} from "ducks/uploadFiles";
import {
  transcribeRequest,
  transcribeSuccess,
  transcribeFailure,
} from "ducks/transcribeAudio";

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
import { MdCheck } from "react-icons/md";
import { MdError } from "react-icons/md";
import Dropzone from "./Dropzone";

export default function Upload(props) {
  const dispatch = useDispatch();

  const { used, total, ...rest } = props;
  const [file, setFile] = useState();
  const [uploadOk, setUploadOk] = useState(null);
  const { errorCode } = useSelector((state) => state.uploadFile);

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const textColorSecondary = "gray.400";


  // ESTO NO VA ACA
  const handleTranscribeAudio = async () => {
    try {
      dispatch(transcribeRequest());
      const result = await post("/transcribe", { filename: file.path });
      dispatch(transcribeSuccess(result));
    } catch (error) {
      const errorCode = error.response?.data?.error || "UnexpectedError";
      const errorMessage =
        error.response?.data?.message || "Un error inesperado ocurrió.";
      dispatch(transcribeFailure(errorCode, errorMessage));
    }
  };

  const handleFileUpload = async () => {
    dispatch(uploadFileRequest());

    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await post("/upload", formData);
      dispatch(uploadFileSuccess(result));
      handleTranscribeAudio(result.file);
      setUploadOk(true);
    } catch (error) {
      const errorCode = error.response?.data?.error || "UnexpectedError";
      const errorMessage =
        error.response?.data?.message || "Un error inesperado ocurrió.";
      dispatch(uploadFileFailure(errorCode, errorMessage));
      setUploadOk(false);
    }
  };

  // TODO: handle reintento donde uploadOk vuelve a null

  const hadleResetButton = () => {
    setUploadOk(null);
    setFile(null);
  };

  return (
    <Card {...rest} mb="20px" align="center" p="20px">
      <Flex h="100%" direction={{ base: "column", "2xl": "row" }}>
        <Dropzone
          onFileSelected={(selectedFile) => setFile(selectedFile)}
          isDisabled={uploadOk}
          w={{ base: "100%", "2xl": "50%" }}
          me="36px"
          maxH={{ base: "60%", lg: "50%", "2xl": "100%" }}
          minH={{ base: "60%", lg: "50%", "2xl": "100%" }}
          content={
            <Box>
              <Icon
                as={uploadOk === null ? MdUpload : uploadOk ? MdCheck : MdError}
                w="80px"
                h="80px"
                color={
                  uploadOk === null
                    ? brandColor
                    : uploadOk
                    ? "green.500"
                    : "red.500"
                }
              />
              <Flex justify="center" mx="auto" mb="12px">
                <Text
                  fontSize="xl"
                  fontWeight="700"
                  color={brandColor}
                  textAlign="center"
                >
                  {uploadOk === null
                    ? "Seleccionar Archivo"
                    : uploadOk
                    ? "Recibido"
                    : "Error"}
                </Text>
              </Flex>
              <Text fontSize="sm" fontWeight="500" color="secondaryGray.500">
                {uploadOk === null
                  ? "Arrastra tu archivo aquí o haz click"
                  : uploadOk
                  ? "El archivo ha sido procesado"
                  : errorCode === "FileAlreadyExists"
                  ? "El archivo ya fue procesado"
                  : "Ocurrio un error, Reintente"}
              </Text>
              {uploadOk === false && (
                <Button
                  onClick={hadleResetButton}
                  w="140px"
                  minW="140px"
                  mt={{ base: "20px", "2xl": "20px" }}
                  variant="brand"
                  fontWeight="500"
                >
                  Reintentar
                </Button>
              )}
            </Box>
          }
        />
        <Flex direction="column" pe="44px">
          <Text
            color={textColorPrimary}
            fontWeight="bold"
            textAlign="start"
            fontSize="2xl"
            mt={{ base: "20px", "2xl": "50px" }}
          >
            Subir Archivo para Analizar
          </Text>
          <Text
            color={textColorSecondary}
            fontSize="md"
            my={{ base: "auto", "2xl": "10px" }}
            textAlign="start"
          >
            {file && file.name
              ? `Archivo: ${file.name}`
              : "No se ha seleccionado archivo"}
          </Text>
          <Flex w="100%">
            <Button
              onClick={handleFileUpload}
              isDisabled={!file?.name}
              me="100%"
              mb="50px"
              w="140px"
              minW="140px"
              mt={{ base: "20px", "2xl": "auto" }}
              variant="brand"
              fontWeight="500"
            >
              Enviar Audio
            </Button>
          </Flex>
          <Text
            color={textColorSecondary}
            fontSize="md"
            my={{ base: "auto", "2xl": "10px" }}
            mx="auto"
            textAlign="start"
          >
            Para ver las transcripciones de tus audios, puedes hacer click en el menu "Resultados"
          </Text>

        </Flex>
      </Flex>
    </Card>
  );
}
