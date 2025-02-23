import React from 'react'
import { Typographie } from '../Design-System/Typographie'
import { Input } from '../Design-System/Input'
import { Button } from '../Design-System/Button'

const ModifyProfileInfo = ({setModifyProfileInfo, infoToModify}: {setModifyProfileInfo: (value: boolean) => void, infoToModify: string}) => {
  return (
    <div onClick={() => setModifyProfileInfo(false)} className='fixed top-0 left-0 w-full h-full bg-black/50 grid place-items-center'>
        <div className='md:w-[500px] w-[70vw] p-[20px] bg-white rounded-lg'>
            <form className='space-y-[30px] w-full flex items-center flex-col'>
                
                <div className="space-y-[8px] w-full">
                  <Typographie variant="h3" font="ambit">
                    {infoToModify} <span className="text-red">*</span>
                  </Typographie>
                  <Input
                    required
                    placeholder={`Enter votre ${infoToModify}`}
                  />
                </div>
                <Button variant="filled" className='w-full'>
                    Modifier
                </Button>
                
            </form>
        </div>
    </div>
  )
}

export default ModifyProfileInfo