type FormProp = {
  children: React.ReactNode;
  onSubmit: React.SubmitEventHandler<HTMLFormElement>;
};

export default function Form({ children, onSubmit }: FormProp) {
  return (
    <form onSubmit={onSubmit} className="">
      {children}
    </form>
  );
}
