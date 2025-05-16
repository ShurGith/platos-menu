'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { useOrderContext } from '../../context/OrderContext';
import { values } from"./ModalSettings";

function ModalOrderConfirm({ option }) {
    const { openOrderConfirm, setOpenOrderConfirm, setModalOption } = useOrderContext();
    if (option === null) return;
   
    const timeToClose = 10000;
   
    const setClose = () => {
        setModalOption(null);
        setOpenOrderConfirm(false)
    }
    setTimeout(setClose, timeToClose);


    const { title, message, colorOne, colorHover, icon } = values[option];

    return (
        <Dialog open={openOrderConfirm} onClose={setOpenOrderConfirm} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div>
                            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100">
                                {option && icon}
                            </div>
                            <div className="mt-3 text-center sm:mt-5">
                                <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                    {option && title}
                                </DialogTitle>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                    {option && message}
                                        This WIndow will close automatically in {timeToClose / 1000} seconds
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-6">
                            <button
                                type="button"
                                onClick={() => setClose() }
                                className={`inline-flex w-full justify-center rounded-md ${option && colorOne} px-3 py-2 text-sm font-semibold text-white shadow-xs ${option && colorHover} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:${option && colorOne} cursor-pointer`}>
                                Close This Window
                            </button>
                            
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
export default ModalOrderConfirm