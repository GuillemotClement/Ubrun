type AllureResultProps = {
  allure: string;
  isAllure: boolean;
};

export default function AllureResult({ allure, isAllure }: AllureResultProps) {
  return <div>{isAllure ? <p>{allure} min/km</p> : <p>{allure} km/h</p>}</div>;
}