import { deleteProduct } from '@/app/_actions/product/delete-product'
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/app/_components/ui/alert-dialog'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'

interface DeleteProductDialogContentProps {
    productId: string
}

const DeleteProductDialogContent = ({
    productId,
}: DeleteProductDialogContentProps) => {
    const { execute: deleteExecuteProduct } = useAction(deleteProduct, {
        onSuccess: () => {
            toast.success('Produto excluído com sucesso!')
        },
        onError: () => {
            toast.error('Ocorreu um erro ao excluir o produto.')
        },
    })
    const handleContinueClick = async () => {
        deleteExecuteProduct({
            id: productId,
        })
    }
    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza ?</AlertDialogTitle>
                <AlertDialogDescription>
                    Você está prestes a excluir este produto. Esta ação pode não
                    ser desfeito. Deseja continuar ?
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleContinueClick}>
                    Continuar
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    )
}

export default DeleteProductDialogContent
