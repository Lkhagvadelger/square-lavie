import { useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { Box, Icon, Link } from "..";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";

export const LongTextBox = ({ content }: { content: string }) => {
  const { t } = useTranslation("common");
  const [compact, setCompact] = useState(true);
  return (
    <>
      {!content ? (
        ""
      ) : content.length <= 140 ? (
        content
      ) : (
        <Box>
          {compact ? content.substr(0, 140) + "..." : content}
          &nbsp;
          <Link
            as="span"
            color={"green.500"}
            onClick={() => setCompact(!compact)}
            _hover={{ textTransform: "uppercase" }}
            textTransform={"uppercase"}
            fontSize={10}
            fontWeight={"bold"}
          >
            {t(compact ? `view-more` : `view-less`)}
            <Icon as={compact ? FiArrowDown : FiArrowUp} ml={0.5} />
          </Link>
        </Box>
      )}
    </>
  );
};
