import { Box, Button, Typography } from "@material-ui/core"
import * as React from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { Tournament, useApi } from "../common/api"
import { formatTitle } from "../common/formatTitle"
import { Spinner } from "../common/Spinner"
import { BracketView } from "./BracketView"

export default function TournamentView() {
  const { tournamentId } = useParams<Record<string, string>>()
  const tournament = useApi<Tournament>(`tournaments/${tournamentId}`)

  return (
    <>
      <Box my={8}>
        <Typography variant="h4" align="center">
          Tournament {formatTitle(tournamentId)}
        </Typography>
      </Box>

      {tournament != null ? (
        <Box my={8}>
          <BracketView bracket={tournament.brackets.upper} />
          {tournament.brackets.lower && <BracketView bracket={tournament.brackets.lower} />}
          {tournament.brackets.final && <BracketView bracket={tournament.brackets.final} />}
        </Box>
      ) : (
        <Spinner />
      )}

      <Box my={8}>
        <Button component={Link} variant="outlined" to="..">
          Go Back
        </Button>
      </Box>
    </>
  )
}
