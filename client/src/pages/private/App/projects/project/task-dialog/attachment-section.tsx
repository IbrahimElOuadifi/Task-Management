import { FC } from 'react'
import { Button } from '@components/ui/button'
import { MinusIcon } from '@radix-ui/react-icons'

const AttachmentSection:FC = () => {
    return (
        <div className='flex flex-col'>
            <div className='flex flex-row align-middle justify-between'>
                <Button variant='link' className='text-sm px-1'>Attachment Title.doc</Button>
                <Button variant='ghost' size='icon'>
                    <MinusIcon color='hsl(var(--destructive))' />
                </Button>
            </div>
            <div className='flex flex-row align-middle justify-between'>
                <Button variant='link' className='text-sm px-1'>Attachment Title.doc</Button>
                <Button variant='ghost' size='icon'>
                    <MinusIcon color='hsl(var(--destructive))' />
                </Button>
            </div>
            <div className='flex flex-row align-middle justify-between'>
                <Button variant='link' className='text-sm px-1'>Attachment Title.doc</Button>
                <Button variant='ghost' size='icon'>
                    <MinusIcon color='hsl(var(--destructive))' />
                </Button>
            </div>
        </div>
    )
}

export default AttachmentSection