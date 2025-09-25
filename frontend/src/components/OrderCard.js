import { useState } from 'react';
import {
  Typography,
  IconButton,
  TextField,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';


// Order Card Component
const OrderCard = ({ order, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editMessage, setEditMessage] = useState(order.message);

  const handleSave = () => {
    if (editMessage.trim() && editMessage.trim() !== order.message) {
      onEdit(order.id, editMessage.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditMessage(order.message);
    setIsEditing(false);
  };

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box flex={1}>
            
            {/* Order content */}
            {isEditing ? (
              <TextField
                fullWidth
                multiline
                rows={3}
                value={editMessage}
                onChange={(e) => setEditMessage(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ mt: 1, mr: 2}}
              />
            ) : (
              <Typography variant="body1" component="p" sx={{ mt: 1 }}>
                {order.message}
              </Typography>
            )}
          </Box>
          
          {/* Time + Buttons */}
          <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="flex-end" 
            sx={{ 
              minWidth: 'fit-content',
              flexShrink: 0,
              alignSelf: 'stretch',
              pl: 2
            }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, textAlign: 'right' }}>
              {new Date(order.updatedAt).toLocaleString('zh-TW')}
            </Typography>
            
            {isEditing ? (
              <Box display="flex" gap={0.5} alignSelf="flex-start" mt="auto">
                <IconButton 
                  size="small"
                  onClick={handleCancel}
                >
                  <CancelIcon />
                </IconButton>
                <IconButton 
                  size="small" 
                  color="primary" 
                  onClick={handleSave}
                  disabled={!editMessage.trim()}
                >
                  <SaveIcon />
                </IconButton>
              </Box>
            ) : (
              <IconButton 
                size="small" 
                color="primary" 
                onClick={() => setIsEditing(true)}
              >
                <EditIcon />
              </IconButton>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrderCard;