import { Box, CircularProgress } from "@material-ui/core"
import * as React from "react"

export function Spinner() {
  return (
    <Box m={4} textAlign="center">
      <CircularProgress />
    </Box>
  )
}
