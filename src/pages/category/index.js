import { useLocation, useNavigate } from "react-router-dom";
import Main from "../../components/Categories";
import Wrapper from "./../../components/default/Wrapper";
import { useEffect } from "react";
import { useAuth } from "../../modules/context/UseAuth";

const CategoryPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, location]);

  return (
    <Wrapper>
      <Main />
    </Wrapper>
  );
};

export default CategoryPage;
