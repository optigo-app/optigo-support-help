import Navbar from "./../Main/Navbar";
import Footer from "./../Main/Footer";
import { useCommon } from "./../../providers/CommonProvider";

const Wrapper = ({ children }) => {
  const { setOpen } = useCommon();
  return (
    <>
      <Navbar setOpen={setOpen} />
      {children}
      <Footer />
    </>
  );
};

export default Wrapper;
