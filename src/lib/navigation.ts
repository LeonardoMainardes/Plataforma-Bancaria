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
    label: "Transferências",
    href: routes.transfers,
    icon: ArrowLeftRightIcon,
  },
  {
    label: "Transações",
    href: routes.transactions,
    icon: CreditCardIcon,
  },
];
