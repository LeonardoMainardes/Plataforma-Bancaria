import {
  ArrowLeftRightIcon,
  CreditCardIcon,
  LayoutDashboardIcon,
} from "lucide-react";

import { routes } from "@/lib/routes";

export const navigationItems = [
  {
    label: "Dashboard",
    href: routes.dashboard,
    icon: LayoutDashboardIcon,
  },
  {
    label: "Transfers",
    href: routes.transfers,
    icon: ArrowLeftRightIcon,
  },
  {
    label: "Transactions",
    href: routes.transactions,
    icon: CreditCardIcon,
  },
];
