import { useTranslation } from "react-i18next";
import { ROUTE_CONFIG } from "./route";

export type TVertical = {
  title: string
  path?: string
  icon: string
  childrens?: {
    title: string
    path?: string
    icon: string
  }[]
}

export const VerticalItems = () => {
  const {t} = useTranslation();

  return [
  {
    title: t("System"),
    icon: "eos-icons:file-system-outlined",
    childrens: [
      {
        title: t("User"),
        icon: "lets-icons:group",
        path: ROUTE_CONFIG.SYSTEM.USER
      
      },
      {
        title: t("Role"),
        icon: "icon-park-outline:permissions",
        path: ROUTE_CONFIG.SYSTEM.ROLE
      },
    ]
  },
  {
    title: t("Manage_product"),
    icon: "ix:product-management",
    childrens: [
      {
        title: t("List_product"),
        icon: "icon-park-outline:ad-product",
        path: ROUTE_CONFIG.MANAGE_PRODUCT.PRODUCT
      
      },
      {
        title: t("Type_product"),
        icon: "mdi:category-plus-outline",
        path: ROUTE_CONFIG.MANAGE_PRODUCT.MANAGE_TYPE_PRODUCT
      
      },
      {
        title: t("List_order"),
        icon: "lsicon:order-outline",
        path: ROUTE_CONFIG.MANAGE_PRODUCT.MANAGE_ORDER
      
      },
      {
        title: t("List_review"),
        icon: "carbon:review",
        path: ROUTE_CONFIG.MANAGE_PRODUCT.MANAGE_REVIEW
      
      },
    ]
  },
  {
    title: t("Setting"),
    icon: "uil:setting",
    childrens: [
      {
        title: t("City"),
        icon: "healthicons:city-outline",
        path: ROUTE_CONFIG.SETTINGS.CITY
      
      },
      {
        title: t("Delivery_method"),
        icon: "iconoir:delivery-truck",
        path: ROUTE_CONFIG.SETTINGS.DELIVERY_TYPE
      
      },
      {
        title: t("Payment_method"),
        icon: "streamline:payment-10-solid",
        path: ROUTE_CONFIG.SETTINGS.PAYMENT_TYPE
      
      }
    ]
  },
]
}