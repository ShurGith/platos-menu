import { CheckIcon } from '@heroicons/react/24/outline'
export const values = {
    "delete": {
        title: "Order Deleted",
        message: "Order Was Successfully Deleted",
        colorOne: "bg-indigo-600",
        colorHover: "hover:bg-indigo-500",
        icon: <CheckIcon className="h-6 w-6 text-indigo-500" aria-hidden="true" />,
    },
    "confirm": {
        title: "Order in Progress",
        message: "Order Was Successfully Placed",
        colorOne: "bg-green-600",
        colorHover: "hover:bg-green-500",
        icon: <CheckIcon className="h-6 w-6 text-green-500" aria-hidden="true" />,
    }
}