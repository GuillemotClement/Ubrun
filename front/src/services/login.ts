import axios from "axios";

type CredentialProps = {
  name: string;
  password: string;
};

const login = async (credentials: CredentialProps) => {
  const response = await axios.post(
    "http://localhost:3002/api/login",
    credentials,
  );
  return response.data;
};

export default { login };
