import { ButtonGroup } from "@mui/material"
import { FormItem } from "components/form"

const BtnGroup = (props: any) => (
  <FormItem label={props.label}>
    {/* {props.label && <FormLabel>{props.label}</FormLabel>} */}
    <ButtonGroup
      size="small"
      variant="outlined"
      aria-label="outlined primary button group"
      style={{ marginBottom: "20px" }}
    >
      {props.children}
    </ButtonGroup>
  </FormItem>
)

export default BtnGroup
