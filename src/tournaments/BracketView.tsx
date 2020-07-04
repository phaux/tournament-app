import { Box, Typography } from "@material-ui/core"
import * as React from "react"
import { Bracket } from "../common/api"
import { MatchView } from "./MatchView"

export function BracketView(props: { bracket: Bracket }) {
  const { bracket } = props

  return (
    <Box my={4}>
      <Box my={2}>
        <Typography variant="h5">{bracket.type}</Typography>
      </Box>

      <Box my={2}>
        {bracket.bracketTops.map((match, idx) => (
          <MatchView key={idx} match={match} />
        ))}
      </Box>
    </Box>
  )
}
