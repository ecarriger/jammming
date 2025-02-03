import styles from './Message.module.css'

const Message = ({messageContent, showMessage}) => {
    return (
        <aside className={styles.messageWrapper} >
            <div className={showMessage ? styles.show : styles.hide}>
                <p>{messageContent}</p>
            </div> 
        </aside>
    );
};

export default Message;