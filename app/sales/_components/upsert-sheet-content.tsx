'use client'

import { Button } from '@/app/_components/ui/button'
import { Combobox, ComboboxOptions } from '@/app/_components/ui/combobox'
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
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from '@/app/_components/ui/sheet'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/app/_components/ui/table'
import { zodResolver } from '@hookform/resolvers/zod'
import { Product } from '@prisma/client'
import { PlusIcon } from 'lucide-react'
import { useMemo, useState } from 'react'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { formatCurrency } from '../../_helpers/currency'
import SaleDropDownMenu from './table-dropdown-menu'

const formSchema = z.object({
    productId: z.string().uuid({ message: 'O produto é obrigatório' }),
    quantity: z.coerce.number().int().positive(),
})

type FormSchema = z.infer<typeof formSchema>

interface UpsertSaleSheetContentProps {
    products: Product[]
    productOptions: ComboboxOptions[]
}

interface SelectedProduct {
    id: string
    name: string
    price: number
    quantity: number
}

const UpsertSaleSheetContent = ({
    products,
    productOptions,
}: UpsertSaleSheetContentProps) => {
    const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
        []
    )

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productId: '',
            quantity: 1,
        },
    })

    const onSubmit = (data: FormSchema) => {
        const selectedProduct = products.find(
            (product) => product.id === data.productId
        )

        if (!selectedProduct) return

        setSelectedProducts((currentProducts): SelectedProduct[] => {
            const existingProduct = currentProducts.find(
                (product) => product.id === selectedProduct.id
            )
            if (existingProduct) {
                return currentProducts.map((product) => {
                    if (product.id === selectedProduct.id) {
                        return {
                            ...product,
                            quantity: product.quantity + data.quantity,
                        }
                    }

                    return product
                })
            }

            return [
                ...currentProducts,
                {
                    ...selectedProduct,
                    price: Number(selectedProduct.price),
                    quantity: data.quantity,
                },
            ]
        })

        form.reset()
    }

    const totalPrice = useMemo(() => {
        return selectedProducts.reduce((acc, product) => {
            return acc + product.price * product.quantity
        }, 0)
    }, [selectedProducts])

    const onDelete = (productId: string) => {
        setSelectedProducts((currentProducts) => {
            return currentProducts.filter((product) => product.id !== productId)
        })
    }

    return (
        <SheetContent className="!max-w-[700px]">
            <SheetHeader>
                <SheetTitle>Adicionar venda</SheetTitle>
                <SheetDescription>
                    Insira as informações da venda abaixo
                </SheetDescription>
            </SheetHeader>
            <Form {...form}>
                <form
                    className="space-y-6 py-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name="productId"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Produtos</FormLabel>
                                <FormControl>
                                    <Combobox
                                        options={productOptions}
                                        {...field}
                                        placeholder="Selecione um produto"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Quantidade</FormLabel>
                                <FormControl>
                                    <Input {...field} type="number" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        variant="secondary"
                        className="w-full gap-2"
                    >
                        <PlusIcon size={20} />
                        Adicionar produto à venda
                    </Button>
                </form>
            </Form>
            <Table>
                <TableCaption>
                    Lista dos produtos adicionados à venda.
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Preço</TableHead>
                        <TableHead>Quantidade</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {selectedProducts.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell className="font-medium">
                                {product.name}
                            </TableCell>

                            <TableCell>
                                {formatCurrency(product.price)}
                            </TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell>
                                {formatCurrency(
                                    product.price * product.quantity
                                )}
                            </TableCell>
                            <TableCell>
                                <SaleDropDownMenu
                                    product={product}
                                    onDelete={onDelete}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell>{formatCurrency(totalPrice)}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </SheetContent>
    )
}

export default UpsertSaleSheetContent
