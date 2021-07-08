import Menu from "./elements/Menu";
import TopNav from "./elements/TopNav";

const Header = ({ containerType, headerStyle, userData }) => {
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
      <TopNav containerType={containerType} userData={userData} />
      <Menu containerType={containerType} />
    </div>
  );
}

export default Header;
