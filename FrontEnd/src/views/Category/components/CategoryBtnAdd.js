import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';

function CategoryBtnAdd() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSave = () => {
    // 
    console.log('Tên mới:', name);

    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Thêm mới
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <div style={{ padding: '16px' }}>
          <h2>Thêm mới</h2>
          <TextField
            label="Tên"
            variant="outlined"
            fullWidth
            value={name}
            onChange={handleNameChange}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '16px' }}
            onClick={handleSave}
          >
            Lưu
          </Button>
        </div>
      </Dialog>
    </div>
  );
}

export default CategoryBtnAdd;
