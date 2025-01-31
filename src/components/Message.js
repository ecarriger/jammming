import styles from 'Message.module.css'

const Message = ({message, showMessage}) => {
    return (
        <aside id='messageWrapper' className={showMessage ? styles.show : styles.hide} >
            <h3>{message}</h3>
        </aside>
    );
};

export default Message;