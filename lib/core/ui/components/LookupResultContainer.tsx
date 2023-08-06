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

type LookupFieldType = {
  onRemove: (data: any) => void;
  selectedValuesWatch: any[];
  placeholderText: string;
  title?: string;
  lookupName?: string;
  concept?: boolean;
};

export const LookupResultContainer = (props: LookupFieldType) => {
  const { t: tc } = useTranslation("concept");
  const {
    selectedValuesWatch,
    title,
    lookupName,
    onRemove,
    placeholderText,
    concept,
  } = props;
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
        bg={
          selectedValuesWatch && selectedValuesWatch.length === 0
            ? "gray.100"
            : "transparent"
        }
        borderRadius="5"
        color="gray.850"
        px="0"
        py="0"
        gap="3"
        zIndex="0"
      >
        {selectedValuesWatch &&
          selectedValuesWatch.length > 0 &&
          selectedValuesWatch.map((data, i) => (
            <Tag
              size="lg"
              key={data.id}
              borderRadius="full"
              variant="solid"
              bg="yellow.500"
              h="10"
            >
              <TagLabel color={tagColor} textTransform="capitalize">
                {concept
                  ? tc(`${data}.name`)
                  : lookupName
                  ? data[lookupName]
                  : data["name"]}
              </TagLabel>
              <TagCloseButton
                zIndex="inherit"
                bg="blackAlpha.600"
                fontWeight="900"
                color={tagCloseColor}
                onClick={() => {
                  onRemove(concept ? data : data.id);
                }}
              />
            </Tag>
          ))}
        {selectedValuesWatch && selectedValuesWatch.length === 0 && (
          <Text p="5" color="gray.300">
            {placeholderText}
          </Text>
        )}
      </Flex>
    </VStack>
  );
};
