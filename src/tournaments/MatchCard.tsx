import { Divider, List, Paper } from "@material-ui/core"
import * as React from "react"
import { Match } from "../common/api"
import { PlayerBox } from "./PlayerBox"

export function MatchCard(props: { match: Match }) {
  const { match } = props

  return (
    <Paper>
      <List disablePadding>
        <PlayerBox player={match.upperPart} isWinner={match.winner === "upper"} />
        <Divider />
        <PlayerBox player={match.lowerPart} isWinner={match.winner === "lower"} />
      </List>
    </Paper>
  )
}
