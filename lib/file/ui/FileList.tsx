import { useWatch, Control } from "react-hook-form";

type Props = {
  name: string;
  defaultValue: unknown;
  control: Control<any>;
};

export const FileList = ({ name, defaultValue, control }: Props) => {
  const files = useWatch({
    control,
    name,
    defaultValue,
  });

  return <div>{files[0] ? files[0].name : "No file selected"}</div>;
};
