import {
  Flex,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useColorModeValue,
  VStack,
} from "@ui/index";
import useTranslation from "next-translate/useTranslation";

export const ConceptSearchList = ({
  concepts,
  title,
  onRemove,
  placeholderText,
}: {
  concepts: Record<string, true>;
  title?: string;
  onRemove: (data: any) => void;
  placeholderText: string;
}) => {
  const { t: tc } = useTranslation("concept");
  const tagColor = useColorModeValue("gray.800", "white");
  const tagCloseColor = useColorModeValue("white", "black");

  return (
    <VStack w="full">
      {title && (
        <Text
          w="full"
          color="blue.600"
          fontWeight="700"
          fontSize="lg"
          textTransform="capitalize"
        >
          {title}
        </Text>
      )}
      <Flex
        flex="1"
        minH="48"
        w="full"
        flexWrap="wrap"
        alignContent="flex-start"
        bg={Object.keys(concepts).length > 0 ? "transparent" : "gray.100"}
        borderRadius="5"
        color="gray.850"
        px="0"
        py="0"
        gap="3"
        zIndex="0"
      >
        {Object.keys(concepts).map((id) => (
          <Tag
            size="lg"
            key={`concept-${id}`}
            borderRadius="full"
            variant="solid"
            bg="yellow.500"
            h="10"
          >
            <TagLabel color={tagColor} textTransform="capitalize">
              {tc(`${id}.name`)}
            </TagLabel>
            <TagCloseButton
              zIndex="inherit"
              bg="blackAlpha.600"
              fontWeight="900"
              color={tagCloseColor}
              onClick={() => {
                onRemove(id);
              }}
            />
          </Tag>
        ))}
        {Object.keys(concepts).length > 0 ? null : (
          <Text p="5" color="gray.300">
            {placeholderText}
          </Text>
        )}
      </Flex>
    </VStack>
  );
};
