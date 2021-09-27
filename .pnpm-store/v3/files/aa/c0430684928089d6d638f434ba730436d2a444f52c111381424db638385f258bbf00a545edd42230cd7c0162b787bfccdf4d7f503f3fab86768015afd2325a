import { DeclarationListWithRootAtRules, Properties } from './css-types'

export { DeclarationListWithRootAtRules }

export interface CSSPropertiesToTokenScale {
	gap: 'space'
	gridGap: 'space'
	columnGap: 'space'
	gridColumnGap: 'space'
	rowGap: 'space'
	gridRowGap: 'space'
	inset: 'space'
	insetBlock: 'space'
	insetBlockEnd: 'space'
	insetBlockStart: 'space'
	insetInline: 'space'
	insetInlineEnd: 'space'
	insetInlineStart: 'space'
	margin: 'space'
	marginTop: 'space'
	marginRight: 'space'
	marginBottom: 'space'
	marginLeft: 'space'
	marginBlock: 'space'
	marginBlockEnd: 'space'
	marginBlockStart: 'space'
	marginInline: 'space'
	marginInlineEnd: 'space'
	marginInlineStart: 'space'
	padding: 'space'
	paddingTop: 'space'
	paddingRight: 'space'
	paddingBottom: 'space'
	paddingLeft: 'space'
	paddingBlock: 'space'
	paddingBlockEnd: 'space'
	paddingBlockStart: 'space'
	paddingInline: 'space'
	paddingInlineEnd: 'space'
	paddingInlineStart: 'space'
	scrollPadding: 'space'
	scrollPaddingTop: 'space'
	scrollPaddingRight: 'space'
	scrollPaddingBottom: 'space'
	scrollPaddingLeft: 'space'
	scrollPaddingBlock: 'space'
	scrollPaddingBlockEnd: 'space'
	scrollPaddingBlockStart: 'space'
	scrollPaddingInline: 'space'
	scrollPaddingInlineEnd: 'space'
	scrollPaddingInlineStart: 'space'
	top: 'space'
	right: 'space'
	bottom: 'space'
	left: 'space'

	fontSize: 'fontSizes'

	background: 'colors'
	backgroundColor: 'colors'
	backgroundImage: 'colors'
	border: 'colors'
	borderBlock: 'colors'
	borderBlockEnd: 'colors'
	borderBlockStart: 'colors'
	borderBottom: 'colors'
	borderBottomColor: 'colors'
	borderColor: 'colors'
	borderInline: 'colors'
	borderInlineEnd: 'colors'
	borderInlineStart: 'colors'
	borderLeft: 'colors'
	borderLeftColor: 'colors'
	borderRight: 'colors'
	borderRightColor: 'colors'
	borderTop: 'colors'
	borderTopColor: 'colors'
	caretColor: 'colors'
	color: 'colors'
	columnRuleColor: 'colors'
	outline: 'colors'
	outlineColor: 'colors'
	fill: 'colors'
	stroke: 'colors'
	textDecorationColor: 'colors'

	fontFamily: 'fonts'

	fontWeight: 'fontWeights'
	lineHeight: 'lineHeights'

	letterSpacing: 'letterSpacings'

	blockSize: 'sizes'
	minBlockSize: 'sizes'
	maxBlockSize: 'sizes'
	inlineSize: 'sizes'
	minInlineSize: 'sizes'
	maxInlineSize: 'sizes'
	width: 'sizes'
	minWidth: 'sizes'
	maxWidth: 'sizes'
	height: 'sizes'
	minHeight: 'sizes'
	maxHeight: 'sizes'
	flexBasis: 'sizes'
	gridTemplateColumns: 'sizes'
	gridTemplateRows: 'sizes'

	borderWidth: 'borderWidths'
	borderTopWidth: 'borderWidths'
	borderLeftWidth: 'borderWidths'
	borderRightWidth: 'borderWidths'
	borderBottomWidth: 'borderWidths'

	borderStyle: 'borderStyles'
	borderTopStyle: 'borderStyles'
	borderLeftStyle: 'borderStyles'
	borderRightStyle: 'borderStyles'
	borderBottomStyle: 'borderStyles'

	borderRadius: 'radii'
	borderTopLeftRadius: 'radii'
	borderTopRightRadius: 'radii'
	borderBottomRightRadius: 'radii'
	borderBottomLeftRadius: 'radii'

