import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


const Footer = () => {
  return (
    <div>
      <Navbar className="bg-body-tertiary mt-5 ">
      <Container>
        <Navbar.Brand href="#home">Dev: Miguel Angel Zambrano</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Seguime en: <a href="https://www.instagram.com/cerebrofinanciero4/" target='_blank'>Instagram</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Footer
