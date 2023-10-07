interface DescriptionProps {
  description: string;
}

const Description = (props: DescriptionProps) => {
  const { description } = props;

  return (
    <div className="mt-4">
      <p className="text-lg font-light">{description}</p>
    </div>
  );
};

export default Description;
