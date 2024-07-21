"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Textarea } from "@/components/ui/textarea";
import { Footer } from "./components/footer";
import { Structure } from "@/components/sorveccino-ui/structure";
import { useState } from "react";

export default function NewOrder() {
  const [customerName, setCustomerName] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Structure>
      <div className="px-20 h-[80vh]">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel>
            <h1 className="text-xl">Descrição do Pedido</h1>
            <Textarea className="min-h-[65vh] border-2 rounded-lg mr-10 mt-6" onChange={(e) => setDescription(e.target.value)}></Textarea>
          </ResizablePanel>
          <ResizableHandle className="invisible" />
          <ResizablePanel>
            <h1 className="text-xl">Dados Pessoais</h1>
            <div className="py-6 px-2">
              <div className="flex flex-col gap-y-3">
                <Label>Nome</Label>
                <Input onChange={(e) => setCustomerName(e.target.value)} />
              </div>
              <div className="flex flex-col gap-y-3 mt-6">
                <Label>Observações</Label>
                <Textarea onChange={(e) => setCustomerNotes(e.target.value)}/>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <Footer customerNotes={customerNotes} customerName={customerName} orderDescription={description}/>
    </Structure>
  );
}
