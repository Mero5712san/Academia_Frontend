import React from "react";

export const InputWithAction = ({
  type = "text",
  placeholder,
  value,
  onChange,
  actionText,
  onAction,
  required,
}) => {
  return (
    <div style={styles.wrapper}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        style={styles.input}
      />
      <button type="button" onClick={onAction} style={styles.button}>
        {actionText}
      </button>
    </div>
  );
};

const styles = {
  wrapper: {
    position: "relative",
    width: "100%",
  },
  input: {
    width: "100%",
    padding: "12px 90px 12px 12px", // extra right padding for button space
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    outline: "none",
    fontSize: "15px",
    color: "#111827",
  },
  button: {
    position: "absolute",
    top: "50%",
    right: "10px",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    color: "#2563eb", // blue
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
  },
};
