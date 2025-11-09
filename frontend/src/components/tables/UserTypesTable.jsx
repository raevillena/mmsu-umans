
import { useSelector } from "react-redux";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material";
import TypeRow from "./TypeRow";

const UserTypeTable = ({userTypes, loadingRowId}) => {

  //const users = useSelector((state) => state.users.users);
  return (
    <TableContainer sx={{ maxWidth: '100%', margin: "auto", mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Actions</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>User Type</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Updated at</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Added at</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", verticalAlign: "top"}}>Active</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userTypes.map(type  => (
                <TypeRow key={type.id} type={type} loadingRowId={loadingRowId} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  );
};

export default UserTypeTable;