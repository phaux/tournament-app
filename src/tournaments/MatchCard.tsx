import { Divider, List, Paper } from "@material-ui/core"
import * as React from "react"
import { Match } from "../common/api"
import { PlayerBox } from "./PlayerBox"

export const MatchCard = React.forwardRef((props: { match: Match }, ref) => {
  const { match } = props

  return (
    <Paper ref={ref}>
      <List disablePadding>
        <PlayerBox player={match.upperPart} isWinner={match.winner === "upper"} />
        <Divider />
        <PlayerBox player={match.lowerPart} isWinner={match.winner === "lower"} />
      </List>
    </Paper>
  )
})
