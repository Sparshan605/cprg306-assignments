import Link from "next/link";

export default function Home() {
  return (
    <>
      <main>
        <h1 className="p-10 flex justify-center items-start font-semibold text-white-900 text-xl">CPRG 306: Web Development 2 - Assignments</h1>
        <br></br>
        <div className="flex justify-center items-start">
        <Link href="/week-2">
          <button className=" px-8 py-10 bg-red-600 text-white rounded-lg " type="button">Week-2 Page</button>
        </Link>
        </div>
        <br></br>
        <div className="flex justify-center items-start">
        <Link href="/week-3">
        <button className="px-8 py-10 bg-green-600 text-white rounded-lg " type="button">Week-3 Page</button>
        </Link>
        </div>
        <br />
        <div className="flex justify-center items-start">
        <Link href="week-4">
        <button className="px-8 py-10 bg-blue-600 text-white rounded-lg " type="button">Week-4 Page</button>
        </Link>
        </div>
        <br></br>
        
      </main>
    </>
  );
}