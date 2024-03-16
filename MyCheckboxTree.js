import { Checkbox, FormControlLabel, IconButton, List, ListItem, useTheme } from "@mui/material";
import { useState } from "react";
import { Box } from "@mui/system";
import { DropDownArrowIcon, DropUpArrowIcon } from "../Icons";

export default function MyCheckboxTree({ nodes, checked, setChecked }) {
  return (
    <List sx={{ width: "100%" }}>
      {nodes?.map((item, i) => {
        return <RowData item={item} key={i} checked={checked} setChecked={setChecked} />;
      })}
    </List>
  );
}

function RowData({ item, checked, setChecked }) {
  const { palette } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const onChange = (value) => {
    let array =
      item.children &&
      item.children
        .map((x) => (x.children && x.children?.length > 0 ? x.children?.map((y) => y.value) : x.value))
        .flat();
    if (value === "all") {
      if (checked.length > 0) {
        setChecked([]);
      } else {
        setChecked(array);
      }
    } else if (value === "user") {
      const addArray = ["user_view", "user_edit", "user_add", "user_list"];
      if (checked.some((x) => x === "user_list")) {
        setChecked(checked.filter((x) => !addArray.some((y) => y === x)));
      } else {
        setChecked([...new Set([...checked, ...addArray])]);
      }
    } else if (value === "user_edit" || value === "user_add" || value === "user_view") {
      if (checked.some((x) => x === value)) {
        setChecked(checked.filter((x) => x !== value));
      } else {
        setChecked([...new Set([...checked, "user_list", value])]);
      }
    } else if (value === "admin_operator") {
      const addArray = ["admin_operator_list", "admin_operator_view", "admin_operator_edit", "admin_operator_add"];
      if (checked.some((x) => x === "admin_operator_list")) {
        setChecked(checked.filter((x) => !addArray.some((y) => y === x)));
      } else {
        setChecked([...new Set([...checked, ...addArray])]);
      }
    } else if (value === "admin_operator_edit" || value === "admin_operator_add" || value === "admin_operator_view") {
      if (checked.filter((x) => x === value).length > 0) {
        setChecked(checked.filter((x) => x !== value));
      } else {
        setChecked([...new Set([...checked, value, "admin_operator_list"])]);
      }
    } else if (value === "operator_user") {
      const addArray = ["operator_user_list", "operator_user_view", "operator_user_edit", "operator_user_add"];
      if (checked.some((x) => x === "operator_user_list")) {
        setChecked(checked.filter((x) => !addArray.some((y) => y === x)));
      } else {
        setChecked([...new Set([...checked, ...addArray])]);
      }
    } else if (value === "operator_user_edit" || value === "operator_user_add" || value === "operator_user_view") {
      if (checked.filter((x) => x === value).length > 0) {
        setChecked(checked.filter((x) => x !== value));
      } else {
        setChecked([...new Set([...checked, value, "operator_user_list"])]);
      }
    } else if (value === "operator_location") {
      const addArray = [
        "operator_location_list",
        "operator_location_view",
        "operator_location_edit",
        "operator_location_add"
      ];
      if (checked.some((x) => x === "operator_location_list")) {
        setChecked(checked.filter((x) => !addArray.some((y) => y === x)));
      } else {
        setChecked([...new Set([...checked, ...addArray])]);
      }
    } else if (
      value === "operator_location_edit" ||
      value === "operator_location_add" ||
      value === "operator_location_view"
    ) {
      if (checked.filter((x) => x === value).length > 0) {
        setChecked(checked.filter((x) => x !== value));
      } else {
        setChecked([...new Set([...checked, value, "operator_location_list"])]);
      }
    } else if (value === "advertisement") {
      const addArray = [
        "advertisement_view",
        "advertisement_edit",
        "advertisement_add",
        "advertisement_list",
        "advertisement_delete"
      ];
      if (checked.some((x) => x === "advertisement_list")) {
        setChecked(checked.filter((x) => !addArray.some((y) => y === x)));
      } else {
        setChecked([...new Set([...checked, ...addArray])]);
      }
    } else if (
      value === "advertisement_edit" ||
      value === "advertisement_add" ||
      value === "advertisement_delete" ||
      value === "advertisement_view"
    ) {
      if (checked.some((x) => x === value)) {
        setChecked(checked.filter((x) => x !== value));
      } else {
        setChecked([...new Set([...checked, "advertisement_list", value])]);
      }
    } else if (value === "referral") {
      const addArray = ["referral_list"];
      if (checked.some((x) => x === "referral_list")) {
        setChecked(checked.filter((x) => !addArray.some((y) => y === x)));
      } else {
        setChecked([...new Set([...checked, ...addArray])]);
      }
    } else {
      if (checked.filter((x) => x === value).length > 0) {
        setChecked(checked.filter((x) => x !== value));
      } else {
        setChecked([...checked, value]);
      }
    }
  };

  return (
    <ListItem>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {item.value !== "all" && (
            <IconButton
              onClick={() => setIsExpanded(!isExpanded)}
              sx={{ visibility: `${item?.children && item.children?.length > 0 ? "visible" : "hidden"}` }}
            >
              {isExpanded ? (
                <DropUpArrowIcon width="20px" height="20px" color={palette.primary.main} />
              ) : (
                <DropDownArrowIcon width="20px" height="20px" color={palette.primary.main} />
              )}
            </IconButton>
          )}
          <FormControlLabel
            control={
              <Checkbox
                sx={{ mr: 0.5 }}
                checked={
                  (item?.children &&
                    item?.children?.length > 0 &&
                    item?.children.some((y) => checked.some((x) => x === y.value))) ||
                  checked.some((x) => x === item?.value) ||
                  (item?.value === "all" && checked?.length > 0)
                }
                onChange={() => onChange(item?.value)}
              />
            }
            label={
              <Box className="treeValue">
                <span style={{ userSelect: "none" }}>{item.label}</span>
              </Box>
            }
          />
        </Box>
        {(item.value === "all" || isExpanded) && item?.children && item.children?.length > 0 && (
          <List className={item.value === "all" ? "" : "treeSubRow"}>
            {item?.children.map((subItem, index) => {
              return <RowData key={index} item={subItem} checked={checked} setChecked={setChecked} />;
            })}
          </List>
        )}
      </Box>
    </ListItem>
  );
}