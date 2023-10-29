const Notification = ({ message, messageClass }) => {
  if (message === null) {
    console.log("The value is null Awad");
    return null;
  } else {
    console.log(`The message is ${message} Awad`);
    return <div className={messageClass}>{message}</div>;
  }
};

export default Notification;
