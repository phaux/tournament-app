import { Box, Button, Typography } from "@material-ui/core"
import * as React from "react"
import { Link } from "react-router-dom"

export function NotFound() {
  return (
    <Box m={4} textAlign="center">
      <Typography variant="h4">Not found</Typography>
      <Button component={Link} to="/">
        Go Back
      </Button>
    </Box>
  )
}
