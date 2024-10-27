import Feedback from "@/components/feedback";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col space-y-6 container mx-auto ">
      <div className="flex flex-col space-y-4 container mx-auto justify-center max-w-xl">
        {children}
      </div>
    </div>
  );
}
