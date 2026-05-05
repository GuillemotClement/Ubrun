import { Button } from '../ui/button';

type FormActionProp = {
  submitText: string;
  handleReset: () => void;
};

export default function FormAction({ submitText, handleReset }: FormActionProp) {
  return (
    <div className="flex justify-end mt-5 gap-x-3">
      <Button type="button" onClick={handleReset} variant={'outline'}>
        Effacer
      </Button>
      <Button type="submit">{submitText}</Button>
    </div>
  );
}
