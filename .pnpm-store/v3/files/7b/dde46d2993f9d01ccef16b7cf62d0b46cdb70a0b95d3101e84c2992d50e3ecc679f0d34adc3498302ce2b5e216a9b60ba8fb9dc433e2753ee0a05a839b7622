import locationHook from "./use-location.js";
import makeMatcher from "./matcher.js";

import {
  useRef,
  useLayoutEffect,
  useContext,
  useCallback,
  createContext,
  isValidElement,
  cloneElement,
  createElement as h,
  Fragment,
} from "./react-deps.js";

/*
 * Part 1, Hooks API: useRouter, useRoute and useLocation
 */

// one of the coolest features of `createContext`:
// when no value is provided — default object is used.
// allows us to use the router context as a global ref to store
// the implicitly created router (see `useRouter` below)
const RouterCtx = createContext({});

const buildRouter = ({
  hook = locationHook,
  base = "",
  matcher = makeMatcher(),
} = {}) => ({ hook, base, matcher });

export const useRouter = () => {
  const globalRef = useContext(RouterCtx);

  // either obtain the router from the outer context (provided by the
  // `<Router /> component) or create an implicit one on demand.
  return globalRef.v || (globalRef.v = buildRouter());
};

export const useLocation = () => {
  const router = useRouter();
  return router.hook(router);
};

export const useRoute = (pattern) => {
  const [path] = useLocation();
  return useRouter().matcher(pattern, path);
};

// internal hook used by Link and Redirect in order to perform navigation
const useNavigate = (options) => {
  const navRef = useRef();
  const [, navigate] = useLocation();

  navRef.current = () => navigate(options.to || options.href, options);
  return navRef;
};

/*
 * Part 2, Low Carb Router API: Router, Route, Link, Switch
 */

export const Router = (props) => {
  const ref = useRef();

  // this little trick allows to avoid having unnecessary
  // calls to potentially expensive `buildRouter` method.
  // https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
  const value = ref.current || (ref.current = { v: buildRouter(props) });

  return h(RouterCtx.Provider, {
    value,
    children: props.children,
  });
};

export const Route = ({ path, match, component, children }) => {
  const useRouteMatch = useRoute(path);

  // `props.match` is present - Route is controlled by the Switch
  const [matches, params] = match || useRouteMatch;

  if (!matches) return null;

  // React-Router style `component` prop
  if (component) return h(component, { params });

  // support render prop or plain children
  return typeof children === "function" ? children(params) : children;
};

export const Link = (props) => {
  const navRef = useNavigate(props);
  const { base } = useRouter();

  let { to, href = to, children, onClick } = props;

  const handleClick = useCallback(
    (event) => {
      // ignores the navigation when clicked using right mouse button or
      // by holding a special modifier key: ctrl, command, win, alt, shift
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.shiftKey ||
        event.button !== 0
      )
        return;

      event.preventDefault();
      navRef.current();
      onClick && onClick(event);
    },
    // navRef is a ref so it never changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onClick]
  );

  // wraps children in `a` if needed
  const extraProps = {
    // handle nested routers and absolute paths
    href: href[0] === "~" ? href.slice(1) : base + href,
    onClick: handleClick,
    to: null,
  };
  const jsx = isValidElement(children) ? children : h("a", props);

  return cloneElement(jsx, extraProps);
};

const flattenChildren = (children) => {
  return Array.isArray(children)
    ? [].concat(
        ...children.map((c) =>
          c.type === Fragment
            ? flattenChildren(c.props.children)
            : flattenChildren(c)
        )
      )
    : [children];
};

export const Switch = ({ children, location }) => {
  const { matcher } = useRouter();
  const [originalLocation] = useLocation();

  for (const element of flattenChildren(children)) {
    let match = 0;

    if (
      isValidElement(element) &&
      // we don't require an element to be of type Route,
      // but we do require it to contain a truthy `path` prop.
      // this allows to use different components that wrap Route
      // inside of a switch, for example <AnimatedRoute />.
      (match = element.props.path
        ? matcher(element.props.path, location || originalLocation)
        : [true, {}])[0]
    )
      return cloneElement(element, { match });
  }

  return null;
};

export const Redirect = (props) => {
  const navRef = useNavigate(props);

  // empty array means running the effect once, navRef is a ref so it never changes
  useLayoutEffect(() => {
    navRef.current();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default useRoute;