	boxShadow: 'shadows'
	textShadow: 'shadows'

	transition: 'transitions'

	zIndex: 'zIndices'
}

export declare const defaultThemeMap: CSSPropertiesToTokenScale
export declare const $variants: unique symbol
export declare const $media: unique symbol

export type StitchesVariants<T> = T extends { [$variants]: infer V; [$media]: infer C } ? VariantsCall<V, C> : {}
export type StitchesExtractVariantsStyles<T> = T extends { [$variants]: infer V } ? V : {}

export type StyledSheetCallback = (...cssText: string[]) => void

export type GlobalRule = () => void

export interface ThemeRule {
	toString(): string
	className: string
	cssText: string
	root: string
}
export interface StyledExpression {
	(): string
	toString(): string
	className: string
	classNames: string[]
	props: any
	selector: string
}

/* Config:
/* ========================================================================== */

// Just used as a keyof target for the config
// for some weird reason, autocomplete stops working
// if we try to pre compute the keys or use a union
export interface EmptyTheme {
	colors?: {}
	space?: {}
	fontSizes?: {}
	fonts?: {}
	fontWeights?: {}
	lineHeights?: {}
	letterSpacings?: {}
	sizes?: {}
	borderWidths?: {}
	borderStyles?: {}
	radii?: {}
	shadows?: {}
	zIndices?: {}
	transitions?: {}
}

export interface TMedias {
	/** This media will always apply. */
	initial: string
	[k: string]: string
}

export type TTheme = { [k in keyof EmptyTheme]?: { [b: string]: number | string } }

export type TThemeMap = { [k in keyof Properties]?: keyof EmptyTheme }

/** Configuration of Stitches, including a default theme, prefix, custom medias, and functional properties. */
export interface IConfig<Medias extends TMedias = TMedias, Theme extends TTheme = TTheme, Utils = {}, Prefix = '', ThemeMap = {}> {
	/** Named CSS media queries. */
	media?: {
		[k in keyof Medias]?: Medias[k]
	}

	/** Named theme scales containing theme tokens. */
	theme?: {
		[k in keyof Theme]: k extends keyof EmptyTheme ? Theme[k] : never
	} &
		{
			[k in keyof EmptyTheme]?: k extends keyof Theme ? Theme[k] : never
		}

	/** CSS properties corresponding to functions that accept CSS values and return new CSS object fragments. */
	utils?: {
		[k in keyof Utils]: (config: UtilConfig<Medias, Theme, Prefix, ThemeMap>) => (value: Utils[k]) => InternalCSS<Medias, Theme, Utils, ThemeMap>
	}

	themeMap?: { [k in keyof ThemeMap]?: ThemeMap[k] }

	/** Prefix added before all generated class names. */
	prefix?: Prefix

	/** Determines how the CSS file is inserted to a document. */
	insertionMethod?: 'append' | 'prepend' | (() => (cssText: string) => void)
}

interface UtilConfig<Medias, Theme, Prefix, ThemeMap> {
	/** Named CSS media queries. */
	media: Medias

	/** Named theme scales containing theme tokens. */
	theme: Theme
	themeMap: ThemeMap

	/** Prefix applied to all styled and themed rules. */
	prefix: Prefix
}

export interface InternalConfig<Medias extends TMedias = TMedias, Theme extends TTheme = TTheme, Utils = {}, Prefix = '', ThemeMap = {}> {
	/** Named CSS media queries. */
	media: Medias

	/** Named theme scales containing theme tokens. */
	theme: Theme
	themeMap: ThemeMap

	/** Prefix applied to all styled and themed rules. */
	prefix: Prefix

	/** Functional properties whose values can be expanded into other properties. */
	utils: {
		[k in keyof Utils]: (config: UtilConfig<Medias, Theme, Prefix, ThemeMap>) => (value: Utils[k]) => InternalCSS<Medias, Theme, Utils, ThemeMap>
	}
}

export type MapUtils<T> = { [k in keyof T]: T[k] extends (theme: any) => (value: infer V) => any ? V : never }

/* Css typed structure:
/* ========================================================================== */

export type InternalCSS<
	Medias extends TMedias = TMedias,
	Theme extends TTheme = TTheme,
	Utils = {},
	ThemeMap extends {
		[k in keyof Properties]?: keyof Theme
	} = CSSPropertiesToTokenScale,
