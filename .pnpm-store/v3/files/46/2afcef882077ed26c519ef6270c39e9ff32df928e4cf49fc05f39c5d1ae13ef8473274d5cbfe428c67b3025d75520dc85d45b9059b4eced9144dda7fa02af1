import * as React from 'react'
import {
	$media,
	$variants,
	CSSPropertiesToTokenScale,
	DeclarationListWithRootAtRules,
	FlatInternalCSS,
	GlobalRule,
	IConfig,
	InternalCSS,
	LessInternalCSS,
	OmitKey,
	StitchesExtractVariantsStyles,
	StrictMorphVariant,
	TMedias,
	TStyledSheet,
	TTheme,
	TThemeMap,
	VariantsCall,
} from './core'

export * from './core'

/** Private way to store the type without causing a TS panic: */
declare const $elm: unique symbol

/* Utils:
 * -----------------------------------------------------------------------------------------------*/
// abuse Pick to strip the call signature from ForwardRefExoticComponent
type IntrinsicElementsKeys = keyof JSX.IntrinsicElements
type ComponentInfer<T> = T extends IntrinsicElementsKeys | React.ComponentType<any> ? T : never

/* StitchesComponent:
 * -----------------------------------------------------------------------------------------------*/
// abuse Pick to strip the call signature from ForwardRefExoticComponent
type ForwardRefExoticBase<P> = Pick<React.ForwardRefExoticComponent<P>, keyof React.ForwardRefExoticComponent<any>>

export type IntrinsicElement<T extends React.ElementType, B = React.ElementRef<T>> = {
	[k in keyof HTMLElementTagNameMap]: HTMLElementTagNameMap[k] extends B ? k : never
}[keyof HTMLElementTagNameMap]

export interface StitchesComponentWithAutoCompleteForJSXElements<DefaultElement extends string, Variants = {}, Medias extends TMedias = TMedias, Theme = {}, Utils = {}, ThemeMap = {}>
	extends React.ForwardRefExoticComponent<
		Omit<React.ComponentPropsWithRef<ComponentInfer<DefaultElement>>, keyof Variants | 'css' | 'as'> & {
			css?: InternalCSS<Medias, Theme, Utils, ThemeMap>
		} & VariantsCall<Variants, Medias>
	> {
	// JSX elements have higher priority here when it comes to autocomplete
	<Elm extends IntrinsicElementsKeys = DefaultElement extends IntrinsicElementsKeys ? DefaultElement : never>(
		props: VariantsCall<Variants, Medias> & { as: Elm } & Omit<JSX.IntrinsicElements[Elm], keyof Variants | 'css' | 'as'> & {
				css?: InternalCSS<Medias, Theme, Utils, ThemeMap>
			},
	): JSX.Element

	// React component
	<As extends React.ComponentType = DefaultElement extends React.ComponentType ? DefaultElement : never>(
		props: VariantsCall<Variants, Medias> & { as?: As } & Omit<React.ComponentPropsWithRef<As>, keyof Variants | 'css' | 'as'> & {
				css?: InternalCSS<Medias, Theme, Utils, ThemeMap>
			},
	): JSX.Element

	toString(): string
	/**
	 * CSS Class associated with the current component.
	 *
	 * ```
	 *
	 * const Button = styled("button", { color: "DarkSlateGray" })
	 *
	 * <div className={Button.className} />
	 * ```
	 * <br />
	 */
	className: string
	/**
	 * CSS Selector associated with the current component.
	 *
	 * ```
	 *
	 * const Button = styled("button", { color: "DarkSlateGray" })
	 *
	 * const Card = styled("article", {
	 *   [Button.selector]: { boxShadow: "0 0 0 5px" }
	 * })
	 * ```
	 * <br />
	 */
	selector: string
	variants: Variants
	[$media]: Medias
	[$elm]: DefaultElement
	[$variants]: Variants
}

