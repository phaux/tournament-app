import { render } from "@testing-library/react"
import * as React from "react"
import { BracketView } from "./BracketView"

it("has title upper", () => {
  const root = render(<BracketView bracket={{ type: "upper", bracketTops: [] }} />)
  expect(root.queryByText(/upper/i)).toBeInTheDocument()
})

it("has title lower", () => {
  const root = render(<BracketView bracket={{ type: "lower", bracketTops: [] }} />)
  expect(root.queryByText(/lower/i)).toBeInTheDocument()
})

it("has title final", () => {
  const root = render(<BracketView bracket={{ type: "final", bracketTops: [] }} />)
  expect(root.queryByText(/final/i)).toBeInTheDocument()
})

it("displays single match", () => {
  const root = render(
    <BracketView
      bracket={{
        type: "upper",
        bracketTops: [
          {
            upperPart: { player: "Foo", desc: "", points: 24 },
            lowerPart: { player: "Bar", desc: "", points: 42 },
            winner: "lower",
          },
        ],
      }}
    />
  )
  expect(root.queryByText("Foo")).toBeInTheDocument()
  expect(root.queryByText("Bar")).toBeInTheDocument()
  const [upperScore, lowerScore] = root.getAllByTitle(/score/i, { exact: true })
  expect(upperScore).toHaveTextContent("24")
  expect(lowerScore).toHaveTextContent("42")
})

it("displays a tree", () => {
  const root = render(
    <BracketView
      bracket={{
        type: "upper",
        bracketTops: [
          {
            upperPart: { player: "Paulo da Rosa", desc: "", points: 2 },
            lowerPart: { player: "Eli Loveman", desc: "", points: 1 },
            winner: "upper",
            firstChild: {
              upperPart: { player: "Matias Leveratto", desc: "", points: 0 },
              lowerPart: { player: "Paulo da Rosa", desc: "", points: 2 },
              winner: "lower",
            },
            secondChild: {
              upperPart: { player: "Raphaël Lévy", desc: "", points: 0 },
              lowerPart: { player: "Eli Loveman", desc: "", points: 2 },
              winner: "lower",
            },
          },
        ],
      }}
    />
  )
  expect(root.queryAllByText("Paulo da Rosa")).toHaveLength(2)
  expect(root.queryAllByText("Eli Loveman")).toHaveLength(2)
  expect(root.queryByText("Matias Leveratto")).toBeInTheDocument()
  expect(root.queryByText("Raphaël Lévy")).toBeInTheDocument()
})
