import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";

function Nav() {
  return (
    <>
      <Navbar className="navbar">
        <Container>
          <p
            style={{
              fontSize: "70px",
              color: "blue",
              fontWeight: "bold",
            }}
          >
            crux
          </p>
        </Container>
      </Navbar>
    </>
  );
}

export default Nav;
