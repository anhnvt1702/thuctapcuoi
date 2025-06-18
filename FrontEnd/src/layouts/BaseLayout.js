import React, { Component } from "react";
import TopNavBar from "../components/TopNavBar";
import Footer from "../components/Footer";
import NavBar from "components/NavBar/NavBar";

class BaseLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topHaderClass: "show",
    };
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", this.handleScroll);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = (event) => {
    if (window.scrollY >= 50) {
      this.setState({ topHaderClass: "hide" });
    } else {
      this.setState({ topHaderClass: "show" });
    }
  };
  render() {
    return (
      <>
          <div className="main-wrapper">
            <div className="super_container">
              <header className="header trans_300">
                <TopNavBar className={this.state.topHaderClass} />
                <NavBar />
              </header>
              <div className="layout-Container">{this.props.children}</div>
              <Footer />
            </div>
          </div>
      </>
    );
  }
}

export default BaseLayout;
