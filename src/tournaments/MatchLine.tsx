import { styled, useTheme } from "@material-ui/core"
import * as React from "react"

/**
 * Draws an absolutely positioned `<svg>` element (so needs `position: relative` on the parent).
 * The coordinates are relative to the parent.
 * `start` should be the element on the right, and `end` on the left (just like in the bracket tree).
 */
export function MatchLine(props: { start: DOMRectReadOnly; end: DOMRectReadOnly }) {
  const { start, end } = props
  const theme = useTheme()
  const color = theme.palette.divider
  const startX = start.left
  const startY = start.top + start.height / 2
  const endX = end.right
  const endY = end.top + end.height / 2
  let curve = theme.spacing(4)
  if (startX < endX) {
    // boxes are flipped, make the line more curvy
    curve *= 4
  }

  return (
    <SvgContainer>
      <path
        d={
          `M ${startX} ${startY} ` +
          `C ${startX - curve} ${startY} ${endX + curve} ${endY} ${endX} ${endY}`
        }
        fill="transparent"
        stroke={color}
        strokeWidth={1.5}
      />
    </SvgContainer>
  )
}

const SvgContainer = styled("svg")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
})