> = FlatInternalCSS<Medias, Theme, Utils, ThemeMap> & {
	[k: string]: InternalCSS<Medias, Theme, Utils, ThemeMap> | number | string | undefined | { [k: string]: InternalCSS<Medias, Theme, Utils, ThemeMap> }
}

// @todo: this is a messy work-around to prevent variants with the same name as a css property from erroring out
export type LessInternalCSS<
	Medias extends TMedias = TMedias,
	Theme extends TTheme = TTheme,
	Utils = {},
	ThemeMap extends {
		[k in keyof Properties]?: keyof Theme
	} = CSSPropertiesToTokenScale,
> = FlatInternalCSS<Medias, Theme, Utils, ThemeMap>

// prettier-ignore
export type FlatInternalCSS<
	Medias extends TMedias = TMedias,
	Theme extends TTheme = TTheme,
	Utils = {},
	ThemeMap extends {
		[k in keyof Properties]?: keyof Theme
	} = CSSPropertiesToTokenScale
> = {
	[k in keyof Properties]?: (
		ThemeMap[k] extends keyof Theme
			? `$${Extract<keyof Theme[ThemeMap[k]], string | number>}`
			: never
	) | Properties[k]
} & {
	/** Responsive variants: */
	[k in `@${string & keyof Medias}`]?: (
		FlatInternalCSS<Medias, Theme, Utils, ThemeMap>
		& {
			/** Unknown property. */
			[k in string]: unknown
		}
	)
} & {
	[k in keyof Utils]?: Utils[k]
}

/* Utils to type and extract variants from args args:
/* ========================================================================== */

/** Combines rest parameter variants into one: */
export type InferRestVariants<Args extends any[]> = Args[0] & (HasTail<Args> extends true ? InferRestVariants<Tail<Args>> : {})

/* Check if current array has a tail: */
type HasTail<T extends any[]> = T extends [] | [any] ? false : true

/* Return the tail of an array: */
type Tail<T extends any[]> = ((...t: T) => any) extends (_: any, ...tail: infer _Tail) => any ? _Tail : []

export type OmitKey<T, U extends keyof any> = T & { [P in U]?: unknown }

export type ThemeToken = {
	value: string
	token: string
	scale: string
	computedValue: string
	variable: string
} & string
/* Css Instance Type:
/* ========================================================================== */

export interface TStyledSheet<
	/** Named CSS media queries. */
	A extends TMedias = TMedias,
	/** Named theme scales containing theme tokens. */
	B extends TTheme = TTheme,
	C = {},
	D = '',
	ThemeMap = {},
> {
	<Vars extends any[]>(
		...styles: {
			[k in keyof Vars]: OmitKey<InternalCSS<A, B, C, ThemeMap>, 'variants'> & {
				variants?: unknown
			}
		}
	): IStyledRule<InferRestVariants<Vars>, A, B, C, ThemeMap>

	/**
	 * Generates CSS from global rules and returns a function that renders them to the stylesheet.
	 *
	 * ```
	 *
	 * const myGlobal = global({
	 *   "*, ::before, ::after": { boxSizing: "border-box" }
	 *   "body": { margin: 0 }
	 * })
	 *
	 * myGlobal()
	 * ```
	 * <br />
	 */
	global: (definition: OmitKey<Record<string, InternalCSS<A, B, C, ThemeMap>>, '@font-face' | '@import'> | DeclarationListWithRootAtRules) => GlobalRule

	/**
	 * Generates CSS from theme scales and returns a function that renders them to the stylesheet.
	 *
	 * ```
	 *
	 * const myTheme = theme({
	 *   colors: { blue: "DodgerBlue" }
	 * })
	 *
	 * <article className={myTheme.className} />
	 * ```
	 * <br />
	 */
	theme: {
		(
			/** Named theme scales containing theme tokens. */
			theme: Partial<
				{
					[TO in keyof B]: Partial<B[TO]>
				}
			>,
		): ThemeRule & string

		(
			themeName: string,
			/** Named theme scales containing theme tokens. */
			theme: Partial<
				{
					[TO in keyof B]: Partial<B[TO]>
				}
			>,
		): ThemeRule & string
	} & {
		[TO in keyof B]: { [k in keyof B[TO]]: ThemeToken }
	}
	config: InternalConfig<A, B, C, D, ThemeMap>

	/**
	 * Returns a new styled rule.
	 */
	css: {
		<Vars extends any[]>(
			...styles: {
				// prettier-ignore
				[k in keyof Vars]: (
					(
						(
							(
								LessInternalCSS<A, B, C, ThemeMap>
							)
							& {
								variants?: Vars[k] & {
									[a in keyof Vars[k]]: {
										[b in keyof Vars[k][a]]: InternalCSS<A, B, C, ThemeMap>
									}
								}
							}
						)
						| Record<string, InternalCSS<A, B, C, ThemeMap> | string | number>
					)
					& {
						defaultVariants?: {
							[a in keyof Vars[k]]?: keyof Vars[k][a]
						}
					}
					& {
						compoundVariants?: (
							{
								[a in keyof Vars[k]]?: keyof Vars[k][a]
							}
							& {
								css?: InternalCSS<A, B, C, ThemeMap>
							}
						)[]
					}
				)
			}
		): IStyledRule<InferRestVariants<Vars>, A, B, C, ThemeMap>
	}

	keyframes: (definition: { [k: string]: FlatInternalCSS<A, B, C, ThemeMap> }) => GlobalRule

	/** Clears all CSS rules from the sheet.  */
	clear(): void

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

	/** Named CSS media queries. */
	media: A

	/** Prefix applied to all styled and themed rules. */
	prefix: string

	/** Functional properties whose values can be expanded into other properties. */
	utils: C
}

