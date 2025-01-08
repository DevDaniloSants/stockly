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
    SheetFooter,
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

import { CheckIcon, PlusIcon } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { formatCurrency } from '../../_helpers/currency'

import { upsertSale } from '@/app/_actions/sale/upsert-sale'
import { toast } from 'sonner'
import { useAction } from 'next-safe-action/hooks'
import { flattenValidationErrors } from 'next-safe-action'
import UpsertSaleDropDownMenu from './upsert-table-dropdown-menu'
import { ProductDto } from '@/app/_data-access/product/get-products'

const formSchema = z.object({
    productId: z.string().uuid({ message: 'O produto é obrigatório' }),
    quantity: z.coerce
        .number()
        .int()
        .positive({ message: 'A quantidade deve ser maior que zero' }),
})

type FormSchema = z.infer<typeof formSchema>

interface SelectedProduct {
    id: string
    name: string
    price: number
    quantity: number
}

interface UpsertSaleSheetContentProps {
    isOpen: boolean
    products: ProductDto[]
    productOptions: ComboboxOptions[]
    setSheetIsOpen: Dispatch<SetStateAction<boolean>>
    defaultSelectedProducts?: SelectedProduct[]
    saleId?: string
}

const UpsertSaleSheetContent = ({
    isOpen,
    saleId,
    products,
    productOptions,
    setSheetIsOpen,
    defaultSelectedProducts,
}: UpsertSaleSheetContentProps) => {
    const isUpdated = !!saleId

    const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
        defaultSelectedProducts ?? []
    )

    const { execute: executeUpsertSale } = useAction(upsertSale, {
        onError: ({ error: { validationErrors, serverError } }) => {
            const flattenedErrors = flattenValidationErrors(validationErrors)

            toast.error(serverError ?? flattenedErrors.formErrors[0])
        },
        onSuccess: () => {
            toast.success(
                `Venda ${isUpdated ? 'editada' : 'realizada'} com sucesso`
            )
            setSheetIsOpen(false)
        },
    })

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productId: '',
            quantity: 1,
        },
    })

    useEffect(() => {
        if (!isOpen) {
            form.reset()
            setSelectedProducts([])
        }
    }, [isOpen, form])

    useEffect(() => {
        setSelectedProducts(defaultSelectedProducts ?? [])
    }, [defaultSelectedProducts])

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
                const productIsOutOfStock =
                    existingProduct?.quantity + data.quantity >
                    selectedProduct.stock

                if (productIsOutOfStock) {
                    form.setError('quantity', {
                        message: 'Quantidade indisponível no estoque',
                    })

                    return currentProducts
                }

                form.reset()

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

            const productIsOutOfStock = data.quantity > selectedProduct.stock

            if (productIsOutOfStock) {
                form.setError('quantity', {
                    message: 'Quantidade indisponível no estoque',
                })

                return currentProducts
            }

            form.reset()

            return [
                ...currentProducts,
                {
                    ...selectedProduct,
                    price: Number(selectedProduct.price),
                    quantity: data.quantity,
                },
            ]
        })
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

    const onSubmitSale = () => {
        executeUpsertSale({
            id: saleId,
            products: selectedProducts.map((product) => ({
                id: product.id,
                quantity: product.quantity,
            })),
        })
    }

    return (
        <SheetContent className="!max-w-[700px]">
            <SheetHeader>
                <SheetTitle>
                    {isUpdated ? 'Editar' : 'Adicionar'} venda
                </SheetTitle>
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
                                <UpsertSaleDropDownMenu
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
            <SheetFooter className="pt-6">
                <Button
                    className="w-full gap-2"
                    disabled={selectedProducts.length === 0}
                    onClick={onSubmitSale}
                >
                    <CheckIcon size={20} />
                    {isUpdated ? 'Atualizar' : 'Finalizar'} venda
                </Button>
            </SheetFooter>
        </SheetContent>
    )
}

export default UpsertSaleSheetContent
