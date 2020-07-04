import { Container, createMuiTheme, CssBaseline } from "@material-ui/core"
import { deepOrange, orange } from "@material-ui/core/colors"
import { ThemeProvider } from "@material-ui/styles"
import * as React from "react"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import { NotFound } from "./common/NotFound"
import { Spinner } from "./common/Spinner"

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: orange,
    secondary: deepOrange,
  },
})

const TournamentList = React.lazy(() => import("./tournaments/TournamentList"))
const TournamentView = React.lazy(() => import("./tournaments/TournamentView"))

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <BrowserRouter>
          <React.Suspense fallback={<Spinner />}>
            <Switch>
              <Route path="/tournaments" exact children={<TournamentList />} />
              <Route path="/tournaments/:tournamentId" exact children={<TournamentView />} />
              <Route path="/" exact children={<Redirect to="/tournaments" />} />
              <Route path="*" children={<NotFound />} />
            </Switch>
          </React.Suspense>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  )
}
