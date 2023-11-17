const Notification = ({ message, messageClass }) => {
  if (message === null) {
    console.log("The value is null");
    return null;
  } else {
    console.log(`The message is ${message}`);
    return <div className={messageClass}>{message}</div>;
  }
};

export default Notification;
