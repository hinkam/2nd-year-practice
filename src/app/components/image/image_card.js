import React, { Component } from "react";
import { Card, Form, Image } from "react-bootstrap";

class ImageCard extends Component{
    constructor(){
        super();
    }

    render(){
        return (
            <Card bg="secondary" text="white" style={{ width: '48rem' }}>
                <Card.Header>
                    <Card.Title>
                        <h3>Your image</h3>
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <Image src={this.props.base64} id="user-image"></Image>
                    <h6 id="access-count">Access count: {this.props.count}</h6>
                </Card.Body>
            </Card>
        );
    }
}

export { ImageCard }
