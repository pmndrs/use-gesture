import React, { useRef } from 'react'
import { Label, Row } from '../UI'
import { Vector } from '../Vector'
import { Range, RangeWrapper, Scrubber, Indicator, sanitizeStep } from '../Number'
import { useDrag } from '../../hooks'
import { invertedRange, range } from '../../utils'
import { useInputContext } from '../../context'
import { styled, useTh } from '../../styles'
import type { IntervalSliderProps, IntervalProps, InternalInterval } from './interval-types'

const Container = styled('div', {
  display: 'grid',
  columnGap: '$colGap',
  gridTemplateColumns: 'auto calc($sizes$numberInputMinWidth * 2 + $space$rowGap)',
})

function IntervalSlider({ value, bounds: [min, max], onDrag, ...settings }: IntervalSliderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const minScrubberRef = useRef<HTMLDivElement>(null)
  const maxScrubberRef = useRef<HTMLDivElement>(null)
  const rangeWidth = useRef<number>(0)
  const scrubberWidth = useTh('sizes', 'scrubberWidth')

  const bind = useDrag(({ event, first, xy: [x], movement: [mx], memo = {} }) => {
    if (first) {
      const { width, left } = ref.current!.getBoundingClientRect()
      rangeWidth.current = width - parseFloat(scrubberWidth)

      const targetIsScrub = event?.target === minScrubberRef.current || event?.target === maxScrubberRef.current

      memo.pos = invertedRange((x - left) / width, min, max)
      const delta = Math.abs(memo.pos - value.min) - Math.abs(memo.pos - value.max)
      memo.key = delta < 0 || (delta === 0 && memo.pos <= value.min) ? 'min' : 'max'
      if (targetIsScrub) memo.pos = value[memo.key as keyof InternalInterval]
    }
    const newValue = memo.pos + invertedRange(mx / rangeWidth.current, 0, max - min)

    onDrag({ [memo.key]: sanitizeStep(newValue, settings[memo.key as 'min' | 'max']) })
    return memo
  })

  const minStyle = `calc(${range(value.min, min, max)} * (100% - ${scrubberWidth} - 8px) + 4px)`
  const maxStyle = `calc(${1 - range(value.max, min, max)} * (100% - ${scrubberWidth} - 8px) + 4px)`

  return (
    <RangeWrapper ref={ref} {...bind()}>
      <Range>
        <Indicator style={{ left: minStyle, right: maxStyle }} />
      </Range>
      <Scrubber position="left" ref={minScrubberRef} style={{ left: minStyle }} />
      <Scrubber position="right" ref={maxScrubberRef} style={{ right: maxStyle }} />
    </RangeWrapper>
  )
}

export function IntervalComponent() {
  const { label, displayValue, onUpdate, settings } = useInputContext<IntervalProps>()

  const { bounds, ..._settings } = settings

  return (
    <>
      <Row input>
        <Label>{label}</Label>
        <Container>
          <IntervalSlider value={displayValue} {...settings} onDrag={onUpdate} />
          <Vector value={displayValue} settings={_settings} onUpdate={onUpdate} innerLabelTrim={0} />
        </Container>
      </Row>
    </>
  )
}
