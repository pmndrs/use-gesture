import type { InputWithSettings, NumberSettings, LevaInputProps, InternalVectorSettings } from 'leva/plugin'

export type Spring = { tension?: number; friction?: number; mass?: number }
export type InternalSpring = { tension: number; friction: number; mass: number }
export type SpringSettings = { [key in keyof Spring]?: NumberSettings }

export type SpringInput = Spring | InputWithSettings<Spring, SpringSettings>

export type InternalSpringSettings = InternalVectorSettings<keyof InternalSpring, (keyof InternalSpring)[], 'object'>

export type SpringProps = LevaInputProps<InternalSpring, InternalSpringSettings, InternalSpring>
