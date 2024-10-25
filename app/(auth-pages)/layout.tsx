import Feedback from "@/components/feedback";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6 p-8 flex flex-col md:flex-row items-center justify-center gap-8">
      <div className="flex flex-col space-y-4 container mx-auto justify-center max-w-xl">
        {children}
      </div>
    </div>
  );
}
