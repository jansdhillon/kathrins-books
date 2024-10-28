"use client";;
export default function AboutPage() {
  return (
    <div className="flex flex-col space-y-6 container mx-auto ">
      <h1 className="text-2xl font-bold">About</h1>
      <p className="text-muted-foreground font-semibold">
        {" "}
        The story behind Kathrin's Books.
      </p>
      <p className="font-medium md:max-w-[50%]">
        Kathrin's Books is an online bookstore based in Canada founded in 2024.
        We offer a curated selection of rare and unique books. Our collection
        includes a wide range of genres, from classics to modern novels,
        lifestyle books, and more.
      </p>
      <p className="font-medium md:max-w-[50%]">
        Kathrin is a passionate book lover and curator who believes in the
        transformative power of literature. With over a decade of experience as
        a book collector, she has a keen eye for hidden gems and timeless
        classics.
      </p>
      <p className="font-medium md:max-w-[50%]">
        Her mission is to connect readers with books that inspire, educate, and
        entertain. Every book in Kathrin's collection is handpicked, ensuring
        quality and diversity across genres.
      </p>
    </div>
  );
}
