import React from 'react'
import { ControlInput } from './ControlInput'
import { log, LevaErrors } from '../../utils/log'
import { Plugins } from '../../plugin'
import { Button } from '../Button'
import { ButtonGroup } from '../ButtonGroup'
import { Monitor } from '../Monitor'
import { useInput } from '../../hooks'
import { SpecialInputs } from '../../types'

type ControlProps = { path: string }

const specialComponents = {
  [SpecialInputs.BUTTON]: Button,
  [SpecialInputs.BUTTON_GROUP]: ButtonGroup,
  [SpecialInputs.MONITOR]: Monitor,
}

export const Control = React.memo(({ path }: ControlProps) => {
  const [input, { set, setSettings, disable, storeId, emitOnEditStart, emitOnEditEnd }] = useInput(path)
  if (!input) return null

  const { type, label, key, ...inputProps } = input

  if (type in SpecialInputs) {
    // @ts-expect-error
    const SpecialInputForType = specialComponents[type]
    return <SpecialInputForType label={label} path={path} {...inputProps} />
  }

  if (!(type in Plugins)) {
    log(LevaErrors.UNSUPPORTED_INPUT, type, path)
    return null
  }

  return (
    // @ts-expect-error
    <ControlInput
      key={storeId + path}
      type={type}
      label={label}
      storeId={storeId}
      path={path}
      valueKey={key}
      setValue={set}
      setSettings={setSettings}
      disable={disable}
      emitOnEditStart={emitOnEditStart}
      emitOnEditEnd={emitOnEditEnd}
      {...inputProps}
    />
  )
})
