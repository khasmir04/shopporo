import { Row, Col } from "antd";

import ShopSidebar from "./ShopSidebar";
import ShopContent from "./ShopContent";
// import ShopQuickView from "./ShopQuickView";
import Container from "../other/Container";

const ShopLayout = ({
  shopSidebarResponsive,
  shopContentResponsive,
  productResponsive,
  fiveColumn,
  data,
  productPerPage,
  productStyle,
  // containerType,
}) => {
  return (
    <div className="shop-layout">
      {/* <Container type={containerType}> */}
      <Container>
        <Row gutter={30}>
          <Col className="gutter-row" {...shopSidebarResponsive}>
            <ShopSidebar />
          </Col>
          <Col className="gutter-row" {...shopContentResponsive}>
            <ShopContent
              productStyle={productStyle}
              productPerPage={productPerPage}
              fiveColumn={fiveColumn}
              productResponsive={productResponsive}
              data={data}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ShopLayout;
