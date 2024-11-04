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
import { toast } from 'sonner'

interface DeleteProductDialogContentProps {
    productId: string
}

const DeleteProductDialogContent = ({
    productId,
}: DeleteProductDialogContentProps) => {
    const handleContinueClick = async () => {
        try {
            await deleteProduct({ id: productId })
            toast.success('Produto removido com sucesso')
        } catch (error) {
            console.error(error)
            toast.error('Erro ao deletar o produto')
        }
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
