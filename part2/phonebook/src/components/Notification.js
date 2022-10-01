const Notification = ({ notification }) => {
  const { type, message } = notification;

  if (!message) {
    return null;
  }

  return <div className={`notification ${type}`}>{message}</div>;
};

export default Notification;