export interface StitchesComponentWithAutoCompleteForReactComponents<DefaultElement, Variants = {}, Medias extends TMedias = TMedias, Theme = {}, Utils = {}, ThemeMap = {}>
	extends React.ForwardRefExoticComponent<
		Omit<React.ComponentPropsWithRef<ComponentInfer<DefaultElement>>, keyof Variants | 'css' | 'as'> & {
			css?: InternalCSS<Medias, Theme, Utils, ThemeMap>
		} & VariantsCall<Variants, Medias>
	> {
	// React components have higher priority here for autocomplete
	<As extends React.ComponentType = DefaultElement extends React.ComponentType ? DefaultElement : never>(
		props: VariantsCall<Variants, Medias> & { as?: As } & Omit<React.ComponentPropsWithRef<As>, keyof Variants | 'css' | 'as'> & {
				css?: InternalCSS<Medias, Theme, Utils, ThemeMap>
			},
	): JSX.Element

	// JSX elements
	<Elm extends IntrinsicElementsKeys = DefaultElement extends IntrinsicElementsKeys ? DefaultElement : never>(
		props: VariantsCall<Variants, Medias> & { as: Elm } & Omit<JSX.IntrinsicElements[Elm], keyof Variants | 'css' | 'as'> & {
				css?: InternalCSS<Medias, Theme, Utils, ThemeMap>
			},
	): JSX.Element

	toString(): string
	/**
	 * CSS Class associated with the current component.
	 *
	 * ```
	 *
	 * const Button = styled("button", { color: "DarkSlateGray" })
	 *
	 * <div className={Button.className} />
	 * ```
	 * <br />
	 */
	className: string
	/**
	 * CSS Selector associated with the current component.
	 *
	 * ```
	 *
	 * const Button = styled("button", { color: "DarkSlateGray" })
	 *
	 * const Card = styled("article", {
	 *   [Button.selector]: { boxShadow: "0 0 0 5px" }
	 * })
	 * ```
	 * <br />
	 */
	selector: string
	variants: Variants
	[$media]: Medias
	[$variants]: Variants
}

// export type NonIntrinsicElementProps<T extends React.ElementType> = IntrinsicElement<T> extends never ? React.ComponentProps<T> : Omit<React.ComponentProps<T>, keyof React.ComponentPropsWithoutRef<IntrinsicElement<T>>>

/* Styled instance:
 * -----------------------------------------------------------------------------------------------*/
export type StyledInstance<Medias extends TMedias = TMedias, Theme extends TTheme = {}, Utils = {}, ThemeMap = {}> = {
	<E extends React.ElementType, Variants, CloneVariants extends Variants>(
		elm: E,
		// prettier-ignore
		styles: (
			(
				(
					LessInternalCSS<Medias, Theme, Utils, ThemeMap>
					& {
						/** Unknown property. */
						[k in string]: unknown
					}
				)
				| Record<string, InternalCSS<Medias, Theme, Utils, ThemeMap>>
			)
			& {
				variants?: { [k in keyof Variants]: { [b in keyof Variants[k]]: InternalCSS<Medias, Theme, Utils, ThemeMap> } }
			}
			& {
						defaultVariants?: {
							[k in keyof CloneVariants]?: StrictMorphVariant<keyof CloneVariants[k]>
						}
					}
					& {
						compoundVariants?: (
							{
								[k in keyof CloneVariants]?: StrictMorphVariant<keyof CloneVariants[k]>
							}
							& {
								css?: InternalCSS<Medias, Theme, Utils, ThemeMap>
							}
						)[]
					}
		),
	): // prettier-ignore
	E extends string
		// jsx elements
		? StitchesComponentWithAutoCompleteForJSXElements<E, Variants & StitchesExtractVariantsStyles<E>, Medias, Theme, Utils, ThemeMap>
	// if it's a stitches component...
	: E extends {
		[$elm]: infer DeepStitchesComponentType
	}
		// reach in and pull its type to provide better types
		? StitchesComponentWithAutoCompleteForJSXElements<string & DeepStitchesComponentType, Variants & StitchesExtractVariantsStyles<E>, Medias, Theme, Utils, ThemeMap>
	// normal react component
	: StitchesComponentWithAutoCompleteForReactComponents<E, Variants & StitchesExtractVariantsStyles<E>, Medias, Theme, Utils, ThemeMap>
} & ProxyStyledElements<Medias, Theme, Utils, ThemeMap>

