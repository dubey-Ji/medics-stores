import * as React from "react";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";
import { SnackbarContent } from "@mui/material";

function CustomSnackbar({ message, sucess }) {
  const [open, setOpen] = React.useState(true);
  const vertical = "top";
  const horizontal = "right";

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={Fade.name}
        TransitionComponent={Fade}
        autoHideDuration={1200}
      >
        <SnackbarContent
          message={message}
          sx={{
            backgroundColor: !sucess ? "red" : "green",
          }}
        />
      </Snackbar>
    </Box>
  );
}

export default CustomSnackbar;
