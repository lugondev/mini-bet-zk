import { useAccount } from "wagmi";
import AppFormBid from "../components/Form/AppFormBid";

const App = () => {
  const { address } = useAccount();

  if (!address) return null;

  return (
    <>
      <div
        style={{
          paddingTop: 100,
        }}
      >
        <AppFormBid />
      </div>
    </>
  );
};

export default App;
