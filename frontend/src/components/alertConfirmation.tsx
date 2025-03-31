import React, { forwardRef, useImperativeHandle, useState } from "react";

export interface alertConfirmationHandle {
  showAlert: (onConfirm: () => void) => void;
}

const AlertConfirmation = forwardRef<alertConfirmationHandle>((_, ref) => {
  const [visible, setVisible] = useState(false);
  const [onConfirmCallback, setOnConfirmCallback] = useState<() => void>(() => {});

  useImperativeHandle(ref, () => ({
    showAlert: (onConfirm) => {
      setVisible(true);
      setOnConfirmCallback(() => onConfirm);
    },
  }));

  const handleConfirm = () => {
    setVisible(false);
    onConfirmCallback();
  };

  const handleCancel = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Are you sure you want to submit?</h2>
        <div style={styles.buttonRow}>
          <button onClick={handleConfirm} style={styles.confirmBtn}>Confirm</button>
          <button onClick={handleCancel} style={styles.cancelBtn}>Cancel</button>
        </div>
      </div>
    </div>
  );
});

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 9999,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 0 30px rgba(0, 0, 0, 0.2)",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
    gap: "20px"
  },
  confirmBtn: {
    padding: "10px 20px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  cancelBtn: {
    padding: "10px 20px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default AlertConfirmation;
