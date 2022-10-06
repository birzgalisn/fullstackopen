const displayNotification = async (notificationSetter, callback) => {
  const timeout = setTimeout(() => {
    notificationSetter({ type: "", message: "" });
  }, 5_000);

  try {
    const message = await callback();
    if (message) {
      notificationSetter({ type: "success", message });
    }
  } catch (err) {
    notificationSetter({ type: "error", message: err.response.data.error });
  }

  return () => {
    clearTimeout(timeout);
  };
};

export { displayNotification };
