import React from "react";

export const SelectField = ({
  value,
  onChange,
  options,
  placeholder,
  required,
}) => (
  <div style={styles.wrapper}>
    <label
      style={{
        ...styles.label,
        ...(value ? styles.labelFloat : {}),
      }}
    >
      {placeholder} {required && <span style={styles.required}>*</span>}
    </label>
    <select
      value={value}
      onChange={onChange}
      required={required}
      style={styles.select}
    >
      {options.map((opt, idx) => (
        <option key={idx} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const styles = {
  wrapper: {
    position: "relative",
    width: "100%",
  },
  select: {
    width: "100%",
    padding: "14px 12px 6px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    outline: "none",
    fontSize: "14px",
    color: "#111827",
    background: "#fff",
  },
  label: {
    position: "absolute",
    left: "12px",
    top: "14px",
    color: "#6b7280",
    fontSize: "14px",
    transition: "all 0.2s ease",
    pointerEvents: "none",
  },
  labelFloat: {
    top: "-8px",
    left: "10px",
    fontSize: "12px",
    background: "#fff",
    padding: "0 4px",
    color: "#14b8a6",
  },
  required: {
    color: "#dc2626",
    marginLeft: "2px",
  },
};
