import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline"
import Icon from "../../../src/components/styling/icon"

const solutions = [
  {
    name: "Business as usual",
    description: "Under the SSP5-8.5 Scenario, emissions continue to rise over the 21st century.",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Emissions peak in 2040",
    description: "Under the SSP2-4.5 Scenario, emissions do not increase beyond 2040.",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Paris aligned",
    description: "Under the SSP1-2.6 scenario, emissions are aligned with the Paris agreement.",
    href: "#",
    icon: FingerPrintIcon,
  },
]

export default function DropDownButton(props) {
  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex gap-x-1 text-sm font-semibold leading-6 text-gray-900 bg-white p-2 min-w-60 justify-between text-left ">
        <div className="">
          <div style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center", color: "#666666" }}>
            <p>{props.title}</p>
            <span>
              <Icon icon={"mdi:info"} fontSize={18} />
            </span>
          </div>
          <p className="font-light">{props.content}</p>
        </div>
        <div className="mt-3">
          <ChevronDownIcon aria-hidden="true" className="h-5 w-5" />
        </div>
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute z-10 mt-5 flex w-screen max-w-max start-0 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="w-screen max-w-md flex-auto overflow-hidden rounded-sm bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
          <div className="pt-2 px-2 font-bold text-left">{props.title}</div>
          <div className="p-2">
            {solutions.map((item) => (
              <div
                key={item.name}
                className="group relative flex gap-x-6  p-4  rounded-sm border border-gray-300 my-1 hover:bg-[#4b3fa0]"
              >
                <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
                </div>
                <div className="text-left">
                  <a href={item.href} className="font-semibold text-gray-900 ">
                    {item.name}
                    <span className="absolute inset-0" />
                  </a>
                  <p className="mt-1 text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  )
}
