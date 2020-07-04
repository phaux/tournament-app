import { Avatar, Badge, Box, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core"
import * as React from "react"
import { Player } from "../common/api"

export function PlayerBox(props: { player: Player; isWinner?: boolean }) {
  const { player, isWinner = false } = props

  return (
    <ListItem>
      <ListItemAvatar>
        <Badge
          title="Score"
          badgeContent={player.points}
          anchorOrigin={{ horizontal: "left", vertical: "top" }}
          overlap="circle"
          color="secondary"
        >
          <Box clone bgcolor={isWinner ? "primary.main" : undefined}>
            <Avatar>{player.player[0]}</Avatar>
          </Box>
        </Badge>
      </ListItemAvatar>
      <ListItemText
        primary={player.player}
        // secondary={player.desc}
      />
    </ListItem>
  )
}
