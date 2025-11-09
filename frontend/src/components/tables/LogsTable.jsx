import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Accordion, AccordionSummary, AccordionDetails, Typography, Pagination, Box
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { getLogsPaginated } from "../../api/logsApi";

const PrettyJsonText = ({ jsonString }) => (
  <SyntaxHighlighter language="json" style={docco}>
    {jsonString}
  </SyntaxHighlighter>
);

const CollapsibleJsonTableCell = ({ jsonData }) => (
  <Accordion sx={{ width: "100%" }}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography>View JSON</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <PrettyJsonText jsonString={JSON.stringify(JSON.parse(jsonData), null, 2)} />
    </AccordionDetails>
  </Accordion>
);

const LogsTable = ({ apps, users }) => {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const userMap = users.reduce((acc, user) => {
    acc[user.id] = `${user.firstName} ${user.lastName}`;
    return acc;
  }, {});

  const fetchLogs = async (pageNum) => {
    setLoading(true);
    try {
      const { logs, totalPages } = await getLogsPaginated(pageNum);
      setLogs(logs);
      setTotalPages(totalPages);
      setPage(pageNum);
    } catch (err) {
      console.error("Failed to fetch logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(1);
    
  }, []);

  return (
    <Box sx={{ mt: 1 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Action</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Payload</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Doer</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Affected ID</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Target Model</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>IP Address</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell align="center">{log.action}</TableCell>
                <TableCell sx={{ maxWidth: '250px', overflow: 'hidden' }}>
                  <CollapsibleJsonTableCell jsonData={log.details} />
                </TableCell>
                <TableCell align="center">{userMap[log.userId] || "Unknown"}</TableCell>
                <TableCell align="center">{log.targetId || "—"}</TableCell>
                <TableCell align="center">{log.targetType || "—"}</TableCell>
                <TableCell align="center">{log.ipAddress || "—"}</TableCell>
                <TableCell align="center">
                  {new Date(log.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2, mb:2, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => fetchLogs(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default LogsTable;