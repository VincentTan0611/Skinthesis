import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ChatBot = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! How may I assist you today?", author: "bot", options: ["Start"] }
    ]);

    const questionsAndAnswers = {
        "Start": {
            response: "Hi, I am Skinthesis, your AI assistant for skin health. How can I assist you today?",
            options: [
                {text: "How does Skinthesis detect skin cancer?"},
                {text:"What types of skin cancer can be detected?"},
                {text:"How to prevent skin cancer?"},
                {text:"Upload an image for analysis"},
                {text:"Quit"}
            ]
        },
        "How does Skinthesis detect skin cancer?": {
            response: "Skinthesis uses a CNN model trained on the HAM10000 dataset, which contains over 10,000 skin lesion images. It analyzes uploaded images to detect potential skin cancer types.",
            options: [
                {text:"How accurate is the AI detection?"},
                {text:"What should I do if the AI detects a high-risk lesion?"},
                {text:"Can AI replace a dermatologist?"},
                {text:"Back to main menu"},
                {text:"Quit"}
            ]
        },
        "How accurate is the AI detection?": {
            response: "The AI model achieves high accuracy but is not 100% perfect. It is designed as an early detection tool, not a replacement for medical diagnosis. Always consult a dermatologist for confirmation.",
            options: [{text:"Back to main menu"}, {text:"Quit"}]
        },
        "What should I do if the AI detects a high-risk lesion?": {
            response: "If a lesion is flagged as high-risk, schedule an appointment with a dermatologist immediately. Early detection is crucial for better treatment outcomes.",
            options: [{text:"Back to main menu"}, {text:"Quit"}]
        },
        "Can AI replace a dermatologist?": {
            response: "No, AI assists in early detection but cannot replace a medical professional. Always seek expert consultation for a final diagnosis.",
            options: [{text:"Back to main menu"}, {text:"Quit"}]
        },
        "What types of skin cancer can be detected?": {
            response: "Skinthesis can detect various types of skin conditions, including Melanoma, Basal Cell Carcinoma (BCC), Squamous Cell Carcinoma (SCC), Actinic Keratosis, Benign Keratosis, Dermatofibroma, and Vascular Lesions.",
            options: [
                {text:"Tell me more about Melanoma"},
                {text:"How do I differentiate between these types?"},
                {text:"What are the symptoms of skin cancer?"},
                {text:"Back to main menu"},
                {text:"Quit"}
            ]
        },
        "Tell me more about Melanoma": {
            response: "Melanoma is the most dangerous type of skin cancer. It appears as an irregular mole with uneven color and borders. If detected early, treatment success is high, but late-stage melanoma can be life-threatening.",
            options: [{text:"Back to main menu"}, {text:"Quit"}]
        },
        "How do I differentiate between these types?": {
            response: "Look for differences in color, shape, texture, and growth rate. For example, melanoma is often dark with irregular borders, while BCC is pearly or waxy with slow growth.",
            options: [{text:"Back to main menu"}, {text:"Quit"}]
        },
        "What are the symptoms of skin cancer?": {
            response: "Common signs include new or changing moles, irregular borders or uneven colors, lesions that bleed, itch, or don't heal, and scaly patches of skin. If you notice any of these, consult a doctor.",
            options: [{text:"Back to main menu"}, {text:"Quit"}]
        },
        "How to prevent skin cancer?": {
            response: "To reduce your risk of skin cancer: Use sunscreen (SPF 30+) daily, avoid excessive sun exposure and tanning beds, wear protective clothing and sunglasses, perform regular self-examinations, and visit a dermatologist for routine check-ups.",
            options: [
                {text:"How often should I get a skin check?"},
                {text:"What are the best sunscreens for protection?"},
                {text:"Back to main menu"},
                {text:"Quit"}
            ]
        },
        "How often should I get a skin check?": {
            response: "Perform a self-check once a month and visit a dermatologist at least once a year or more frequently if you have a history of skin cancer.",
            options: [{text:"Back to main menu"}, {text:"Quit"}]
        },
        "What are the best sunscreens for protection?": {
            response: "Choose a broad-spectrum SPF 30+ sunscreen with UVA & UVB protection. Water-resistant sunscreens are recommended for outdoor activities.",
            options: [{text:"Back to main menu"}, {text:"Quit"}]
        },
        "Upload an image for analysis.": {
            response: "Please upload an image of the skin lesion at scan lesion function. Our AI will analyze it and provide guidance and assistance. (This is not a medical diagnosis. Please consult a doctor for confirmation.)",
            options: [
                {text:"How long does the analysis take?"},
                {text:"What happens after I upload my image?"},
                {text:"Can AI detect if it's cancerous or not?"},
                {text:"Back to main menu"},
                {text:"Quit"}
            ]
        },
        "How long does the analysis take?": {
            response: "Analysis is instant! You will receive results within a few seconds after uploading your image.",
            options: [{text:"Back to main menu"}, {text:"Quit"}]
        },
        "What happens after I upload my image?": {
            response: "The AI will analyze your image and classify the lesion into one of several categories. If it is flagged as high-risk, we strongly recommend consulting a doctor for further examination.",
            options: [{text:"Back to main menu"}, {text:"Quit"}]
        },
        "Can AI detect if it's cancerous or not?": {
            response: "AI can provide a probability score of whether a lesion is suspicious, but it cannot diagnose cancer. Only a biopsy by a dermatologist can confirm skin cancer.",
            options: [{text:"Back to main menu"}, {text:"Quit"}]
        },
        "Back to main menu": {
            response: "Hi, I am Skinthesis, your AI assistant for skin health. How can I assist you today?",
            options: [
                {text:"How does Skinthesis detect skin cancer?"},
                {text:"What types of skin cancer can be detected?"},
                {text:"How to prevent skin cancer?"},
                {text:"Upload an image for analysis."},
                {text:"Quit"}
            ]
        },
        "Quit": {
            response: "Thank you for using our chat service. Have a great day!",
            options: []
        }
    };
    

    const handleOptionClick = (optionText) => {
        const question = questionsAndAnswers[optionText];
        if (!question) {
            console.error("Option not found:", optionText);
            return;  // Prevent further execution if option data is missing
        }
    
        if (optionText === "Quit") {
            setMessages([...messages, { id: messages.length + 1, text: "Thank you for using our chat service. Have a great day!", author: "bot", options: [] }]);
            setTimeout(() => {
                window.location.href = '/';  // Redirect to home page
            }, 1500);
            return;  // Stop the function after handling the quit to prevent additional logic from executing
        }
    
        const responseMessage = {
            id: messages.length + 1,
            text: question.response,
            author: 'bot',
            options: []
        };
    
        const optionsMessage = {
            id: messages.length + 2,
            text: "Pick questions for more guidance or information:",  // Adding introductory text for options
            author: 'bot',
            options: question.options.map(option => option.text)  // Assuming options are objects and mapping over them to get the text property
        };
    
        setMessages(messages => [...messages, { id: messages.length + 1, text: optionText, author: 'user' }, responseMessage, optionsMessage]);
    };
    
    
    const styles = {  
          
        chatbotContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
            backgroundColor: 'white',
            color: '#333',
            padding: '130px 15px 45px 15px',     
        },
        messagesContainer: {
            width: '100%',
            maxWidth: '1000px',
            height: 'auto',
            overflowY: 'auto',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            padding: '25px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'  // Aligns messages to the start by default
        },
        messageContainer: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'flex-start',
        },
        message: {
            display: 'flex',
            flexDirection: 'column',
            padding: '10px 20px',
            margin: '10px 0',
            borderRadius: '0 15px 15px 15px',
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
            maxWidth: '80%',
            fontSize: '14px',
        },
        userMessage: {
            backgroundColor: 'rgb(177, 46, 52)',
            borderRadius: '15px 0 15px 15px',
            color: 'white',
            alignSelf: 'flex-end',
            marginLeft: 'auto',
        },
        icon: {
            marginLeft: '10px',
            marginRight: '10px',
            height: '30px',
            width: '30px'
        },
        optionsContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            width: '100%',
            marginTop: '10px',
        },
        optionButton: {
            padding: '10px 20px',
            margin: '5px 0',
            backgroundColor: '#b12e34',
            color: 'white',
            border: 'none',
            borderRadius: '15px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            width: 'auto',
        }
    };
    

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
            <Header />
            <div style={styles.chatbotContainer}>
                <div style={styles.messagesContainer}>
                    {messages.map((msg) => (
                        <div key={msg.id} style={{
                            display: 'flex',
                            flexDirection: msg.author === 'user' ? 'row-reverse' : 'row', 
                            alignItems: 'flex-start',  
                            gap: '10px',  
                            justifyContent: msg.author === 'user' ? 'flex-end' : 'flex-start', 
                            width: '100%'
                        }}>
                            {/* Display bot icon outside the text bubble */}
                            {msg.author === 'bot' && (
                                <img src="src/images/chatbot.png" style={styles.icon} alt="Bot icon" />
                            )}
                            
                            {/* Text bubble container */}
                            <div style={{ 
                                ...styles.messageContainer, 
                                alignItems: msg.author === 'user' ? 'flex-end' : 'flex-start' 
                            }}>
                                <div style={{ ...styles.message, ...(msg.author === 'user' ? styles.userMessage : {}) }}>
                                    <p>{msg.text}</p>
                        
                                    {/* Options should be inside the bubble */}
                                    {msg.options && msg.options.length > 0 && (
                                        <div style={styles.optionsContainer}> 
                                            {msg.options.map((option, index) => (
                                                <button key={index} style={styles.optionButton} onClick={() => handleOptionClick(option.text ? option.text : option)}>
                                                    {option.text ? option.text : option}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>                        

                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );    
    
}

export default ChatBot;