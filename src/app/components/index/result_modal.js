import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class ResultModal extends Component{
    constructor(){
        super();
        this.state = {show: false};
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    show(){
        this.setState({show: true})
    }

    hide(){
        this.setState({show: false})
    }

    render(){
        return(
            <Modal show={this.state.show}>
                <Modal.Header>
                    Congrats! Your image is here:
                </Modal.Header>
                <Modal.Body>
                    <a href={this.props.link}>Your link</a>
                    <p>Your password: {this.props.password}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="float-right" variant="primary" onClick={this.hide}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export { ResultModal }
