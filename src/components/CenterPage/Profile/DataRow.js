import styles from "./DataRow.module.css";

const DataRow = ({
  type,
  isEdit,
  target,
  inputValue,
  globalValue,
  title,
  toggleEdit,
  handleChange,
  reset,
  cancelChange,
}) => {
  return (
    <li className={styles.row}>
      <div>
        <span>{title}: </span>
        {!isEdit && <p onDoubleClick={() => toggleEdit(target)}>{globalValue}</p>}
        {isEdit && (
          <input
            className={styles.input}
            type={type}
            value={inputValue}
            onChange={(e) => handleChange(e, target)}
          />
        )}
      </div>
      {!isEdit && <button onClick={() => toggleEdit(target)}>Change</button>}
      {isEdit && (
        <div className={styles.actions}>
          <button onClick={() => reset(target)}>Confirm</button>
          <button onClick={() => cancelChange(target)}>Cancel</button>
        </div>
      )}
    </li>
  );
};

export default DataRow;
