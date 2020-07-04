import { Box, Button, Typography } from "@material-ui/core"
import * as React from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { Tournament, useApi } from "../common/api"
import { Spinner } from "../common/Spinner"

export default function TournamentView() {
  const { tournamentId } = useParams<Record<string, string>>()
  const tournament = useApi<Tournament>(`tournaments/${tournamentId}`)

  return (
    <>
      <Box my={8}>
        <Typography variant="h4" align="center">
          Tournament {tournamentId}
        </Typography>
      </Box>

      {tournament != null ? (
        <Box my={8}>
          <Typography variant="body2">{JSON.stringify(tournament, null, 2)}</Typography>
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
