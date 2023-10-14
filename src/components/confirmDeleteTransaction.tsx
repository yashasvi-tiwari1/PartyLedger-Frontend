import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconTrash } from "@tabler/icons-react";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  transaction: any;
}

const dialogTitleStyle = {
  backgroundColor: "blue",
  color: "white",
  padding: "16px",
  fontSize: "24px",
  textAlign: "center",
};
const ConfirmDeleteTransaction: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  transaction,
}) => {
  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <div className="flex border-2">
        <div className="p-2.5">
          <IconTrash className=" w-10 h-10 text-red-700 mx-auto" />
        </div>
        <div className="-ml-4">
          <DialogTitle>
            Do you want to delete transaction
            <span className="font-semibold text-red-600 ml-2">
              {transaction?.item}
              {transaction?.amount}
            </span>
          </DialogTitle>
        </div>
      </div>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete? This will delete this transaction
          detail permanently.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <div className="hover:bg-blue-400 rounded-md">
          <Button
            autoFocus
            onClick={handleClose}
            className="text-red-600 hover:text-black "
          >
            No
          </Button>
        </div>
        <div className="hover:bg-blue-400 rounded-md ">
          <Button
            onClick={handleConfirm}
            autoFocus
            className="text-red-600 hover:text-black"
          >
            Yes
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteTransaction;
