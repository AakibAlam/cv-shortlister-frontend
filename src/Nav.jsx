import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";

function Nav() {
  return (
    <>
      <Navbar className="navbar">
        <Container>
          <a
            href="/"
            style={{
              fontSize: "70px",
              color: "blue",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            crux
          </a>
        </Container>
      </Navbar>
    </>
  );
}

export default Nav;
