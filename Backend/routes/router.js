const express = require('express');
const multer = require('multer');
const path = require('path');

const { createAdminUser, login, refreshAdminToken, validateAdminAccessToken, getAdminMember, adminLogOut } = require('../contorllers/controller');

const {addCars, purchase, createCustomer, createServiceMaintenance, createCalendarEntry, createCarFinder} = require("./posts"); 
const {updateCarDescription, updateProfilePic, updateCalendarEvent, updateServiceMaintenance} = require("./puts");  
const {deleteCarData, deleteAppointment, deleteMessage, deleteSvcMaint } = require("./delets");
const {getAppointments, getServiceMaintenance, getCustomers, getMessages, getPurchases, getCardiscripData, getSelectedCarData, getAvailabilityAndQuoteData, getCarFinderData } = require("./gets");

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../shared-assets/public/carimages'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // Limit to 5MB per file
    fileFilter: (req, file, cb) => {
        const fileType = /jpeg|jpg|png|webp/;
        const mimeType = fileType.test(file.mimetype);
        const extname = fileType.test(path.extname(file.originalname).toLowerCase());
    
        if (mimeType && extname) {
            return cb(null, true);
        }
        cb(new Error('Invalid file format. Only JPEG, JPG, PNG, and WEBP are allowed.'));
    },
    
});


// Profile Pic multer
const profileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../shared-assets/public/profilepics'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const profilePicUpload = multer({
    storage: profileStorage,
    limits: { fileSize: 5000000 },
    fileFilter: (req, file, cb) => {
        const fileType = /jpeg|jpg|png|jfif|webp/i;
        const mimeType = fileType.test(file.mimetype);
        const extname = fileType.test(path.extname(file.originalname));

        if (mimeType && extname) {
            return cb(null, true);
        }

        cb(new Error('Give proper file format to upload'));
    },
});


router.post('/createadminuser', createAdminUser);
router.post('/login', login);
router.post('/refreshadmintoken', refreshAdminToken);
router.post('/cardiscrip', upload.array('carimages', 25), addCars);
router.post('/purchase', purchase);
router.post('/customers', createCustomer);
router.post('/createservicemaintenance', createServiceMaintenance);
router.post('/createcalendarentry', createCalendarEntry);
router.post('/adminlogout', adminLogOut);
router.post('/createcarfinder', createCarFinder);


router.put('/updatedescription', upload.array("editCarImages", 25), updateCarDescription);
router.put('/updateprofilepic', profilePicUpload.single('profilepic'), updateProfilePic);
router.put('/updatecalendarevent', updateCalendarEvent);
router.put('/updateservicemaintenance', updateServiceMaintenance);

router.delete('/deletecar/:_id', deleteCarData);
router.delete('/deleteappointment/:id', deleteAppointment);
router.delete('/deletemessage/:_id', deleteMessage);
router.delete('/deleteservicemaintenance/:id', deleteSvcMaint);


router.get('/getadminmember', validateAdminAccessToken, getAdminMember);
router.get('/getappointments', getAppointments);
router.get('/getcustomers', getCustomers);
router.get('/getmessages', getMessages);
router.get('/getpurchases', getPurchases);
router.get('/getservicemaintenance', getServiceMaintenance);
router.get('/getCarData', getCardiscripData);
router.get('/getSelectedCarData/:_id', getSelectedCarData);
router.get('/getavailabilityandquote', getAvailabilityAndQuoteData);
router.get('/getcarfinderdata', getCarFinderData);


module.exports = router;