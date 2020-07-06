import { styled, useTheme } from "@material-ui/core"
import * as React from "react"

/**
 * Draws an absolutely positioned `<svg>` element (so needs `position: relative` on the parent).
 * The coordinates are relative to the parent.
 * `start` should be the element on the right, and `end` on the left (just like in the bracket tree).
 */
export function MatchLine(props: { start: DOMRectReadOnly; end: DOMRectReadOnly; wrapY: number }) {
  const { start, end, wrapY } = props
  const theme = useTheme()
  const color = theme.palette.divider

  const startX = start.left
  const startY = start.top + start.height / 2
  const endX = end.right
  const endY = end.top + end.height / 2

  let path
  if (startX > endX) {
    // start is on the right (common case)
    // draw a simple bezier curve
    const curve = theme.spacing(4)
    path =
      `M ${startX} ${startY} ` +
      `C ${startX - curve} ${startY} ${endX + curve} ${endY} ${endX} ${endY}`
  } else {
    // start is on the left, the elements are wrapped
    // draw an `S` shaped line
    const curve = theme.spacing(2)
    path =
      `M ${startX} ${startY} ` +
      `C ${startX - curve} ${startY} ${startX - curve} ${wrapY} ${startX} ${wrapY} ` +
      `L ${endX} ${wrapY} ` +
      `C ${endX + curve} ${wrapY} ${endX + curve} ${endY} ${endX} ${endY}`
  }

  return (
    <SvgContainer>
      <path d={path} fill="transparent" stroke={color} strokeWidth={1.5} />
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
