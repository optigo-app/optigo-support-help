import { roleFieldsMap } from "../constants/constants";
import { getDeliveryColumns } from "./../components/Delivery/OrderGrid/deliveryColumns";

export const useFilteredColumns = ({ role, isClient, callbacks }) => {
  const allColumns = getDeliveryColumns(...callbacks);
  const allowedFields = roleFieldsMap[role] || [];

  return allColumns
    .filter((col) => allowedFields.includes(col.field))
    .map((col) => {
      let flex = 1;
      if (col.field === "Description") {
        flex = 2;
      } else if (col.field === "index" || col.field === "OrderNo") {
        flex = 0.5;
      } else if (col.field === "Date") {
        flex = 0.80;
      }
      return { ...col, flex };
    });
};
