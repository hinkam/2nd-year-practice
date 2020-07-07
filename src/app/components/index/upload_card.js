import React, { Component } from "react";
import { Card, Form, Button } from "react-bootstrap";

class UploadCard extends Component{
    constructor(props){
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }


    render(){
        return (
            <Card bg="secondary" text="white" style={{ width: '40rem' }}>
                <Card.Header>
                    <Card.Title>
                        {this.props.title}
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={this.props.onUpload}>
                        <Form.Group>
                            <Form.Control as="textarea" rows="11" value={this.state.value} onChange={this.handleChange}/>
                        </Form.Group>
                        <Button className="float-right" type="submit">
                            Upload
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}

export { UploadCard }