export type StrictMorphVariant<T> = T extends number ? `${T}` | T : T extends 'true' ? true | T : T extends 'false' ? false | T : T
export type MorphVariant<T> = T extends number ? `${T}` | T : T extends 'true' ? boolean | T : T extends 'false' ? boolean | T : T extends `${number}` ? number | T : T

export type VariantsCall<Variants, Medias> = {
	[k in keyof Variants]?: MorphVariant<keyof Variants[k]> | { [I in keyof Medias]?: MorphVariant<keyof Variants[k]> }
}

/** Extracts the css type from the  */
export type StitchesCss<T> = T extends {
	config: {
		media: infer Medias
		theme: infer Theme
		utils: infer Utils
		themeMap: infer ThemeMap
	}
}
	? InternalCSS<Medias extends TMedias ? Medias : never, Theme extends TTheme ? Theme : never, MapUtils<Utils>, ThemeMap>
	: never

/* Output Styled Rule:
/* ========================================================================== */
export interface IStyledRule<Variants, Medias extends TMedias = TMedias, Theme extends TTheme = TTheme, Utils = {}, ThemeMap = {}> {
	(
		init?: VariantsCall<Variants, Medias> & {
			css?: InternalCSS<Medias, Theme, Utils, ThemeMap>
			className?: string
		},
	): StyledExpression & string

	toString(): string
	/**
	 * CSS Class associated with the current component.
	 *
	 * ```
	 *
	 * const Button = css({ color: "DarkSlateGray" })
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
	 * const Button = css({ color: "DarkSlateGray" })
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

/* Create Css function type:
/* ========================================================================== */

type TStyledSheetFactory = <Medias extends TMedias = TMedias, Theme extends TTheme = TTheme, Utils = {}, Prefix = '', ThemeMap extends TThemeMap = CSSPropertiesToTokenScale>(
	_config?: IConfig<Medias, Theme, Utils, Prefix, ThemeMap>,
) => TStyledSheet<Medias & { initial: '' }, Theme, Utils, Prefix, ThemeMap>

type TStyledSheetGlobal = (definition: OmitKey<Record<string, {}>, '@font-face' | '@import'> | DeclarationListWithRootAtRules) => GlobalRule

export declare const createCss: TStyledSheetFactory
export declare const css: TStyledSheet<{ initial: '' }, {}, {}, '', CSSPropertiesToTokenScale>
export declare const global: (definition: OmitKey<Record<string, InternalCSS<{} & TMedias, {}, {}, CSSPropertiesToTokenScale>>, '@font-face' | '@import'> | DeclarationListWithRootAtRules) => GlobalRule
export declare const keyframes: (definition: { [k: string]: FlatInternalCSS<{} & TMedias, {}, {}, CSSPropertiesToTokenScale> }) => GlobalRule

export default createCss
