import { Request } from "../models/requests.model.js";
import { User } from "../models/user.model.js";

export const submitRequest = async (req, res) => {
    try {
        console.log('Received request body:', JSON.stringify(req.body, null, 2));

        const { formData } = req.body;
        if (!formData) {
            return res.status(400).json({ success: false, error: 'formData is missing from the request body' });
        }

        const id = req.userId;

        // Find the user to ensure they exist
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Validate required fields
        const requiredFields = [
            'husbandName', 'husbandSurname', 'husbandIdCard', 'husbandProfession', 'husbandResidence',
            'husbandDateOfBirth', 'husbandCityOfBirth', 'husbandNationality', 'husbandFather',
            'husbandMother', 'husbandFamilyHead', 'husbandWitness',
            'wifeName', 'wifeSurname', 'wifeIdCard', 'wifeProfession', 'wifeResidence',
            'wifeDateOfBirth', 'wifeCityOfBirth', 'wifeNationality', 'wifeFather',
            'wifeMother', 'wifeFamilyHead', 'wifeWitness',
            'marriageDate'
        ];

        for (const field of requiredFields) {
            if (formData[field] === undefined) {
                return res.status(400).json({ success: false, error: `Missing required field: ${field}` });
            }
        }

        // Create new request based on the form data
        const newRequest = new Request({
            userId: id,
            husband: {
                name: formData.husbandName,
                surname: formData.husbandSurname,
                idCardNumber: formData.husbandIdCard,
                profession: formData.husbandProfession,
                residence: formData.husbandResidence,
                dateOfBirth: formData.husbandDateOfBirth,
                cityOfBirth: formData.husbandCityOfBirth,
                nationality: formData.husbandNationality,
                fatherName: formData.husbandFather,
                motherName: formData.husbandMother,
                familyHead: formData.husbandFamilyHead,
                witness: formData.husbandWitness
            },
            wife: {
                name: formData.wifeName,
                surname: formData.wifeSurname,
                idCardNumber: formData.wifeIdCard,
                profession: formData.wifeProfession,
                residence: formData.wifeResidence,
                dateOfBirth: formData.wifeDateOfBirth,
                cityOfBirth: formData.wifeCityOfBirth,
                nationality: formData.wifeNationality,
                fatherName: formData.wifeFather,
                motherName: formData.wifeMother,
                familyHead: formData.wifeFamilyHead,
                witness: formData.wifeWitness
            },
            marriageDate: formData.marriageDate
        });

        // Save the request to the database
        const savedRequest = await newRequest.save();

        res.status(201).json({ success: true, message: 'Request submitted successfully', savedRequest });
    } catch (error) {
        console.error('Error creating request:', error);
        res.status(500).json({ success: false, error: 'Failed to submit request', details: error.message });
    }
};


// Get all requests
export const getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find().populate('userId', 'name email');
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single request by ID
export const getRequestById = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id)
            .populate('userId', 'name email')
            .populate('approvedBy', 'name email');
        
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a request
export const updateRequest = async (req, res) => {
    try {
        const { husband, wife, marriageDate, status, approvedBy } = req.body;
        
        const updatedRequest = await Request.findByIdAndUpdate(
            req.params.id,
            { husband, wife, marriageDate, status, approvedBy },
            { new: true, runValidators: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json(updatedRequest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a request
export const deleteRequest = async (req, res) => {
    try {
        const deletedRequest = await Request.findByIdAndDelete(req.params.id);
        
        if (!deletedRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json({ message: 'Request deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Approve a request (for admin use)
export const approveRequest = async (req, res) => {
    try {
        const adminId = req.user._id;  // Assuming you have admin authentication middleware
        
        const approvedRequest = await Request.findByIdAndUpdate(
            req.params.id,
            { status: 'Approved', approvedBy: adminId },
            { new: true, runValidators: true }
        );

        if (!approvedRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json(approvedRequest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};