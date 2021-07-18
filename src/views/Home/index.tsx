import PassageList from "../../components/PassageList";
import Editor from "../../components/Editor";
import Preview from "../../components/Preview";

function App(props: any) {
  return (
    <>
      <PassageList />
      <Editor type="markdown" />
      <Preview />
    </>
  );
}

export default App;
