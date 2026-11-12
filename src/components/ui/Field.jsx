// A labelled input.  <Field id="web-system-email" label="Work email" type="email" placeholder="name@company" />
// id must start with the page id. Extra props go to the <input>. Use as="textarea" or as="select" (with children).
export default function Field({ id, label, as: Tag = 'input', className = '', children, hint, ...rest }) {
  return (
    <div className={`fieldset ${className}`}>
      <label htmlFor={id}>{label}</label>
      <Tag id={id} className="input" aria-describedby={hint ? `${id}-hint` : undefined} {...rest}>
        {children}
      </Tag>
      {hint && (
        <p id={`${id}-hint`} className="t-small">
          {hint}
        </p>
      )}
    </div>
  );
}
