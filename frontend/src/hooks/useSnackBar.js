import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../redux/snackbarSlice";

export const useSnackbar = () => {
  const dispatch = useDispatch();

  return useCallback((message, severity = "info") => {
    dispatch(showSnackbar({ message, severity }));
  }, [dispatch]);
};