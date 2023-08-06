import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TableProps,
  TableRowProps,
  TableCellProps,
} from "@ui/index";
import { ReactNode } from "react";
import { Translate } from "next-translate";
import useTranslation from "next-translate/useTranslation";

type Column = {
  Cell?: (data: any, t: Translate) => ReactNode;
  Header?: ReactNode;
};

type Props = {
  columns: Column[];
  data: any[];
  RowProps?: TableRowProps;
  CellProps?: TableCellProps;
  active: string;
  select: (id: string) => void;
  choose: (id: string) => void;
} & Partial<TableProps>;

export const SelectionTable = ({
  data,
  columns,
  RowProps,
  CellProps,
  active,
  select,
  choose,
  ...props
}: Props) => {
  const { t } = useTranslation();
  return (
    <Table fontSize="sm" size="sm" variant="simple" {...props}>
      <Thead>
        <Tr>
          {columns.map((column, index) => (
            <Th whiteSpace="nowrap" scope="col" key={index}>
              {column.Header}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data?.map((row, ri) => (
          <Tr key={ri} {...RowProps} bg={active === row.id ? "blue.100" : ""}>
            {columns.map((column, ci) => (
              <Td
                key={ci}
                maxW={64}
                minW={24}
                {...CellProps}
                cursor="pointer"
                onClick={() => {
                  select(active === row.id ? "" : row.id);
                }}
                onDoubleClick={() => {
                  choose(row.id);
                }}
              >
                {column.Cell?.(row, t)}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
