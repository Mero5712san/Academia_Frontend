export const Button = ({
  text,
  onClick,
  type = "button",
  color = "#14b8a6",
}) => (
  <button
    type={type}
    onClick={onClick}
    style={{ ...styles.button, backgroundColor: color }}
  >
    {text}
  </button>
);

const styles = {
  button: {
    flexShrink: 0,
    padding: "12px 20px",
    borderRadius: "10px",
    border: "none",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    color: "#fff",
    transition: "background-color 0.3s ease, transform 0.1s ease",
  },
};
