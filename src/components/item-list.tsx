export default function ItemList({name, category, price}: {name:string, category:string, price:number}) {
    return(
        <div className="w-full p-4 border rounded-md shadow-xs grid grid-cols-[70%_30%]">
          <div>
            <h1 className="font-semibold text-lg">{name}</h1>
            <p className="text-muted-foreground">{category}</p>
          </div>
          <p className="text-right my-auto">{price} THB</p>
        </div>
    )
}