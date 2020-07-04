import { Container, createMuiTheme, CssBaseline } from "@material-ui/core"
import { lightBlue, pink } from "@material-ui/core/colors"
import { ThemeProvider } from "@material-ui/styles"
import * as React from "react"

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: lightBlue,
    secondary: pink,
  },
})

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">Hello world!</Container>
    </ThemeProvider>
  )
}
