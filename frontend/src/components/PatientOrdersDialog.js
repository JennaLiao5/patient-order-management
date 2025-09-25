import { useState, useEffect } from 'react';
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import {
  Add as AddIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { listOrders, createOrder, updateOrder } from '../api';
import OrderCard from './OrderCard'
import OrderDialog from './OrderDialog'


// Order list component
const PatientOrdersDialog = ({ open, patient, onClose, showSnackbar }) => {
  const [orders, setOrders] = useState([]);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [loading, setLoading] = useState(false)

  const loadOrders = async () => {
    if (!patient) return;
    setLoading(true)
    try {
      const data = await listOrders(patient.id);
      setOrders(data);
    } catch (err) {
      showSnackbar('Failed to load medical orders.', 'error')
    } finally {
        setLoading(false)
    }
  };

  const handleAddOrder = async (message) => {
    try {
      setLoading(true)
      const newOrder = await createOrder(patient.id, message);
      setOrders(prev => [newOrder, ...prev]);
      setShowOrderDialog(false);
      showSnackbar('Order created successfully. ')
    } catch (err) {
      showSnackbar('Failed to create order.', 'error')
    } finally {
      setLoading(false)
    }
  };

  const handleEditOrder = async (orderId, message) => {
    try {
      setLoading(true)
      const updatedOrder = await updateOrder(orderId, message);
      
      setOrders(prev => 
        prev.map(order => 
          order.id === orderId ? updatedOrder : order
        )
      );
      
      showSnackbar('Order updated successfully.')
    } catch (err) {
      showSnackbar('Failed to update order.', 'error')
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (open && patient) {
      loadOrders();
    }
  }, [open, patient]);

  return (
    <>
      <Dialog 
        open={open} 
        onClose={onClose} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: { height: '80vh' }
        }}
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              Medical Orders for {patient?.name}
            </Typography>
            <Box>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setShowOrderDialog(true)}
                sx={{ mr: 1 }}
              >
                Add New Order
              </Button>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        
        <DialogContent dividers>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : orders.length > 0 ? (
            <Box>
              {orders.map((order) => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  onEdit={handleEditOrder}
                />
              ))}
            </Box>
          ) : (
            <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
              No Medical Orders Found
            </Typography>
          )}
        </DialogContent>
      </Dialog>

      <OrderDialog
        open={showOrderDialog}
        onClose={() => setShowOrderDialog(false)}
        onSave={handleAddOrder}
      />
    </>
  );
};

export default PatientOrdersDialog