export type ProxyStyledElements<Medias extends TMedias = TMedias, Theme extends TTheme = {}, Utils = {}, ThemeMap = {}> = {
	[ElKey in keyof JSX.IntrinsicElements]: <E extends React.ElementType = ElKey, Variants = {}, CloneVariants extends Variants = {}>(
		// prettier-ignore
		styled: (
			(
				(
					LessInternalCSS<Medias, Theme, Utils, ThemeMap>
					& {
						/** Unknown property. */
						[k in string]: unknown
					}
				)
				| Record<string, InternalCSS<Medias, Theme, Utils, ThemeMap>>
			)
			& {
				variants?: { [k in keyof Variants]: { [b in keyof Variants[k]]: InternalCSS<Medias, Theme, Utils, ThemeMap> } }
			}
			& {
						defaultVariants?: {
							[k in keyof CloneVariants]?: StrictMorphVariant<keyof CloneVariants[k]>
						}
					}
					& {
						compoundVariants?: (
							{
								[k in keyof CloneVariants]?: StrictMorphVariant<keyof CloneVariants[k]>
							}
							& {
								css?: InternalCSS<Medias, Theme, Utils, ThemeMap>
							}
						)[]
					}
		),
	) => // prettier-ignore
	E extends string
		// jsx elements
		? StitchesComponentWithAutoCompleteForJSXElements<E, Variants & StitchesExtractVariantsStyles<E>, Medias, Theme, Utils, ThemeMap>
	// if it's a stitches component...
	: E extends {
		[$elm]: infer DeepStitchesComponentType
	}
		// reach in and pull its type to provide better types
		? StitchesComponentWithAutoCompleteForJSXElements<DeepStitchesComponentType, Variants & StitchesExtractVariantsStyles<E>, Medias, Theme, Utils, ThemeMap>
	// normal react component
	: StitchesComponentWithAutoCompleteForReactComponents<E, Variants & StitchesExtractVariantsStyles<E>, Medias, Theme, Utils>
}

type ReactFactory = <Medias extends TMedias = TMedias, Theme extends TTheme = {}, Utils = {}, Prefix = '', ThemeMap extends TThemeMap = CSSPropertiesToTokenScale>(
	_config?: IConfig<Medias, Theme, Utils, Prefix, ThemeMap>,
) => TStyledSheet<Medias, Theme, Utils, Prefix, ThemeMap> & {
	styled: StyledInstance<Medias & { initial: '' }, Theme, Utils, ThemeMap>

	/**
	 * Returns all CSS applied to the stylesheet.
	 *
	 * ```
	 *
	 * <style>{toString()}</style>
	 * ```
	 * <br />
	 */
	getCssString(): string

	/**
	 * Returns all CSS applied to the stylesheet.
	 *
	 * ```
	 *
	 * <style>{toString()}</style>
	 * ```
	 * <br />
	 */
	toString(): string
}

export declare const createCss: ReactFactory
export declare const css: TStyledSheet<{ initial: '' }, {}, {}, '', CSSPropertiesToTokenScale>
export declare const global: (definition: OmitKey<Record<string, InternalCSS<{} & TMedias, {}, {}, CSSPropertiesToTokenScale>>, '@font-face' | '@import'> | DeclarationListWithRootAtRules) => GlobalRule
export declare const keyframes: (definition: { [k: string]: FlatInternalCSS<{} & TMedias, {}, {}, CSSPropertiesToTokenScale> }) => GlobalRule
export declare const styled: StyledInstance<{ initial: '' }, {}, {}, CSSPropertiesToTokenScale>

export default createCss
