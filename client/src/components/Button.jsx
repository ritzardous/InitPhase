export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  style,
  ...props
}) {
  return (
    <button
      className={`app-button app-button--${variant} app-button--${size} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
}
