'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var useLocation$1 = require('./use-location.js');
var matcher = require('./matcher.js');
var react = require('react');

/*
 * Part 1, Hooks API: useRouter, useRoute and useLocation
 */

// one of the coolest features of `createContext`:
// when no value is provided — default object is used.
// allows us to use the router context as a global ref to store
// the implicitly created router (see `useRouter` below)
const RouterCtx = react.createContext({});

const buildRouter = ({
  hook = useLocation$1['default'],
  base = "",
  matcher: matcher$1 = matcher['default'](),
} = {}) => ({ hook, base, matcher: matcher$1 });

const useRouter = () => {
  const globalRef = react.useContext(RouterCtx);

  // either obtain the router from the outer context (provided by the
  // `<Router /> component) or create an implicit one on demand.
  return globalRef.v || (globalRef.v = buildRouter());
};

const useLocation = () => {
  const router = useRouter();
  return router.hook(router);
};

const useRoute = (pattern) => {
  const [path] = useLocation();
  return useRouter().matcher(pattern, path);
};

// internal hook used by Link and Redirect in order to perform navigation
const useNavigate = (options) => {
  const navRef = react.useRef();
  const [, navigate] = useLocation();

  navRef.current = () => navigate(options.to || options.href, options);
  return navRef;
};

/*
 * Part 2, Low Carb Router API: Router, Route, Link, Switch
 */

const Router = (props) => {
  const ref = react.useRef();

  // this little trick allows to avoid having unnecessary
  // calls to potentially expensive `buildRouter` method.
  // https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
  const value = ref.current || (ref.current = { v: buildRouter(props) });

  return react.createElement(RouterCtx.Provider, {
    value,
    children: props.children,
  });
};

const Route = ({ path, match, component, children }) => {
  const useRouteMatch = useRoute(path);

  // `props.match` is present - Route is controlled by the Switch
  const [matches, params] = match || useRouteMatch;

  if (!matches) return null;

  // React-Router style `component` prop
  if (component) return react.createElement(component, { params });

  // support render prop or plain children
  return typeof children === "function" ? children(params) : children;
};

const Link = (props) => {
  const navRef = useNavigate(props);
  const { base } = useRouter();

  let { to, href = to, children, onClick } = props;

  const handleClick = react.useCallback(
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
  const jsx = react.isValidElement(children) ? children : react.createElement("a", props);

  return react.cloneElement(jsx, extraProps);
};

const flattenChildren = (children) => {
  return Array.isArray(children)
    ? [].concat(
        ...children.map((c) =>
          c.type === react.Fragment
            ? flattenChildren(c.props.children)
            : flattenChildren(c)
        )
      )
    : [children];
};

const Switch = ({ children, location }) => {
  const { matcher } = useRouter();
  const [originalLocation] = useLocation();

  for (const element of flattenChildren(children)) {
    let match = 0;

    if (
      react.isValidElement(element) &&
      // we don't require an element to be of type Route,
      // but we do require it to contain a truthy `path` prop.
      // this allows to use different components that wrap Route
      // inside of a switch, for example <AnimatedRoute />.
      (match = element.props.path
        ? matcher(element.props.path, location || originalLocation)
        : [true, {}])[0]
    )
      return react.cloneElement(element, { match });
  }

  return null;
};

const Redirect = (props) => {
  const navRef = useNavigate(props);

  // empty array means running the effect once, navRef is a ref so it never changes
  react.useLayoutEffect(() => {
    navRef.current();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

exports.Link = Link;
exports.Redirect = Redirect;
exports.Route = Route;
exports.Router = Router;
exports.Switch = Switch;
exports.default = useRoute;
exports.useLocation = useLocation;
exports.useRoute = useRoute;
exports.useRouter = useRouter;
