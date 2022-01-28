import MenuStyles from './styles';

const { Link } = MenuStyles;

const LINKS = [
  { path: '/', name: 'Home' },
  { path: '/about', name: 'About' },
];

const Menu = () => (
  <nav>
    {LINKS.map(({ path, name }, i) => (
      <Link
        to={path}
        key={`menu-${i}`}
      >
        {name}
      </Link>
    ))}
  </nav>
);

export default Menu;
