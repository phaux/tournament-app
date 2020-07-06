import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@material-ui/core"
import { ExpandMore } from "@material-ui/icons"
import * as React from "react"
import { Bracket } from "../common/api"
import { formatTitle } from "../common/formatTitle"
import { useResizeObserver } from "../common/useResizeObserver"
import { MatchView } from "./MatchView"

export function BracketView(props: { bracket: Bracket }) {
  const { bracket } = props
  const boxRef = React.useRef<Element>(null)

  // force rerender on container resize to update the lines
  useResizeObserver(boxRef)

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        id={`bracket-${bracket.type}-header`}
        aria-controls={`bracket-${bracket.type}-content`}
      >
        <Typography variant="subtitle1">{formatTitle(bracket.type)} bracket</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          // @ts-expect-error missing ref prop in Box types
          ref={boxRef}
          flexGrow={1}
        >
          {bracket.bracketTops.map((match, idx) => (
            <MatchView key={idx} match={match} />
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
