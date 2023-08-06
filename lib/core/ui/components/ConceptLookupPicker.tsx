import { Text, FormControl, Select } from "@ui/index";
import useTranslation from "next-translate/useTranslation";

export const ConceptLookupPicker = ({
  title,
  value,
  select,
  conceptIds,
  emptyValue,
  ...props
}: {
  title: string;
  value: string;
  select: any;
  conceptIds: string[];
  emptyValue?: string;
}) => {
  const { t: tc } = useTranslation("concept");

  return (
    <FormControl {...props}>
      <Text as="span" color="gray.600">
        {title}
      </Text>
      <Select
        value={value}
        onChange={(e) => select(e.target.value)}
        mt="1"
        mr="3"
      >
        <option value="">{emptyValue || ""}</option>
        {conceptIds.map((id: string) => (
          <option key={`concept-${id}`} value={id}>
            {tc(`${id}.name`)}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};
