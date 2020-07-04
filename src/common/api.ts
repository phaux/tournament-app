import { useQuery } from "react-query"

const API_URL = "http://localhost:3000/"

export function useApi<T = unknown>(endpoint: string) {
  const { data } = useQuery([endpoint], async (endpoint) => {
    const url = new URL(endpoint, API_URL).href
    const res = await fetch(url)
    // TODO: handle res.ok != true
    const data = (await res.json()) as T
    return data
  })
  return data
}

export interface Tournament {
  id: string
  type: "single-elimination" | "double-elimination" | "double-elimination-finals"
  brackets: {
    upper: Bracket
    lower?: Bracket // only if type = "double-elimination" | "double-elimination-finals"
    final?: Bracket // only if type = "double-elimination-finals"
  }
}

export interface Bracket {
  type: "upper" | "lower" | "final"
  bracketTops: Match[] // last round matches
}

export interface Match {
  upperPart: Player
  lowerPart: Player
  winner: "upper" | "lower" | null
  firstChild?: Match
  secondChild?: Match
}

export interface Player {
  player: string // name of a player
  desc: string // additional description
  points: number
}
