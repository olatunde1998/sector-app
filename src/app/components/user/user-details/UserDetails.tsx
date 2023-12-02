interface UserDetailsProps {
  title?: string;
  content?: any;
  focusContent?: string;
}

export const UserDetails = ({
  title,
  content,
  focusContent,
}: UserDetailsProps) => {
  return (
    <>
      <main className="leading-8">
        <p className="font-semibold text-gray-400">
          {title}{" "}
          <span className="text-red-700 font-normal">{focusContent}</span>
        </p>
        <p className="font-bold text-white">{content}</p>
      </main>
    </>
  );
};
