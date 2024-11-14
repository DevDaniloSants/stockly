'use client'

import { Plus } from 'lucide-react'

import { Button } from '@/app/_components/ui/button'
import { Dialog, DialogTrigger } from '@/app/_components/ui/dialog'
import { useState } from 'react'
import UpsertProductDialogContent from './upsert-dialog-content'

const CreateProductButton = () => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false)

    const onSuccess = () => {
        setDialogIsOpen(false)
    }

    return (
        <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus />
                    Novo produto
                </Button>
            </DialogTrigger>
            <UpsertProductDialogContent onSuccess={onSuccess} />
        </Dialog>
    )
}

export default CreateProductButton
