function EditErrorMessage({ message }) {
    /* ===== ERROR MESSAGE COMPONENT ===== */
    return message && <p style={ { color: "red" } }>Error: { message }</p>
  };
  
  /* ===== EXPORTS ===== */
  export default EditErrorMessage;