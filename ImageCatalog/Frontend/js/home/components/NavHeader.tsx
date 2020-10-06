import * as React from "react";
import { Container, Nav, Navbar } from 'react-bootstrap';
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import "../styles/NavHeader.less";

interface IProps {
    location: Location;
}

class NavHeaderLayout extends React.Component<IProps> {

    public render() {
        return (
            <header>
                <Container>
                    <Navbar className="navbar-menu">
                        <Nav activeKey={this.props.location.pathname}>
                            <div className="navbar-menu_link">
                                <Nav.Link eventKey="/" as={Link} to="/">Главная</Nav.Link>
                            </div>
                        </Nav>
                    </Navbar>
                </Container>
            </header>
        );
    }
}

export const NavHeader = withRouter(NavHeaderLayout);