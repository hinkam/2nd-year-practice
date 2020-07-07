import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";

class PasswordModal extends Component{
    constructor(props){
        super(props);
        this.state = {show: false, value: ''};
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    show(){
        this.setState({show: true})
    }

    hide(){
        this.setState({show: false})
    }

    render(){
        return(
            <Modal centered show={this.state.show}>
                <Modal.Header>
                    <h4>{this.props.title}</h4>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.props.onUpload}>
                        <Form.Group>
                            <Form.Control type="password" placeholder="Password" value={this.state.value} onChange={this.handleChange}/>
                        </Form.Group>
                        <Button className="float-right" type="submit">
                            Enter
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export { PasswordModal }
