import React from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";

import PrimaryButton from "../../reusable-ui/PrimaryButton.jsx";

export default function ProfileEditDialog({
                                              dlg,
                                              fullScreen,
                                              onClose,
                                              onConfirm,
                                              onChangeValue,
                                          }) {
    return (
        <Dialog
            open={dlg.open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            fullScreen={fullScreen}
        >
            <DialogTitle>{dlg.label}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    fullWidth
                    margin="dense"
                    type={dlg.type}
                    value={dlg.value}
                    onChange={(e) => onChangeValue(e.target.value)}
                    multiline={dlg.multiline}
                    minRows={dlg.multiline ? 4 : undefined}
                />
            </DialogContent>
            <DialogActions>
                <PrimaryButton variant="outlined" type="button" onClick={onClose}>
                    Annuler
                </PrimaryButton>
                <PrimaryButton variant="contained" type="button" onClick={onConfirm}>
                    Enregistrer
                </PrimaryButton>
            </DialogActions>
        </Dialog>
    );
}
