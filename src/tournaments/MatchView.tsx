import { Box } from "@material-ui/core"
import * as React from "react"
import { Match } from "../common/api"
import { useBoundingRect } from "../common/useBoundingRect"
import { MatchCard } from "./MatchCard"
import { MatchLine } from "./MatchLine"

export function MatchView(props: { match: Match; cardRef?: React.RefObject<Element> }) {
  const { match } = props
  // container element (used for computing relative bounding rects)
  const containerRef = React.useRef<Element>(null)
  // current card element (used for start of the line, forwarded via `cardRef` prop)
  const cardRef = React.useRef<Element>(null)
  const selfRef = props.cardRef ?? cardRef
  const selfRect = useBoundingRect(selfRef, containerRef)
  // first child card (used for end of the line, set from child's `cardRef` prop)
  const firstChildRef = React.useRef<Element>(null)
  const firstChildRect = useBoundingRect(firstChildRef, containerRef)
  // second child card (used for end of the line, set from child's `cardRef` prop)
  const secondChildRef = React.useRef<Element>(null)
  const secondChildRect = useBoundingRect(secondChildRef, containerRef)
  // use bottom of this element to draw an `S` shaped line between wrapped elements
  const separatorRef = React.useRef<Element>(null)
  const separatorRect = useBoundingRect(separatorRef, containerRef)

  return (
    <Box
      // @ts-expect-error: missing type for ref
      ref={containerRef}
      m={-2}
      position="relative"
      display="flex"
      flexDirection="row"
      alignItems="center"
      flexWrap="wrap"
    >
      {/* render the child matches on the left first, if any */}
      {(match.firstChild || match.secondChild) && (
        <Box
          // @ts-expect-error: missing type for ref
          ref={separatorRef}
          m={2}
          display="flex"
          flexGrow={1}
          flexDirection="column"
          alignItems="stretch"
        >
          {match.firstChild && <MatchView match={match.firstChild} cardRef={firstChildRef} />}
          {match.firstChild && match.secondChild && <Box my={1} /> /* spacing */}
          {match.secondChild && <MatchView match={match.secondChild} cardRef={secondChildRef} />}
        </Box>
      )}

      {/* render the current match card */}
      <Box m={2} minWidth={180} maxWidth={320} flexGrow={100}>
        <MatchCard ref={selfRef} match={match} />
      </Box>

      {/* render the lines connecting cards */}
      {selfRect && firstChildRect && separatorRect && (
        <MatchLine start={selfRect} end={firstChildRect} wrapY={separatorRect.bottom + 16} />
      )}
      {selfRect && secondChildRect && separatorRect && (
        <MatchLine start={selfRect} end={secondChildRect} wrapY={separatorRect.bottom + 16} />
      )}
    </Box>
  )
}
