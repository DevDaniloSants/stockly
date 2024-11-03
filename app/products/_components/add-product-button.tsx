'use client'

import { z } from 'zod'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/app/_components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/app/_components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/app/_components/ui/form'
import { Input } from '@/app/_components/ui/input'
import { NumericFormat } from 'react-number-format'

const formSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, { message: 'O nome do produto é obrigatório.' }),
    price: z
        .number()
        .min(0.01, { message: 'O preço do produto é obrigatório.' }),
    stock: z.coerce
        .number()
        .positive({
            message: 'A quantidade do produto deve ser positiva.',
        })
        .min(1, { message: 'A quantidade do produto é obrigatória.' }),
})

type FormSchema = z.infer<typeof formSchema>

const AddProductButton = () => {
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            price: 0,
            stock: 1,
        },
    })

    const onSubmit = (values: FormSchema) => {
        console.log(values)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus />
                    Novo produto
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Cadastrar produto</DialogTitle>
                <DialogDescription>
                    Insira as informações abaixo
                </DialogDescription>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome do produto</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Nome do produto"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Valor unitário</FormLabel>
                                    <FormControl>
                                        <NumericFormat
                                            thousandSeparator="."
                                            decimalSeparator=","
                                            fixedDecimalScale
                                            decimalScale={2}
                                            prefix="R$"
                                            allowNegative={false}
                                            customInput={Input}
                                            onValueChange={(values) =>
                                                field.onChange(
                                                    values.floatValue
                                                )
                                            }
                                            {...field}
                                            onChange={() => {}}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="stock"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Estoque</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Estoque"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="gap-2">
                            <DialogClose asChild>
                                <Button variant={'ghost'}>Cancelar</Button>
                            </DialogClose>
                            <Button>Criar produto</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddProductButton
