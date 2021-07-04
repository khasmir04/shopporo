import { Row, Col, Divider } from "antd";
import Link from "next/link";
import Container from "../other/Container";

export default function Banners({ containerType }) {
  return (
    <div className="banners">
      <Container type={containerType}>
        <Row gutter={30}>
          {Array.from({ length: 3 }, (item, index) => (
            <Col key={index} className="gutter-row" span={24} sm={8}>
              {/* <Link href={process.env.PUBLIC_URL + "#"}></Link> */}
              <Link href="/#">
                <a className="banner-item">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      `/assets/images/banners/${index + 1}.png`
                    }
                    alt="banner"
                  />
                </a>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
