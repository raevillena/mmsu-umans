import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, Box
} from "@mui/material";
import RoleRow from "./RoleRow";
import { getRolesPaginated } from "../../store/slices/rolesSlice";

const RolesTable = ({ apps, users, userTypes, loadingRowId }) => {
  const dispatch = useDispatch();
  const { paginatedPages, totalPages, loadedPages, loading } = useSelector((state) => state.roles);
  const [page, setPage] = useState(1);

  // Get current page data from cache (ensure page is a number)
  const pageNum = Number(page);
  const rawRoles = paginatedPages[pageNum] || [];

  // Enrich roles with display names (appName, userName)
  const currentPageRoles = useMemo(() => {
    if (!rawRoles || rawRoles.length === 0) return [];
    
    const validUsers = users && users[0] !== 'empty' ? users : [];
    const validApps = apps && apps[0] !== 'empty' ? apps : [];
    
    return rawRoles.map(role => {
      const user = validUsers.find(u => u.id === role.userId);
      const app = validApps.find(a => a.id === role.appsId);
      
      return {
        ...role,
        userName: user ? `${user.firstName} ${user.lastName}` : 'Unknown',
        appName: app ? app.name : 'Unknown',
      };
    });
  }, [rawRoles, users, apps]);

  // Fetch page if not cached
  useEffect(() => {
    const pageNum = Number(page);
    if (!loadedPages.includes(pageNum) && !loading) {
      dispatch(getRolesPaginated(pageNum));
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
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>App Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>User</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Role</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Updated at</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Created at</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Active</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageRoles.map(role => (
              <RoleRow key={role.id} role={role} users={users} apps={apps} userTypes={userTypes} loadingRowId={loadingRowId} />
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

export default RolesTable;