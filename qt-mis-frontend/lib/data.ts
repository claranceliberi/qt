import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CheckCircledIcon,
    CircleIcon,
    CrossCircledIcon,
  } from "@radix-ui/react-icons"

export const statuses = [
    {
      value: "ACTIVE",
      label: "Todo",
      icon: CircleIcon,
    },
    {
      value: "DELETED",
      label: "Done",
      icon: CheckCircledIcon,
    },
    {
      value: "INACTIVE",
      label: "Canceled",
      icon: CrossCircledIcon,
    },
  ]

  export const priorities = [
    {
      label: "Low",
      value: "LOW",
      icon: ArrowDownIcon,
    },
    {
      label: "Normal",
      value: "NORMAL",
      icon: ArrowRightIcon,
    },
    {
      label: "High",
      value: "HIGH",
      icon: ArrowUpIcon,
    },
  ]