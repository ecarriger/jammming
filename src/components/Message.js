import styles from 'Message.module.css'

const Message = ({messageContent, showMessage}) => {
    return (
        <aside id='messageWrapper' className={showMessage ? styles.show : styles.hide} >
            <h3>{messageContent}</h3>
        </aside>
    );
};

export default Message;