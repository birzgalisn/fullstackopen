interface HeaderProps {
  course: string;
}

const Header = (props: HeaderProps): JSX.Element => {
  return <h1>{props.course}</h1>;
};

export default Header;
