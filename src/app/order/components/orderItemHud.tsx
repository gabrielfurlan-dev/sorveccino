import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";

interface OrderItemHudProps {
  items: { name: string; value: number }[];
  setItems: (item: { name: string; value: number }[]) => void;
}
export function OrderItemHud({ items, setItems }: OrderItemHudProps) {
  const [actualItem, setActualItem] = useState<{
    name?: string;
    value?: number;
  }>({});
  function removeItem(index: number): void {
    setItems(items.filter((_, i) => i !== index));
    toast.success("Item removido com sucesso.");
  }

  function addItem() {
    if (
      actualItem.name == undefined ||
      actualItem.name?.length == 0 ||
      actualItem.value == undefined ||
      actualItem.value <= 0
    ) {
      toast.error("Por favor, informe o nome e o valor do item.");
      return;
    }

    setItems([...items, { name: actualItem.name, value: actualItem.value }]);
    toast.success("Item adicionado com sucesso.");
  }

  return (
    <div className="py-6 px-2">
      <ScrollArea className="h-72 rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">items</h4>
          {items && items.map((item, index) => (
            <>
              <div key={index} className="flex justify-between">
                <p>{item.name}</p>
                <p>
                  {item.value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
                <Button variant="outline" onClick={() => removeItem(index)}>
                  <div>Remover</div>
                </Button>
              </div>
              <Separator className="my-2" />
            </>
          ))}
        </div>
      </ScrollArea>
      <div className="flex gap-2">
        <div className="flex gap-2 w-full">
          <Input
            placeholder="Item"
            onBlur={(e) =>
              setActualItem({
                name: e.target.value,
                value: actualItem.value,
              })
            }
          />
          <Input
            placeholder="Valor"
            type="number"
            onBlur={(e) =>
              setActualItem({
                value: Number(e.target.value),
                name: actualItem.name,
              })
            }
          />
        </div>
        <Button variant="outline" onClick={() => addItem()}>
          Adicionar
        </Button>
      </div>
    </div>
  );
}
