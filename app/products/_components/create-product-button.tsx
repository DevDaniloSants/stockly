'use client'

import { NumericFormat } from 'react-number-format'
import { Loader2Icon, Plus } from 'lucide-react'
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
import {
    createProductSchema,
    CreateProductSchema,
} from '@/app/_actions/product/create-product/schemas'
import { createProduct } from '@/app/_actions/product/create-product'
import { useState } from 'react'

const CreateProductButton = () => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false)

    const form = useForm<CreateProductSchema>({
        shouldUnregister: true,
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            name: '',
            price: 0,
            stock: 1,
        },
    })

    const onSubmit = async (values: CreateProductSchema) => {
        try {
            await createProduct(values)
            setDialogIsOpen(false)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus />
                    Novo produto
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <DialogTitle>Cadastrar produto</DialogTitle>
                    <DialogDescription>
                        Insira as informações abaixo
                    </DialogDescription>
                    <Form {...form}>
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
                            <Button disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting && (
                                    <Loader2Icon className="animate-spin" />
                                )}
                                Criar produto
                            </Button>
                        </DialogFooter>
                    </Form>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateProductButton
