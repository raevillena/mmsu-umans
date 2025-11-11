import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, Box
} from "@mui/material";
import AppRow from "./AppRow";
import { getAppsPaginated } from "../../store/slices/appsSlice";

const AppsTable = ({ loadingRowId, isActive = true }) => {
  const dispatch = useDispatch();
  const { 
    paginatedPagesActive, 
    paginatedPagesInactive, 
    totalPagesActive, 
    totalPagesInactive, 
    loadedPagesActive, 
    loadedPagesInactive, 
    loading 
  } = useSelector((state) => state.apps);
  const [page, setPage] = useState(1);

  // Get current page data from cache based on active status
  const pageNum = Number(page);
  const paginatedPages = isActive ? paginatedPagesActive : paginatedPagesInactive;
  const totalPages = isActive ? totalPagesActive : totalPagesInactive;
  const loadedPages = isActive ? loadedPagesActive : loadedPagesInactive;
  const currentPageApps = paginatedPages[pageNum] || [];

  // Reset page when isActive changes
  useEffect(() => {
    setPage(1);
  }, [isActive]);

  // Fetch page if not cached
  useEffect(() => {
    const pageNum = Number(page);
    if (!loadedPages.includes(pageNum) && !loading) {
      dispatch(getAppsPaginated({ page: pageNum, isActive }));
    }
  }, [page, loadedPages, loading, dispatch, isActive]);

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ mt: 1 }}>
      <TableContainer sx={{ maxWidth: '100%', margin: "auto", mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Actions</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>App ID</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>URL</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Owner Office</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Office Email</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Mobile No.</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Updated at</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Created at</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Active</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageApps.map(app => (
              <AppRow key={app.id} app={app} loadingRowId={loadingRowId} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2, mb: 2, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={totalPages || 1}
          page={page}
          onChange={handlePageChange}
          color="primary"
          disabled={loading}
        />
      </Box>
    </Box>
  );
};

export default AppsTable;