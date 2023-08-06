import { Box, Button, Card, Text, useColorModeValue } from "@ui/index";
import { LinkBox } from "@ui/index";
import { ReactNode } from "react";

export const CardButton = ({
  title,
  description,
  link,
  onClick,
  isLoading = false,
  children,
  ...props
}: {
  title: string;
  description: string;
  link?: string;
  onClick?: any;
  isLoading?: boolean;
  children?: ReactNode | ReactNode[];
}) => {
  const bg = useColorModeValue("white", "gray.850");
  return (
    <Card
      flex={1}
      borderColor={bg}
      borderRadius="3px"
      borderWidth="1px"
      minW={{ sm: "16rem", md: "16rem", lg: "16rem" }}
      minH={"20rem"}
      bg={bg}
      px={5}
      py={5}
      {...props}
    >
      <Text mb={12}>{description}</Text>
      {children}
      <Box mt={8} w="full" textAlign="center">
        {onClick ? (
          <Button onClick={onClick} isLoading={isLoading}>
            {title}
          </Button>
        ) : (
          <LinkBox href={link}>
            <Button>{title}</Button>
          </LinkBox>
        )}
      </Box>
    </Card>
  );
};
