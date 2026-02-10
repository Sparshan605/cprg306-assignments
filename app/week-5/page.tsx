import ItemList from "./item-list";
export default function Week3page(){
    return (
        <main className="min-h screen bg-gray text-white">
        <h1 className=" p-10 flex justify-center items-start font-semibold text-white-900 text-xl"  >Week 3 Shopping List</h1>
                <ItemList />
            </main>
            
    );
}