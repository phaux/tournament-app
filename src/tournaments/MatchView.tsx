import { Box } from "@material-ui/core"
import * as React from "react"
import { Match } from "../common/api"
import { MatchCard } from "./MatchCard"

export function MatchView(props: { match: Match }) {
  const { match } = props

  return (
    <Box m={-2} display="flex" flexDirection="row" alignItems="center">
      {(match.firstChild || match.secondChild) && (
        <Box m={2} display="flex" flexDirection="column" justifyContent="space-evenly">
          {match.firstChild && <MatchView match={match.firstChild} />}
          {match.firstChild && match.secondChild && <Box my={1} />}
          {match.secondChild && <MatchView match={match.secondChild} />}
        </Box>
      )}

      <Box m={2} minWidth={250}>
        <MatchCard match={match} />
      </Box>
    </Box>
  )
}
