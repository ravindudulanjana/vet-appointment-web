import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    ownerName: '',
    appointmentDate: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiUrl = window.configs.apiUrl;


    fetch(apiUrl+'/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      return response.json();
    })
    .then(data => {
      setSuccessMessage('Appointment booked successfully!');
      setErrorMessage('');
      // Reset form after successful submission
      setFormData({
        name: '',
        phoneNumber: '',
        ownerName: '',
        appointmentDate: ''
      });
    })
    .catch(error => {
      setErrorMessage('Failed to book appointment. Please try again later.');
      setSuccessMessage('');
      console.error('Error:', error);
    });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Book an Appointment
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Pet's Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Owner's Name"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="date"
              label="Appointment Date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
          {successMessage && (
            <Grid item xs={12}>
              <Typography variant="body1" color="primary">
                {successMessage}
              </Typography>
            </Grid>
          )}
          {errorMessage && (
            <Grid item xs={12}>
              <Typography variant="body1" color="error">
                {errorMessage}
              </Typography>
            </Grid>
          )}
        </Grid>
      </form>
    </Container>
  );
};

export default App;
