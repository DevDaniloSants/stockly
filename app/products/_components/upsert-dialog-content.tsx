'use client'

import { upsertProduct } from '@/app/_actions/product/upsert-product'
import {
    upsertProductSchema,
    UpsertProductSchema,
} from '@/app/_actions/product/upsert-product/schemas'
import { Button } from '@/app/_components/ui/button'
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
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
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { NumericFormat } from 'react-number-format'

interface UpsertProductDialogContentProps {
    onSuccess?: () => void
    defaultValues?: UpsertProductSchema
}

const UpsertProductDialogContent = ({
    onSuccess,
    defaultValues,
}: UpsertProductDialogContentProps) => {
    const form = useForm<UpsertProductSchema>({
        shouldUnregister: true,
        resolver: zodResolver(upsertProductSchema),
        defaultValues: defaultValues ?? {
            name: '',
            price: 0,
            stock: 1,
        },
    })

    const onSubmit = async (data: UpsertProductSchema) => {
        try {
            await upsertProduct({ ...data, id: defaultValues?.id })
            onSuccess?.()
        } catch (error) {
            if (
                error instanceof Error &&
                error.message === 'A product with this name already exists.'
            ) {
                return form.setError('name', {
                    type: 'custom',
                    message: 'Já existe um produto cadastrado com esse nome',
                })
            }
            return console.error(error)
        }
    }

    const isEditing = !!defaultValues

    return (
        <DialogContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-2">
                    <DialogTitle>
                        {isEditing ? 'Editar' : 'Criar'} produto
                    </DialogTitle>
                    <DialogDescription>
                        Insira as informações abaixo
                    </DialogDescription>
                </div>
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
                                            field.onChange(values.floatValue)
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
                            {isEditing ? 'Salvar' : 'Criar'} produto
                        </Button>
                    </DialogFooter>
                </Form>
            </form>
        </DialogContent>
    )
}

export default UpsertProductDialogContent
