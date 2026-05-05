type FormProp = {
  children: React.ReactNode;
  onSubmit: React.SubmitEventHandler<HTMLFormElement>;
  title: string;
};

export default function Form({ children, onSubmit, title }: FormProp) {
  return (
    <form onSubmit={onSubmit} className="">
      {/* <h2 className="text-center font-bold my-3">{title}</h2> */}
      {children}
    </form>
  );
}
