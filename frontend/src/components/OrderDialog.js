import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

// Create New Order Dialog Component
const OrderDialog = ({ open, onClose, onSave}) => {
  const [message, setMessage] = useState('');

  const handleSave = () => {
    if (message.trim()) {
      onSave(message.trim());
      setMessage('');
    }
  };

  const handleClose = () => {
    setMessage('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
       Create New Order
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          multiline
          rows={4}
          fullWidth
          label="Order Notes / Instructions"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          variant="outlined"
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: '#555' }}>
          Cancel
        </Button>
        <Button 
          onClick={handleSave} 
          color="primary" 
          variant="contained"
          disabled={!message.trim()}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDialog;