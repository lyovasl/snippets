interface SnippetsEditProps {
  params: {
    id: string;
  };
}

const SnippetsEditPage = (props: SnippetsEditProps) => {
  const id = parseInt(props.params.id);

  return <div>Editing snippets with id {id}</div>;
};

export default SnippetsEditPage;
