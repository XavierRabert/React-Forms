export default function Wrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="m-6 p-6 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 w-full ">
      {children}
    </div>
  );
}
