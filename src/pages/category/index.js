import { useParams } from "react-router-dom";
import Main from "../../components/Categories";
import Wrapper from "./../../components/default/Wrapper";
import { useCommon } from "../../providers/CommonProvider";
import { useEffect } from "react";
import { useAuth } from "../../modules/context/UseAuth";
import Chat from "../../components/Chat";

const CategoryPage = () => {
  const { tabId, slug } = useParams();
  const { setActiveTab } = useCommon();
  const { isThirdParty } = useAuth();

  useEffect(() => {
    if (slug && tabId) {
      setActiveTab(Number(tabId));
    }
  }, [tabId, slug]);

  return (
    <Wrapper>
      <Main />
      {/* {!isThirdParty && <Chat defaultOpen={false} />} */}
    </Wrapper>
  );
};

export default CategoryPage;
