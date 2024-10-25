import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div
      className={`gap-3 container h-screen mx-auto overflow-hidden grid grid-rows-[25%__25%__25%__25%]`}
    >
      <Skeleton className={`bg-secondary/40 dark:bg-accent/40 rounded-lg`} />
      <Skeleton className={`bg-secondary/40 dark:bg-accent/40 rounded-lg`} />
      <Skeleton className={`bg-secondary/40 dark:bg-accent/40 rounded-lg`} />
      <Skeleton className={`bg-secondary/40 dark:bg-accent/40 rounded-lg`} />
    </div>
  );
};

export default Loading;
