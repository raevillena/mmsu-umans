import React, { useState, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, Box
} from "@mui/material";
import UserRow from "./UserRow";
import { getUsersPaginated } from "../../store/slices/usersSlice";

const UsersTable = ({ loadingRowId, isActive = true, searchTerm = "" }) => {
  const dispatch = useDispatch();
  const { 
    paginatedActive, 
    paginatedInactive, 
    loading 
  } = useSelector((state) => state.users);
  const [page, setPage] = useState(1);

  const trimmedSearch = useMemo(() => searchTerm.trim(), [searchTerm]);
  const searchKey = useMemo(
    () => trimmedSearch.toLowerCase(),
    [trimmedSearch]
  );

  // Get current page data from cache based on active status
  const pageNum = Number(page);
  const cacheMap = isActive ? paginatedActive : paginatedInactive;
  const cacheBucket = cacheMap[searchKey];
  const emptyPagesRef = useRef({});
  const emptyLoadedRef = useRef([]);

  const pages = cacheBucket?.pages ?? emptyPagesRef.current;
  const loadedPages = cacheBucket?.loadedPages ?? emptyLoadedRef.current;
  const totalPages = cacheBucket?.totalPages ?? 0;
  const currentPageUsers = pages[pageNum] || [];

  // Reset page when isActive changes
  useEffect(() => {
    setPage(1);
  }, [isActive, searchKey]);

  // Fetch page if not cached
  useEffect(() => {
    const pageNum = Number(page);
    if (!loadedPages.includes(pageNum) && !loading) {
      dispatch(getUsersPaginated({ page: pageNum, isActive, searchTerm: trimmedSearch }));
    }
  }, [page, loadedPages, loading, dispatch, isActive, searchKey, trimmedSearch]);

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
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Role</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>First Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Last Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Office</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Mobile No.</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Updated at</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Joined at</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Active</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageUsers.map(user => (
              <UserRow key={user.id} user={user} loadingRowId={loadingRowId} />
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

export default UsersTable;