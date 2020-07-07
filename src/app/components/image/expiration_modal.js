import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class ExpirationModal extends Component{
    constructor(){
        super();
        this.state = {show: false};
        this.show = this.show.bind(this);
    }

    show(){
        this.setState({show: true})
    }

    render(){
        return (
        <Modal centered show={this.state.show}>
            <Modal.Header>
                <h4>Link has expired!</h4>
            </Modal.Header>
            <Modal.Footer>
                <Button className="float-right" variant="primary" onClick={() => { window.location = 'http://localhost:8080'}}>
                    Close
                </Button> 
            </Modal.Footer>
        </Modal>
        );
    }
}

export { ExpirationModal }
