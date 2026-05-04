import { Button } from "../ui/button";

type FormActionProp = {
  submitText: string;
  onReset: () => void;
};

export default function FormAction({ submitText, onReset }: FormActionProp) {
  return (
    <div className="flex justify-end">
      <Button type="button" onClick={() => onReset}>
        Effacer
      </Button>
      <Button type="submit">{submitText}</Button>
    </div>
  );
}
