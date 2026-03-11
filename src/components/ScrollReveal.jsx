import useScrollReveal from "../utils/useScrollReveal";

export default function ScrollReveal({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
  ...rest
}) {
  const ref = useScrollReveal();

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
