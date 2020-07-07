import React, { Component } from "react";
import { PasswordModal } from "./password_modal";
import { ExpirationModal } from "./expiration_modal";
import { ImageCard } from "./image_card";

class Image extends Component{
    constructor(){
        super();
        const imageID = /[a-z0-9]{16}/.exec(window.location.href)[0];
        this.expirationModalIndex = React.createRef();
        this.passwordModalIndex = React.createRef();
        this.renderImageIndex = React.createRef();
        this.onUpload = this.onUpload.bind(this);
        this.state = {modalTitle: 'Enter password:', base64: '', count: '' };

        $.ajax({
            type: 'GET',
            url: '/api/image/check',
            data: {
                imageID
            },
            success: (serverData) => {
                if (serverData.isAccessable) {
                    document.cookie = `time=${new Date()}`;
                    document.cookie = `accessPath=${window.location.href}`;
                    this.passwordModalIndex.current.show();
                } else {
                    this.expirationModalIndex.current.show();
                }
            }
        });
    }

    onUpload(event) {
        event.preventDefault();
        $.ajax({
            type: 'GET',
            url: '/api/image/get',
            data: { imageID: /[a-z0-9]{16}/.exec(window.location.href)[0], password: this.passwordModalIndex.current.state.value},
            success: (serverData) => {
                if (serverData.isCorrectPassword) {
                    this.passwordModalIndex.current.hide();
                    this.setState({base64: `data:image/png;base64, ${serverData.image64}`, count: serverData.accessCount});
                } else {
                    this.setState({modalTitle: 'Incorrect password! Try again.'});
                }
            }
        });
        return false;
    }

    render(){
        return (
            <>
                <ExpirationModal ref={this.expirationModalIndex}></ExpirationModal>
                <PasswordModal ref={this.passwordModalIndex} onUpload={this.onUpload} title={this.state.modalTitle}></PasswordModal>
                <ImageCard ref={this.renderImageIndex} base64={this.state.base64} count={this.state.count}></ImageCard>
            </>
        );
    }
}

export { Image }
