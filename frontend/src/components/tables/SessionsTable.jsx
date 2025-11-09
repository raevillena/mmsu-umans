import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, Box
} from "@mui/material";
import SessionsRow from "./SessionsRow";
import { getSessionsPaginated } from "../../store/slices/sessionsSlice";

const SessionsTable = ({ apps, users, loadingRowId }) => {
  const dispatch = useDispatch();
  const { paginatedPages, totalPages, loadedPages, loading } = useSelector((state) => state.sessions);
  const [page, setPage] = useState(1);

  // Get current page data from cache (ensure page is a number)
  const pageNum = Number(page);
  const currentPageSessions = paginatedPages[pageNum] || [];

  // Fetch page if not cached
  useEffect(() => {
    const pageNum = Number(page);
    if (!loadedPages.includes(pageNum) && !loading) {
      dispatch(getSessionsPaginated(pageNum));
    }
  }, [page, loadedPages, loading, dispatch]);

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
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Token</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>User</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>App</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Expires At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageSessions.map(session => (
              <SessionsRow key={session.id} session={session} users={users} apps={apps} loadingRowId={loadingRowId} />
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

export default SessionsTable;