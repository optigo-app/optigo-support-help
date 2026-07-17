import { useParams } from "react-router-dom";
import Main from "../../components/Categories";
import Wrapper from "./../../components/default/Wrapper";
import { useCommon } from "../../providers/CommonProvider";
import { useEffect } from "react";

const CategoryPage = () => {
  const { tabId, slug } = useParams();
  const { setActiveTab } = useCommon();

  useEffect(() => {
    if (slug && tabId) {
      setActiveTab(Number(tabId));
    }
  }, [tabId, slug]);
  
  return (
    <Wrapper>
      <Main />
    </Wrapper>
  );
};

export default CategoryPage;
