import styles from './Message.module.css'

const Message = ({messageContent, showMessage}) => {
    return (
        <aside className={`${styles.messageWrapper} ${showMessage ? styles.show : styles.hide}`} >
            <div>
                <p>{messageContent}</p>
            </div> 
        </aside>
    );
};

export default Message;