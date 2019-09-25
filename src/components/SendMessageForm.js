import React from 'react';

class SendMessageForm extends React.Component {
    render(){
        return(
            <form classname="send-message-form">
                <input 
                   placeholder="SendMessageForm" 
                   type="text"
                />
            </form>
        )
    }
}

export default SendMessageForm;