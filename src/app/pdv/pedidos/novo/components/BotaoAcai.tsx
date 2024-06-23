import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter, DialogTrigger, Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { ListaEmbalagens } from "@/data/PedidoPentente";
import { zodResolver } from "@hookform/resolvers/zod";
import { PintGlass } from "@phosphor-icons/react/dist/ssr";
import { Input } from "@/components/ui/input";
import { useForm, Form } from "react-hook-form";
import { ComboBoxAdicionaisHookForm, pedidoSchema, PedidoSchema } from "../page";
import { BotaoCategoria } from "./BotaoCategoria";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from "@/components/ui/select";

export function BotaoAcai() {
    const form = useForm<PedidoSchema>({
      resolver: zodResolver(pedidoSchema),
      defaultValues: {
        nomeCliente: "Cliente sem nome.",
        embalagem: ListaEmbalagens[0],
      },
    });
  
  // const mutation = useMutation({
  //     mutationFn: ,
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ['pedidoAtual'] })
  //     },
  //   })

    function onSubmit(values: PedidoSchema) {}
  
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div>
            <BotaoCategoria Icon={PintGlass} tooltip="Açaís" />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar copo de açaí</DialogTitle>
            <DialogDescription>
              Preencha todos os campos corretamente e clique em salvar.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="nomeCliente"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Gabriel Furlan" {...field} />
                    </FormControl>
                    <FormDescription>Nome do Cliente</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="embalagem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Embalagem</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        value={field.value ? field.value.id : ""}
                        onValueChange={(id) => {
                          field.onChange(
                            ListaEmbalagens.find((e) => e.id === id)
                          );
                        }}
                      >
                        <SelectTrigger>
                          {field.value ? field.value.nome : "Selecione"}
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {ListaEmbalagens.map((embalagem) => (
                              <SelectItem
                                key={embalagem.id}
                                value={embalagem.id ?? ""}
                              >
                                {embalagem.nome}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>Embalagem do Açaí</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="adicionais"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adicionais</FormLabel>
                    <FormControl>
                      <ComboBoxAdicionaisHookForm control={form.control} />
                    </FormControl>
                    <FormDescription>Adicionais do Açaí</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Adicionar</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }