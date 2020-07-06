import { Box, Button, Grid, Typography } from "@material-ui/core"
import * as React from "react"
import { Link } from "react-router-dom"
import { Tournament, useApi } from "../common/api"
import { formatTitle } from "../common/formatTitle"
import { Spinner } from "../common/Spinner"

export default function IndexScreen() {
  const tournaments = useApi<Tournament[]>("tournaments")

  return (
    <>
      <Box my={8}>
        <Typography variant="h4" align="center">
          Tournaments
        </Typography>
      </Box>

      {tournaments != null ? (
        <Box my={8}>
          <Grid container spacing={2}>
            {[...tournaments].map((tournament) => (
              <Grid key={tournament.id} item xs={12} sm={6} md={4}>
                <Button
                  component={Link}
                  to={`/tournaments/${tournament.id}`}
                  variant="outlined"
                  fullWidth
                >
                  {formatTitle(tournament.id)}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Spinner />
      )}
    </>
  )
}
