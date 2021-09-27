// tslint:disable:no-unnecessary-generics

import {
  JSX,
  FunctionComponent,
  ComponentType,
  ComponentChildren,
  VNode,
} from "preact";

import {
  Path,
  BaseLocationHook,
  HookReturnValue,
  HookNavigationOptions,
  LocationHook,
} from "./use-location";

import { DefaultParams, Params, Match, MatcherFn } from "./matcher";

// re-export types from these modules
export * from "./matcher";
export * from "./use-location";

/*
 * Components: <Route />
 */

export interface RouteComponentProps<T extends DefaultParams = DefaultParams> {
  params: T;
}

export interface RouteProps<T extends DefaultParams = DefaultParams> {
  children?: ((params: Params<T>) => ComponentChildren) | ComponentChildren;
  path?: Path;
  component?: ComponentType<RouteComponentProps<T>>;
}
export function Route<T extends DefaultParams = DefaultParams>(
  props: RouteProps<T>
): VNode<any> | null;

/*
 * Components: <Link /> & <Redirect />
 */

export type NavigationalProps<H extends BaseLocationHook = LocationHook> = (
  | { to: Path; href?: never }
  | { href: Path; to?: never }
) &
  HookNavigationOptions<H>;

export type LinkProps<H extends BaseLocationHook = LocationHook> = Omit<
  JSX.HTMLAttributes,
  "href"
> &
  NavigationalProps<H>;

export type RedirectProps<
  H extends BaseLocationHook = LocationHook
> = NavigationalProps<H> & {
  children?: never;
};

export function Link<H extends BaseLocationHook = LocationHook>(
  props: LinkProps<H>
): VNode<any> | null;

export function Redirect<H extends BaseLocationHook = LocationHook>(
  props: RedirectProps<H>
): VNode<any> | null;

/*
 * Components: <Switch />
 */

export interface SwitchProps {
  location?: string;
  children: Array<VNode<RouteProps>>;
}
export const Switch: FunctionComponent<SwitchProps>;

/*
 * Components: <Router />
 */

export interface RouterProps {
  hook: BaseLocationHook;
  base: Path;
  matcher: MatcherFn;
}
export const Router: FunctionComponent<
  Partial<RouterProps> & {
    children: ComponentChildren;
  }
>;

/*
 * Hooks
 */
export function useRouter(): RouterProps;

export function useRoute<T extends DefaultParams = DefaultParams>(
  pattern: Path
): Match<T>;

export function useLocation<
  H extends BaseLocationHook = LocationHook
>(): HookReturnValue<H>;

// tslint:enable:no-unnecessary-generics
