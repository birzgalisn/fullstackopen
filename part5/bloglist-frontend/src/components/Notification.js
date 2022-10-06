const Notification = ({ notification }) => {
  const { type, message } = notification;

  const notificaitonStyle = {
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: type === "error" ? "red" : "green",
    display: message ? "" : "none",
  };

  return (
    <div aria-label={"Notification"} style={notificaitonStyle}>
      {message}
    </div>
  );
};

export default Notification;
