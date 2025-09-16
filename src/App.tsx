import { useState, useEffect } from "react"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import ItemList from "./components/item-list"
import type { ItemsType } from "./types"

const categories: string[] = [
  "อาหาร",
  "เครื่องดื่ม",
  "ใช้จ่ายทั่วไป",
  "อื่นๆ",
]

export default function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [data, setData] = useState<ItemsType[]>([])
  const [name, setName] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [price, setPrice] = useState<number>(0)

  const localStorageKey = 'joddiData';

  const handleSubmit = () => {
    const stateData: ItemsType[] = [...data]
    const newData: ItemsType = {
      name: name,
      category: category,
      price: price
    }
    setData([...data, newData])
    setName("")
    setCategory("")
    setPrice(0)
    stateData.push(newData)
    localStorage.setItem(localStorageKey, JSON.stringify(stateData));
  }

  useEffect(() => {
    const savedData = localStorage.getItem(localStorageKey);
    console.log(savedData)
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, [])

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-7xl font-bold text-center mt-10">จดดิ</h1>
      <p className="text-center -mt-2 text-muted-foreground">แอพสำหรับบันทึกรายจ่ายประจำวัน 🪙</p>
      
      <Button onClick={() => setIsOpen(!isOpen)} className="mt-4 w-full">เพิ่มรายการ</Button>

      <h1 className="text-2xl font-semibold mt-4">รายการล่าสุด</h1>
      <div className="grid grid-cols-1 gap-2 mt-2">
        {data.map((item, index) => (
          <ItemList
            key={index}
            name={item.name}
            category={item.category}
            price={item.price}
          />
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>เพิ่มรายการ</DialogTitle>
            <DialogDescription>
              เพิ่มรายการใช้จ่ายของคุณ 👇
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">ชื่อรายการ</Label>
              <Input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex justify-between items-center gap-2">
              <div className="grid gap-3">
                <Label htmlFor="category">หมวดหมู่</Label>
                <Select name="category" value={category} onValueChange={(value) => setCategory(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกหมวดหมู่" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>หมวดหมู่</SelectLabel>
                      {categories.map((item, index) => (
                        <SelectItem value={item} key={index}>{item}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="price">ราคา</Label>
                <Input id="price" name="price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))}/>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">ยกเลิก</Button>
            </DialogClose>
            <Button type="submit" onClick={() => {handleSubmit(); setIsOpen(!isOpen)}}>บันทึก</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

