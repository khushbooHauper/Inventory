import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import OffCanvas from "../components/OffCanvas";
import RoutesConfig from "../components/RoutesConfig";
import '../assets/styles/dashboard.scss';

function Dashboard() {
  const [isMobileView, setIsMobileView] = useState(false);
  const [isTabletView, setIsTabletView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setIsMobileView(windowWidth < 768);
      setIsTabletView(windowWidth >= 768 && windowWidth < 1024);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <Container fluid className="p-0">
        <Row>
          {isMobileView || isTabletView ? (
            <Col sm={12} xs={12} className="p-0">
              <OffCanvas />
            </Col>
          ) : (
            <Col sm={2} xs={2}>
              <Sidebar />
            </Col>
          )}
          <Col
            sm={isMobileView || isTabletView ? 12 : 10}
            xs={isMobileView || isTabletView ? 12 : 10}
          >
            <RoutesConfig />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
