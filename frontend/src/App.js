import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Snackbar,
  Alert,
  Container,
  Paper,
  Divider
} from '@mui/material';
import { listPatients} from './api';
import PatientOrdersDialog from './components/PatientOrdersDialog'


const App = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(false);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity })
  }

  const loadPatients = async () => {
    setLoading(true)
    try {
      const data = await listPatients();
      setLoading(false)
      setPatients(data);
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Failed to load patient list.',
        severity: 'error'
      });
    } finally {
      setLoading(false)
    }
  };

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedPatient(null);
  };

  useEffect(() => {
    loadPatients();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Patient Order Management System
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3}>
          <Box p={3}>
            <Typography variant="h5" gutterBottom>
              Patient List
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            {loading ? (
              <Typography>Loading...</Typography>
            ) : (
              <List>
                {patients.map((patient) => (
                  <ListItem
                    key={patient.id}
                    button
                    onClick={() => handlePatientClick(patient)}
                    sx={{
                      border: 1,
                      borderColor: 'grey.300',
                      borderRadius: 1,
                      mb: 1,
                      '&:hover': {
                        backgroundColor: 'grey.50'
                      }
                    }}
                  >
                    <ListItemText
                      primary={patient.name}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Paper>
      </Container>

      <PatientOrdersDialog
        open={dialogOpen}
        patient={selectedPatient}
        onClose={handleCloseDialog}
        showSnackbar={showSnackbar}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default App;