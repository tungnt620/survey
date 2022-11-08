export const convertMessageToDiv = (message, isFromBE) => {
  const renderDiv = (item, index) => (
    <div className="my-translated-paragraph" key={index}>
      {item}
    </div>
  );
  if (isFromBE) {
    const msg = message.split(',');
    return msg.map((item, index) => renderDiv(item, index));
  } else {
    return message.map((item, index) => renderDiv(item, index));
  }
};
