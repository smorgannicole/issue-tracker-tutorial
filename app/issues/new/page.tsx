import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});
// 1st arg is loader fxn, 2nd is
// dynamically importing the IssueForm component so both fields load simultaneously rather than staggered
// code-splitting- the component will only be loaded when it's actually needed. improves performance of app
// component only to be rendered on the client side

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
