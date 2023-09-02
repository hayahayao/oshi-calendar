// @ts-nocheck
'use client'
import { CalendarHeatmap } from 'reaviz'

// TODO: change component library...
export default function Heatmap({ data }) {
  return (
    <CalendarHeatmap data={data} height={115} width={715}></CalendarHeatmap>
  )
}
