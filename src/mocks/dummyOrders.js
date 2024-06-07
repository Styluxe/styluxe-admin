export const ordersHeading = [
  {
    id: "order_number",
    label: "Order ID",
    width: "10%",
  },
  {
    id: "customer_name",
    label: "Customer Name",
  },
  {
    id: "products",
    label: "Products (Quantity)",
  },
  {
    id: "payment_status",
    label: "Payment Status",
    // width: "10%",
  },
  {
    id: "payment_receipt",
    label: "Payment Receipt",
  },
  {
    id: "provider",
    label: "Provider",
  },
  {
    id: "total",
    label: "Total",
    // width: "20%",
  },
  {
    id: "order_status",
    label: "Order Status",
    // width: "50%",
  },
];

export const dummyOrdersBody = [
  {
    order_id: 1,
    customer_name: "Bryan",
    products: [
      {
        product_name: "Baju Polos Biru",
        quantity: 1,
      },
      {
        product_name: "Baju Polos Hitam",
        quantity: 2,
      },
    ],
    total: 250000,
    order_status: "Pending",
  },
  {
    order_id: 2,
    customer_name: "Alice",
    products: [
      {
        product_name: "Baju Polos Merah",
        quantity: 1,
      },
      {
        product_name: "Celana Jeans",
        quantity: 1,
      },
    ],
    total: 300000,
    order_status: "Waiting For Confirmation",
  },
  {
    order_id: 3,
    customer_name: "David",
    products: [
      {
        product_name: "Kemeja Kotak-Kotak",
        quantity: 2,
      },
      {
        product_name: "Topi Baseball",
        quantity: 1,
      },
    ],
    total: 350000,
    order_status: "Pending",
  },
  {
    order_id: 4,
    customer_name: "Eva",
    products: [
      {
        product_name: "Rok Mini",
        quantity: 1,
      },
      {
        product_name: "Blus Putih",
        quantity: 2,
      },
    ],
    total: 275000,
    order_status: "Delivered",
  },
  {
    order_id: 5,
    customer_name: "Frank",
    products: [
      {
        product_name: "Sweater Abu-abu",
        quantity: 1,
      },
      {
        product_name: "Celana Pendek",
        quantity: 3,
      },
    ],
    total: 325000,
    order_status: "Processing",
  },
  {
    order_id: 6,
    customer_name: "Grace",
    products: [
      {
        product_name: "Kaos Polos Putih",
        quantity: 4,
      },
    ],
    total: 200000,
    order_status: "On Delivery",
  },
  {
    order_id: 7,
    customer_name: "Henry",
    products: [
      {
        product_name: "Jaket Kulit",
        quantity: 1,
      },
      {
        product_name: " Celana Chino",
        quantity: 2,
      },
    ],
    total: 450000,
    order_status: "Waiting For Confirmation",
  },
];
