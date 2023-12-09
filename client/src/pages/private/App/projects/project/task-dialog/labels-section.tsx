import { FC } from 'react'
import { Button } from '@components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import { ILabel } from '@interfaces/Label'

interface LabelsSectionProps {
    labels: ILabel[]
    loading: boolean
    error?: any
}

const LabelsSection:FC<LabelsSectionProps> = ({ labels }) => {
    return (
        <div className='flex flex-row gap-2'>
            {
                labels.map(label => (
                    <div
                        key={label._id}
                        className={`w-9 h-9 rounded-sm border`}
                        style={{ backgroundColor: label.color }}></div>
                ))
            }
            <Button variant='outline' size='icon'>
                <PlusIcon />
            </Button>
        </div>
    )
}

export default LabelsSection