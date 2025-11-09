export default function Button({ title, fct, style }) {
  return (
    <button
      className={style}
      onClick={fct}
    >
      {title}
    </button>
  );
}