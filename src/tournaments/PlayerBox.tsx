import { ListItem, ListItemSecondaryAction, ListItemText, Typography } from "@material-ui/core"
import * as React from "react"
import { Player } from "../common/api"

export function PlayerBox(props: { player: Player; isWinner?: boolean }) {
  const { player, isWinner = false } = props

  return (
    <ListItem>
      <ListItemText
        primary={
          <>
            {player.player || <>&nbsp;</>} {isWinner && <span title="winner">🏆</span>}
          </>
        }
      />
      {player.points != null && (
        <ListItemSecondaryAction>
          <Typography color="textSecondary" title="score">
            {player.points}
          </Typography>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  )
}
