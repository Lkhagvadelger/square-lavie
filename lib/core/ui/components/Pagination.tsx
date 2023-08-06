import { Badge } from "@chakra-ui/react";
import {
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Text,
  useColorModeValue,
} from "@ui/index";
import useTranslation from "next-translate/useTranslation";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

export const Pagination = ({
  name,
  size,
  page,
  total,
  pages,
  filtered,
  onChange,
}: {
  name: string;
  size: number;
  page: number;
  total: number;
  pages: number;
  filtered?: boolean;
  onChange: (page: number) => void;
}) => {
  const { t: to } = useTranslation("common");
  const textColor = useColorModeValue("gray.600", "gray.400");

  return size && page && total && pages ? (
    <Flex
      w="full"
      align="center"
      justify="space-between"
      mt="4"
      gap="4"
      direction={{ base: "column", md: "row" }}
    >
      <Flex>
        <Text color={textColor} fontSize="12">
          {filtered ? <Badge mr="2">{to(`paging.filtered`)}</Badge> : null}
          {pages > 1 &&
            to(`paging.pages`, { page, pages }) +
              ` • ` +
              to(`paging.records`, {
                start: Math.min(size * (page - 1) + 1, total),
                end: Math.min(size * page, total),
              }) +
              ` • `}
          {to(`paging.total`, { total, name })}
        </Text>
      </Flex>
      {pages > 1 && (
        <Flex justifyContent="right">
          <ButtonGroup spacing="1" variant="outline" size="xs">
            {page <= 1 ? (
              <Button disabled>
                <FiChevronsLeft />
              </Button>
            ) : (
              <IconButton
                as="a"
                cursor="pointer"
                icon={<FiChevronsLeft />}
                aria-label="Previous"
                onClick={() => {
                  onChange(1);
                }}
              />
            )}
            {page > 3 ? <Button disabled>...</Button> : null}
            {[page - 2, page - 1, page, page + 1, page + 2].map((p) =>
              1 <= p && p <= pages ? (
                <PageButton
                  key={`page-${p}`}
                  page={p}
                  isActive={page === p}
                  onChange={onChange}
                />
              ) : null
            )}
            {page < pages - 2 ? <Button disabled>...</Button> : null}
            {page >= pages ? (
              <Button disabled>
                <FiChevronsRight />
              </Button>
            ) : (
              <IconButton
                as="a"
                cursor="pointer"
                icon={<FiChevronsRight />}
                rel="prev"
                aria-label="Previous"
                onClick={() => {
                  onChange(pages);
                }}
              />
            )}
          </ButtonGroup>
        </Flex>
      )}
    </Flex>
  ) : (
    <></>
  );
};

const PageButton = ({
  page,
  isActive,
  onChange,
}: {
  page: number;
  isActive: boolean;
  onChange: (page: number) => void;
}) =>
  isActive ? (
    <Button
      _disabled={{ bg: "green", color: "white" }}
      _hover={{ bg: "green", color: "white" }}
      disabled
    >
      {page}
    </Button>
  ) : (
    <Button
      as="a"
      cursor="pointer"
      onClick={() => {
        onChange(page);
      }}
    >
      {page}
    </Button>
  );
