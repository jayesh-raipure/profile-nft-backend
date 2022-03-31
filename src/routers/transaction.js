const express = require("express")
const router = new express.Router()
const connect = require("../network-connection")
const crypto = require("crypto");

router.post("/createAsset", async (req, res) => {

    try {
        const networkObject = await connect();

        const asset = JSON.stringify(req.body)
        let result = await networkObject.contract.submitTransaction('CreateAsset', asset);
        result = JSON.stringify(JSON.parse(result.toString()), null, 2);
        console.log(`*** Result: ${result}`);
        res.status(201).send(req.body)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.get("/getAllAsset", async (req, res) => {
    try {
        const networkObject = await connect();

        let result = await networkObject.contract.evaluateTransaction('GetAllAssets');
        result = JSON.stringify(JSON.parse(result.toString()), null, 2);
        console.log(`*** Result: ${result}`);
        res.status(201).send(result)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get("/getAsset/:id", async (req, res) => {

    try {
        const networkObject = await connect();
        console.log(typeof req.params.id);
        result = await networkObject.contract.evaluateTransaction('ReadAsset', req.params.id);
        result = JSON.stringify(JSON.parse(result.toString()), null, 2);
        console.log(`*** Result: ${result}`);
        res.status(201).send(result)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.get("/checkAccess/:client_id/:resume_id", async (req, res) => {

    try {
        const networkObject = await connect();
        console.log(typeof req.params.client_id);
        result = await networkObject.contract.evaluateTransaction('checkAccess', req.params.client_id, req.params.resume_id);
        result = JSON.stringify(JSON.parse(result.toString()), null, 2);
        console.log(`*** Result: ${result}`);
        res.status(201).send(result)
    } catch (e) {
        res.status(400).send(e)
    }
})

// store the payment information to blockchain
router.post("/storePayment", async (req, res) => {
    try {
        let paymentDetails = req.body;
        paymentDetails.id = crypto.randomBytes(16).toString("hex");
        paymentDetails.docType = "paymentDetails";
        const networkObject = await connect();
        console.log(typeof req.params.id);
        await networkObject.contract.submitTransaction('createPaymentBlock', JSON.stringify(paymentDetails));
        result = await networkObject.contract.evaluateTransaction('ReadAsset', paymentDetails.resume_id);
        result = JSON.stringify(JSON.parse(result.toString()), null, 2);
        res.status(201).send(result)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.put("/updateAsset/:id", async (req, res) => {
    // check if there is no unwanted field in data
    const validFields = [
        'candidate_name',
        'current_ctc',
        'current_company',
        'education',
        'email',
        'first_name',
        'last_name',
        // 'owner',
        'phone',
        'technologies',
        'gender',
        'experience'
    ];

    const updatedData = req.body;
    const updatedAssetData = {};
    const id = req.params.id;

    validFields.forEach((field) => {
        if (updatedData.hasOwnProperty(field)) {
            updatedAssetData[field] = updatedData[field]
        }
    })

    console.log(updatedAssetData);
    const networkObject = await connect();
    result = await networkObject.contract.submitTransaction('updateAsset', id, JSON.stringify(updatedAssetData));
    result = JSON.stringify(JSON.parse(result.toString()), null, 2);
    res.status(201).send(result)
})

router.post("/serachAsset", async (req, res) => {
    try {
        console.log(typeof req.body);

        const searchOptions = {
            technologies: "php",
            first_name: "Jayesh",
            last_name: "Raipure",
            education: "BE",
            current_company: "Synerzip",
            current_ctc: 5
        }
        const networkObject = await connect();
        result = await networkObject.contract.evaluateTransaction('searchAsset', JSON.stringify(searchOptions));
        result = JSON.stringify(JSON.parse(result.toString()), null, 2);
        console.log(`*** Result: ${result}`);
        res.status(201).send(result)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get("/getProfile/:walletId", async (req, res) => {
    try {
        const walletId = req.params.walletId
        console.log("wallet", walletId);
        const networkObject = await connect();
        result = await networkObject.contract.evaluateTransaction('getProfileByWalletId', walletId);
        console.log(JSON.parse(result.toString())[0]);
        result = JSON.stringify(JSON.parse(result.toString())[0], null, 2);
        console.log(`*** Result: ${result}`);
        res.status(201).send(result)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router