import Menu from "./elements/Menu";
import TopNav from "./elements/TopNav";

const Header = ({ containerType, headerStyle }) => {
  const renderStyleClass = (type) => {
    switch (type) {
      case "two":
        return "-style-two";
      default:
        return "default";
    }
  };
  return (
    <div className={`header-one ${renderStyleClass(headerStyle)}`}>
      <TopNav containerType={containerType} />
      <Menu containerType={containerType} />
    </div>
  );
}

export default Header;
