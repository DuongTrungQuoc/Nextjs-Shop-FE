import { ROUTE_CONFIG } from "./route";

export const VerticalItems = [
  {
    title: "Hệ thống",
    icon: "eos-icons:file-system-outlined",
    childrens: [
      {
        title: "Người dùng",
        icon: "lets-icons:group",
        path: ROUTE_CONFIG.SYSTEM.USER
      
      },
      {
        title: "Nhóm vai trò",
        icon: "icon-park-outline:permissions",
        path: ROUTE_CONFIG.SYSTEM.ROLE
      },
    ]
  },
  {
    title: "Quản trị sản phẩm",
    icon: "ix:product-management",
    childrens: [
      {
        title: "Danh sách sản phẩm",
        icon: "icon-park-outline:ad-product",
        path: ROUTE_CONFIG.MANAGE_PRODUCT.PRODUCT
      
      },
      {
        title: "Danh mục sản phẩm",
        icon: "mdi:category-plus-outline",
        path: ROUTE_CONFIG.MANAGE_PRODUCT.MANAGE_TYPE_PRODUCT
      
      },
      {
        title: "Danh sách đơn hàng",
        icon: "lsicon:order-outline",
        path: ROUTE_CONFIG.MANAGE_PRODUCT.MANAGE_ORDER
      
      },
      {
        title: "Danh sách đánh giá",
        icon: "carbon:review",
        path: ROUTE_CONFIG.MANAGE_PRODUCT.MANAGE_REVIEW
      
      },
    ]
  },
  {
    title: "Cài đặt",
    icon: "uil:setting",
    childrens: [
      {
        title: "Cài đặt thành phố",
        icon: "healthicons:city-outline",
        path: ROUTE_CONFIG.SETTINGS.CITY
      
      },
      {
        title: "Cài đặt phương thức giao hàng",
        icon: "iconoir:delivery-truck",
        path: ROUTE_CONFIG.SETTINGS.DELIVERY_TYPE
      
      },
      {
        title: "Cài đặt phương thức thanh toán",
        icon: "streamline:payment-10-solid",
        path: ROUTE_CONFIG.SETTINGS.PAYMENT_TYPE
      
      }
    ]
  },
]