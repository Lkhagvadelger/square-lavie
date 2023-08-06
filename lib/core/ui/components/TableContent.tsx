import {
  Table,
  TableCellProps,
  TableColumnHeaderProps,
  TableProps,
  TableRowProps,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@ui/index";
import { Translate } from "next-translate";
import useTranslation from "next-translate/useTranslation";
import { ReactNode } from "react";

type Column = {
  Cell?: (data: any, t: Translate) => ReactNode;
  Header?: ReactNode;
  accessor?: string;
};

type Props = {
  columns: Column[];
  data: any[];
  RowProps?: TableRowProps;
  HeaderProps?: TableColumnHeaderProps;
  CellProps?: TableCellProps;
  RowCallback?: any;
  RowAction?: JSX.Element | any;
  RowActionTitle?: string;
  RowClick?: (x: any) => void;
} & Partial<TableProps>;

export const TableContent = ({
  data,
  columns,
  RowProps,
  HeaderProps,
  CellProps,
  RowCallback,
  RowAction,
  RowActionTitle,
  RowClick,
  ...props
}: Props) => {
  const { t } = useTranslation();
  return (
    <Table fontSize="sm" size="sm" variant="simple" {...props}>
      <Thead>
        <Tr>
          {columns.map((column, index) => (
            <Th key={index} whiteSpace="nowrap" scope="col" {...HeaderProps}>
              {column.Header}
            </Th>
          ))}
          {RowAction && <Th {...HeaderProps}>{RowActionTitle}</Th>}
        </Tr>
      </Thead>
      <Tbody>
        {data &&
          data.length > 0 &&
          data.map((row, index) => (
            <Tr
              key={index}
              {...RowProps}
              onClick={() => (RowClick ? RowClick(row) : null)}
            >
              {columns.map((column, index) => {
                const cell = column.accessor
                  ? row[column.accessor as keyof typeof row]
                  : row;
                const element = column.Cell?.(cell, t) ?? cell;

                return (
                  <Td key={index} maxW={64} minW={24} {...CellProps}>
                    {Array.isArray(element) ? "" : element}
                  </Td>
                );
              })}
              {RowAction && (
                <Td textAlign="right" pr="0" {...CellProps}>
                  <RowAction rowData={row} refetch={RowCallback} />
                </Td>
              )}
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
};
