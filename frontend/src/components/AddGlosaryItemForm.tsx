import React from 'react';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import {Box, IconButton, TextareaAutosize, TextField, Tooltip} from "@mui/material";
import {styled} from "@mui/material/styles";
import {useFormik} from "formik";
import * as Yup from "yup";

type AddGlosaryItemFormProps = {
    onClose: () => void;
}

const Textarea = styled(TextareaAutosize)(({theme}) => ({
    color: theme.palette.secondary.main,
    fontWeight: 400,
    lineHeight: 1.5,
    padding: "8px",
    borderRadius: "12px 12px 0 12px",
    fontFamily: "IBM Plex Sans, sans-serif",
    width: "100%",
    resize: "none",
    "&:hover": {
        borderColor: theme.palette.primary.main,
    },
    "&:focus": {
        outline: theme.palette.primary.dark,
        borderColor: theme.palette.primary.dark,
    }
}));

const validationSchema = Yup.object({
    description: Yup.string().required(),
    title: Yup.string().required(),
});

const AddGlosaryItemForm: React.FC<AddGlosaryItemFormProps> = ({onClose}) => {
    const formik = useFormik<{
        description: string,
        title: string
    }>({
        initialValues: {
            title: "",
            description: "",
        },
        // TODO: add edit api call
        onSubmit: () => onClose(),
        validationSchema,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <TextField
                variant="standard"
                autoFocus={true}
                size="small"
                error={!!formik.touched?.title && !!formik.errors?.title}
                label="Понятие"
                sx={{paddingBottom: 2, "& input": {fontSize: "13px !important"}}}
                {...formik.getFieldProps("title")}
            />
            <Textarea
                id="standard-basic"
                sx={{
                    borderColor: !!formik.touched?.description && !!formik.errors?.description ? "#d32f2f" : ""
                }}
                maxRows={7}
                minRows={2}
                placeholder="Описание"
                {...formik.getFieldProps("description")}
            />
            <Box flexDirection="row" display="flex" justifyContent="right">
                <Tooltip title="Сохранить">
                    <IconButton
                        aria-label="done"
                        size="small"
                        // onClick={() => setEditMode(true)}
                        sx={{"&:focus": {outline: "none"}}}
                        color="success"
                        type="submit"
                    >
                        <DoneIcon sx={{fontSize: "15px"}}/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Отмена">
                    <IconButton
                        type="button"
                        aria-label="back"
                        size="small"
                        sx={{"&:focus": {outline: "none"}}}
                        color="error"
                        onClick={onClose}
                    >
                        <CloseIcon sx={{fontSize: "15px"}}/>
                    </IconButton>
                </Tooltip>
            </Box>
        </form>
    );
};

export default AddGlosaryItemForm;