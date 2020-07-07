import React, { Component } from "react";
import { UploadCard } from "./upload_card";
import { ResultModal } from "./result_modal";

class App extends Component{
    constructor(){
        super();
        this.onUpload = this.onUpload.bind(this);
        this.uploadCardIndex = React.createRef();
        this.modalIndex = React.createRef();
        this.state = { link: " ", password: " "};
    }

    onUpload(event) {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/image/create',
            data: { userText: this.uploadCardIndex.current.state.value },
            success: (serverData) => {
                if (serverData.imageID != null){
                    this.modalIndex.current.show();
                    this.setState({link: `http://localhost:8080/image/${serverData.imageID}`, password: serverData.imagePw}); // Hardcode. Too bad!
                }
            }
        });
        return false;
    }

    render(){
        return (
            <>
            <UploadCard title="Input your text" onUpload={this.onUpload} ref={this.uploadCardIndex}></UploadCard>
            <ResultModal ref={this.modalIndex} link={this.state.link} password={this.state.password}></ResultModal>
            </>
        );
    }
}

export { App }
