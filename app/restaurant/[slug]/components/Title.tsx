interface TitleProps {
  name: string;
}

const Title = (props: TitleProps) => {
  const { name } = props;

  return (
    <div className="mt-4 border-b pb-6">
      <h1 className="font-bold text-6xl">{name}</h1>
    </div>
  );
};

export default Title;
