const axios = require('axios');
const { CronJob } = require('cron');

const cronJob = new CronJob('0 0 * * *', async () => {
    // Define a cutoff date for past appointments
    const today = new Date();

    // Fetch the list of appointments
    const appointments = await axios.get('http://localhost:3001/calander');

    // Iterate through the fetched appointments and delete those that are in the past
    for (appointment of appointments) {
        const appointmentDate = new Date(appointment.date);

        if (appointmentDate <= today) {
            // If the appointment date and time have passed, delete it
            try {
                const response = await axios.delete(`http://localhost:3001/deleteappt/${appointment.id}`);
                console.log(`Deleted appointment with ID ${appointment.id}`);
            } catch (error) {
                console.log("Error deleting appointment", error);
            }
        }
    }
});


const afternoonCronJob = new CronJob('0 12 * * *', async () => {
    const today = new Date();

    const appointments = await axios.get('http://localhost:3001/calander');

    for (appointment of appointments) {
        const appointmentDate = new Date(appointment.date);

        if (appointmentDate <= today) {
            try {
                const response = await axios.delete(`http://localhost:3001/deleteappt/${appointment.id}`);
                console.log(`Deleted appointment with ID ${appointment.id}`);
            } catch (error) {
                console.log("Error deleting appointment", error);
            }
        }
    }
});

module.exports = cronJob;

